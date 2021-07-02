const countTimer = function(deadLine) {
    const timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');


    function getTimeRemaining() {
        const dateStop = new Date(deadLine).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60) % 24;
        return { timeRemaining, hours, minutes, seconds };
    }

    function add0(n) {
        if (n.toString()[1] === undefined) {
            return '0' + n;
        } else {
            return  n;
        }
    }

    function updateClock() {
        const timer = getTimeRemaining();
        if (timer.timeRemaining < 0) {
            timerHours.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
        } else {
            timerHours.textContent = add0(timer.hours);
            timerMinutes.textContent = add0(timer.minutes);
            timerSeconds.textContent = add0(timer.seconds);
        }
    }
    updateClock();
    setInterval(updateClock, 1000);
};
export default countTimer;
