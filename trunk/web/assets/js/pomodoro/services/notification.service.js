/**
 * Created by hugopozzoli on 07/09/15.
 */

Pomodoro.service('$NotificationService', ['$rootScope', '$timeout',
    function($rootScope, $timeout) {

        this.permission = false;

        this.init = function() {
            var _this = this;

            $timeout(function() {
                if (Notification) {
                    _this.permission = Notification.permission;

                    if (_this.permission !== "granted")
                        Notification.requestPermission();
                }
            });
        };

        this.trigger = function(options) {
            if (this.permission == "granted") {
                var notification = new Notification(options.title, {
                    icon: options.icon,
                    body: options.text
                });

                notification.onclick = function () {
                    console.info('Notification clicked');
                };
            } else this.init();
        };

    }
]);