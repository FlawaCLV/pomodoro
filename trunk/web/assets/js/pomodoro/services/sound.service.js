/**
 * Created by hugopozzoli on 06/09/15.
 */

Pomodoro.service('$SoundService', ['$rootScope', '$timeout',
    function($rootScope, $timeout) {

        this.active = true;

        this.init = function() {
            $rootScope.sound = this.active;

            angular.element("#start").jPlayer({
                volume: 1,
                loop: false,
                ready: function(event) {
                    angular.element(this).jPlayer("setMedia", {
                        mp3: "/web/assets/audio/guitar.mp3"
                    });
                },
                swfPath: "/web/assets/js/libs/jplayer/jplayer.swf",
                supplied: "mp3"
            });
            angular.element("#stop").jPlayer({
                volume: 1,
                loop: false,
                ready: function(event) {
                    angular.element(this).jPlayer("setMedia", {
                        mp3: "/web/assets/audio/harp.mp3"
                    });
                },
                swfPath: "/web/assets/js/libs/jplayer/jplayer.swf",
                supplied: "mp3"
            });
        };

        this.start = function() {
            if (this.active)
                angular.element('#start').jPlayer('play');
        };

        this.stop = function() {
            if (this.active)
                angular.element('#stop').jPlayer('play');
        };

        this.toggleSound = function() {
            this.active = !this.active;
            $rootScope.sound = this.active;

            if (!this.active) {
                angular.element('#start').jPlayer('stop');
                angular.element('#stop').jPlayer('stop');
            }
        };

    }
]);