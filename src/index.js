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
