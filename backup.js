const app = require('express')()
const http = require('http').createServer(app)
const https = require('https')
const fs = require('fs')

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}


app.get('/', (req, res) => {
    res.send("Node Server is running. Yay!!")
})

//Socket Logic
const socketio = require('socket.io')(http)

socketio.on("connection", (userSocket) => {
    console.log("new connection")
    userSocket.on("send_message", (data) => {
        userSocket.broadcast.emit("receive_message", data)
        console.log(data);
        socketio.emit("receive_request", data)
        console.log(data);
    })
})
const port = process.env.PORT || 5000;


http.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})




// const WebSocketServer = require('websocket').server
// const http = require('http')

// const server = http.createServer( (req, res) => {
// })

// server.listen(1337, ()=>{
//     console.log("server listening on port 1337")
// })


// //create the Server
// wsServer = new WebSocketServer({
//     httpServer: server
// })

// //WebSocket server 
// wsServer.on('request', (request) => {
//     const connection = request.accept(null, request.origin)
//     console.log(request)

//     // This is the most important callback for us, we'll handle
//   // all messages from users here.
//   connection.on('message', function(message) {
//     if (message.type === 'utf8') {
//       // process WebSocket message
//       console.log(message.utf8Data)
//     }
//   });

//   connection.on('close', function(connection) {
//     // close user connection
//     console.log("Connection closed")
//   });
// })


