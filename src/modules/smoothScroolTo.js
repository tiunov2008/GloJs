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
export default smoothScroolTo;
