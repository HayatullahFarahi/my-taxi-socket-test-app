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
        userSocket.broadcast.emit("receive_message", data.message)
        console.log(data);
    })
})
const port = process.env.PORT || 5000;


http.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})