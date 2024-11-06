document.getElementById('toggle-form').addEventListener('click', function() {
    const formulario = document.getElementById('subir-producto');
    if (formulario.style.display === 'none' || formulario.style.display === '') {
        formulario.style.display = 'block';
    } else {
        formulario.style.display = 'none';
    }
});

function mostrarPrevia(event) {
    const imagenPrev = document.getElementById('imagen-previa');
    const archivo = event.target.files[0];
    const lector = new FileReader();
    lector.onload = function(e) {
        imagenPrev.src = e.target.result;
        imagenPrev.style.display = 'block';
    }
    lector.readAsDataURL(archivo);
}

function validarFormulario() {
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = document.getElementById('precio').value;
    const imagen = document.getElementById('imagen').value;

    if (!nombre || !descripcion || !precio || !imagen) {
        alert("Por favor, completa todos los campos antes de enviar el formulario.");
        return false;
    }
    return true;
}