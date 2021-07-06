'use strict';
import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import calc from './modules/calc';
import blurForms from './modules/blurForms';
import questions from './modules/questions';
import sendForm from './modules/sendForm';
import ourTeam from './modules/ourTeam';
import smoothScroolTo from './modules/smoothScroolTo';
import SliderСarousel from './modules/sliderСarousel';

const date = new Date();

countTimer(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`);
toggleMenu();
document.querySelector('a').addEventListener('click', function(e) {
    smoothScroolTo(e, this);
});
togglePopUp();
tabs();
slider();
calc(100);
blurForms();
questions();
ourTeam();
sendForm();
const carousel = new SliderСarousel({
    main: '.companies-wrapper',
    wrap: '.companies-hor',
    infinity: true,
    slidesToShow: 4,

    responsive: [{
        breakpoint: 1024,
        slideToShow: 3,
    },
    {
        breakpoint: 768,
        slideToShow: 2,
    },
    {
        breakpoint: 576,
        slideToShow: 1,
    }]
});
carousel.init();
