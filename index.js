const app = require('express')()
const http = require('http')
const server = http.createServer(app)
const port = process.env.PORT || 8080
const path = require('path')
const express = require('express')
const cors = require('cors')

app.use(cors())
app.use(require('./src/config'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(express.static('client/build'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

server.listen(port, () => {
    console.log(`Server is up and running at port ${port}`)
})
