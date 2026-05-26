const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { pool } = require('../config/db')
const { getNivelFromRole, normalizeRole } = require('../utils/roleUtils')
const { sendEmail, buildPasswordResetEmail } = require('../src/services/emailService')

const JWT_SECRET = process.env.JWT_SECRET || 'azis_secret_key'
const FRONTEND_URL = (process.env.FRONTEND_URL || 'http://localhost:8080').replace(/\/+$/, '')

async function register(req, res) {
  try {
    const { name, email, institution, password, role, position, gestor_id } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' })
    }

    const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [email])
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: 'E-mail já cadastrado' })
    }

    const userRole = normalizeRole(role || 'funcionario')
    const nivel = getNivelFromRole(userRole)

    const hashedPassword = await bcrypt.hash(password, 10)

    const insertResult = await pool.query(
      'INSERT INTO users (name, email, institution, password, role, nivel, position, gestor_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, name, email, institution, role, nivel, position, gestor_id AS "gestorId"',
      [
        name,
        email,
        institution || null,
        hashedPassword,
        userRole,
        nivel,
        position || null,
        gestor_id || null,
      ]
    )

    const user = insertResult.rows[0]

    return res.status(201).json({
      message: 'Usuário cadastrado com sucesso',
      user,
    })
  } catch (error) {
    console.error('register error:', error)
    return res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' })
    }

    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    const user = userResult.rows[0]

    if (!user) {
      return res.status(401).json({ error: 'E-mail ou senha inválidos' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ error: 'E-mail ou senha inválidos' })
    }

    const normalizedRole = normalizeRole(user.role || 'funcionario')
    const mustChangePassword = Boolean(user.must_change_password)

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      institution: user.institution,
      role: normalizedRole,
      nivel: typeof user.nivel === 'number' ? user.nivel : getNivelFromRole(normalizedRole),
      points: typeof user.points === 'number' ? user.points : 0,
      must_change_password: mustChangePassword,
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })

    return res.status(200).json({
      message: 'Login realizado com sucesso',
      token,
      user: payload,
    })
  } catch (error) {
    console.error('login error:', error)
    return res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

async function forgotPassword(req, res) {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ error: 'E-mail é obrigatório' })
    }

    const userResult = await pool.query('SELECT id, email FROM users WHERE email = $1', [email])
    const user = userResult.rows[0]

    if (user) {
      const token = crypto.randomBytes(32).toString('hex')
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000)

      await pool.query(
        'INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)',
        [user.id, token, expiresAt]
      )

      const resetUrl = `${FRONTEND_URL}/reset-password?token=${token}`
      const html = buildPasswordResetEmail(resetUrl)
      await sendEmail({
        to: user.email,
        subject: 'Recuperação de senha — Azis',
        html,
      })
    }

    return res.status(200).json({
      message: 'Se você tiver uma conta registrada, enviaremos um link para redefinir sua senha.',
    })
  } catch (error) {
    console.error('forgotPassword error:', error)
    return res.status(200).json({
      message: 'Se você tiver uma conta registrada, enviaremos um link para redefinir sua senha.',
    })
  }
}

async function resetPassword(req, res) {
  try {
    const { token, newPassword, confirmPassword } = req.body

    if (!token || !newPassword || !confirmPassword) {
      return res.status(400).json({ error: 'Token e senhas são obrigatórios' })
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'As senhas não coincidem' })
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ error: 'A senha deve ter no mínimo 8 caracteres' })
    }

    const tokenResult = await pool.query(
      'SELECT id, user_id FROM password_reset_tokens WHERE token = $1 AND used = false AND expires_at > NOW()',
      [token]
    )
    const tokenRow = tokenResult.rows[0]

    if (!tokenRow) {
      return res.status(400).json({ error: 'Token inválido ou expirado' })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await pool.query('BEGIN')
    try {
      await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, tokenRow.user_id])
      await pool.query('UPDATE password_reset_tokens SET used = true WHERE id = $1', [tokenRow.id])
      await pool.query('COMMIT')
    } catch (transactionError) {
      await pool.query('ROLLBACK')
      throw transactionError
    }

    return res.status(200).json({ message: 'Senha redefinida com sucesso' })
  } catch (error) {
    console.error('resetPassword error:', error)
    return res.status(400).json({ error: 'Token inválido ou expirado' })
  }
}

async function changePassword(req, res) {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' })
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ error: 'A senha deve ter no mínimo 8 caracteres' })
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'As senhas não coincidem' })
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({ error: 'A nova senha deve ser diferente da senha atual' })
    }

    const userId = req.user?.id
    const userResult = await pool.query('SELECT password FROM users WHERE id = $1', [userId])
    const user = userResult.rows[0]

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' })
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password)
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Senha atual incorreta' })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    await pool.query(
      'UPDATE users SET password = $1, must_change_password = false WHERE id = $2',
      [hashedPassword, userId]
    )

    return res.status(200).json({ message: 'Senha alterada com sucesso' })
  } catch (error) {
    console.error('changePassword error:', error)
    return res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  changePassword,
}
