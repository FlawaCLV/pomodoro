/**
 * Created by hugopozzoli on 14/08/15.
 */

var Pomodoro = angular.module('Pomodoro', [
    'ui.router',
    'ngAnimate'
]);

Pomodoro.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider
            .state('home', {
                url: "/",
                views: {
                    "@": {
                        controller: "Home",
                        templateUrl: "/web/assets/js/pomodoro/templates/home.template.html"
                    }
                }
            });

        $urlRouterProvider.otherwise("/");

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

    }
]);

Pomodoro.run(['$rootScope', '$window', '$NotificationService', '$timeout', '$interval',
    function($rootScope, $window, $NotificationService, $timeout, $interval) {

        // Time
        $interval(function() {
            $rootScope.$emit('$time');
        }, 1000);

        // Notification
        $NotificationService.init();

        // Global events
        $timeout(function() {
            $rootScope.$on("$stateChangeError", console.log.bind(console));

            $rootScope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {
                e.preventDefault();
                $rootScope.$currentState = toState;
                $rootScope.$currentParams = toParams;
                $rootScope.$previousState = fromState;
                $rootScope.$previousParams = fromParams;
            });
        });

    }
]);

//  @codekit-append: 'directives/pomodoro.directive.js'
//  @codekit-append: 'services/time.service.js'
//  @codekit-append: 'services/sound.service.js'
//  @codekit-append: 'services/notification.service.js'
//  @codekit-append: 'controllers/home.controller.js'