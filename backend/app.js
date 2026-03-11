const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)

app.get('/api/hello', (req, res) => {
  res.json({ message: 'API funcionando 🚀' })
})

module.exports = app

// rota de healthcheck
app.get('/health', (req, res) => {
  res.sendStatus(200); // retorna status 200 OK
});

// iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});
