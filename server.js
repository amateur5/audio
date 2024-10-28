const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Služi HTML fajl iz "public" foldera
const streamKey = 'galaksija12345';


io.on('connection', (socket) => {
    console.log('Novi korisnik povezan');
    const NodeMediaServer = require('node-media-server');

const nms = new NodeMediaServer({
    rtmp: {
        port: 1935,
        chunk_size: 60000,
        gop: 60,
        ping: 30,
        pingTimeout: 60
    },
    http: {
        port: 8000,
        allow_origin: '*'
    }
});

nms.run();


    // Prima audio podatke od DJ-a
    socket.on('audioData', (data) => {
        socket.broadcast.emit('audioData', data); // Prosledi svima osim pošiljaocu
    });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server pokrenut na portu ${PORT}`));
