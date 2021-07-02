const ourTeam = () => {
    const photos = document.querySelectorAll('.command__photo');
    photos.forEach(elem => {
        let oldSrc;
        elem.addEventListener('mouseenter', event => {
            oldSrc = event.target.src;
            event.target.src = event.target.dataset.img;
        });
        elem.addEventListener('mouseout', event => {
            event.target.src = oldSrc;
        });
    });
};
export default ourTeam;
