/**
 * Created by hugopozzoli on 06/09/15.
 */

Pomodoro.directive('pomodoro', ['$rootScope', '$TimeService',
    function($rootScope, $TimeService) {

        this.time = function(pomodoro, element) {
            var diff = $TimeService.dateDiffFromNow(pomodoro),
                minutes = "",
                seconds = "";

            if (!$TimeService.isDiffEnd(diff)) {
                minutes = $TimeService.keep2Digits(diff.min);
                seconds = $TimeService.keep2Digits(diff.sec);
            } else {
                minutes = $TimeService.keep2Digits(0);
                seconds = $TimeService.keep2Digits(0);
            }

            angular.element(element).text(minutes+":"+seconds);
        };

        return {
            link: function (scope, element, attrs) {

                var _this = this,
                    pomodoro = moment(attrs.pomodoro);

                attrs.$observe('pomodoro', function() {
                    pomodoro = moment(attrs.pomodoro);
                    _this.time(pomodoro, element);
                });

                $rootScope.$on('$time', function() {
                    _this.time(pomodoro, element);
                });

            }
        };

    }
]);