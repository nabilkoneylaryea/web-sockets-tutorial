const express = require("express");
const socket = require("socket.io");
const ngrok = require('ngrok');

const app = express();

const PORT = 3001;

const server = app.listen(PORT, () => {
    console.log(`Starting server on port ${PORT} ...`);
    // ngrok.connect({addr: PORT, authtoken: '26Xb9mUt8AHaTq2EvyaEWbTlYCE_63tC2UUkYmxVpckYaEoNw'})
    // .then((HOST) => {
    //     console.log(`Access web application at this url: ${HOST}`);
    // })
    // .catch((error) => {
    //     console.log(`Error: ${error}}`);
    // });
    
});

// Static files
app.use(express.static('public')) // express middleware that lets you serve files from a folder

// socket.io works by installing it on the front and backend -> want to use one both sides to establish socket connection; here's the setup

io = socket(server); // takes server you want to work with as the paramter

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