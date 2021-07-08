const task1 = document.getElementById('task-1'),
    task2 = document.getElementById('task-2');
task1.innerHTML = task1.innerHTML
    .replace(/функци[яию]{1}/g, val => `<strong>${val}<\/strong>`);
const date = new Date();
const time = date.toLocaleTimeString('en').substring(0, 5);
task2.innerHTML = `<b>${time}</b>`;
console.log(allText);
document.body.innerHTML = document.body.innerHTML
    .replace(/&\w+;/g, val => `<mark>${val}</mark>`);
const filterByType = (type, ...values) => values.filter(value => typeof value === type),

    hideAllResponseBlocks = () => {
        const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
        responseBlocksArray.forEach(block => block.style.display = 'none');
    },

    showResponseBlock = (blockSelector, msgText, spanSelector) => {
        hideAllResponseBlocks();
        document.querySelector(blockSelector).style.display = 'block';
        if (spanSelector) {
            document.querySelector(spanSelector).textContent = msgText;
        }
    },

    showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),

    showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),

    showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

    tryFilterByType = (type, values) => {
        try {
            const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
            const alertMsg = (valuesArray.length) ?
                `Данные с типом ${type}: ${valuesArray}` :
                `Отсутствуют данные типа ${type}`;
            showResults(alertMsg);
        } catch (e) {
            showError(`Ошибка: ${e}`);
        }
    };

const filterButton = document.querySelector('#filter-btn');

filterButton.addEventListener('click', e => {
    const typeInput = document.querySelector('#type');
    const dataInput = document.querySelector('#data');

    if (dataInput.value === '') {
        dataInput.setCustomValidity('Поле не должно быть пустым!');
        showNoResults();
    } else {
        dataInput.setCustomValidity('');
        e.preventDefault();
        tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
    }
});

