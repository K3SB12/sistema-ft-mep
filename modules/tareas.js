// ==============================================
// MÓDULO DE TAREAS - 100% FUNCIONAL
// ==============================================

class ModuloTareasCompletas {
    constructor() {
        this.tareas = [];
        this.cargarTareasGuardadas();
    }
    
    cargarInterfaz() {
        const section = document.getElementById('tareas');
        if (!section) return;
        
        section.innerHTML = `
            <div class="section-header">
                <h2><i class="fas fa-tasks"></i> Sistema de Tareas (10%)</h2>
                <div class="header-actions">
                    <button class="btn-primary" onclick="ModuloTareasCompletas.mostrarModalNuevaTarea()">
                        <i class="fas fa-plus"></i> Nueva Tarea
                    </button>
                    <button class="btn-secondary" onclick="ModuloTareasCompletas.generarReporteTareas()">
                        <i class="fas fa-file-excel"></i> Reporte
                    </button>
                </div>
            </div>
            
            <!-- Resumen de Tareas -->
            <div class="stats-grid compact">
                <div class="stat-card">
                    <div class="stat-icon" style="background: var(--info-color);">
                        <i class="fas fa-tasks"></i>
                    </div>
                    <div class="stat-info">
                        <h3 id="total-tareas">0</h3>
                        <p>Tareas Totales</p>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon" style="background: var(--success-color);">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="stat-info">
                        <h3 id="tareas-calificadas">0%</h3>
                        <p>Calificadas</p>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon" style="background: var(--warning-color);">
                        <i class="fas fa-clock"></i>
                    </div>
                    <div class="stat-info">
                        <h3 id="tareas-pendientes">0</h3>
                        <p>Pendientes</p>
                    </div>
                </div>
            </div>
            
            <!-- Lista de Tareas -->
            <div class="table-card">
                <div class="table-responsive" id="lista-tareas-container">
                    <div class="loading">
                        <i class="fas fa-spinner fa-spin"></i>
                        <p>Cargando tareas...</p>
                    </div>
                </div>
            </div>
        `;
        
        this.cargarListaTareas();
        this.actualizarEstadisticas();
    }
    
