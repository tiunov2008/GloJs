'use strict';
window.addEventListener('DOMContentLoaded', () => {
    //таймер
    const date = new Date();
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
    countTimer(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`);

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

    const blurForms = () => {
        function uCaseFirst(s) {
            return s.toLowerCase().replace(/(?<!\p{Lowercase})\p{Lowercase}/gu, ch => ch.toUpperCase());
        }
        const phone2 = document.getElementById('form1-phone'),
            name2 = document.getElementById('form1-name'),
            email2 = document.getElementById('form1-email'),
            phone = document.getElementById('form2-phone'),
            name = document.getElementById('form2-name'),
            email = document.getElementById('form2-email'),
            message = document.getElementById('form2-message'),
            phone3 = document.getElementById('form3-phone'),
            name3 = document.getElementById('form3-name'),
            email3 = document.getElementById('form3-email');
        phone.addEventListener('input', () => {
            phone.value = phone.value.replace(/[^0-9()+-]/, '');
        });
        name.addEventListener('input', () => {
            name.value = name.value.replace(/[^а-яё -]/ig, '');
        });
        email.addEventListener('input', () => {
            email.value = email.value.replace(/[^a-z@_.!~*'-]/ig, '');
        });
        phone2.addEventListener('input', () => {
            phone2.value = phone2.value.replace(/[^0-9()+-]/, '');
        });
        name2.addEventListener('input', () => {
            name2.value = name2.value.replace(/[^а-яё -]/ig, '');
        });
        email2.addEventListener('input', () => {
            email2.value = email2.value.replace(/[^a-z@_.!~*'-]/ig, '');
        });
        phone3.addEventListener('input', () => {
            phone3.value = phone3.value.replace(/[^0-9()+-]/, '');
        });
        name3.addEventListener('input', () => {
            name3.value = name3.value.replace(/[^а-яё -]/ig, '');
        });
        email3.addEventListener('input', () => {
            email3.value = email3.value.replace(/[^a-z@_.!~*'-]/ig, '');
        });
        message.addEventListener('input', () => {
            message.value = message.value.replace(/[^а-яё -]/ig, '');
        });
        const blur = item => {
            item.value = item.value.trim().replace(/^\-/, '').replace(/ {1,}/g, " ").replace(/\-{1,}/g, "-").replace(/\+{1,}/g, "+");
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
        phone2.addEventListener('focusout', () => {
            blur(phone2);
        });
        name2.addEventListener('focusout', () => {
            blur(name2);
            name2.value = uCaseFirst(name2.value);
        });
        email2.addEventListener('focusout', () => {
            blur(email2);
        });
        phone3.addEventListener('focusout', () => {
            blur(phone3);
        });
        name3.addEventListener('focusout', () => {
            blur(name3);
            name3.value = uCaseFirst(name3.value);
        });
        email3.addEventListener('focusout', () => {
            blur(email3);
        });
        message.addEventListener('focusout', () => {
            blur(message);
        });
    };
    blurForms();

    const questions = () => {
        function uCaseFirst(s) {
            return s.toLowerCase().replace(/(?<!\p{Lowercase})\p{Lowercase}/gu, ch => ch.toUpperCase());
        }
        const phone = document.getElementById('form2-phone'),
            name = document.getElementById('form2-name'),
            email = document.getElementById('form2-email'),
            message = document.getElementById('form2-message');
        phone.addEventListener('input', () => {
            phone.value = phone.value.replace(/[^0-9()+-]/, '');
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
            item.value = item.value.trim().replace(/^\-/, '').replace(/ {1,}/g, " ").replace(/\-{1,}/g, "-").replace(/\+{1,}/g, "+");
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

    //send-ajax-form


    const sendForm = () => {
        const errorMessage = 'Что то пошло не так...',
            loadMessage = 'Загрузка...',
            successMessage = 'Спасибо! Мы скоро с вами свяжимся!';
        const loadMessageElement = document.createElement('div');
        loadMessageElement.id = 'floatingCirclesG';
        loadMessageElement.innerHTML = `
        <div id="">
            <div class="f_circleG" id="frotateG_01"></div>
            <div class="f_circleG" id="frotateG_02"></div>
            <div class="f_circleG" id="frotateG_03"></div>
            <div class="f_circleG" id="frotateG_04"></div>
            <div class="f_circleG" id="frotateG_05"></div>
            <div class="f_circleG" id="frotateG_06"></div>
            <div class="f_circleG" id="frotateG_07"></div>
            <div class="f_circleG" id="frotateG_08"></div>
        `;

        const form1 =  document.getElementById('form1');
        const form2 =  document.getElementById('form2');
        const form3 =  document.getElementById('form3');
        const forms = [form1, form2, form3];

        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem; color: #FFF !important;';
        forms.forEach(elem => {
            elem.addEventListener('submit', event => {
                event.preventDefault();
                elem.appendChild(statusMessage);
                statusMessage.textContent = loadMessage;
                elem.appendChild(loadMessageElement);
                const formData = new FormData(elem);
                const body = {};
                for (const val of formData.entries()) {
                    body[val[0]] = val[1];
                }
                if (elem !== form3) {
                    postData(body,
                        () => {
                            loadMessageElement.remove();
                            statusMessage.textContent = successMessage;
                            setTimeout(() => {
                                statusMessage.remove();
                            }, 3000);
                        },
                        error => {
                            statusMessage.textContent = errorMessage;
                            console.error(error);
                            setTimeout(() => {
                                statusMessage.remove();
                            }, 3000);
                        }, elem);
                } else if (elem === form3) {
                    postData(body,
                        () => {
                            loadMessageElement.remove();
                            statusMessage.textContent = successMessage;
                            setTimeout(() => {
                                statusMessage.remove();
                                document.querySelector('.popup').style.display = 'none';
                            }, 1500);
                        },
                        error => {
                            statusMessage.textContent = errorMessage;
                            console.error(error);
                            setTimeout(() => {
                                statusMessage.remove();
                                document.querySelector('.popup').style.display = 'none';
                            }, 1500);
                        }, elem);
                }
            });

        });
    };
    const postData = (body, outputData, errortData, form) => {
        const request = new XMLHttpRequest();
        request.addEventListener('readystatechange', () => {
            if (request.readyState !== 4) {
                return;
            }
            if (request.status === 200) {
                outputData();
            } else {
                errortData(request.status);
            }
        });
        console.log(1);
        request.open('POST', './server.php');
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(body));
        form.reset();
    };
    sendForm();
});

const valid1 = new Validator({
    selector: '#form1',
    pattern: {
        name: /[A-Za-zА-Яа-яЁё]{2,}/,
        email: /^\w+@+\w+\.\w{2,}$/,
        phone: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
    },
    method: {
        'form1-name': [
            ['notEmpty'],
            ['pattern', 'name'],
        ],
        'form1-email': [
            ['notEmpty'],
            ['pattern', 'email'],
        ],
        'form1-phone': [
            ['notEmpty'],
            ['pattern', 'phone'],
        ],
    },
});
const valid2 = new Validator({
    selector: '#form2',
    pattern: {
        name: /[A-Za-zА-Яа-яЁё]{2,}/,
        message: /[а-яё -]/ig,
        email: /^\w+@+\w+\.\w{2,}$/,
        phone: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
    },
    method: {
        'form2-name': [
            ['notEmpty'],
            ['pattern', 'name'],
        ],
        'form2-message': [
            ['notEmpty'],
            ['pattern', 'message'],
        ],
        'form2-email': [
            ['notEmpty'],
            ['pattern', 'email'],
        ],
        'form2-phone': [
            ['notEmpty'],
            ['pattern', 'phone'],
        ],
    },
});
const valid3 = new Validator({
    selector: '#form3',
    pattern: {
        name: /[A-Za-zА-Яа-яЁё]{2,}/,
        email: /^\w+@+\w+\.\w{2,}$/,
        phone: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
    },
    method: {
        'form3-name': [
            ['notEmpty'],
            ['pattern', 'name'],
        ],
        'form3-email': [
            ['notEmpty'],
            ['pattern', 'email'],
        ],
        'form3-phone': [
            ['notEmpty'],
            ['pattern', 'phone'],
        ],
    },
});
valid1.init();
valid2.init();
valid3.init();
