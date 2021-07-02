const smoothScroolTo = (e, elem) => {
    e.preventDefault();

    const href = elem.getAttribute('href').substring(1);
    const scrollTarget = document.getElementById(href);

    const elementPosition = scrollTarget.getBoundingClientRect().top;

    window.scrollBy({
        top: elementPosition,
        behavior: 'smooth'
    });
};
const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
        menu = document.querySelector('menu'),
        menuItems = menu.querySelectorAll('ul>li>a');

    document.body.addEventListener('click', e => {
        const target = e.target;

        if (target.classList.contains('close-btn')) {
            menu.classList.remove('active-menu');
        } else {
            const targetMenu = target.closest('.menu');
            if (targetMenu === btnMenu) {
                menu.classList.add('active-menu');
            } else if (target !== menu && target.tagName.toLowerCase() !== 'li') {
                menu.classList.remove('active-menu');
            }
        }

        menuItems.forEach(elem => {
            if (target === elem) {
                smoothScroolTo(e, elem);
                menu.classList.remove('active-menu');
            }
        });
    });
};

export default toggleMenu;
