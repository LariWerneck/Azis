const nodemailer = require('nodemailer')

const smtpHost = process.env.SMTP_HOST || 'localhost'
const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587
const smtpUser = process.env.SMTP_USER || ''
const smtpPass = process.env.SMTP_PASS || ''

const transporterOptions = {
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort === 465,
}

if (smtpUser) {
  transporterOptions.auth = {
    user: smtpUser,
    pass: smtpPass,
  }
}

const transporter = nodemailer.createTransport(transporterOptions)

async function sendEmail({ to, subject, html }) {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || smtpUser || 'Azis <no-reply@azis.dev>',
      to,
      subject,
      html,
    })

    console.log(`[emailService] E-mail enviado: ${info.messageId}`)
    return info
  } catch (error) {
    console.error('[emailService] Erro ao enviar e-mail:', error)
    return null
  }
}

function buildPasswordResetEmail(resetLink) {
  return `
    <div style="background:#0f172a;color:#e2e8f0;padding:24px;font-family:Arial,sans-serif;min-height:100%;">
      <div style="max-width:600px;margin:0 auto;background:#111827;border:1px solid #1f2937;border-radius:20px;overflow:hidden;">
        <div style="padding:32px 32px 16px;text-align:center;background:#111827;">
          <h1 style="margin:0;font-size:28px;color:#ffffff;">Azis</h1>
          <p style="margin:12px 0 0;color:#94a3b8;">Redefinição de senha</p>
        </div>
        <div style="padding:24px 32px;background:#0f172a;">
          <p style="color:#cbd5e1;line-height:1.7;">Recebemos uma solicitação para redefinir a senha da sua conta Azis. Clique no botão abaixo para criar uma nova senha.</p>
          <div style="text-align:center;margin:32px 0;">
            <a href="${resetLink}" style="display:inline-block;padding:14px 24px;border-radius:9999px;background:#38bdf8;color:#0f172a;text-decoration:none;font-weight:600;">Redefinir senha</a>
          </div>
          <p style="color:#94a3b8;line-height:1.7;">O link expira em 1 hora. Se você não solicitou esta alteração, pode ignorar este e-mail sem problemas.</p>
        </div>
        <div style="padding:16px 32px 32px;background:#111827;border-top:1px solid #1f2937;">
          <p style="margin:0;color:#64748b;font-size:14px;">Se o botão não funcionar, copie e cole o link abaixo no seu navegador:</p>
          <p style="word-break:break-all;color:#94a3b8;font-size:14px;">${resetLink}</p>
        </div>
      </div>
    </div>
  `
}

module.exports = {
  sendEmail,
  buildPasswordResetEmail,
}
