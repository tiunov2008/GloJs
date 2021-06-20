window.addEventListener('DOMContentLoaded', () => {
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

    countTimer('18 june 2021');

    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };
        window.addEventListener('click', e => {
            const target = e.target;
            console.log(1);
            if (!target.closest('menu') && !target.closest('.menu')) {
                menu.classList.remove('active-menu');
            }
        });
        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItems.forEach(elem => elem.addEventListener('click', handlerMenu));
    };

    toggleMenu();

    /*const animatePopUp = showed => {
        const popup = document.querySelector('.popup-content');
        if (showed) {
            let count = 0;
            const animate = () => {
                const animeId = setTimeout(animate, 1);
                if (count < 250) {
                    popup.style.top = count + 'px';
                    count += 3;
                } else {
                    clearTimeout(animeId);
                }
            };
            animate();
        } else {
            let count = 250;
            const animate = () => {
                const animeId = setTimeout(animate, 1);
                if (count >= 0) {
                    popup.style.top = count + 'px';
                    count -= 3;
                } else {
                    clearTimeout(animeId);
                    document.querySelector('.popup').style.display = 'none';
                }
            };
            animate();
        }
    };*/

    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popUpBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close');

        popUpBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
            });

            window.addEventListener('click', e => {
                const target = e.target;
                if (!target.closest('.popup-content') && !target.closest('.popup-btn')) {
                    popup.style.display = 'none';
                }
            });
        });
        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    };



    togglePopUp();
});
