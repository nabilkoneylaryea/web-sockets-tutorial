const express = require("express");
const socket = require("socket.io");

const app = express();

PORT = 3000;
const server = app.listen(PORT, () => {
    console.log(`Starting server on port ${PORT} ...`);
})

// Static files
app.use(express.static('public')) // express middleware that lets you serve files from a folder

// socket.io works by installing it on the front and backend -> want to use one both sides to establish socket connection; here's the setup

let io = socket(server); // takes server you want to work with as the paramter

io.on('connection', (socket) => { // listens for "connection" event and fires callback function; "socket" is socket instance; client's particular socket; won't work until setup on frontend
    console.log('Socket connection:', socket.id)

    // Listen for chat-message event emitted by client sockets and send the data to all the other sockets
    socket.on('chat-message', (data) => { 
        io.sockets.emit('chat-message', data)
    })
    // Listen for typing-message
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data)
    })
}) 