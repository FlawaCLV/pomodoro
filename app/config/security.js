/**
 * Created by hugo on 18/07/14.
 */

var security = require('sonate-core').security;

security.firewalls = {
    '/user/register': 'ANONYMOUS',
    '/user/login': 'ANONYMOUS',
    '/user/logout': 'ANONYMOUS',
    '/user': 'ROLE_USER',
    '/admin': 'ROLE_ADMIN'
};

security.redirect = '/';

exports.security = security;