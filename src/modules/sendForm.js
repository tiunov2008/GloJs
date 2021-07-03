let error = false;
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
            if (error) {
                return;
            } else {
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
                        setTimeout(() => {
                            statusMessage.remove();
                            document.querySelector('.popup').style.display = 'none';
                        }, 3000);
                        elem.reset();
                    });
            }
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
class Validator {
    constructor({ selector, pattern, method }) {
        this.form = document.querySelector(selector);
        this.pattern = pattern;
        this.method = method;
        this.elementsForm = [...this.form.elements].filter(item => item.tagName.toLowerCase() !== 'button' &&
        item.type !== 'button');
        this.error = new Set();
    }
    init() {
        this.applyStyle();
        this.setPattern();
        this.elementsForm.forEach(elem => elem.addEventListener('change', this.checkIt.bind(this)));
        this.form.addEventListener('submit', e => {
            this.elementsForm.forEach(elem => this.checkIt({ target: elem  }));
            if (this.error.size) {
                e.preventDefault();
                error = true;
                return;
            }   else {
                error = false;
            }
            this.elementsForm.forEach(elem => elem.classList.remove('success'));
        });
    }
    isValid(elem) {
        const validatorMethod = {
            notEmpty(elem) {
                if (elem.value.trim() === '') {
                    return false;
                }
                return true;
            },
            pattern(elem, pattern) {
                return pattern.test(elem.value);
            },
        };
        if (this.method) {
            const method = this.method[elem.id];
            if (method) {
                return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
            }
        } else {
            console.warn('Передайте методы');
            return true;
        }
    }
    checkIt(event) {
        const target = event.target;

        if (this.isValid(target)) {
            this.showSuccess(target);
            this.error.delete(target);
        } else {
            this.showError(target);
            this.error.add(target);
        }

    }
    showError(elem) {
        elem.classList.remove('success');
        elem.classList.add('error');
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            return;
        }
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Ошибка в этом поле';
        errorDiv.classList.add('validator-error');
        elem.insertAdjacentElement('afterend', errorDiv);
    }

    showSuccess(elem) {
        elem.classList.remove('error');
        elem.classList.add('success');
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            elem.nextElementSibling.remove();
        }
    }

    applyStyle() {
        const style = document.createElement('style');
        style.textContent = `
        input.success {
            border: 2px solid green !important;
        }
        input.error {
            border: 2px solid red !important;
        }
        .validator-error {
            font-size: 14px !important;
            color: red !important;
            font-family: sans-serif !important;
        }
        `;
        document.head.appendChild(style);
    }
    setPattern() {

        if (!this.pattern.phone) {
            this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
        }
        if (!this.pattern.email) {
            this.pattern.email = /^\w+@+\w+\.\w{2,}$/;
        }

    }
}

const valid1 = new Validator({
    selector: '#form1',
    pattern: {
        name: /[A-Za-zА-Яа-яЁё]{2,}/,
        email: /^\w+@+\w+\.\w{2,}$/,
        phone: /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/,
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
