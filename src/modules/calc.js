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
        const init = value => {
            totalValue.textContent = value;
        };
        let step = 0;
        if (lastTotal < total) {
            step = Math.ceil((total - lastTotal) / 100);
        } else if (lastTotal > total) {
            step = Math.ceil((lastTotal - total) / 100);
        }
        let time = 0;
        const id = setInterval(() => {
            time++;
            if (count < total) {
                count += step;
                calcType.disabled = 'true';
                calcSquare.disabled = 'true';
                calcDay.disabled = 'true';
                calcCount.disabled = 'true';
                init(Math.ceil(count));
            } else if (count > total) {
                count -= step;
                calcType.disabled = 'true';
                calcSquare.disabled = 'true';
                calcDay.disabled = 'true';
                calcCount.disabled = 'true';
                init(Math.ceil(count));
            }
            if (time === 100) {
                clearInterval(id);
                init(total);
                calcType.removeAttribute('disabled');
                calcSquare.removeAttribute('disabled');
                calcDay.removeAttribute('disabled');
                calcCount.removeAttribute('disabled');
            }
        }, 10);

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
export default calc;
