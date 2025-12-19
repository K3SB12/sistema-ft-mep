// ==============================================
// MÓDULO DE TRABAJO COTIDIANO - 100% FUNCIONAL
// ==============================================

class ModuloCotidianoCompleto {
    constructor() {
        this.cicloActual = 'III Ciclo';
        this.gradoSeleccionado = '7°';
        this.areaSeleccionada = 'Apropiación tecnológica y Digital';
        this.indicadores = [];
        this.calificaciones = {};
    }
    
    cargarInterfaz() {
        const section = document.getElementById('cotidiano');
        if (!section) return;
        
        section.innerHTML = `
            <div class="section-header">
                <h2><i class="fas fa-clipboard-check"></i> Trabajo Cotidiano</h2>
                <div class="header-actions">
                    <button class="btn-primary" onclick="ModuloCotidianoCompleto.guardarEvaluacion()">
                        <i class="fas fa-save"></i> Guardar Evaluación
                    </button>
                    <button class="btn-secondary" onclick="ModuloCotidianoCompleto.limpiarEvaluacion()">
                        <i class="fas fa-broom"></i> Limpiar
                    </button>
                </div>
            </div>
            
            <!-- Selectores -->
            <div class="selectores-grid">
                <div class="selector-card">
                    <h4><i class="fas fa-filter"></i> Filtros de Evaluación</h4>
                    
                    <div class="form-group">
                        <label class="form-label">Grado</label>
                        <select class="form-select" id="selector-grado" onchange="ModuloCotidianoCompleto.cambiarGrado()">
                            <option value="">Seleccionar grado...</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Área del PNFT</label>
                        <select class="form-select" id="selector-area" onchange="ModuloCotidianoCompleto.cambiarArea()">
                            <option value="">Seleccionar área...</option>
                            <option value="Apropiación tecnológica y Digital">Apropiación tecnológica</option>
                            <option value="Programación y Algoritmos">Programación y Algoritmos</option>
                            <option value="Computación física y Robótica">Computación física</option>
                            <option value="Ciencia de datos e Inteligencia artificial">Ciencia de datos</option>
                        </select>
                    </div>
                    
                    <div class="info-box">
                        <p><strong>Porcentaje:</strong> <span id="porcentaje-tc-actual">50%</span></p>
                        <p><strong>Indicadores:</strong> <span id="contador-indicadores">0</span></p>
                    </div>
                </div>
                
                <div class="info-card">
                    <h4><i class="fas fa-info-circle"></i> Información</h4>
                    <p>Califique cada indicador usando la escala:</p>
                    <div class="escala-info">
                        <span class="badge calificacion-3">Alto (3)</span>
                        <span class="badge calificacion-2">Medio (2)</span>
                        <span class="badge calificacion-1">Bajo (1)</span>
                    </div>
                    <p class="mt-3">Haga clic en cualquier celda para calificar.</p>
                </div>
            </div>
            
            <!-- Tabla de Evaluación -->
            <div class="table-card" id="contenedor-tabla">
                <div class="loading" id="loading-tabla">
                    <i class="fas fa-spinner fa-spin"></i>
                    <p>Seleccione grado y área para cargar indicadores</p>
                </div>
            </div>
        `;
        
        this.inicializarSelectores();
        this.cargarDatosGuardados();
    }
    
    inicializarSelectores() {
        // Obtener ciclo actual del sistema
        this.cicloActual = document.getElementById('ciclo-actual').textContent;
        
        // Cargar grados disponibles para este ciclo
        const grados = obtenerTodosGradosPorCiclo(this.cicloActual);
        const selectGrado = document.getElementById('selector-grado');
        
        selectGrado.innerHTML = '<option value="">Seleccionar grado...</option>';
        grados.forEach(grado => {
            const option = document.createElement('option');
            option.value = grado;
            option.textContent = grado;
            if (grado === '7°') option.selected = true;
            selectGrado.appendChild(option);
        });
        
        // Establecer valores por defecto
        this.gradoSeleccionado = '7°';
        this.areaSeleccionada = 'Apropiación tecnológica y Digital';
        
        document.getElementById('selector-area').value = this.areaSeleccionada;
        
        // Actualizar porcentaje según ciclo
        this.actualizarPorcentajeTC();
        
        // Cargar indicadores
        this.cargarIndicadores();
    }
    
