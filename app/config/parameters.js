/**
 * Created by Hugo on 26/05/14.
 */

var core = require('sonate-core');

core.parameters = {

    port: 5050,

    database: {
        engine: 'mysql',
        name: "pomodoro",
        username: "root",
        password: "root",
        port: 8889
    },

    mail: {
        user: "root",
        password: "root",
        from: "no-reply@pmdr.xyz"
    },

    secret: 'ThisTokenIsNotSecretChangeIt',

    users: [],
    sockets: []

};

exports.parameters = core.parameters;