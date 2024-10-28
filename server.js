const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Služi HTML fajl iz "public" foldera

io.on('connection', (socket) => {
    console.log('Novi korisnik povezan');

    // Prima audio podatke od DJ-a
    socket.on('audioData', (data) => {
        socket.broadcast.emit('audioData', data); // Prosledi svima osim pošiljaocu
    });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server pokrenut na portu ${PORT}`));
