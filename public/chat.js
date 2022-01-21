// This is a custom script we use on the client side when we want to make the connection to the server

// Make connection
const socket = io.connect('http://localhost:3000');

// Quey DOM
const message = document.getElementById('message');
const username = document.getElementById('username');
const btn = document.getElementById('send');

const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

// Emitting event when a user clicks send
btn.addEventListener('click', () => {
    socket.emit('chat-message', {
        message: message.value,
        username: username.value
    });
});
message.addEventListener('keypress', () => {
    socket.emit('typing', username.value);
});

// Listen for events from server on frontend
socket.on('chat-message', (data) => {
    output.innerHTML += '<p><strong>' + data.username + ': </strong>' + data.message + '</p>'
});
socket.on('typing', (data) => {
    feedback.innerHTML = '<p><em>' + data + ' is typing ...</em></p>'
})