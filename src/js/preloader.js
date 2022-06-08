const imagesLoaded = require('imagesloaded');

const body = document.body;

export const preloader = _ => {
    return new Promise(resolve => {

        const imgwrap = document.createElement('div');
        imgwrap.style.visibility = 'hidden';
        body.appendChild(imgwrap);
        
        [...document.querySelectorAll('image')].forEach(el => {
            const imgEl = document.createElement('img');
            imgEl.style.width = 0;
            imgEl.src = el.getAttribute('xlink:href');
            imgEl.className = 'preload';
            imgwrap.appendChild(imgEl);
        });

        const arrImg = [...document.querySelectorAll('.preload'), ...document.querySelectorAll('.content__bg')];
        imagesLoaded(arrImg, {background: true}, _ => {
            imgwrap.parentNode.removeChild(imgwrap);
            body.classList.remove('loading');
            resolve();
        });

    });
};