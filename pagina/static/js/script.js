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

document.getElementById('btn-login').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/auth/', {  // Asegúrate que apunte a /auth/
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'), // Para CSRF
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Inicio de sesión exitoso:', data);
    })
    .catch(error => {
        console.error('Error al iniciar sesión:', error);
    });
});

document.getElementById('btn-register').addEventListener('click', function() {
    const regUsername = document.getElementById('reg-username').value;
    const regEmail = document.getElementById('reg-email').value;
    const regPassword = document.getElementById('reg-password').value;
    const regPasswordConfirm = document.getElementById('reg-password-confirm').value;

    fetch('/auth/', {  // Asegúrate que apunte a /auth/
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'), // Para CSRF
        },
        body: JSON.stringify({ regUsername, regEmail, regPassword, regPasswordConfirm }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Registro exitoso:', data);
    })
    .catch(error => {
        console.error('Error al registrarse:', error);
    });
});

// Función para obtener el token CSRF
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

if ('caches' in window) {
    caches.keys().then(function(cacheNames) {
        cacheNames.forEach(function(cacheName) {
            caches.delete(cacheName);
        });
    });
}
