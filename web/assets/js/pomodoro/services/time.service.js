/**
 * Created by hugopozzoli on 05/09/15.
 */

Pomodoro.service('$TimeService', [
    function() {

        this.dateDiffFromNow = function(date) {
            var diff = {},
                tmp = date - moment();

            if (tmp >= 0) {
                diff.timestamp = tmp;

                tmp = Math.floor(tmp/1000);
                diff.sec = tmp % 60;

                tmp = Math.floor((tmp-diff.sec)/60);
                diff.min = tmp % 60;

                tmp = Math.floor((tmp-diff.min)/60);
                diff.hour = tmp % 24;

                tmp = Math.floor((tmp-diff.hour)/24);
                diff.day = Math.round(tmp % 30.4375);

                tmp = Math.floor((tmp-diff.day)/30.4375);
                diff.month = tmp % 12;

                tmp = Math.floor((tmp-diff.month)/12);
                diff.year = tmp;
            } else diff = {
                    sec: 0,
                    min: 0,
                    hour: 0,
                    day: 0,
                    month: 0,
                    year: 0,
                    timestamp: 0
                };

            return diff;
        };

        this.isDiffEnd = function(diff) {
            return (diff.sec == 0 && diff.min == 0 && diff.hour == 0 && diff.day == 0 && diff.month == 0);
        };

        this.keep2Digits = function(number) {
            return number < 10 ? "0" + number : number;
        };

    }
]);