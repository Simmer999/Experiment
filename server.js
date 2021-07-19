const http = require('http')
const app = require('./app')

const server = http.createServer(app)

const port = process.env.port || 5555

server.listen(port)
console.log(`Listening on port ${port}`)