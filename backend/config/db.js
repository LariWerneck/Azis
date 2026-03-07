const { Pool } = require('pg')
const bcrypt = require('bcryptjs')

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'projeto',
})

async function initDB() {
  const createTableSql = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      institution VARCHAR(255),
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `

  await pool.query(createTableSql)

  // Seed an example user so you can login with a known credential.
  const exampleEmail = 'ana@moodtask.com'
  const examplePassword = '123456'
  const exampleName = 'Ana Silva'
  const exampleInstitution = 'MoodTask'

  const existing = await pool.query('SELECT id FROM users WHERE email = $1', [exampleEmail])
  if (existing.rows.length === 0) {
    const hashed = await bcrypt.hash(examplePassword, 10)
    await pool.query(
      'INSERT INTO users (name, email, institution, password) VALUES ($1, $2, $3, $4)',
      [exampleName, exampleEmail, exampleInstitution, hashed]
    )
  }
}

module.exports = { pool, initDB }
