'use strict';
window.addEventListener('DOMContentLoaded', () => {
    //таймер
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

    //плавная прокрутка
    const smoothScroolTo = (e, elem) => {
        e.preventDefault();

        const href = elem.getAttribute('href').substring(1);
        const scrollTarget = document.getElementById(href);

        const elementPosition = scrollTarget.getBoundingClientRect().top;

        window.scrollBy({
            top: elementPosition,
            behavior: 'smooth'
        });
    };

    //меню
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            menuItems = menu.querySelectorAll('ul>li>a');

        document.body.addEventListener('click', e => {
            const target = e.target;

            if (target.classList.contains('close-btn')) {
                menu.classList.remove('active-menu');
            } else {
                const targetMenu = target.closest('.menu');
                if (targetMenu === btnMenu) {
                    menu.classList.add('active-menu');
                } else if (target !== menu) {
                    menu.classList.remove('active-menu');
                }
            }

            menuItems.forEach(elem => {
                if (target === elem) {
                    smoothScroolTo(e, elem);
                    menu.classList.remove('active-menu');
                }
            });
        });
    };
    toggleMenu();

    //прокрутка вниз для scroll
    document.querySelector('a').addEventListener('click', function(e) {
        smoothScroolTo(e, this);
    });

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

    //попап окно
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popUpBtn = document.querySelectorAll('.popup-btn');

        popUpBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
            });
        });
        popup.addEventListener('click', e => {
            let target = e.target;

            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popup.style.display = 'none';
                }
            }
        });
    };
    togglePopUp();


    //табы

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');


        const toggleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', event => {
            let target = event.target;
            target = target.closest('.service-header-tab');
            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
                return;
            }
            target = target.parentNode;
        });
    };
    tabs();
});
