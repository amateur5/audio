const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let isDJ = false; // Da li je korisnik DJ

io.on('connection', (socket) => {
    console.log('Novi korisnik povezan');

    socket.on('login', (password) => {
        if (password === 'tvoja_lozinka') {
            isDJ = true; // Ako je lozinka tačna, DJ je prijavljen
            socket.emit('loginSuccess');
        } else {
            socket.emit('loginFailed');
        }
    });

    socket.on('playSong', (songUrl) => {
        if (isDJ) {
            io.emit('playSong', songUrl); // Šalje pesmu svim slušateljima
        }
    });

    socket.on('disconnect', () => {
        console.log('Korisnik se odjavio');
    });
});

server.listen(3000, () => {
    console.log('Server radi na http://localhost:3000');
});
