var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var p = require('path').resolve;
server.listen(80);

app.use(express.static('.'))

app.get('/', function (req, res) {
    res.sendfile(p(__dirname, '..', 'index.html'));
});

io.on('connection', function (socket) {
    socket.on('new_client', function (player) {
        socket.broadcast.emit('player_joined', player);
        console.log(player, 'connected');
    });

    socket.on('other_player_update_value', function(player_info) {
        socket.broadcast.emit('other_player_update_value_from_server', player_info);
    });
});