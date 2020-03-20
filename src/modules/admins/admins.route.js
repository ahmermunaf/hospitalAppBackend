const app = require('express').Router()
const adminsController = require('./admins.controller')

app.get('/get', adminsController.get)

app.post('/create', adminsController.create)

app.post('/update', adminsController.update)

app.post('/remove', adminsController.remove)

app.get('/checkAuth', adminsController.checkAuth)

app.post('/login', adminsController.login)

module.exports = app