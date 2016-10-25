/**
 * Created by hugo on 15/07/14.
 */

var path = require('sonate-core').path;

exports.events = {

    index: function(io, socket) {
        require(path.__EVENTS__+'IndexEvents').IndexEvents(io, socket);
    }

};