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
                description: 'Blog temático sobre autos deportivos japoneses icónicos (Skyline R34, Supra MK4, RX-7) con diseño inspirado en la estética japonesa. Incluye navegación interna, galería de imágenes y enlaces de retorno.',
                path: 'trabajo/index.html'
            },
            {
                name: '🎨 Roux Academy Art Conference',
                description: 'Sitio web completo para una conferencia de arte con múltiples secciones: inicio, artistas, agenda, venue y registro. Incluye navegación avanzada, formularios de registro, galerías de artistas y diseño de múltiples columnas.',
                path: 'proyecto/index.html'
            }
        ]
    },
    2: {
        title: 'Unidad 2: Desarrollo Avanzado',
        description: 'Aplicación de técnicas avanzadas de CSS, animaciones y diseño responsive.',
        projects: [
            // Aquí agregarás los proyectos de la unidad 2
            // {
            //     name: 'Nombre del Proyecto',
            //     description: 'Descripción del proyecto',
            //     path: 'unidad2/proyecto/index.html'
            // }
        ]
    },
    3: {
        title: 'Unidad 3: Proyecto Integrador',
        description: 'Desarrollo de un proyecto integrador que combina todos los conocimientos adquiridos.',
        projects: [
            // Aquí agregarás los proyectos de la unidad 3
        ]
    },
    4: {
        title: 'Unidad 4: Implementación Final',
        description: 'Implementación y presentación de resultados del proyecto final con documentación completa.',
        projects: [
            // Aquí agregarás los proyectos de la unidad 4
        ]
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