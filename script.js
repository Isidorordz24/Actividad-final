// Función para mostrar secciones
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    const buttons = document.querySelectorAll('nav button');

    sections.forEach(s => s.classList.remove('active'));
    buttons.forEach(b => b.classList.remove('active'));

    document.getElementById(sectionId).classList.add('active');
    event.target.classList.add('active');
}

// Contenido de las unidades
const unitContent = {
    1: {
        title: 'Unidad 1: Fundamentos de HTML y CSS',
        description: 'En esta unidad desarrollé proyectos aplicando los fundamentos de HTML y CSS.',
        projects: [
            {
                name: '🚗 Blog de Carros Japoneses',
                description: 'Blog temático sobre autos deportivos japoneses.',
                path: 'trabajo/index.html'
            },
            {
                name: '🎨 Roux Academy Art Conference',
                description: 'Sitio completo para una conferencia de arte.',
                path: 'proyecto/index.html'
            }
        ]
    },

    2: {
        title: 'Unidad 2: Desarrollo Avanzado',
        description: 'Proyectos avanzados usando CSS, animaciones y lógica interactiva.',
        projects: [
            {
                name: '🎵 Reproductor Multimedia',
                description: 'Reproductor interactivo con controles personalizados.',
                path: 'reproductor/index.html'
            },
            {
                name: '🧠 Memorama',
                description: 'Juego de memoria hecho con HTML, CSS y JavaScript.',
                path: 'memorama/index.html'
            },
            {
                name: '🛒 Orden de Compra',
                description: 'Formulario interactivo para generar pedidos.',
                path: 'orden_de_compra/index.html'
            }
        ]
    },

    3: {
        title: 'Unidad 3: Proyecto Integrador',
        description: 'Proyectos completos usando HTML, CSS, JS y PHP.',
        projects: [
            {
                name: '📄 Visualizador de Documentos',
                description: 'Carga y vista previa de documentos en el navegador.',
                path: 'visualizador_docs/index.html'
            },
            {
                name: '🧮 Calculadora PHP',
                description: 'Calculadora dinámica hecha con PHP.',
                path: 'calculadora_php/index.php'
            },
            {
                name: '📚 Biblioteca DB',
                description: 'CRUD conectado a base de datos.',
                path: 'Biblioteca_db/index.php'
            },
            {
                name: '💬 Chat App',
                description: 'Chat en tiempo real con interfaz moderna.',
                path: 'chat_app/index.php'
            }
        ]
    },

    4: {
        title: 'Unidad 4: Implementación Final',
        description: 'Entrega de proyecto final con resultados completos.',
        projects: [
            {
                name: '📝 Proyecto Final',
                description: 'Documentación, diseño y funcionamiento de la entrega final.',
                path: 'unidad4/index.html'
            }
        ]
    }
};

// Función para abrir modal de unidad
function openUnit(unitNumber) {
    const unit = unitContent[unitNumber];
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');

    let projectsHTML = '<div class="project-links">';

    unit.projects.forEach(project => {
        projectsHTML += `
            <div class="project-link">
                <h4>${project.name}</h4>
                <p>${project.description}</p>
                <a href="${project.path}" target="_blank">🌐 Abrir Proyecto</a>
            </div>
        `;
    });

    projectsHTML += '</div>';

    modalBody.innerHTML = `
        <h2 style="color:#667eea">${unit.title}</h2>
        <p style="color:#555;margin-bottom:1rem">${unit.description}</p>
        <h3 style="color:#764ba2">📁 Proyectos</h3>
        ${projectsHTML}
    `;

    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    modal.addEventListener('click', e => {
        if (e.target === modal) closeModal();
    });
});

