const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const importRoutes = require('./routes/importRoutes')
const taskRoutes = require('./routes/taskRoutes')
const rewardRoutes = require('./routes/rewardRoutes')
const badgeRoutes = require('./routes/badgeRoutes')
const feedRoutes = require('./routes/feedRoutes')

const app = express()

// Configurar CORS para aceitar credenciais
app.use(cors({
  origin: process.env.CORS_ORIGIN || ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:8080'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/users/import', importRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/rewards', rewardRoutes)
app.use('/api/badges', badgeRoutes)
app.use('/api/feed', feedRoutes)

app.get('/api/hello', (req, res) => {
  res.json({ message: 'API funcionando 🚀' })
})

// rota de healthcheck
app.get('/health', (req, res) => {
  res.sendStatus(200); // retorna status 200 OK
});

module.exports = app