    actualizarPorcentajeTC() {
        let porcentaje = 50; // Por defecto III Ciclo
        
        if (this.cicloActual === 'I Ciclo') porcentaje = 65;
        else if (this.cicloActual === 'II Ciclo') porcentaje = 60;
        
        document.getElementById('porcentaje-tc-actual').textContent = porcentaje + '%';
    }
    
    cargarIndicadores() {
        if (!this.gradoSeleccionado || !this.areaSeleccionada) {
            document.getElementById('contenedor-tabla').innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-filter"></i>
                    <p>Seleccione grado y área para cargar los indicadores</p>
                </div>
            `;
            return;
        }
        
        // Obtener indicadores de la base de datos
        this.indicadores = obtenerIndicadoresPorCicloYGrado(
            this.cicloActual,
            this.gradoSeleccionado,
            this.areaSeleccionada
        );
        
        document.getElementById('contador-indicadores').textContent = this.indicadores.length;
        
        if (this.indicadores.length === 0) {
            document.getElementById('contenedor-tabla').innerHTML = `
                <div class="warning-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>No hay indicadores definidos para esta combinación de grado y área.</p>
                    <p>Seleccione otra área o verifique los datos del PNFT.</p>
                </div>
            `;
            return;
        }
        
        this.generarTablaEvaluacion();
    }
    
    generarTablaEvaluacion() {
        const estudiantes = window.sistema.estudiantes.filter(e => 
            e.grado === this.gradoSeleccionado.replace('°', '°') || 
            e.grado === this.gradoSeleccionado
        );
        
        if (estudiantes.length === 0) {
            document.getElementById('contenedor-tabla').innerHTML = `
                <div class="warning-message">
                    <i class="fas fa-users-slash"></i>
                    <p>No hay estudiantes en el grado ${this.gradoSeleccionado}.</p>
                    <button class="btn-primary mt-3" onclick="cargarSeccion('estudiantes')">
                        <i class="fas fa-user-plus"></i> Agregar Estudiantes
                    </button>
                </div>
            `;
            return;
        }
        
        let html = `
            <div class="table-tools">
                <div class="table-info">
                    <h4>${this.areaSeleccionada} - ${this.gradoSeleccionado}</h4>
                    <p>${estudiantes.length} estudiantes, ${this.indicadores.length} indicadores</p>
                </div>
                <div class="table-actions">
                    <button class="btn-small" onclick="ModuloCotidianoCompleto.calificarTodo(3)">
                        <i class="fas fa-check-circle"></i> Calificar Todo Alto
                    </button>
                    <button class="btn-small" onclick="ModuloCotidianoCompleto.calificarTodo(2)">
                        <i class="fas fa-minus-circle"></i> Calificar Todo Medio
                    </button>
                </div>
            </div>
            
            <div class="table-responsive">
                <table class="data-table tabla-evaluacion">
                    <thead>
                        <tr>
                            <th rowspan="2">Estudiante</th>
                            <th colspan="${this.indicadores.length}">Indicadores</th>
                            <th rowspan="2">Promedio</th>
                            <th rowspan="2">% TC</th>
                        </tr>
                        <tr>
        `;
        
        // Encabezados de indicadores
        this.indicadores.forEach(ind => {
            html += `<th title="${ind.descriptor}">${ind.codigo}</th>`;
        });
        
        html += `
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        // Filas de estudiantes
        estudiantes.forEach(est => {
            const estudianteId = est.id;
            html += `<tr data-estudiante="${estudianteId}">`;
            html += `<td><strong>${est.nombre}</strong></td>`;
            
            // Celdas de indicadores
            this.indicadores.forEach(ind => {
                const calificacion = this.obtenerCalificacion(estudianteId, ind.id);
                html += this.generarCeldaCalificacion(estudianteId, ind.id, calificacion, ind);
            });
            
            // Promedio y porcentaje
            const promedio = this.calcularPromedioEstudiante(estudianteId);
            const porcentajeTC = this.calcularPorcentajeTC(promedio);
            
            html += `
                <td class="text-center"><strong>${promedio.toFixed(2)}</strong></td>
                <td class="text-center">${porcentajeTC.toFixed(2)}%</td>
            `;
            
            html += `</tr>`;
        });
        
        // Fila de promedios por indicador
        html += `
                        <tr class="promedios-fila">
                            <td><strong>Promedio</strong></td>
        `;
        
        this.indicadores.forEach(ind => {
            const promedioInd = this.calcularPromedioIndicador(ind.id);
            html += `<td class="text-center"><strong>${promedioInd.toFixed(2)}</strong></td>`;
        });
        
        html += `
                            <td colspan="2"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="table-footer">
                <div class="leyenda">
                    <span class="leyenda-item"><span class="badge calificacion-3"></span> Alto (3)</span>
                    <span class="leyenda-item"><span class="badge calificacion-2"></span> Medio (2)</span>
                    <span class="leyenda-item"><span class="badge calificacion-1"></span> Bajo (1)</span>
                </div>
            </div>
        `;
        
        document.getElementById('contenedor-tabla').innerHTML = html;
    }
    
    generarCeldaCalificacion(estudianteId, indicadorId, calificacion, indicador) {
        let clase = 'celda-calificacion';
        let texto = '';
        
        if (calificacion === 3) {
            clase += ' calificacion-3';
            texto = '3';
        } else if (calificacion === 2) {
            clase += ' calificacion-2';
            texto = '2';
        } else if (calificacion === 1) {
            clase += ' calificacion-1';
            texto = '1';
        }
        
        return `
            <td class="${clase}" 
                data-estudiante="${estudianteId}"
                data-indicador="${indicadorId}"
                onclick="ModuloCotidianoCompleto.mostrarSelectorCalificacion(this, '${indicador.descriptor}', '${indicador.criterios[3]}', '${indicador.criterios[2]}', '${indicador.criterios[1]}')">
                ${texto || '—'}
            </td>
        `;
    }
    
    static mostrarSelectorCalificacion(celda, descriptor, alto, medio, bajo) {
        const estudianteId = celda.dataset.estudiante;
        const indicadorId = celda.dataset.indicador;
        
        const estudiante = window.sistema.estudiantes.find(e => e.id == estudianteId);
        if (!estudiante) return;
        
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-edit"></i> Calificar Indicador</h3>
                    <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="calificacion-info">
                        <p><strong>Estudiante:</strong> ${estudiante.nombre}</p>
                        <p><strong>Indicador:</strong> ${descriptor}</p>
                    </div>
                    
                    <div class="criterios-evaluacion">
                        <h4>Criterios de Evaluación</h4>
                        <div class="criterio-item criterio-alto">
                            <div class="criterio-header">
                                <span class="badge calificacion-3">Alto (3)</span>
                                <button class="btn-small" onclick="ModuloCotidianoCompleto.asignarCalificacion(${estudianteId}, '${indicadorId}', 3)">Seleccionar</button>
                            </div>
                            <p class="criterio-desc">${alto}</p>
                        </div>
                        
                        <div class="criterio-item criterio-medio">
                            <div class="criterio-header">
                                <span class="badge calificacion-2">Medio (2)</span>
                                <button class="btn-small" onclick="ModuloCotidianoCompleto.asignarCalificacion(${estudianteId}, '${indicadorId}', 2)">Seleccionar</button>
                            </div>
                            <p class="criterio-desc">${medio}</p>
                        </div>
                        
                        <div class="criterio-item criterio-bajo">
                            <div class="criterio-header">
                                <span class="badge calificacion-1">Bajo (1)</span>
                                <button class="btn-small" onclick="ModuloCotidianoCompleto.asignarCalificacion(${estudianteId}, '${indicadorId}', 1)">Seleccionar</button>
                            </div>
                            <p class="criterio-desc">${bajo}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('modal-container').appendChild(modal);
    }
    
    static asignarCalificacion(estudianteId, indicadorId, calificacion) {
        const modulo = new ModuloCotidianoCompleto();
        
        // Guardar en memoria
        if (!modulo.calificaciones[estudianteId]) {
            modulo.calificaciones[estudianteId] = {};
        }
        modulo.calificaciones[estudianteId][indicadorId] = calificacion;
        
        // Actualizar celda en la tabla
        const celda = document.querySelector(`[data-estudiante="${estudianteId}"][data-indicador="${indicadorId}"]`);
        if (celda) {
            celda.className = `celda-calificacion calificacion-${calificacion}`;
            celda.textContent = calificacion;
        }
        
        // Actualizar promedios del estudiante
        modulo.actualizarPromediosEstudiante(estudianteId);
        
        // Actualizar promedio del indicador
        modulo.actualizarPromedioIndicador(indicadorId);
        
        // Cerrar modal
        document.querySelector('.modal').remove();
        
        window.sistema.mostrarNotificacion('Calificación guardada', 'success');
    }
    
    actualizarPromediosEstudiante(estudianteId) {
        const fila = document.querySelector(`[data-estudiante="${estudianteId}"]`);
        if (!fila) return;
        
        const promedio = this.calcularPromedioEstudiante(estudianteId);
        const porcentajeTC = this.calcularPorcentajeTC(promedio);
        
        const celdas = fila.querySelectorAll('td');
        const ultimaCelda = celdas[celdas.length - 2];
        const penultimaCelda = celdas[celdas.length - 3];
        
        if (penultimaCelda) {
            penultimaCelda.innerHTML = `<strong>${promedio.toFixed(2)}</strong>`;
        }
        if (ultimaCelda) {
            ultimaCelda.innerHTML = `${porcentajeTC.toFixed(2)}%`;
        }
    }
    
    actualizarPromedioIndicador(indicadorId) {
        const promedio = this.calcularPromedioIndicador(indicadorId);
        
        // Encontrar la celda en la fila de promedios
        const indicadorIndex = this.indicadores.findIndex(ind => ind.id === indicadorId);
        if (indicadorIndex === -1) return;
        
        const filaPromedios = document.querySelector('.promedios-fila');
        if (!filaPromedios) return;
        
        const celdas = filaPromedios.querySelectorAll('td');
        if (celdas[indicadorIndex + 1]) {
            celdas[indicadorIndex + 1].innerHTML = `<strong>${promedio.toFixed(2)}</strong>`;
        }
    }
    
    calcularPromedioEstudiante(estudianteId) {
        const califsEstudiante = this.calificaciones[estudianteId];
        if (!califsEstudiante || Object.keys(califsEstudiante).length === 0) return 0;
        
        const valores = Object.values(califsEstudiante);
        const suma = valores.reduce((a, b) => a + b, 0);
        return suma / valores.length;
    }
    
    calcularPromedioIndicador(indicadorId) {
        let suma = 0;
        let count = 0;
        
        Object.keys(this.calificaciones).forEach(estId => {
            const calif = this.calificaciones[estId][indicadorId];
            if (calif) {
                suma += calif;
                count++;
            }
        });
        
        return count > 0 ? suma / count : 0;
    }
    
    calcularPorcentajeTC(promedio) {
        let porcentajeTC = 50; // III Ciclo por defecto
        
        if (this.cicloActual === 'I Ciclo') porcentajeTC = 65;
        else if (this.cicloActual === 'II Ciclo') porcentajeTC = 60;
        
        // Convertir promedio de 1-3 a porcentaje del componente
        return (promedio / 3) * porcentajeTC;
    }
    
    obtenerCalificacion(estudianteId, indicadorId) {
        return this.calificaciones[estudianteId]?.[indicadorId] || 0;
    }
    
    static cambiarGrado() {
        const select = document.getElementById('selector-grado');
        const modulo = new ModuloCotidianoCompleto();
        modulo.gradoSeleccionado = select.value;
        modulo.cargarIndicadores();
    }
    
    static cambiarArea() {
        const select = document.getElementById('selector-area');
        const modulo = new ModuloCotidianoCompleto();
        modulo.areaSeleccionada = select.value;
        modulo.cargarIndicadores();
    }
    
    static calificarTodo(valor) {
        const modulo = new ModuloCotidianoCompleto();
        
        if (!modulo.gradoSeleccionado || modulo.indicadores.length === 0) {
            window.sistema.mostrarNotificacion('Primero cargue los indicadores', 'warning');
            return;
        }
        
        const estudiantes = window.sistema.estudiantes.filter(e => 
            e.grado === modulo.gradoSeleccionado.replace('°', '°') || 
            e.grado === modulo.gradoSeleccionado
        );
        
        if (!confirm(`¿Calificar TODOS los indicadores de ${estudiantes.length} estudiantes como ${valor === 3 ? 'Alto' : valor === 2 ? 'Medio' : 'Bajo'}?`)) {
            return;
        }
        
        estudiantes.forEach(est => {
            modulo.indicadores.forEach(ind => {
                if (!modulo.calificaciones[est.id]) {
                    modulo.calificaciones[est.id] = {};
                }
                modulo.calificaciones[est.id][ind.id] = valor;
            });
        });
        
        // Regenerar tabla completa
        modulo.generarTablaEvaluacion();
        
        window.sistema.mostrarNotificacion(`Todos los indicadores calificados como ${valor === 3 ? 'Alto' : valor === 2 ? 'Medio' : 'Bajo'}`, 'success');
    }
    
    static guardarEvaluacion() {
        const modulo = new ModuloCotidianoCompleto();
        
        // Guardar en localStorage
        const key = `ftmep_cotidiano_${modulo.cicloActual}_${modulo.gradoSeleccionado}_${modulo.areaSeleccionada}`;
        localStorage.setItem(key, JSON.stringify(modulo.calificaciones));
        
        // También guardar en el sistema principal
        if (!window.sistema.calificaciones.cotidiano[modulo.cicloActual]) {
            window.sistema.calificaciones.cotidiano[modulo.cicloActual] = {};
        }
        if (!window.sistema.calificaciones.cotidiano[modulo.cicloActual][modulo.gradoSeleccionado]) {
            window.sistema.calificaciones.cotidiano[modulo.cicloActual][modulo.gradoSeleccionado] = {};
        }
        window.sistema.calificaciones.cotidiano[modulo.cicloActual][modulo.gradoSeleccionado][modulo.areaSeleccionada] = modulo.calificaciones;
        
        window.sistema.guardarDatos();
        window.sistema.mostrarNotificacion('Evaluación guardada exitosamente', 'success');
    }
    
    static limpiarEvaluacion() {
        if (!confirm('¿Está seguro de limpiar todas las calificaciones de esta evaluación?')) {
            return;
        }
        
        const modulo = new ModuloCotidianoCompleto();
        modulo.calificaciones = {};
        modulo.generarTablaEvaluacion();
        
        window.sistema.mostrarNotificacion('Evaluación limpiada', 'info');
    }
    
    cargarDatosGuardados() {
        try {
            const key = `ftmep_cotidiano_${this.cicloActual}_${this.gradoSeleccionado}_${this.areaSeleccionada}`;
            const guardado = localStorage.getItem(key);
            
            if (guardado) {
                this.calificaciones = JSON.parse(guardado);
                console.log('✅ Calificaciones cargadas:', this.calificaciones);
            }
        } catch (error) {
            console.error('Error cargando calificaciones:', error);
        }
    }
}

// Hacer disponible globalmente
window.ModuloCotidianoCompleto = ModuloCotidianoCompleto;
