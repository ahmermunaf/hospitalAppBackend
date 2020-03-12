const app = require('express').Router()
const diagnosisController = require('./diagnosis.controller')


app.get('/get', diagnosisController.get)

app.post('/create', diagnosisController.create)

app.post('/update', diagnosisController.update)

module.exports = app