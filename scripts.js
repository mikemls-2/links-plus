
// scripts.js

// Función para registrar un grupo
function registrarGrupo(nombre, descripcion, enlace) {
    let grupos = JSON.parse(localStorage.getItem('gruposPendientes')) || [];
    grupos.push({ nombre, descripcion, enlace, aprobado: false });
    localStorage.setItem('gruposPendientes', JSON.stringify(grupos));
}

// Función para cargar grupos pendientes en el panel
function cargarGruposPendientes() {
    const lista = document.getElementById('listaPendientes');
    if (!lista) return;

    let grupos = JSON.parse(localStorage.getItem('gruposPendientes')) || [];
    lista.innerHTML = '';

    if (grupos.length === 0) {
        lista.innerHTML = '<p>No hay grupos pendientes.</p>';
        return;
    }

    grupos.forEach((g, index) => {
        const div = document.createElement('div');
        div.className = 'group-card';
        div.innerHTML = `
            <h3>${g.nombre}</h3>
            <p>${g.descripcion}</p>
            <a href="${g.enlace}" target="_blank">Enlace</a><br>
            <button onclick="aprobarGrupo(${index})">Aprobar</button>
            <button onclick="eliminarGrupoPendiente(${index})">Eliminar</button>
        `;
        lista.appendChild(div);
    });
}

// Función para aprobar un grupo
function aprobarGrupo(index) {
    let pendientes = JSON.parse(localStorage.getItem('gruposPendientes')) || [];
    let aprobados = JSON.parse(localStorage.getItem('gruposAprobados')) || [];

    let grupo = pendientes[index];
    grupo.aprobado = true;
    aprobados.push(grupo);

    pendientes.splice(index, 1);

    localStorage.setItem('gruposPendientes', JSON.stringify(pendientes));
    localStorage.setItem('gruposAprobados', JSON.stringify(aprobados));

    cargarGruposPendientes();
}

// Función para eliminar un grupo pendiente
function eliminarGrupoPendiente(index) {
    let pendientes = JSON.parse(localStorage.getItem('gruposPendientes')) || [];
    pendientes.splice(index, 1);
    localStorage.setItem('gruposPendientes', JSON.stringify(pendientes));
    cargarGruposPendientes();
}

// Función para manejar el formulario de registro
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formRegistro');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const nombre = document.getElementById('nombre').value.trim();
            const descripcion = document.getElementById('descripcion').value.trim();
            const enlace = document.getElementById('enlace').value.trim();

            if (nombre && descripcion && enlace) {
                registrarGrupo(nombre, descripcion, enlace);
                alert('Grupo enviado para aprobación.');
                form.reset();
            } else {
                alert('Por favor completa todos los campos.');
            }
        });
    }

    // Si estamos en el panel, cargar pendientes
    if (document.getElementById('listaPendientes')) {
        cargarGruposPendientes();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector("nav ul");

    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("show");
    });
});
