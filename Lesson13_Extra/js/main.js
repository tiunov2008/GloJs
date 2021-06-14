'use strict'
let colorValue = document.querySelector('.color');
let colorBtn = document.querySelector('.btn');
let colorBit = [];
let alphabet = ['A', 'B', 'C', 'D', 'E', 'F'];
let generateColor = function() {
    colorBit = [];
    for (let i = 0; i < 6; i++) {
        colorBit[i] = Math.floor(Math.random()*15);
        if (colorBit[i] > 9) {
            colorBit[i] = alphabet[colorBit[i]-9];
        }
    }
    colorBit = "#" + colorBit.join('');
    document.body.style.backgroundColor = colorBit;
    colorBtn.style.color = colorBit;
    colorValue.innerHTML = colorBit;
}
generateColor();
colorBtn.addEventListener('click',generateColor)