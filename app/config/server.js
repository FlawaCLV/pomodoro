/**
 * Created by hugo on 22/05/2014.
 */

var server = require('sonate-core').server;

server.run = function() {
    server.config(function(app, io){

        var database = require('./database').database,
            security = require('./security').security,
            Parameters = require('./parameters').parameters;

        database.connect();

        var bundles = require('./bundles').bundles;

        app.use(function(req, res) {
            var WelcomeBundle = require('./bundles').bundles.Welcome.bundle;
            WelcomeBundle.exec(req, res, '/');

            //security.check(req, res, function() {
            //    server.bundle(req.url, bundles, function(bundle) {
            //        bundle.bundle.exec(req, res, bundle.action);
            //    });
            //});
        });

        app.all('/*', function(req, res, next) {
            var WelcomeBundle = require('./bundles').bundles.Welcome.bundle;
            WelcomeBundle.exec(req, res, '/');
        });

        io = io.listen(app.listen(Parameters.port));
        io.sockets.on('connection', function(socket) {
            for (var key in bundles) {
                if (bundles.hasOwnProperty(key)) {
                    bundles[key].bundle.events(io, socket);
                }
            }
        });

    });
};

exports.server = server;
