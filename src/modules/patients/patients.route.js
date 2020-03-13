const app = require('express').Router()
const patientsController = require('./patients.controller')

app.get('/get', patientsController.get)

app.post('/create', patientsController.create)

app.post('/update', patientsController.update)

app.get('/lastId', patientsController.lastId)

module.exports = app