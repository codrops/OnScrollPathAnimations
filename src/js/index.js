import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap';
import { preloader } from './preloader';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// preload the images
preloader();

// All path elements in the page
const paths = [...document.querySelectorAll('path.path-anim')];
	
// Smooth scrolling initialization (using Lenis https://github.com/studio-freight/lenis)
const lenis = new Lenis({
    lerp: 0.1,
    smooth: true,
});
const scrollFn = () => {
    lenis.raf();
    requestAnimationFrame(scrollFn);
};
requestAnimationFrame(scrollFn);

// Animate the d attribute (path initial ) to the value in data-path-to;
// start when the top of its SVG reaches the bottom of the viewport and 
// end when the bottom of its SVG reaches the top of the viewport 
paths.forEach(el => {
    const svgEl = el.closest('svg');
    const pathTo = el.dataset.pathTo;

    gsap.timeline({
        scrollTrigger: {
            trigger: svgEl,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    })
    .to(el, {
        ease: 'none',
        attr: { d: pathTo }
    });
});


