const app = require('express')()
const http = require('http').createServer(app)
const https = require('https')
const fs = require('fs')
const WebSocketServer = require('websocket').server;
const { addDriver, removeDriver, getDriver, drivers } = require('./utils/drivers')

const msg = []
const requests = []


// wsServer = new WebSocketServer({
//     httpServer: http,
//     // You should not use autoAcceptConnections for production
//     // applications, as it defeats all standard cross-origin protection
//     // facilities built into the protocol and the browser.  You should
//     // *always* verify the connection's origin and decide whether or not
//     // to accept it.
//                 // autoAcceptConnections: false
// })

// wsServer.on('request', function(request) {
//     const connection = request.accept(null, request.origin)
//     console.log("New WebSocket Connection")
//     connection.on('message', function(message) {
//         if(message.type === 'utf8'){
//             console.log("Recived message:       " + message.utf8Data)
//             // msg.push(`${message.utf8Data}`)
//             // console.log(msg)
//             // connection.send(message.utf8Data)
//             // const data = {
//             //     "name": message.utf8Data,
//             //     "price": 345
//             // }
//             connection.send(message.utf8Data)
//             wsServer.broadcast(message.utf8Data)
//         }
//     })
//     connection.on('close',  function(reasonCode, description){
//         // console.log((new Date())  + 'peer' + connection.remoteAddress + ' disconnected')
//     })
// })

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
        requests.push(data)
        userSocket.broadcast.emit("receive_message", data)
        console.log(data);
        socketio.emit("receive_request", data)
    })

    userSocket.on("send_location", (data)=>{
        console.log("send location socket called")
        // add drivers to list of drivers
        const {error, driver} = addDriver({id: userSocket.id, lat: data.lat, long: data.long, heading: data.heading, accuracy: data.accuracy})
            // if(error){
            //     console.log('error', error)
            // }
            // console.log(`added driver ${driver}`)
        console.log(`online drivers}`)
        console.log(drivers)
        data.id = userSocket.id;
        userSocket.broadcast.emit("receive_location", data)
        //testing instead of data we will send drivers array to customer app 
        // if(drivers)
        //     userSocket.broadcast.emit("receive_location", drivers)
    })

    userSocket.on("send_driver_marker", (data)=>{
        console.log("send_driver_marker socket called")
        userSocket.broadcast.emit("receive_driver_marker", data)
    })

    userSocket.on("disconnect", ()=>{
        const driver = removeDriver(userSocket.id)
        if(driver){
            console.log('driver disconnect id:', driver.id)
        }
        userSocket.broadcast.emit("driver_disconnect", userSocket.id)
    })
})
const port = process.env.PORT || 5000;
// const port =  5000;


http.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})