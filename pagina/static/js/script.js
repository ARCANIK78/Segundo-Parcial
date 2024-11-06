document.getElementById('menu-toggle').addEventListener('click', function() {
    this.classList.toggle('abierto');
});

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.menu a');
    const sections = document.querySelectorAll('section');
    const login = document.getElementById('contenedor');

    sections.forEach(section => section.style.display = 'none');
    document.querySelector('#HOME').style.display = 'block';

    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);

            sections.forEach(section => {
                if (section.id === targetId) {
                    login.style.display = 'none';
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    });
});

function verificarPantalla() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const originalWidth = screen.width;
    const originalHeight = screen.height;
    const invisible = document.getElementById("invi");
    const visible = document.getElementById("menu");
    const logoaparent =  document.getElementById("logo-aparent");
    const allSections =  document.querySelectorAll("section");
    
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    if (isMobile || (width < originalWidth * 0.76) || (height < originalHeight * 0.5)) {
        invisible.classList.add("invisible");
        logoaparent.classList.add("visible");
        visible.classList.add('visible');
        allSections.forEach(section => {
            section.style.marginTop = '5vh';
        });
        
    } else {
        invisible.classList.remove("invisible");
        logoaparent.classList.remove("visible");
        visible.classList.remove('visible');
        allSections.forEach(section => {
            section.style.marginTop = '16vh';
        });
    }
}

window.addEventListener("resize", verificarPantalla);

verificarPantalla();

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section');
    const login =  document.getElementById('contenedor');

    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);

            sections.forEach(section => {
                if (section.id === targetId) {
                    login.style.display = 'none';
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    });

    document.querySelector('#HOME').style.display = 'block';
});

document.getElementById('LOGIN').addEventListener('click', function() {
    const allSections =  document.querySelectorAll("section");
    const login =  document.getElementById('contenedor');
    allSections.forEach(section => {
        section.style.display = 'none';
    });
    login.style.display = 'block';
});

document.getElementById('LOGIN1').addEventListener('click', function() {
    const allSections =  document.querySelectorAll("section");
    const login =  document.getElementById('contenedor');
    allSections.forEach(section => {
        section.style.display = 'none';
    });
    login.style.display = 'block';
});

const formularioLogin = document.getElementById('formulario-login');
const formularioRegistro = document.getElementById('formulario-registro');
const enlaceRegistro = document.getElementById('enlace-registro');
const enlaceLogin = document.getElementById('enlace-login');

enlaceRegistro.addEventListener('click', function(e) {
    e.preventDefault();
    formularioLogin.style.display = 'none';
    formularioRegistro.style.display = 'block';
});

enlaceLogin.addEventListener('click', function(e) {
    e.preventDefault();
    formularioRegistro.style.display = 'none';
    formularioLogin.style.display = 'block';
});

window.onload = () => {
    formularioRegistro.style.display = 'none';
};

function url() {
    const urlParams = new URLSearchParams(window.location.search);
    const mensaje = urlParams.get('mensaje');
    const contenedor = document.getElementById('contenedor');


    console.log(mensaje);

    const allSections = document.querySelectorAll("section");

    if (mensaje === 'registro') {
        allSections.forEach(section => {
            section.style.display = 'none';
        });
        contenedor.style.display = 'block';
        formularioLogin.style.display = 'none';
        formularioRegistro.style.display = 'block';
    } else if (mensaje === 'login') {
        allSections.forEach(section => {
            section.style.display = 'none';
        });
        contenedor.style.display = 'block';
        formularioRegistro.style.display = 'none';
        formularioLogin.style.display = 'block';
    }
}

// Llama a la función `url` al cargar la página
window.onload = url;
