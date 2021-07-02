const sendForm = () => {
    const errorMessage = 'Что то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро с вами свяжимся!';

    const forms = [...document.querySelectorAll('form')];

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem; color: #FFF !important;';
    forms.forEach(elem => {
        elem.addEventListener('submit', event => {
            event.preventDefault();
            elem.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;
            const formData = new FormData(elem);
            const body = {};
            for (const val of formData.entries()) {
                body[val[0]] = val[1];
            }
            postData(body)
                .then(response => {
                    if (response.status !== 200) throw new Error(`Status network not 200`);
                    statusMessage.textContent = successMessage;
                    setTimeout(() => {
                        statusMessage.remove();
                        document.querySelector('.popup').style.display = 'none';
                    }, 3000);
                    elem.reset();
                })
                .catch(error => {
                    statusMessage.textContent = errorMessage;
                    console.error(error);
                    setTimeout(() => {
                        statusMessage.remove();
                        document.querySelector('.popup').style.display = 'none';
                    }, 3000);
                    elem.reset();
                });
        });

    });

};
const postData = body => fetch('./server.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
});
export default sendForm;
