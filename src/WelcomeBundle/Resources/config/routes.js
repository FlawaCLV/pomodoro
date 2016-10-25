/**
 * Created by hugo on 22/05/2014.
 */

var path = require('sonate-core').path;

exports.routes = {

    '/' : {
        controller: require(path.__CONTROLLERS__+'IndexController').IndexController,
        action: function(req, res) {
            this.controller.app(req, res);
        },
        method: ['GET']
    }

};