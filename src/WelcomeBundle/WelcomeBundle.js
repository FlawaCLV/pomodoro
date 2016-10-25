/**
 * Created by hugo on 22/05/2014.
 */

var Bundle = require('sonate-core').Bundle,
    WelcomeBundle = new Bundle();

WelcomeBundle._entities = require(WelcomeBundle.__CONFIG__.__ENTITIES__).entities;
WelcomeBundle._routes = require(WelcomeBundle.__CONFIG__.__ROUTES__).routes;
WelcomeBundle._services = require(WelcomeBundle.__CONFIG__.__SERVICES__).services;
WelcomeBundle._events = require(WelcomeBundle.__CONFIG__.__EVENTS__).events;

exports.WelcomeBundle = WelcomeBundle;