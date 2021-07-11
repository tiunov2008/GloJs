document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');
    const getData = () => new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();

        request.addEventListener('readystatechange', () => {
            if (request.readyState !== 4) {
                return;
            }
            if (request.status === 200) {
                resolve(JSON.parse(request.responseText));
            } else {
                reject();
            }
        });
        request.open('GET', './cars.json');
        request.setRequestHeader('Content-type', 'application/json');
        request.send();

    });
    select.addEventListener('change', () => {
        getData()
            .then((data) => {
                data.cars.forEach(item => {
                    if (item.brand === select.value) {
                        console.log(2);
                        const {brand, model, price} = item;
                        output.innerHTML = `Тачка ${brand} ${model} <br>
                        Цена: ${price}$`;
                    }
                });
            })
            .catch(() => {
                output.innerHTML = 'Произошла ошибка';
            })
    });

});