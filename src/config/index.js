const app = require('express').Router()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose')
const { NODE_ENV } = process.env

require('dotenv').config()

app.use(bodyParser.json({ limit: '50mb', }))
app.use(bodyParser.urlencoded({
    extended: true,
    parameterLimit: 100000,
    limit: '50mb',
}))

app.use(fileUpload());

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: true, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
    useUnifiedTopology: true
};

mongoose.connect(process.env.MONGO_URI, options).then(() => console.log(`DB is connected`))
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => console.log('DB err', error))

app.use('/api', require('./../modules/routes'))

if (NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

module.exports = app