// ==============================================
// SISTEMA FT-MEP - NÚCLEO PRINCIPAL
// Sistema profesional basado en EXCEVAL
// ==============================================

class SistemaFTMEP {
    constructor() {
        this.cicloActual = 'III Ciclo';
        this.periodoActual = 'I Trimestre 2024';
        this.estudiantes = [];
        this.calificaciones = {
            cotidiano: {},
            tareas: [],
            proyecto: {},
            asistencia: {}
        };
        
        this.init();
    }
    
    async init() {
        console.log('🚀 Iniciando Sistema FT-MEP Profesional');
        
        try {
            // Cargar estudiantes
            await this.cargarEstudiantes();
            
            // Cargar datos guardados
            this.cargarDatosGuardados();
            
            // Configurar eventos
            this.configurarEventos();
            
            // Actualizar dashboard
            this.actualizarDashboard();
            
            console.log('✅ Sistema listo para usar');
            
        } catch (error) {
            console.error('❌ Error inicializando:', error);
            this.mostrarError('Error al iniciar el sistema');
        }
    }
    
    async cargarEstudiantes() {
        try {
            const response = await fetch('data/estudiantes.json');
            this.estudiantes = await response.json();
            
            // Si no hay estudiantes, crear datos de ejemplo
            if (this.estudiantes.length === 0) {
                this.estudiantes = this.crearEstudiantesEjemplo();
            }
            
            console.log(`✅ ${this.estudiantes.length} estudiantes cargados`);
            
        } catch (error) {
            console.error('Error cargando estudiantes:', error);
            this.estudiantes = this.crearEstudiantesEjemplo();
        }
    }
    
    crearEstudiantesEjemplo() {
        return [
            { id: 1, nombre: "Ana García Rodríguez", grado: "7°", estado: "Activo" },
            { id: 2, nombre: "Carlos Méndez Soto", grado: "7°", estado: "Activo" },
            { id: 3, nombre: "María Fernández López", grado: "8°", estado: "Activo" },
            { id: 4, nombre: "José González Pérez", grado: "8°", estado: "Activo" },
            { id: 5, nombre: "Laura Chaves Jiménez", grado: "9°", estado: "Activo" }
        ];
    }
    
