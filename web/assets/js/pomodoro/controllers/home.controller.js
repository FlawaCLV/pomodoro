/**
 * Created by hugopozzoli on 02/09/15.
 */

Pomodoro.controller('Home', ['$rootScope', '$scope', '$TimeService', '$SoundService', '$NotificationService', '$interval', '$timeout',
    function($rootScope , $scope, $TimeService, $SoundService, $NotificationService, $interval, $timeout) {

        var $activeBorder = angular.element('#activeBorder');

        $rootScope._user = false;
        $rootScope._users = [];

        $scope.login = {
            username: ""
        };
        $scope.timeout = {
            minutes: 0,
            seconds: 0
        };
        $scope.isCounting = false;
        $scope.dateStart = moment();
        $scope.pomodoro = moment().add(25, 'm');

        $timeout(function() {
            $SoundService.init();
        });

        $scope.doLogin = function() {
            if ($scope.login.username != "") {
                $scope.setPomodoro(25);
                socket.emit('initialize', $scope.login.username, $scope.pomodoro);
            }
        };

        socket.on('initialized', function(user, users) {
            $rootScope._user = user;
            $rootScope._users = users;

            $timeout(function() {
                $activeBorder = angular.element('#activeBorder');
            }, 1000);
        });

        socket.on('online', function(user) {
            $rootScope._users.push(user);
            $.snackbar({content:user.username+" is online !", timeout:5000});
        });

        socket.on('offline', function(user) {
            $rootScope._users.splice($rootScope._users.indexOf(user), 1);
        });

        $scope.setPomodoro = function(min) {
            $scope.dateStart = moment();
            $scope.pomodoro = moment().add(min, 'm');
            socket.emit('setPomodoro', $scope.pomodoro);
            $scope.isCounting = true;
            $activeBorder.removeClass('finished');
            $scope.time();
            $SoundService.start();
            $NotificationService.trigger({
                title: 'Start!',
                icon: 'https://placeholdit.imgix.net/~text?&bg=FF4444&txt=&w=300&h=300',
                text: "Let's get back to work! Go go go!!!"
            });
        };

        socket.on('setPomodoro', function(user) {
            $rootScope._users[user.id] = user;
        });

        $scope.toggleSound = function() {
            $SoundService.toggleSound();
        };

        $scope.time = function() {
            if ($scope.isCounting) {
                var diff = $TimeService.dateDiffFromNow($scope.pomodoro),
                    deg = 360 - Math.round((diff.timestamp * 360 / ($scope.pomodoro - $scope.dateStart)));

                if (!$TimeService.isDiffEnd(diff)) {
                    $scope.timeout.minutes = $TimeService.keep2Digits(diff.min);
                    $scope.timeout.seconds = $TimeService.keep2Digits(diff.sec);

                    if (deg <= 180) $activeBorder.css('background-image','linear-gradient(' + (90+deg) + 'deg, transparent 50%, #FF9292 50%),linear-gradient(90deg, #FF9292 50%, transparent 50%)');
                    else $activeBorder.css('background-image','linear-gradient(' + (deg-90) + 'deg, transparent 50%, #B4EE3F 50%),linear-gradient(90deg, #FF9292 50%, transparent 50%)');
                } else {
                    $scope.isCounting = false;
                    $scope.timeout.seconds = $TimeService.keep2Digits(0);
                    $activeBorder.css('background-image','linear-gradient(' + (360-90) + 'deg, transparent 50%, #B4EE3F 50%),linear-gradient(90deg, #FF9292 50%, transparent 50%)');
                    $activeBorder.addClass('finished');
                    $SoundService.stop();
                    $NotificationService.trigger({
                        title: 'Stop!',
                        icon: 'https://placeholdit.imgix.net/~text?&bg=B4EE3F&txt=&w=300&h=300',
                        text: "Time to rest, drink water & breath! :)"
                    });
                }
            }
        };

        angular.element(document).on('keydown', function(e) {
            var evt = (window.event) ? event : e,
                KeyID = evt.keyCode;

            switch(KeyID)
            {
                case 80: // alt + p
                    if (evt.altKey)
                        $scope.setPomodoro(25);
                    break;
                case 83: // alt + s
                    if (evt.altKey)
                        $scope.setPomodoro(5);
                    break;
                case 76: // alt + l
                    if (evt.altKey)
                        $scope.setPomodoro(20);
                    break;
                case 32: // Space bar
                    break;
                case 13: // Enter
                    if (!$rootScope._user) $scope.doLogin();
                    break;
            }
        });

        $rootScope.$on('$time', function() {
            $scope.time();
        });

    }
]);