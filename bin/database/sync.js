/**
 * Created by hugo on 18/07/14.
 */

var server = require('../../app/config/server').server;
server.run();

var sequelize = require('sonate-core').database.sequelize;

/*
 *  Retreive entities
 */

var bundles = require('../../app/config/bundles').bundles
    , entities = {};
for (key in bundles) {
    if (bundles.hasOwnProperty(key)) {
        entities[key] = bundles[key].bundle.entities;
    }
}

console.log('entities', entities);

/*
 *  Connect to database and synchronize
 */

sequelize
    .authenticate()
    .complete(function(err) {
        if (!!err) {
            console.log('Unable to connect to the database:', err)
        } else {
            console.log('Connection has been established successfully.')
        }
    });

sequelize.sync();