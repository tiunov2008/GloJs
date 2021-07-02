const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
        popUpBtn = document.querySelectorAll('.popup-btn');

    popUpBtn.forEach(elem => {
        elem.addEventListener('click', () => {
            popup.style.display = 'block';
        });
    });
    popup.addEventListener('click', e => {
        let target = e.target;

        if (target.classList.contains('popup-close')) {
            popup.style.display = 'none';
        } else {
            target = target.closest('.popup-content');
            if (!target) {
                popup.style.display = 'none';
            }
        }
    });
};
export default togglePopUp;
