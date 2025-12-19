// ==============================================
// SISTEMA FT-MEP - VERSIÓN FINAL SIMPLIFICADA
// ==============================================

class SistemaFTMEP {
    constructor() {
        this.cicloActual = 'III Ciclo';
        this.periodoActual = 'I Trimestre 2024';
        this.estudiantes = [];
        this.init();
    }
    
    async init() {
        console.log('🚀 Iniciando Sistema FT-MEP');
        
        // Cargar estudiantes
        await this.cargarEstudiantes();
        
        // Configurar eventos
        this.configurarEventos();
        
        // Actualizar dashboard
        this.actualizarDashboard();
        
        console.log('✅ Sistema listo');
    }
    
    async cargarEstudiantes() {
        try {
            const response = await fetch('data/estudiantes.json');
            this.estudiantes = await response.json();
            console.log(`✅ ${this.estudiantes.length} estudiantes cargados`);
        } catch (error) {
            console.error('Error cargando estudiantes:', error);
            // Datos de ejemplo
            this.estudiantes = [
                { id: 1, nombre: "Ana García Rodríguez", grado: "7°", estado: "Activo" },
                { id: 2, nombre: "Carlos Méndez Soto", grado: "7°", estado: "Activo" }
            ];
        }
    }
    
    configurarEventos() {
        // Navegación
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.target.closest('.nav-btn').dataset.section;
                this.cargarSeccion(section);
            });
        });
    }
    
    cargarSeccion(sectionId) {
        console.log(`📂 Cargando sección: ${sectionId}`);
        
        // Actualizar navegación
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.section === sectionId) {
                btn.classList.add('active');
            }
        });
        
        // Ocultar todas las secciones
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Mostrar sección seleccionada
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.add('active');
            
            // Cargar contenido específico
            switch(sectionId) {
                case 'estudiantes':
                    if (window.ModuloEstudiantes) {
                        new window.ModuloEstudiantes().cargarInterfaz();
                    }
                    break;
                    
                case 'indicadores':
                    if (window.ModuloIndicadores) {
                        new window.ModuloIndicadores().cargarInterfaz();
                    }
                    break;
                    
                case 'cotidiano':
                    if (window.ModuloCotidianoCompleto) {
                        new window.ModuloCotidianoCompleto().cargarInterfaz();
                    }
                    break;
                    
                case 'tareas':
                    if (window.ModuloTareasCompletas) {
                        new window.ModuloTareasCompletas().cargarInterfaz();
                    }
                    break;
                    
                default:
                    // Para otras secciones, mostrar contenido básico
                    this.cargarSeccionBasica(sectionId);
            }
        }
    }
    
    cargarSeccionBasica(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;
        
        switch(sectionId) {
            case 'proyecto-pruebas':
                section.innerHTML = `
                    <div class="section-header">
                        <h2><i class="fas fa-project-diagram"></i> Proyecto III Ciclo (30%)</h2>
                    </div>
                    <div class="info-card">
                        <p>Módulo en desarrollo. Próximamente: Sistema completo de evaluación de proyectos con Design Thinking.</p>
                    </div>
                `;
                break;
                
            case 'asistencia':
                section.innerHTML = `
                    <div class="section-header">
                        <h2><i class="fas fa-user-check"></i> Asistencia (10%)</h2>
                    </div>
                    <div class="info-card">
                        <p>Módulo en desarrollo. Próximamente: Registro diario de asistencia con cálculo automático.</p>
                    </div>
                `;
                break;
                
            case 'reportes':
                section.innerHTML = `
                    <div class="section-header">
                        <h2><i class="fas fa-file-excel"></i> Reportes</h2>
                    </div>
                    <div class="info-card">
                        <p>Módulo en desarrollo. Próximamente: Generación de reportes Excel completos.</p>
                    </div>
                `;
                break;
        }
    }
    
    seleccionarCiclo(ciclo) {
        this.cicloActual = ciclo === 'I' ? 'I Ciclo' : 
                          ciclo === 'II' ? 'II Ciclo' : 'III Ciclo';
        
        // Actualizar UI
        document.querySelectorAll('.ciclo-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.ciclo === ciclo) {
                btn.classList.add('active');
            }
        });
        
        document.getElementById('ciclo-actual').textContent = this.cicloActual;
        
        // Actualizar porcentajes
        this.actualizarPorcentajes();
        
        // Recargar sección actual si es necesario
        const seccionActiva = document.querySelector('.content-section.active');
        if (seccionActiva && seccionActiva.id === 'cotidiano') {
            this.cargarSeccion('cotidiano');
        }
        
        this.mostrarNotificacion(`Cambiado a ${this.cicloActual}`);
    }
    
    actualizarPorcentajes() {
        let porcentajeTC = 50;
        let porcentajeProyecto = 30;
        
        if (this.cicloActual === 'I Ciclo') {
            porcentajeTC = 65;
            porcentajeProyecto = 0;
        } else if (this.cicloActual === 'II Ciclo') {
            porcentajeTC = 60;
            porcentajeProyecto = 0;
        }
        
        document.getElementById('porcentaje-tc').textContent = porcentajeTC + '%';
        document.getElementById('porcentaje-proyecto').textContent = porcentajeProyecto + '%';
    }
    
    actualizarDashboard() {
        // Total estudiantes
        document.getElementById('total-estudiantes').textContent = this.estudiantes.length;
        
        // Datos de ejemplo para el dashboard
        document.getElementById('promedio-general').textContent = '85.50';
        document.getElementById('tc-completado').textContent = '75%';
        document.getElementById('asistencia-promedio').textContent = '92%';
        
        // Barras de progreso
        document.getElementById('progress-tc').style.width = '75%';
        document.getElementById('progress-tareas').style.width = '60%';
        document.getElementById('progress-proyecto').style.width = '40%';
        document.getElementById('progress-asistencia').style.width = '92%';
        
        // Tabla de notas
        this.actualizarTablaNotas();
    }
    
    actualizarTablaNotas() {
        const tbody = document.getElementById('tbody-notas-dashboard');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        this.estudiantes.forEach((est, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${est.nombre}</td>
                <td>${est.grado}</td>
                <td>85.0</td>
                <td>90.0</td>
                <td>80.0</td>
                <td>95.0</td>
                <td><strong>87.5</strong></td>
                <td><span class="badge badge-success">Aprobado</span></td>
            `;
            tbody.appendChild(row);
        });
    }
    
    mostrarNotificacion(mensaje) {
        console.log('📢 ' + mensaje);
        // En una implementación completa, mostraría una notificación visual
    }
    
    // Funciones globales
    cambiarPeriodo() {
        const periodos = ['I Trimestre 2024', 'II Trimestre 2024', 'III Trimestre 2024'];
        const index = periodos.indexOf(this.periodoActual);
        const nextIndex = (index + 1) % periodos.length;
        
        this.periodoActual = periodos[nextIndex];
        document.getElementById('periodo-actual').textContent = this.periodoActual;
        
        this.mostrarNotificacion(`Período cambiado a ${this.periodoActual}`);
    }
    
    generarReporteRapido() {
        this.mostrarNotificacion('Generando reporte rápido...');
    }
}

// ===== INICIALIZACIÓN =====
let sistema;

document.addEventListener('DOMContentLoaded', () => {
    sistema = new SistemaFTMEP();
    window.sistema = sistema;
    
    // Hacer funciones globales
    window.cargarSeccion = (section) => sistema.cargarSeccion(section);
    window.seleccionarCiclo = (ciclo) => sistema.seleccionarCiclo(ciclo);
    window.cambiarPeriodo = () => sistema.cambiarPeriodo();
    window.generarReporteRapido = () => sistema.generarReporteRapido();
    
    console.log('🎉 Sistema FT-MEP inicializado');
});
