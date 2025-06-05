// Cargar y renderizar proyectos dinámicamente
async function loadProjects() {
    try {
        const response = await fetch('./data/projects.json');
        const data = await response.json();
        renderProjects(data.projects);
    } catch (error) {
        console.error('Error al cargar los proyectos:', error);
        // Fallback en caso de error
        renderFallbackProjects();
    }
}

function renderProjects(projects) {
    const projectsGrid = document.querySelector('.proyectos__grid');
    
    if (!projectsGrid) {
        console.error('No se encontró el contenedor de proyectos');
        return;
    }
    
    // Limpiar proyectos existentes
    projectsGrid.innerHTML = '';
    
    projects.forEach(project => {
        const projectElement = createProjectElement(project);
        projectsGrid.appendChild(projectElement);
    });
}

function createProjectElement(project) {
    const projectDiv = document.createElement('div');
    projectDiv.className = 'proyecto';
    
    projectDiv.innerHTML = `
        <div class="proyecto__icono">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                ${project.icon}
            </svg>
        </div>
        <h3 class="proyecto__nombre">${project.title}</h3>
        <p class="proyecto__descripcion">${project.description}</p>
        <div class="proyecto__frameworks">
            ${project.technologies.map(tech => 
                `<span class="framework-tag">${tech}</span>`
            ).join('')}
        </div>
        ${(project.link || project.website) ? `
            <div class="proyecto__links">
                ${project.website ? `
                    <a href="${project.website}" target="_blank" rel="noopener noreferrer" class="proyecto__btn proyecto__btn--website">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                        </svg>
                        Ver Sitio Web
                    </a>
                ` : ''}
                ${project.link ? `
                    <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="proyecto__btn proyecto__btn--github">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        Ver en GitHub
                    </a>
                ` : ''}
            </div>
        ` : ''}
    `;
    
    return projectDiv;
}

function renderFallbackProjects() {
    // Proyectos de respaldo en caso de que falle la carga del JSON
    const fallbackProjects = [
        {
            title: "Proyecto en desarrollo",
            description: "Los proyectos se están cargando...",
            icon: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>',
            technologies: ["Loading..."]
        }
    ];
    renderProjects(fallbackProjects);
}

// Cargar proyectos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loadProjects); 