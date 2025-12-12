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
const originalSlides = Array.from(track.children);
const totalOriginal = originalSlides.length;

let currentIndex = 0;

// Duplication pour boucle infinie sans vide ni duplication visible
function setupInfiniteCarousel() {
    // Ajoute tous les logos à la fin (sauf le dernier pour éviter la répétition immédiate)
    for (let i = 0; i < totalOriginal - 1; i++) {
        track.appendChild(originalSlides[i].cloneNode(true));
    }
    // Ajoute tous les logos au début (sauf le premier pour éviter la répétition immédiate)
    for (let i = totalOriginal - 1; i > 0; i--) {
        track.insertBefore(originalSlides[i].cloneNode(true), track.firstChild);
    }

    // Position initiale centrée sur le premier vrai logo
    currentIndex = totalOriginal - 1; // Décalage pour commencer sur Besançon sans doublon
    updatePosition();
}

function updatePosition() {
    const slideWidth = originalSlides[0].getBoundingClientRect().width + 80;
    const offset = (window.innerWidth / 2) - (slideWidth / 2);
    track.style.transform = `translateX(calc(${offset}px - ${currentIndex * slideWidth}px))`;
}

document.querySelector('.next').addEventListener('click', () => {
    currentIndex++;
    updatePosition();
    checkLoop();
});

document.querySelector('.prev').addEventListener('click', () => {
    currentIndex--;
    updatePosition();
    checkLoop();
});

function checkLoop() {
    if (currentIndex >= totalOriginal * 2 - 1) {
        setTimeout(() => {
            track.style.transition = 'none';
            currentIndex = totalOriginal - 1;
            updatePosition();
            setTimeout(() => track.style.transition = 'transform 0.6s ease-in-out', 50);
        }, 600);
    } else if (currentIndex < 0) {
        setTimeout(() => {
            track.style.transition = 'none';
            currentIndex = totalOriginal * 2 - 2;
            updatePosition();
            setTimeout(() => track.style.transition = 'transform 0.6s ease-in-out', 50);
        }, 600);
    }
}

// Initialisation
setupInfiniteCarousel();
window.addEventListener('resize', updatePosition);

// Défilement automatique
let autoSlide = setInterval(() => {
    currentIndex++;
    updatePosition();
    checkLoop();
}, 5000);

// Pause au survol
track.parentElement.addEventListener('mouseenter', () => clearInterval(autoSlide));
track.parentElement.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => {
        currentIndex++;
        updatePosition();
        checkLoop();
    }, 5000);
});