/* Menu*/
const toggle = document.querySelector('.menu-btn');
const nav = document.querySelector(".menu");

toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";

    toggle.setAttribute("aria-expanded", !isOpen);
    nav.setAttribute("aria-hidden", isOpen);

    document.body.classList.toggle('noscroll', !isOpen)
});

/*Caroussel*/

const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);

slides.forEach(slide => track.appendChild(slide.cloneNode(true))); /*Duplique les logos pour une boucle infinie sans vide*/

// L'animation CSS translateX(-50%) fait le reste → boucle fluide