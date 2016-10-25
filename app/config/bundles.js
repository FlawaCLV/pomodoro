/**
 * Created by hugo on 22/05/2014.
 */

exports.bundles = {

    Welcome : {
        name : 'WelcomeBundle',
        path : '/',
        bundle: require('../../src/WelcomeBundle/WelcomeBundle').WelcomeBundle
    }

};