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
        description: 'En esta unidad desarrollé dos proyectos web completos aplicando los fundamentos de HTML y CSS. Aprendí sobre estructura semántica, estilos, navegación y diseño responsive.',
        projects: [
            {
                name: '🚗 Blog de Carros Japoneses',
                description: 'Blog temático sobre autos deportivos japoneses icónicos (Skyline R34, Supra MK4, RX-7).',
                path: 'trabajo/index.html'
            },
            {
                name: '🎨 Roux Academy Art Conference',
                description: 'Sitio web completo para una conferencia de arte con múltiples secciones.',
                path: 'proyecto/index.html'
            }
        ]
    },

    // ------------------------------ UNIDAD 2 ------------------------------
    2: {
        title: 'Unidad 2: Desarrollo Avanzado',
        description: 'Aplicación de técnicas avanzadas de CSS, animaciones y diseño responsive.',
        projects: [
            {
                name: '🎧 Reproductor',
                description: 'Proyecto reproductor funcional.',
                path: 'reproductor/reproductor.html'
            },
            {
                name: '🧠 Memorama',
                description: 'Juego tipo memorama desarrollado con JavaScript.',
                path: 'memorama/memorama.html'
            },
            {
                name: '🛒 Orden de Compra',
                description: 'Sistema de orden de compra dinámico.',
                path: 'orden_de_compra/compras.html'
            }
        ]
    },

    // ------------------------------ UNIDAD 3 ------------------------------
    3: {
        title: 'Unidad 3: Proyecto Integrador',
        description: 'Desarrollo de un proyecto integrador que combina todos los conocimientos adquiridos.',
        projects: [
            {
                name: '📄 Visualizador de Documentos',
                description: 'Aplicación para visualizar documentos.',
                path: 'visualizador_de_docs/index.html'
            },
            {
                name: '🧮 Calculadora PHP',
                description: 'Calculadora realizada con PHP.',
                path: 'calculadora_php/calculadora.php'
            },
            {
                name: '📚 Biblioteca DB',
                description: 'Sistema de biblioteca conectado a base de datos.',
                path: 'Biblioteca_db/index.php'
            },
            {
                name: '💬 Chat App',
                description: 'Aplicación de chat funcional.',
                path: 'chat_app/chat.php'
            }
        ]
    },

    4: {
        title: 'Unidad 4: Implementación Final',
        description: 'Implementación y presentación de resultados del proyecto final con documentación completa.',
        projects: []
    }
};


// Función para abrir modal de unidad
function openUnit(unitNumber) {
    const unit = unitContent[unitNumber];
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    
    let projectsHTML = '';
    if (unit.projects && unit.projects.length > 0) {
        projectsHTML = '<div class="project-links">';
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
    } else {
        projectsHTML = '<p style="color: #999; font-style: italic; margin-top: 1rem;">Próximamente se agregarán los proyectos de esta unidad.</p>';
    }
    
    modalBody.innerHTML = `
        <h2 style="color: #667eea; margin-bottom: 1rem;">${unit.title}</h2>
        <p style="color: #666; line-height: 1.8; margin-bottom: 1.5rem;">${unit.description}</p>
        <h3 style="color: #764ba2; margin-bottom: 1rem;">📁 Proyectos Desarrollados</h3>
        ${projectsHTML}
    `;
    
    modal.classList.add('active');
}

// Función para cerrar modal
function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

// Cerrar modal al hacer clic fuera de él
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
});
