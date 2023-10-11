function createScene() {
    // Create a new main element with the class "scene"
    const main = document.createElement('main');
    main.classList.add('scene');

    // Get the body element
    const body = document.querySelector('body');
    const header = document.querySelector('header');

    // Hide everything in the body (except the new main element)
    const headerChildren = header.children;
    for (let i = 0; i < headerChildren.length; i++) {
        const child = headerChildren[i];
        if (child !== main) {
            child.style.display = 'none';
        }
    }

    // Insert the new main element right below the body tag
    body.insertBefore(main, body.firstElementChild);
    CreateDiv(main);
}
const CreateDiv = () => {
    const scene = document.querySelector('.scene');
    for (let i = 0; i < 210; i++) {
        scene.innerHTML += "<div></div>";
    }
}

const createStars = () => {
    const stars = document.querySelectorAll('div');
    stars.forEach(star => {
        let x = `${Math.random() * 200}vmax`;
        let y = `${Math.random() * 100}vh`;
        let z = `${Math.random() * 200 - 100}vmin`;
        let rx = `${Math.random() * 360}deg`;
        star.style.setProperty('--x', x);
        star.style.setProperty('--y', y);
        star.style.setProperty('--z', z);
        star.style.setProperty('--rx', rx);
        let delay = `${Math.random() * 1.5}s`;
        star.style.animationDelay = delay;
    })
}

function fadeOut(element, duration, callback) {
    element.style.transition = `opacity ${duration / 1000}s ease-in`;
    element.style.opacity = '0.1';

    setTimeout(() => {
        if (typeof callback === 'function') {
            callback();
        }
    }, duration);
}

function navigateWithFadeOut() {
    const body = document.body;
    fadeOut(body, 5000, function () {
        window.location.href = 'public/templates/list.html';
    });
}

document.querySelector('.enter-book').addEventListener('click', function () {
    createScene();
    createStars();
    navigateWithFadeOut();
}); 