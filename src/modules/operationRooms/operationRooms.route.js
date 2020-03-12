const app = require('express').Router()
const operationRoomsController = require('./operationRooms.controller')

app.get('/get', operationRoomsController.get)

app.post('/create', operationRoomsController.create)

app.post('/update', operationRoomsController.update)

module.exports = app