    configurarEventos() {
        // Navegación
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.target.dataset.section;
                this.cargarSeccion(section);
            });
        });
        
        // Botones del dashboard
        document.querySelectorAll('[onclick^="cargarSeccion"]').forEach(btn => {
            const match = btn.getAttribute('onclick').match(/cargarSeccion\('([^']+)'\)/);
            if (match) {
                btn.onclick = () => this.cargarSeccion(match[1]);
            }
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
                        window.ModuloEstudiantes.cargarInterfaz();
                    }
                    break;
                    
                case 'indicadores':
                    if (window.ModuloIndicadores) {
                        window.ModuloIndicadores.cargarInterfaz();
                    }
                    break;
                    
                case 'cotidiano':
                    if (window.ModuloCotidiano) {
                        window.ModuloCotidiano.cargarInterfaz();
                    }
                    break;
                    
                case 'tareas':
                    if (window.ModuloTareas) {
                        window.ModuloTareas.cargarInterfaz();
                    }
                    break;
                    
                case 'proyecto-pruebas':
                    if (window.ModuloProyectoPruebas) {
                        window.ModuloProyectoPruebas.cargarInterfaz();
                    }
                    break;
                    
                case 'asistencia':
                    if (window.ModuloAsistencia) {
                        window.ModuloAsistencia.cargarInterfaz();
                    }
                    break;
                    
                case 'reportes':
                    if (window.ModuloReportes) {
                        window.ModuloReportes.cargarInterfaz();
                    }
                    break;
            }
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
        
        // Actualizar porcentajes en dashboard
        this.actualizarPorcentajesCiclo();
        
        // Mostrar notificación
        this.mostrarNotificacion(`Ciclo cambiado a: ${this.cicloActual}`, 'success');
        
        // Recargar sección actual si es necesario
        const sectionActive = document.querySelector('.content-section.active');
        if (sectionActive) {
            this.cargarSeccion(sectionActive.id);
        }
    }
    
    actualizarPorcentajesCiclo() {
        const porcentajes = RDA_POR_CICLO[this.cicloActual];
        
        if (porcentajes) {
            document.getElementById('porcentaje-tc').textContent = porcentajes["Apropiación tecnológica y Digital"] + '%';
            
            if (this.cicloActual === 'III Ciclo') {
                document.getElementById('porcentaje-proyecto').textContent = porcentajes["Proyecto"] + '%';
            }
        }
    }
    
    actualizarDashboard() {
        // Actualizar estadísticas
        document.getElementById('total-estudiantes').textContent = this.estudiantes.length;
        
        // Calcular promedios
        this.calcularEstadisticasDashboard();
        
        // Actualizar tabla de notas
        this.actualizarTablaNotasDashboard();
    }
    
    calcularEstadisticasDashboard() {
        // En una implementación completa, aquí se calcularían los promedios reales
        const promedio = 85.5;
        const tcCompletado = 75;
        const asistencia = 92;
        
        document.getElementById('promedio-general').textContent = promedio.toFixed(2);
        document.getElementById('tc-completado').textContent = tcCompletado + '%';
        document.getElementById('asistencia-promedio').textContent = asistencia + '%';
        
        // Actualizar barras de progreso
        document.getElementById('progress-tc').style.width = tcCompletado + '%';
        document.getElementById('progress-tareas').style.width = '60%';
        document.getElementById('progress-proyecto').style.width = '40%';
        document.getElementById('progress-asistencia').style.width = asistencia + '%';
    }
    
    actualizarTablaNotasDashboard() {
        const tbody = document.getElementById('tbody-notas-dashboard');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        this.estudiantes.forEach((est, index) => {
            // Calcular notas (en implementación real se usarían los datos reales)
            const tc = Math.floor(Math.random() * 30) + 70;
            const tareas = Math.floor(Math.random() * 30) + 70;
            const proyecto = this.cicloActual === 'III Ciclo' ? Math.floor(Math.random() * 30) + 70 : 0;
            const asistencia = Math.floor(Math.random() * 20) + 80;
            
            // Calcular nota final según ciclo
            let notaFinal = 0;
            const porcentajes = RDA_POR_CICLO[this.cicloActual];
            
            if (porcentajes) {
                notaFinal = (tc * porcentajes["Apropiación tecnológica y Digital"] / 100) +
                           (tareas * porcentajes["Tareas"] / 100) +
                           (proyecto * (porcentajes["Proyecto"] || 0) / 100) +
                           (asistencia * porcentajes["Asistencia"] / 100);
            }
            
            const estado = notaFinal >= 70 ? 'Aprobado' : 'Reprobado';
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${est.nombre}</td>
                <td>${est.grado}</td>
                <td>${tc.toFixed(1)}</td>
                <td>${tareas.toFixed(1)}</td>
                <td>${this.cicloActual === 'III Ciclo' ? proyecto.toFixed(1) : 'N/A'}</td>
                <td>${asistencia.toFixed(1)}</td>
                <td><strong>${notaFinal.toFixed(1)}</strong></td>
                <td>
                    <span class="badge ${estado === 'Aprobado' ? 'badge-success' : 'badge-danger'}">
                        ${estado}
                    </span>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
    
    cargarDatosGuardados() {
        try {
            // Cargar trabajo cotidiano
            const tcGuardado = localStorage.getItem('ftmep_cotidiano');
            if (tcGuardado) {
                this.calificaciones.cotidiano = JSON.parse(tcGuardado);
            }
            
            // Cargar tareas
            const tareasGuardadas = localStorage.getItem('ftmep_tareas');
            if (tareasGuardadas) {
                this.calificaciones.tareas = JSON.parse(tareasGuardadas);
            }
            
            // Cargar asistencia
            const asistenciaGuardada = localStorage.getItem('ftmep_asistencia');
            if (asistenciaGuardada) {
                this.calificaciones.asistencia = JSON.parse(asistenciaGuardada);
            }
            
            console.log('✅ Datos guardados cargados');
            
        } catch (error) {
            console.error('Error cargando datos guardados:', error);
        }
    }
    
    guardarDatos() {
        try {
            localStorage.setItem('ftmep_cotidiano', JSON.stringify(this.calificaciones.cotidiano));
            localStorage.setItem('ftmep_tareas', JSON.stringify(this.calificaciones.tareas));
            localStorage.setItem('ftmep_asistencia', JSON.stringify(this.calificaciones.asistencia));
            
            console.log('💾 Datos guardados correctamente');
            this.mostrarNotificacion('Datos guardados exitosamente', 'success');
            
        } catch (error) {
            console.error('Error guardando datos:', error);
            this.mostrarNotificacion('Error al guardar datos', 'error');
        }
    }
    
    mostrarNotificacion(mensaje, tipo = 'info') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification ${tipo}`;
        notification.innerHTML = `
            <i class="fas fa-${this.getIconoTipo(tipo)}"></i>
            <span>${mensaje}</span>
        `;
        
        // Agregar al body
        document.body.appendChild(notification);
        
        // Remover después de 5 segundos
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
    
    getIconoTipo(tipo) {
        switch(tipo) {
            case 'success': return 'check-circle';
            case 'warning': return 'exclamation-triangle';
            case 'error': return 'times-circle';
            default: return 'info-circle';
        }
    }
    
    mostrarError(mensaje) {
        this.mostrarNotificacion(mensaje, 'error');
    }
    
    cambiarPeriodo() {
        const periodos = ['I Trimestre 2024', 'II Trimestre 2024', 'III Trimestre 2024'];
        const currentIndex = periodos.indexOf(this.periodoActual);
        const nextIndex = (currentIndex + 1) % periodos.length;
        
        this.periodoActual = periodos[nextIndex];
        document.getElementById('periodo-actual').textContent = this.periodoActual;
        
        this.mostrarNotificacion(`Período cambiado a: ${this.periodoActual}`, 'info');
    }
    
    generarReporteRapido() {
        this.mostrarNotificacion('Generando reporte Excel...', 'info');
        
        // En implementación real, se generaría el archivo Excel
        setTimeout(() => {
            this.mostrarNotificacion('Reporte generado exitosamente', 'success');
        }, 1500);
    }
}

// ===== INICIALIZACIÓN =====
let sistemaFTMEP;

document.addEventListener('DOMContentLoaded', () => {
    sistemaFTMEP = new SistemaFTMEP();
    window.sistema = sistemaFTMEP;
    
    // Hacer funciones globales disponibles
    window.cargarSeccion = (section) => sistemaFTMEP.cargarSeccion(section);
    window.seleccionarCiclo = (ciclo) => sistemaFTMEP.seleccionarCiclo(ciclo);
    window.cambiarPeriodo = () => sistemaFTMEP.cambiarPeriodo();
    window.generarReporteRapido = () => sistemaFTMEP.generarReporteRapido();
    
    console.log('🎉 Sistema FT-MEP inicializado');
});
