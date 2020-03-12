const app = require('express').Router()
const proceduresController = require('./procedures.controller')

app.get('/get', proceduresController.get)

app.post('/create', proceduresController.create)

app.post('/update', proceduresController.update)

module.exports = app