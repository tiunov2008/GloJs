window.addEventListener('DOMContentLoaded', () => {

    function update() {
        const date = new Date();
        const nextDate = new Date("December 31, 2021");

        const days = ['Воскресенье', 'Понедельник', 'Вторник',
            'Среда', 'Четверг', 'Пятница', 'Суббота'];

        const hours = date.getHours();

        function getDayTime() {
            switch (true) {
            case (hours >= 5) && (hours < 11):return 'утро';
            case (hours >= 11) && (hours < 16):return 'день';
            case (hours >= 16) && (hours <= 23):return 'вечер';
            case (hours >= 0) && (hours < 5):return 'ночи';
            }
        }
        const dayTime = getDayTime();
        const dayWeek = days[date.getDay()];
        const timePM = date.toLocaleTimeString('en');
        const daysToNewYear = Math.round((nextDate.getTime() - date.getTime()) / (24 * 60 * 60 * 1000)) + 1;
        document.body.innerHTML = `Добрый ${dayTime} <br>
        Сегодня: ${dayWeek} <br>
        Текущее время:${timePM} <br>
        До нового года осталось ${daysToNewYear} дней`;
    }
    setInterval(update, 1000);
});
