/* Menu*/
const toggle = document.querySelector('.menu-btn');
const nav = document.querySelector(".menu");

toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";

    toggle.setAttribute("aria-expanded", !isOpen);
    nav.setAttribute("aria-hidden", isOpen);

    document.body.classList.toggle("noscroll", !isOpen);
});