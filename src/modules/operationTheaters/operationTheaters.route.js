const app = require('express').Router()
const operationTheatersController = require('./operationTheaters.controller')

app.get('/get', operationTheatersController.get)

app.post('/create', operationTheatersController.create)

app.post('/update', operationTheatersController.update)

module.exports = app