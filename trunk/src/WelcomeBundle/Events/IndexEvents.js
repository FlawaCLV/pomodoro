/**
 * Created by hugo on 15/07/14.
 */
var parameters = require('sonate-core').parameters,
    fs = require('fs'),
    ss = require('socket.io-stream');

exports.IndexEvents = function(io, socket) {

    var _user = {};

    socket.on('initialize', function(username, pomodoro) {
        _user = {
            id: parameters.users.length,
            username: username,
            pomodoro: pomodoro
        };
        parameters.sockets[_user.id] = socket;
        parameters.users[_user.id] = _user;

        socket.emit('initialized', _user, parameters.users);
        socket.broadcast.emit('online', _user);
    });

    socket.on('setPomodoro', function(pomodoro) {
        _user.pomodoro = pomodoro;
        socket.broadcast.emit('setPomodoro', _user);
    });

    socket.on('disconnect', function() {
        parameters.users.splice(parameters.users.indexOf(_user.id), 1);
        parameters.sockets.splice(parameters.sockets.indexOf(_user.id), 1);

        socket.broadcast.emit('offline', _user);
    });

};