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
        item.value = item.value.trim().replace(/^\\-/, '')
            .replace(/ {1,}/g, " ").replace(/\\-{1,}/g, "-").replace(/\+{1,}/g, "+");
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
export default questions;