    cargarListaTareas() {
        const container = document.getElementById('lista-tareas-container');
        if (!container) return;
        
        if (this.tareas.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-tasks"></i>
                    <p>No hay tareas creadas</p>
                    <button class="btn-primary" onclick="ModuloTareasCompletas.mostrarModalNuevaTarea()">
                        <i class="fas fa-plus"></i> Crear primera tarea
                    </button>
                </div>
            `;
            return;
        }
        
        let html = `
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Fecha</th>
                        <th>Grado</th>
                        <th>Puntaje</th>
                        <th>Estado</th>
                        <th>Entregadas</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        this.tareas.forEach(tarea => {
            const entregadas = tarea.entregas ? Object.values(tarea.entregas).filter(e => e.entregada).length : 0;
            const total = window.sistema.estudiantes.filter(e => 
                !tarea.grados || tarea.grados.length === 0 || tarea.grados.includes(e.grado)
            ).length;
            
            const porcentaje = total > 0 ? Math.round((entregadas / total) * 100) : 0;
            
            html += `
                <tr>
                    <td>
                        <strong>${tarea.titulo}</strong>
                        ${tarea.descripcion ? `<br><small>${tarea.descripcion.substring(0, 50)}...</small>` : ''}
                    </td>
                    <td>${tarea.fechaEntrega}</td>
                    <td>${tarea.grados ? tarea.grados.join(', ') : 'Todos'}</td>
                    <td>${tarea.puntajeMaximo}</td>
                    <td>
                        <span class="badge ${tarea.estado === 'completada' ? 'badge-success' : 'badge-warning'}">
                            ${tarea.estado}
                        </span>
                    </td>
                    <td>
                        <div class="progress-container">
                            <div class="progress-bar-small">
                                <div class="progress" style="width: ${porcentaje}%"></div>
                            </div>
                            <span>${entregadas}/${total}</span>
                        </div>
                    </td>
                    <td>
                        <button class="btn-small btn-primary" onclick="ModuloTareasCompletas.calificarTarea('${tarea.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-small btn-secondary" onclick="ModuloTareasCompletas.verDetalles('${tarea.id}')">
                            <i class="fas fa-eye"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
        
        html += `
                </tbody>
            </table>
        `;
        
        container.innerHTML = html;
    }
    
    static mostrarModalNuevaTarea() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-plus-circle"></i> Nueva Tarea</h3>
                    <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="form-nueva-tarea">
                        <div class="form-group">
                            <label class="form-label">Título de la Tarea *</label>
                            <input type="text" class="form-input" id="tarea-titulo" required 
                                   placeholder="Ej: Investigación sobre algoritmos">
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Descripción</label>
                            <textarea class="form-textarea" id="tarea-descripcion" rows="3"
                                      placeholder="Describa los detalles de la tarea..."></textarea>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Área del PNFT</label>
                            <select class="form-select" id="tarea-area">
                                <option value="">General</option>
                                <option value="Apropiación tecnológica y Digital">Apropiación tecnológica</option>
                                <option value="Programación y Algoritmos">Programación y Algoritmos</option>
                                <option value="Computación física y Robótica">Computación física</option>
                                <option value="Ciencia de datos e Inteligencia artificial">Ciencia de datos</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Grados</label>
                            <div class="checkbox-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" id="tarea-todos-grados" checked> Todos los grados
                                </label>
                                <div id="lista-grados-tarea" class="mt-2" style="display: none;">
                                    <label class="checkbox-label">
                                        <input type="checkbox" name="grado" value="7°"> 7° Grado
                                    </label>
                                    <label class="checkbox-label">
                                        <input type="checkbox" name="grado" value="8°"> 8° Grado
                                    </label>
                                    <label class="checkbox-label">
                                        <input type="checkbox" name="grado" value="9°"> 9° Grado
                                    </label>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Fecha de Entrega *</label>
                            <input type="date" class="form-input" id="tarea-fecha" required 
                                   value="${new Date().toISOString().split('T')[0]}">
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Puntaje Máximo *</label>
                            <input type="number" class="form-input" id="tarea-puntaje" 
                                   min="1" max="100" value="100" required>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Indicadores relacionados (opcional)</label>
                            <select class="form-select" id="tarea-indicadores" multiple>
                                <option value="">Seleccionar indicadores...</option>
                            </select>
                            <small class="text-muted">Mantenga CTRL para seleccionar múltiples</small>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal').remove()">Cancelar</button>
                    <button class="btn-primary" onclick="ModuloTareasCompletas.crearTarea()">Crear Tarea</button>
                </div>
            </div>
        `;
        
        document.getElementById('modal-container').appendChild(modal);
        
        // Configurar eventos
        document.getElementById('tarea-todos-grados').addEventListener('change', function() {
            document.getElementById('lista-grados-tarea').style.display = 
                this.checked ? 'none' : 'block';
        });
    }
    
    static crearTarea() {
        const titulo = document.getElementById('tarea-titulo').value;
        const descripcion = document.getElementById('tarea-descripcion').value;
        const area = document.getElementById('tarea-area').value;
        const fecha = document.getElementById('tarea-fecha').value;
        const puntaje = parseInt(document.getElementById('tarea-puntaje').value);
        
        if (!titulo || !fecha || !puntaje) {
            window.sistema.mostrarNotificacion('Complete los campos obligatorios', 'warning');
            return;
        }
        
        // Obtener grados seleccionados
        let grados = [];
        if (!document.getElementById('tarea-todos-grados').checked) {
            const checkboxes = document.querySelectorAll('input[name="grado"]:checked');
            checkboxes.forEach(cb => grados.push(cb.value));
        }
        
        const nuevaTarea = {
            id: 'tarea_' + Date.now(),
            titulo: titulo,
            descripcion: descripcion,
            area: area,
            grados: grados,
            fechaEntrega: fecha,
            fechaCreacion: new Date().toISOString().split('T')[0],
            puntajeMaximo: puntaje,
            estado: 'pendiente',
            entregas: {}
        };
        
        // Inicializar entregas para estudiantes relevantes
        const estudiantes = window.sistema.estudiantes;
        estudiantes.forEach(est => {
            if (grados.length === 0 || grados.includes(est.grado)) {
                nuevaTarea.entregas[est.id] = {
                    entregada: false,
                    puntaje: 0,
                    fechaEntrega: null,
                    comentario: ''
                };
            }
        });
        
        const modulo = new ModuloTareasCompletas();
        modulo.tareas.push(nuevaTarea);
        modulo.guardarTareas();
        modulo.cargarListaTareas();
        modulo.actualizarEstadisticas();
        
        document.querySelector('.modal').remove();
        window.sistema.mostrarNotificacion(`Tarea "${titulo}" creada exitosamente`, 'success');
    }
    
    static calificarTarea(tareaId) {
        const modulo = new ModuloTareasCompletas();
        const tarea = modulo.tareas.find(t => t.id === tareaId);
        if (!tarea) return;
        
        const estudiantes = window.sistema.estudiantes.filter(est => 
            !tarea.grados || tarea.grados.length === 0 || tarea.grados.includes(est.grado)
        );
        
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 900px;">
                <div class="modal-header">
                    <h3><i class="fas fa-graduation-cap"></i> Calificar: ${tarea.titulo}</h3>
                    <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="tarea-info mb-4">
                        <p><strong>Puntaje máximo:</strong> ${tarea.puntajeMaximo} puntos</p>
                        <p><strong>Fecha de entrega:</strong> ${tarea.fechaEntrega}</p>
                    </div>
                    
                    <div class="table-responsive">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Estudiante</th>
                                    <th>Grado</th>
                                    <th>Entregada</th>
                                    <th>Puntaje (0-${tarea.puntajeMaximo})</th>
                                    <th>%</th>
                                    <th>Comentario</th>
                                </tr>
                            </thead>
                            <tbody id="lista-calificaciones-tarea">
                                <!-- Se llena dinámicamente -->
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal').remove()">Cancelar</button>
                    <button class="btn-primary" onclick="ModuloTareasCompletas.guardarCalificacionesTarea('${tareaId}')">
                        <i class="fas fa-save"></i> Guardar Calificaciones
                    </button>
                </div>
            </div>
        `;
        
        document.getElementById('modal-container').appendChild(modal);
        
        // Llenar tabla
        const tbody = document.getElementById('lista-calificaciones-tarea');
        tbody.innerHTML = '';
        
        estudiantes.forEach(est => {
            const entrega = tarea.entregas[est.id] || {
                entregada: false,
                puntaje: 0,
                comentario: ''
            };
            
            const porcentaje = tarea.puntajeMaximo > 0 
                ? Math.round((entrega.puntaje / tarea.puntajeMaximo) * 100) 
                : 0;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${est.nombre}</strong></td>
                <td>${est.grado}</td>
                <td>
                    <label class="checkbox-label">
                        <input type="checkbox" 
                               data-estudiante="${est.id}"
                               ${entrega.entregada ? 'checked' : ''}>
                    </label>
                </td>
                <td>
                    <input type="number" 
                           class="form-input small" 
                           min="0" 
                           max="${tarea.puntajeMaximo}"
                           value="${entrega.puntaje}"
                           data-estudiante="${est.id}">
                </td>
                <td>
                    <span class="badge ${porcentaje >= 70 ? 'badge-success' : porcentaje >= 60 ? 'badge-warning' : 'badge-danger'}">
                        ${porcentaje}%
                    </span>
                </td>
                <td>
                    <input type="text" 
                           class="form-input small" 
                           placeholder="Comentario..."
                           value="${entrega.comentario || ''}"
                           data-estudiante="${est.id}">
                </td>
            `;
            tbody.appendChild(row);
        });
    }
    
    static guardarCalificacionesTarea(tareaId) {
        const modulo = new ModuloTareasCompletas();
        const tarea = modulo.tareas.find(t => t.id === tareaId);
        if (!tarea) return;
        
        const inputs = document.querySelectorAll('#lista-calificaciones-tarea input');
        
        inputs.forEach(input => {
            const estudianteId = input.dataset.estudiante;
            if (!tarea.entregas[estudianteId]) return;
            
            if (input.type === 'checkbox') {
                tarea.entregas[estudianteId].entregada = input.checked;
            } else if (input.type === 'number') {
                tarea.entregas[estudianteId].puntaje = parseInt(input.value) || 0;
            } else if (input.type === 'text') {
                tarea.entregas[estudianteId].comentario = input.value;
            }
        });
        
        // Actualizar estado de la tarea
        const entregadas = Object.values(tarea.entregas).filter(e => e.entregada).length;
        const total = Object.keys(tarea.entregas).length;
        
        if (entregadas === total) {
            tarea.estado = 'completada';
        } else if (entregadas > 0) {
            tarea.estado = 'en progreso';
        }
        
        modulo.guardarTareas();
        modulo.cargarListaTareas();
        modulo.actualizarEstadisticas();
        
        document.querySelector('.modal').remove();
        window.sistema.mostrarNotificacion('Calificaciones guardadas exitosamente', 'success');
    }
    
    static verDetalles(tareaId) {
        const modulo = new ModuloTareasCompletas();
        const tarea = modulo.tareas.find(t => t.id === tareaId);
        if (!tarea) return;
        
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-info-circle"></i> Detalles de Tarea</h3>
                    <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <h4>${tarea.titulo}</h4>
                    <p>${tarea.descripcion || 'Sin descripción'}</p>
                    
                    <div class="detalles-grid mt-4">
                        <div class="detalle-item">
                            <strong>Área:</strong> ${tarea.area || 'General'}
                        </div>
                        <div class="detalle-item">
                            <strong>Fecha Entrega:</strong> ${tarea.fechaEntrega}
                        </div>
                        <div class="detalle-item">
                            <strong>Puntaje Máximo:</strong> ${tarea.puntajeMaximo}
                        </div>
                        <div class="detalle-item">
                            <strong>Estado:</strong> ${tarea.estado}
                        </div>
                    </div>
                    
                    <div class="mt-4">
                        <h5>Estadísticas</h5>
                        <p>Entregadas: ${Object.values(tarea.entregas).filter(e => e.entregada).length} / ${Object.keys(tarea.entregas).length}</p>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('modal-container').appendChild(modal);
    }
    
    static generarReporteTareas() {
        const modulo = new ModuloTareasCompletas();
        
        if (modulo.tareas.length === 0) {
            window.sistema.mostrarNotificacion('No hay tareas para generar reporte', 'warning');
            return;
        }
        
        // Crear contenido CSV para el reporte
        let csv = 'Estudiante,Grado,Tarea,Puntaje Obtenido,Puntaje Máximo,Porcentaje,Estado,Comentario\n';
        
        window.sistema.estudiantes.forEach(est => {
            modulo.tareas.forEach(tarea => {
                const entrega = tarea.entregas[est.id];
                if (entrega && entrega.entregada) {
                    const porcentaje = tarea.puntajeMaximo > 0 
                        ? (entrega.puntaje / tarea.puntajeMaximo * 100).toFixed(2) 
                        : '0';
                    
                    csv += `${est.nombre},${est.grado},"${tarea.titulo}",${entrega.puntaje},${tarea.puntajeMaximo},${porcentaje}%,${tarea.estado},"${entrega.comentario || ''}"\n`;
                }
            });
        });
        
        // Descargar archivo
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reporte_tareas_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        
        window.sistema.mostrarNotificacion('Reporte de tareas generado exitosamente', 'success');
    }
    
    actualizarEstadisticas() {
        const totalTareas = this.tareas.length;
        const tareasCalificadas = this.tareas.filter(t => 
            Object.values(t.entregas).some(e => e.entregada && e.puntaje > 0)
        ).length;
        
        const porcentajeCalificadas = totalTareas > 0 
            ? Math.round((tareasCalificadas / totalTareas) * 100) 
            : 0;
        
        const tareasPendientes = this.tareas.filter(t => t.estado === 'pendiente').length;
        
        document.getElementById('total-tareas').textContent = totalTareas;
        document.getElementById('tareas-calificadas').textContent = porcentajeCalificadas + '%';
        document.getElementById('tareas-pendientes').textContent = tareasPendientes;
    }
    
    calcularNotaTareasEstudiante(estudianteId) {
        let totalPuntosObtenidos = 0;
        let totalPuntosPosibles = 0;
        
        this.tareas.forEach(tarea => {
            const entrega = tarea.entregas[estudianteId];
            if (entrega && entrega.entregada) {
                totalPuntosObtenidos += entrega.puntaje;
                totalPuntosPosibles += tarea.puntajeMaximo;
            }
        });
        
        if (totalPuntosPosibles === 0) return 0;
        
        return (totalPuntosObtenidos / totalPuntosPosibles) * 100;
    }
    
    guardarTareas() {
        try {
            localStorage.setItem('ftmep_tareas_completas', JSON.stringify(this.tareas));
            
            // También actualizar en el sistema principal
            window.sistema.calificaciones.tareas = this.tareas;
            window.sistema.guardarDatos();
            
        } catch (error) {
            console.error('Error guardando tareas:', error);
        }
    }
    
    cargarTareasGuardadas() {
        try {
            const guardado = localStorage.getItem('ftmep_tareas_completas');
            if (guardado) {
                this.tareas = JSON.parse(guardado);
                console.log(`✅ ${this.tareas.length} tareas cargadas`);
            }
        } catch (error) {
            console.error('Error cargando tareas:', error);
        }
    }
}

// Hacer disponible globalmente
window.ModuloTareasCompletas = ModuloTareasCompletas;
