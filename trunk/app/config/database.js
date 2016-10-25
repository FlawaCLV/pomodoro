/**
 * Created by hugo on 22/05/2014.
 */
    
var database = require('sonate-core').database,
    Parameters = require('./parameters').parameters;

database.connect = function() {
    database.init(Parameters);
};

exports.database = database;