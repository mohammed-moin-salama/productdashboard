var options = {
    strings: ['Loading . . . .'],
    typeSpeed: 100,
    backDelay: 700,
    loop: true,
    loopCount: 4,
};
var typed = new Typed('.element', options);
var loadsection = document.getElementById('load-section');
loadsection.addEventListener('load', load);
const myTimeout = setTimeout(load, 5000);

function load() {
    loadsection.classList.add('load-visual')
    loadsection.classList.remove('load-nonvisaul')
}