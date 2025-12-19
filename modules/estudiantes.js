// ==============================================
// MÓDULO DE GESTIÓN DE ESTUDIANTES
// ==============================================

class ModuloEstudiantes {
    constructor() {
        this.estudiantes = window.sistema?.estudiantes || [];
    }
    
    cargarInterfaz() {
        const section = document.getElementById('estudiantes');
        if (!section) return;
        
        section.innerHTML = `
            <div class="section-header">
                <h2><i class="fas fa-users"></i> Gestión de Estudiantes</h2>
                <div class="header-actions">
                    <button class="btn-secondary" onclick="ModuloEstudiantes.importarDesdeExcel()">
                        <i class="fas fa-file-import"></i> Importar Excel
                    </button>
                    <button class="btn-primary" onclick="ModuloEstudiantes.agregarEstudiante()">
                        <i class="fas fa-user-plus"></i> Agregar Estudiante
                    </button>
                </div>
            </div>
            
            <div class="table-card">
                <div class="table-tools">
                    <div class="search-box">
                        <i class="fas fa-search"></i>
                        <input type="text" id="buscar-estudiante" placeholder="Buscar estudiante..." 
                               onkeyup="ModuloEstudiantes.filtrarEstudiantes()">
                    </div>
                    <button class="btn-small" onclick="ModuloEstudiantes.exportarLista()">
                        <i class="fas fa-file-export"></i> Exportar
                    </button>
                </div>
                
                <div class="table-responsive">
                    <table class="data-table" id="tabla-estudiantes">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Identificación</th>
                                <th>Nombre Completo</th>
                                <th>Grado</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="tbody-estudiantes">
                            <!-- Se llena dinámicamente -->
                        </tbody>
                    </table>
                </div>
                
                <div class="table-footer">
                    <span id="contador-estudiantes">0 estudiantes</span>
                </div>
            </div>
        `;
        
        this.cargarListaEstudiantes();
    }
    
