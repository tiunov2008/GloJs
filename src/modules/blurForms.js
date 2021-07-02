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
export default blurForms;
