const blurForms = () => {
    function uCaseFirst(s) {
        return s.toLowerCase().replace(/(?<!\p{Lowercase})\p{Lowercase}/gu, ch => ch.toUpperCase());
    }
    const forms = [document.getElementById('form1'),
        document.getElementById('form2'),
        document.getElementById('form3')];
    const regular = (elem, elemType) => {
        switch (elemType) {
        case 'name':
            elem.value = elem.value.replace(/[^а-яё -]/ig, '');
            break;
        case 'email':
            elem.value = elem.value.replace(/[^a-z@_.!~*'0-9 -]/ig, '');
            break;
        case 'phone':
            elem.value = elem.value.replace(/[^0-9()+-]/, '');
            break;
        case 'message':
            elem.value = elem.value.replace(/[^а-яё -]/ig, '');
            break;
        }
    };
    const blur = (item, itemType) => {
        if (itemType === 'name') {
            item.value = uCaseFirst(item.value);
        }
        item.value = item.value.trim().replace(/^\\-/, '')
            .replace(/ {1,}/g, " ").replace(/\\-{1,}/g, "-").replace(/\+{1,}/g, "+");
    };
    forms.forEach(form => {
        const elementsForm = [...form.elements].filter(item => item.tagName.toLowerCase() !== 'button' &&
        item.type !== 'button');
        elementsForm.forEach(item => {
            item.addEventListener('input', () => {
                regular(item, item.id.split('-')[1]);
            });
            item.addEventListener('blur', () => {
                blur(item, item.id.split('-')[1]);
            });
        });
    });
};
export default blurForms;
