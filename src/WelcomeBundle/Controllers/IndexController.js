/**
 * Created by hugo on 22/05/2014.
 */


var Controller = require('sonate-core').Controller,
    View = new require('sonate-core').View(),
    IndexController = new Controller();

IndexController.app = function(req, res) {
    View.render(res, 'WelcomeBundle:index:app');
};

exports.IndexController = IndexController;