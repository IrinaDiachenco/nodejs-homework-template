const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const contactsRouter = require('./routes/contacts')
const usersRouter = require('./routes/users')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(helmet())
app.use(logger(formatsLogger))
app.use(express.static('public'))
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
)
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  // res.status(500).json({ message: err.message })
  const status = err.status || 500
  res
    .status(status)
    .json({
      status: status === 500 ? 'fail' : 'error',
      code: status,
      message: err.message,
    })
})

module.exports = app