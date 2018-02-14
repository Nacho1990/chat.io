const path = require('path'); //modulo path para resolver la ruta de ubicacion de archivos estaticos sin importar el SO
const express = require('express');
const app = express();

//seting
app.set('port', process.env.PORT || 3000);

//stattic file 
app.use(express.static(path.join(__dirname, 'public')));


//start server
const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));    
});

//web Socket

const SocketIO = require('socket.io');
const io = SocketIO(server);

io.on('connection', (socket) => {
    console.log('new connection', socket.id);

    //recibe el evento creado en chat.js
    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data);
    });

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
    })
})


