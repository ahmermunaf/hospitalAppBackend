const app = require('express').Router()
const adminsRoute = require('./admins/admins.route')
const diagnosisRoute = require('./diagnosis/diagnosis.route')
const operationRoomsRoute = require('./operationRooms/operationRooms.route')
const operationsRoute = require('./operations/operations.route')
const operationTheatersRoute = require('./operationTheaters/operationTheaters.route')
const patientsRoute = require('./patients/patients.route')
const proceduresRoute = require('./procedures/procedures.route')

app.use(require('./../middlewares/auth'))

app.use('/diagnosis', diagnosisRoute)
app.use('/operationRooms', operationRoomsRoute)
app.use('/operations', operationsRoute)
app.use('/operationTheaters', operationTheatersRoute)
app.use('/patients', patientsRoute)
app.use('/procedures', proceduresRoute)
app.use('/admins', adminsRoute)

module.exports = app