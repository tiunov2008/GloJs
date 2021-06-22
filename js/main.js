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

    //слайдер

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item');
        let dot = document.querySelectorAll('.dot');
        const slider = document.querySelector('.portfolio-content');


        let currentSlide = 0,
            interval;
        const createDots = () => {
            for (let i = 0; i < slide.length; i++) {
                const newDot = document.createElement('li');
                newDot.classList.add('dot');
                if (i === 0) {
                    newDot.classList.add('dot-active');
                }
                document.querySelector('.portfolio-dots').append(newDot);
            }
        };
        createDots();
        dot = document.querySelectorAll('.dot');
        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = time => {
            interval = setInterval(autoPlaySlide, time);
        };

        slider.addEventListener('click', event => {
            event.preventDefault();

            const target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });
        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('mouseover', event => {
            if (event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', event => {
            if (event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')) {
                startSlide(1500);
            }
        });
        startSlide(1500);
    };
    slider();
});