    cargarListaEstudiantes() {
        const tbody = document.getElementById('tbody-estudiantes');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        this.estudiantes.forEach((est, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${est.identificacion || 'Sin ID'}</td>
                <td><strong>${est.nombre}</strong></td>
                <td>${est.grado}</td>
                <td>
                    <span class="badge ${est.estado === 'Activo' ? 'badge-success' : 'badge-danger'}">
                        ${est.estado || 'Activo'}
                    </span>
                </td>
                <td>
                    <button class="btn-small" onclick="ModuloEstudiantes.editarEstudiante(${est.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-small btn-danger" onclick="ModuloEstudiantes.eliminarEstudiante(${est.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
        
        document.getElementById('contador-estudiantes').textContent = 
            `${this.estudiantes.length} estudiantes`;
    }
    
    static agregarEstudiante() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-user-plus"></i> Agregar Estudiante</h3>
                    <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="form-estudiante">
                        <div class="form-group">
                            <label class="form-label">Identificación *</label>
                            <input type="text" class="form-input" id="est-identificacion" required>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Nombre Completo *</label>
                            <input type="text" class="form-input" id="est-nombre" required>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Grado *</label>
                            <select class="form-select" id="est-grado" required>
                                <option value="">Seleccionar grado...</option>
                                <option value="Materno">Materno Infantil</option>
                                <option value="1°">1° Grado</option>
                                <option value="2°">2° Grado</option>
                                <option value="3°">3° Grado</option>
                                <option value="4°">4° Grado</option>
                                <option value="5°">5° Grado</option>
                                <option value="6°">6° Grado</option>
                                <option value="7°">7° Grado</option>
                                <option value="8°">8° Grado</option>
                                <option value="9°">9° Grado</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Estado</label>
                            <select class="form-select" id="est-estado">
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal').remove()">Cancelar</button>
                    <button class="btn-primary" onclick="ModuloEstudiantes.guardarEstudiante()">Guardar</button>
                </div>
            </div>
        `;
        
        document.getElementById('modal-container').appendChild(modal);
    }
    
    static guardarEstudiante() {
        const id = document.getElementById('est-identificacion').value;
        const nombre = document.getElementById('est-nombre').value;
        const grado = document.getElementById('est-grado').value;
        const estado = document.getElementById('est-estado').value;
        
        if (!id || !nombre || !grado) {
            window.sistema.mostrarNotificacion('Complete todos los campos obligatorios', 'warning');
            return;
        }
        
        const nuevoEstudiante = {
            id: Date.now(),
            identificacion: id,
            nombre: nombre,
            grado: grado,
            estado: estado
        };
        
        window.sistema.estudiantes.push(nuevoEstudiante);
        window.sistema.actualizarDashboard();
        
        // Recargar lista
        const modulo = new ModuloEstudiantes();
        modulo.cargarListaEstudiantes();
        
        document.querySelector('.modal').remove();
        window.sistema.mostrarNotificacion('Estudiante agregado exitosamente', 'success');
    }
    
    static editarEstudiante(id) {
        const estudiante = window.sistema.estudiantes.find(e => e.id === id);
        if (!estudiante) return;
        
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-edit"></i> Editar Estudiante</h3>
                    <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label class="form-label">Identificación</label>
                            <input type="text" class="form-input" id="edit-identificacion" 
                                   value="${estudiante.identificacion || ''}">
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Nombre Completo</label>
                            <input type="text" class="form-input" id="edit-nombre" 
                                   value="${estudiante.nombre}">
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Grado</label>
                            <select class="form-select" id="edit-grado">
                                <option value="Materno" ${estudiante.grado === 'Materno' ? 'selected' : ''}>Materno</option>
                                <option value="1°" ${estudiante.grado === '1°' ? 'selected' : ''}>1°</option>
                                <option value="2°" ${estudiante.grado === '2°' ? 'selected' : ''}>2°</option>
                                <option value="3°" ${estudiante.grado === '3°' ? 'selected' : ''}>3°</option>
                                <option value="4°" ${estudiante.grado === '4°' ? 'selected' : ''}>4°</option>
                                <option value="5°" ${estudiante.grado === '5°' ? 'selected' : ''}>5°</option>
                                <option value="6°" ${estudiante.grado === '6°' ? 'selected' : ''}>6°</option>
                                <option value="7°" ${estudiante.grado === '7°' ? 'selected' : ''}>7°</option>
                                <option value="8°" ${estudiante.grado === '8°' ? 'selected' : ''}>8°</option>
                                <option value="9°" ${estudiante.grado === '9°' ? 'selected' : ''}>9°</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Estado</label>
                            <select class="form-select" id="edit-estado">
                                <option value="Activo" ${estudiante.estado === 'Activo' ? 'selected' : ''}>Activo</option>
                                <option value="Inactivo" ${estudiante.estado === 'Inactivo' ? 'selected' : ''}>Inactivo</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal').remove()">Cancelar</button>
                    <button class="btn-primary" onclick="ModuloEstudiantes.actualizarEstudiante(${id})">Actualizar</button>
                </div>
            </div>
        `;
        
        document.getElementById('modal-container').appendChild(modal);
    }
    
    static actualizarEstudiante(id) {
        const estudianteIndex = window.sistema.estudiantes.findIndex(e => e.id === id);
        if (estudianteIndex === -1) return;
        
        window.sistema.estudiantes[estudianteIndex] = {
            ...window.sistema.estudiantes[estudianteIndex],
            identificacion: document.getElementById('edit-identificacion').value,
            nombre: document.getElementById('edit-nombre').value,
            grado: document.getElementById('edit-grado').value,
            estado: document.getElementById('edit-estado').value
        };
        
        // Recargar lista
        const modulo = new ModuloEstudiantes();
        modulo.cargarListaEstudiantes();
        
        document.querySelector('.modal').remove();
        window.sistema.mostrarNotificacion('Estudiante actualizado', 'success');
    }
    
    static eliminarEstudiante(id) {
        if (!confirm('¿Está seguro de eliminar este estudiante?')) return;
        
        window.sistema.estudiantes = window.sistema.estudiantes.filter(e => e.id !== id);
        
        // Recargar lista
        const modulo = new ModuloEstudiantes();
        modulo.cargarListaEstudiantes();
        
        window.sistema.mostrarNotificacion('Estudiante eliminado', 'success');
    }
    
    static importarDesdeExcel() {
        window.sistema.mostrarNotificacion('Función de importación en desarrollo', 'info');
        // En implementación real, se usaría una librería como SheetJS
    }
    
    static exportarLista() {
        // Crear contenido CSV
        let csv = 'Identificación,Nombre,Grado,Estado\n';
        
        window.sistema.estudiantes.forEach(est => {
            csv += `${est.identificacion || ''},${est.nombre},${est.grado},${est.estado}\n`;
        });
        
        // Descargar archivo
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `estudiantes_ftmep_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        
        window.sistema.mostrarNotificacion('Lista exportada exitosamente', 'success');
    }
    
    static filtrarEstudiantes() {
        const searchTerm = document.getElementById('buscar-estudiante').value.toLowerCase();
        const tbody = document.getElementById('tbody-estudiantes');
        
        if (!tbody) return;
        
        const rows = tbody.getElementsByTagName('tr');
        
        for (let row of rows) {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        }
    }
}

// Hacer disponible globalmente
window.ModuloEstudiantes = ModuloEstudiantes;
