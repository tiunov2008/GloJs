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



    const calc = (price = 100) => {
        let count = 0,
            lastTotal;
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');
        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;
            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1)  / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = Math.ceil(price * typeValue * squareValue * countValue * dayValue);
            }
            let increase;
            if (lastTotal < total) {
                increase = true;
            } else if (lastTotal > total) {
                increase = false;
            }
            if (increase) {
                const id = setInterval(() => {
                    if (count <= total) {
                        totalValue.textContent = count;
                        count += 25;
                    } else {
                        totalValue.textContent = total;
                        count = total;
                        clearInterval(id);
                    }
                }, 1);
            } else {
                const id2 = setInterval(() => {
                    if (count >= total) {
                        totalValue.textContent = count;
                        count -= 25;
                    } else {
                        totalValue.textContent = total;
                        count = total;
                        clearInterval(id2);
                    }
                }, 1);
            }
            lastTotal = total;
            if (calcType.options[calcType.selectedIndex].value === '' && calcSquare.value === '' &&
            calcDay.value === '' && calcCount.value === '') {
                total = 0,
                countValue = 1,
                dayValue = 1,
                count = 0,
                lastTotal = 0;
            }

        };
        calcBlock.addEventListener('change', event => {
            const target = event.target;
            if (target.matches('select') || target.matches('input')) {
                countSum();
            }
        });

    };
    calc(100);

    const questions = () => {
        function uCaseFirst(s) {
            return s.toLowerCase().replace(/(?<!\p{Lowercase})\p{Lowercase}/gu, ch => ch.toUpperCase());
        }
        const phone = document.getElementById('form2-phone'),
            name = document.getElementById('form2-name'),
            email = document.getElementById('form2-email'),
            message = document.getElementById('form2-message');
        phone.addEventListener('input', () => {
            phone.value = phone.value.replace(/[^0-9()-]/, '');
        });
        name.addEventListener('input', () => {
            name.value = name.value.replace(/[^а-яё -]/ig, '');
        });
        email.addEventListener('input', () => {
            email.value = email.value.replace(/[^a-z@_.!~*'-]/ig, '');
        });
        message.addEventListener('input', () => {
            message.value = message.value.replace(/[^а-яё -]/ig, '');
        });
        const blur = item => {
            item.value = item.value.trim().replace(/^\-/, '').replace(/ {1,}/g, " ").replace(/\-{1,}/g, "-");
        };
        phone.addEventListener('focusout', () => {
            blur(phone);
        });
        name.addEventListener('focusout', () => {
            blur(name);
            name.value = uCaseFirst(name.value);
        });
        email.addEventListener('focusout', () => {
            blur(email);
        });
        message.addEventListener('focusout', () => {
            blur(message);
        });
    };
    questions();

    const ourTeam = () => {
        const photos = document.querySelectorAll('.command__photo');
        photos.forEach(elem => {
            let oldSrc;
            elem.addEventListener('mouseenter', event => {
                oldSrc = event.target.src;
                event.target.src = event.target.dataset.img;
            });
            elem.addEventListener('mouseout', event => {
                event.target.src = oldSrc;
            });
        });
    };
    ourTeam();
});
