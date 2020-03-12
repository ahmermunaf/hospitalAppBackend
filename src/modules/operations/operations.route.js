const app = require('express').Router()
const operationsController = require('./operations.controller')

app.get('/get', operationsController.get)

app.post('/create', operationsController.create)

app.post('/update', operationsController.update)

module.exports = app