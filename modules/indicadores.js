// ==============================================
// MÓDULO DE ESTUDIANTES - Versión simplificada
// ==============================================

class ModuloEstudiantes {
    cargarInterfaz() {
        const section = document.getElementById('estudiantes');
        if (!section) return;
        
        section.innerHTML = `
            <div class="section-header">
                <h2><i class="fas fa-users"></i> Gestión de Estudiantes</h2>
                <div class="header-actions">
                    <button class="btn-primary" onclick="ModuloEstudiantes.mostrarModalAgregar()">
                        <i class="fas fa-user-plus"></i> Agregar Estudiante
                    </button>
                </div>
            </div>
            
            <div class="table-card">
                <div class="table-tools">
                    <div class="search-box">
                        <i class="fas fa-search"></i>
                        <input type="text" id="buscar-estudiante" placeholder="Buscar estudiante..." 
                               onkeyup="ModuloEstudiantes.buscar()">
                    </div>
                    <div class="table-actions">
                        <button class="btn-small" onclick="ModuloEstudiantes.exportarLista()">
                            <i class="fas fa-file-export"></i> Exportar
                        </button>
                    </div>
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
        if (!tbody || !window.sistema || !window.sistema.estudiantes) return;
        
        tbody.innerHTML = '';
        
        window.sistema.estudiantes.forEach((est, index) => {
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
                    <button class="btn-small" onclick="ModuloEstudiantes.editar(${est.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-small btn-danger" onclick="ModuloEstudiantes.eliminar(${est.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
        
        const contador = document.getElementById('contador-estudiantes');
        if (contador) {
            contador.textContent = `${window.sistema.estudiantes.length} estudiantes`;
        }
    }
    
    static mostrarModalAgregar() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-user-plus"></i> Agregar Estudiante</h3>
                    <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="form-agregar-estudiante">
                        <div class="form-group">
                            <label class="form-label">Identificación</label>
                            <input type="text" class="form-input" id="est-identificacion">
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Nombre Completo *</label>
                            <input type="text" class="form-input" id="est-nombre" required>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Grado *</label>
                            <select class="form-select" id="est-grado" required>
                                <option value="">Seleccionar grado...</option>
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
                    <button class="btn-primary" onclick="ModuloEstudiantes.guardarNuevo()">Guardar</button>
                </div>
            </div>
        `;
        
        document.getElementById('modal-container').appendChild(modal);
    }
    
    static guardarNuevo() {
        const nombre = document.getElementById('est-nombre').value;
        const grado = document.getElementById('est-grado').value;
        const identificacion = document.getElementById('est-identificacion').value;
        const estado = document.getElementById('est-estado').value;
        
        if (!nombre || !grado) {
            alert('Complete los campos obligatorios');
            return;
        }
        
        const nuevoEstudiante = {
            id: Date.now(),
            identificacion: identificacion,
            nombre: nombre,
            grado: grado,
            estado: estado || 'Activo'
        };
        
        if (window.sistema && window.sistema.estudiantes) {
            window.sistema.estudiantes.push(nuevoEstudiante);
            
            // Actualizar dashboard
            if (window.sistema.actualizarDashboard) {
                window.sistema.actualizarDashboard();
            }
            
            // Recargar lista
            new ModuloEstudiantes().cargarListaEstudiantes();
        }
        
        document.querySelector('.modal').remove();
        alert('Estudiante agregado exitosamente');
    }
    
    static editar(id) {
        const estudiante = window.sistema?.estudiantes?.find(e => e.id === id);
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
                    <button class="btn-primary" onclick="ModuloEstudiantes.guardarEdicion(${id})">Actualizar</button>
                </div>
            </div>
        `;
        
        document.getElementById('modal-container').appendChild(modal);
    }
    
    static guardarEdicion(id) {
        const estudianteIndex = window.sistema?.estudiantes?.findIndex(e => e.id === id);
        if (estudianteIndex === -1) return;
        
        window.sistema.estudiantes[estudianteIndex] = {
            ...window.sistema.estudiantes[estudianteIndex],
            identificacion: document.getElementById('edit-identificacion').value,
            nombre: document.getElementById('edit-nombre').value,
            grado: document.getElementById('edit-grado').value,
            estado: document.getElementById('edit-estado').value
        };
        
        // Recargar lista
        new ModuloEstudiantes().cargarListaEstudiantes();
        
        document.querySelector('.modal').remove();
        alert('Estudiante actualizado');
    }
    
    static eliminar(id) {
        if (!confirm('¿Está seguro de eliminar este estudiante?')) return;
        
        if (window.sistema && window.sistema.estudiantes) {
            window.sistema.estudiantes = window.sistema.estudiantes.filter(e => e.id !== id);
            
            // Recargar lista
            new ModuloEstudiantes().cargarListaEstudiantes();
            
            // Actualizar dashboard
            if (window.sistema.actualizarDashboard) {
                window.sistema.actualizarDashboard();
            }
        }
        
        alert('Estudiante eliminado');
    }
    
    static buscar() {
        const termino = document.getElementById('buscar-estudiante').value.toLowerCase();
        const filas = document.querySelectorAll('#tbody-estudiantes tr');
        
        filas.forEach(fila => {
            const texto = fila.textContent.toLowerCase();
            fila.style.display = texto.includes(termino) ? '' : 'none';
        });
    }
    
    static exportarLista() {
        if (!window.sistema?.estudiantes) return;
        
        let csv = 'ID,Nombre,Grado,Estado,Identificación\n';
        
        window.sistema.estudiantes.forEach(est => {
            csv += `${est.id},"${est.nombre}",${est.grado},${est.estado},${est.identificacion || ''}\n`;
        });
        
        // Descargar archivo
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `estudiantes_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        
        alert('Lista exportada exitosamente');
    }
}

// Hacer disponible globalmente
window.ModuloEstudiantes = ModuloEstudiantes;
