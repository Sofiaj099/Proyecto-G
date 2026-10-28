document.addEventListener('DOMContentLoaded', function () {

    // ==========================================================================
    // 1. DATOS PRECOMPUTADOS Y LOCALSTORAGE (MATERIAS, RECORDATORIOS, OBSERVACIONES)
    // ==========================================================================
    
    // Materias por defecto
    const materiasPredeterminadas = [
        {
            nombre: "Matemáticas",
            clases: [
                { nombre: "Matemáticas 1°A", urlNombre: "Matematicas 1A", alumnos: 28 },
                { nombre: "Matemáticas 2°B", urlNombre: "Matematicas 2B", alumnos: 25 }
            ]
        },
        {
            nombre: "Historia",
            clases: [
                { nombre: "Historia 2°B", urlNombre: "Historia 2B", alumnos: 20 }
            ]
        }
    ];

    // Recordatorios por defecto
    const recordatoriosPredeterminados = [
        { id: 1, titulo: "Entregar calificaciones", fecha: "2026-10-20", descripcion: "Subir notas del primer corte" },
        { id: 2, titulo: "Reunión de profesores", fecha: "2026-10-22", descripcion: "Comité de evaluación" },
        { id: 3, titulo: "Preparar examen Historia", fecha: "2026-10-25", descripcion: "Unidad 3: Revolución Industrial" }
    ];

    // Observaciones iniciales por defecto
    const observacionesPredeterminadas = [
        {
            id: 1,
            claseNombre: "Matematicas 1A",
            fecha: "2026-10-14",
            categoria: "Rendimiento Taller",
            texto: "El grupo mostró excelente rendimiento en el taller de ecuaciones. Pendiente revisar el ejercicio 4 con Carlos y Ana."
        }
    ];

    // Carga de materias guardadas
    function obtenerMaterias() {
        try {
            const guardadas = localStorage.getItem('docentes_materias');
            if (!guardadas) {
                localStorage.setItem('docentes_materias', JSON.stringify(materiasPredeterminadas));
                return materiasPredeterminadas;
            }
            const parseadas = JSON.parse(guardadas);
            return (Array.isArray(parseadas) && parseadas.length > 0) ? parseadas : materiasPredeterminadas;
        } catch (e) {
            localStorage.setItem('docentes_materias', JSON.stringify(materiasPredeterminadas));
            return materiasPredeterminadas;
        }
    }

    function guardarMaterias(lista) {
        localStorage.setItem('docentes_materias', JSON.stringify(lista));
    }

    // Carga de recordatorios ordenados cronológicamente
    function obtenerRecordatorios() {
        try {
            const guardados = localStorage.getItem('docentes_recordatorios');
            let lista = guardados ? JSON.parse(guardados) : recordatoriosPredeterminados;
            if (!Array.isArray(lista)) lista = recordatoriosPredeterminados;
            lista.sort((a, b) => new Date(a.fecha + 'T00:00:00') - new Date(b.fecha + 'T00:00:00'));
            return lista;
        } catch (e) {
            localStorage.setItem('docentes_recordatorios', JSON.stringify(recordatoriosPredeterminados));
            return recordatoriosPredeterminados;
        }
    }

    function guardarRecordatorios(lista) {
        lista.sort((a, b) => new Date(a.fecha + 'T00:00:00') - new Date(b.fecha + 'T00:00:00'));
        localStorage.setItem('docentes_recordatorios', JSON.stringify(lista));
    }

    // Carga de observaciones ordenadas desde la más reciente
    function obtenerObservaciones() {
        try {
            const guardadas = localStorage.getItem('docentes_observaciones');
            let lista = guardadas ? JSON.parse(guardadas) : observacionesPredeterminadas;
            if (!Array.isArray(lista)) lista = observacionesPredeterminadas;
            lista.sort((a, b) => new Date(b.fecha + 'T00:00:00') - new Date(a.fecha + 'T00:00:00'));
            return lista;
        } catch (e) {
            localStorage.setItem('docentes_observaciones', JSON.stringify(observacionesPredeterminadas));
            return observacionesPredeterminadas;
        }
    }

    function guardarObservaciones(lista) {
        lista.sort((a, b) => new Date(b.fecha + 'T00:00:00') - new Date(a.fecha + 'T00:00:00'));
        localStorage.setItem('docentes_observaciones', JSON.stringify(lista));
    }

    // Convierte "2026-10-20" a "Mar, 20/10/2026"
    function formatearFechaConDia(fechaStr) {
        if (!fechaStr) return '';
        const partes = fechaStr.split('-');
        if (partes.length === 3) {
            const fechaObj = new Date(parseInt(partes[0], 10), parseInt(partes[1], 10) - 1, parseInt(partes[2], 10));
            const diaNombre = fechaObj.toLocaleDateString('es-ES', { weekday: 'short' });
            const diaCap = diaNombre.charAt(0).toUpperCase() + diaNombre.slice(1);
            return `${diaCap}, ${partes[2]}/${partes[1]}/${partes[0]}`;
        }
        return fechaStr;
    }

    let indiceMateriaSeleccionada = null;

    // ==========================================================================
    // 2. RENDERIZADO DINÁMICO EN PANTALLAS
    // ==========================================================================

    // Renderiza el panel principal con materias, grupos y sus botones de edición/borrado
    function renderizarPanel() {
        const contenedor = document.getElementById('contenedorMaterias');
        if (!contenedor) return;

        const materias = obtenerMaterias();
        contenedor.innerHTML = '';

        materias.forEach((materia, idx) => {
            const bloque = document.createElement('div');
            bloque.className = 'bloque-materia';

            let htmlClases = '';
            if (materia.clases && materia.clases.length > 0) {
                materia.clases.forEach((clase, cIdx) => {
                    htmlClases += `
                        <div class="tarjeta-clase-wrapper">
                            <a href="ver_clase.php?nombre=${encodeURIComponent(clase.urlNombre)}" class="tarjeta-clase" style="flex: 1;">
                                <h3>${clase.nombre}</h3>
                                <p>${clase.alumnos || 0} Alumnos</p>
                            </a>
                            <button type="button" class="btn-grupo-accion btn-editar-grupo" data-materia-index="${idx}" data-grupo-index="${cIdx}" title="Editar grupo">✏️</button>
                            <button type="button" class="btn-grupo-accion eliminar btn-eliminar-grupo" data-materia-index="${idx}" data-grupo-index="${cIdx}" title="Eliminar grupo">&times;</button>
                        </div>
                    `;
                });
            }

            bloque.innerHTML = `
                <div class="titulo-materia">
                    <span class="flecha">▼</span>
                    <h2>${materia.nombre}</h2>
                    <div class="acciones-materia" style="margin-left: auto; display: flex; gap: 6px;">
                        <button type="button" class="btn-materia-accion btn-editar-materia" data-index="${idx}" title="Editar materia">✏️ Editar</button>
                        <button type="button" class="btn-materia-accion eliminar btn-eliminar-materia" data-index="${idx}" title="Eliminar materia">&times; Borrar</button>
                    </div>
                </div>
                <div class="contenedor-clases">
                    ${htmlClases}
                    <button type="button" class="boton-crear boton-agregar-grupo" data-materia-index="${idx}">
                        <span class="mas">+</span>
                        <span>Agregar grupo</span>
                    </button>
                </div>
            `;
            contenedor.appendChild(bloque);
        });
    }

    // Renderiza la lista en Estudiantes
    function renderizarEstudiantes() {
        const contenedor = document.getElementById('contenedorListaEstudiantes');
        if (!contenedor) return;

        const materias = obtenerMaterias();
        contenedor.innerHTML = '';

        materias.forEach(materia => {
            const bloque = document.createElement('div');
            bloque.className = 'bloque-materia item-busqueda';

            let htmlClases = '';
            if (!materia.clases || materia.clases.length === 0) {
                htmlClases = '<p style="font-size: 0.85rem; color: #666; margin-top: 5px;">No hay grupos creados en esta materia.</p>';
            } else {
                materia.clases.forEach(clase => {
                    htmlClases += `
                        <a href="ver_clase.php?nombre=${encodeURIComponent(clase.urlNombre)}&seccion=sec-estudiantes" class="tarjeta-clase">
                            <h3>${clase.nombre}</h3>
                            <p>Ver lista de alumnos y código QR &rarr;</p>
                        </a>
                    `;
                });
            }

            bloque.innerHTML = `
                <div class="titulo-materia">
                    <span class="flecha">▶</span>
                    <h2>${materia.nombre}</h2>
                </div>
                <div class="contenedor-clases" style="display: none;">
                    ${htmlClases}
                </div>
            `;
            contenedor.appendChild(bloque);
        });
    }

    // Renderiza la lista en Apuntes
    function renderizarApuntes() {
        const contenedor = document.getElementById('contenedorListaApuntes');
        if (!contenedor) return;

        const materias = obtenerMaterias();
        contenedor.innerHTML = '';

        materias.forEach(materia => {
            const bloque = document.createElement('div');
            bloque.className = 'bloque-materia item-busqueda';

            let htmlClases = '';
            if (!materia.clases || materia.clases.length === 0) {
                htmlClases = '<p style="font-size: 0.85rem; color: #666; margin-top: 5px;">No hay grupos creados en esta materia.</p>';
            } else {
                materia.clases.forEach(clase => {
                    htmlClases += `
                        <div class="seccion-detalle" style="margin-top: 10px; border-left: 4px solid #837bb9;">
                            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                                <h3>${clase.nombre}</h3>
                                <a href="ver_clase.php?nombre=${encodeURIComponent(clase.urlNombre)}&seccion=sec-apuntes" class="boton-volver" style="margin:0; font-size:0.85rem;">Ver Clase Completa &rarr;</a>
                            </div>
                            <p style="font-size: 0.85rem; color: #666; margin: 8px 0;"><b>Última observación registrada:</b></p>
                            <blockquote style="background: #fdf4e5; padding: 12px; border-radius: 6px; font-size: 0.9rem; color: #342e57;">
                                "Sin observaciones recientes para esta clase."
                            </blockquote>
                        </div>
                    `;
                });
            }

            bloque.innerHTML = `
                <div class="titulo-materia">
                    <span class="flecha">▶</span>
                    <h2>${materia.nombre}</h2>
                </div>
                <div class="contenedor-clases" style="display: none;">
                    ${htmlClases}
                </div>
            `;
            contenedor.appendChild(bloque);
        });
    }

    // Renderiza la lista de recordatorios
    function renderizarRecordatorios() {
        const rejillaPanel = document.getElementById('rejillaRecordatorios');
        const listaPagina = document.getElementById('listaRecordatorios');

        if (!rejillaPanel && !listaPagina) return;

        const recordatorios = obtenerRecordatorios();
        let html = '';

        if (recordatorios.length === 0) {
            html = '<p style="font-size: 0.9rem; color: #666;">No hay recordatorios pendientes.</p>';
        } else {
            recordatorios.forEach(rec => {
                const fechaFormateada = formatearFechaConDia(rec.fecha);
                html += `
                    <div class="tarjeta-recordatorio">
                        <button type="button" class="btn-eliminar-rec" data-id="${rec.id}" title="Eliminar recordatorio">&times;</button>
                        <h4 style="margin-right: 20px; color: #342e57; font-size: 0.95rem;">${rec.titulo}</h4>
                        <p style="font-size: 0.8rem; color: #837bb9; font-weight: bold; margin: 6px 0 3px 0;">📅 ${fechaFormateada}</p>
                        ${rec.descripcion ? `<p style="font-size: 0.85rem; color: #666; margin-top: 4px;">${rec.descripcion}</p>` : ''}
                    </div>
                `;
            });
        }

        if (rejillaPanel) rejillaPanel.innerHTML = html;
        if (listaPagina) listaPagina.innerHTML = html;
    }

    // Renderiza observaciones en ver_clase.php
    function renderizarObservacionesClase() {
        const contenedor = document.getElementById('listaObservaciones');
        if (!contenedor) return;

        const parametrosUrl = new URLSearchParams(window.location.search);
        const claseActual = parametrosUrl.get('nombre') || 'Matematicas 1A';

        const todas = obtenerObservaciones();
        const filtradas = todas.filter(o => o.claseNombre === claseActual);

        if (filtradas.length === 0) {
            contenedor.innerHTML = '<p style="font-size: 0.9rem; color: #666;">No hay observaciones registradas para esta clase.</p>';
            return;
        }

        let html = '';
        filtradas.forEach(obs => {
            const fechaLimpia = formatearFechaConDia(obs.fecha);
            html += `
                <div class="tarjeta-observacion" data-id="${obs.id}">
                    <div style="flex: 1;">
                        <p style="font-size: 0.8rem; color: #666; margin-bottom: 4px;">
                            <b>${obs.categoria || 'General'}</b> - 📅 ${fechaLimpia}
                        </p>
                        <p style="font-size: 0.95rem; color: #342e57; white-space: pre-line;">${obs.texto}</p>
                    </div>
                    <div class="acciones-tarjeta-obs">
                        <button type="button" class="btn-accion-obs btn-editar-obs" data-id="${obs.id}">✏️ Editar</button>
                        <button type="button" class="btn-accion-obs eliminar btn-eliminar-obs" data-id="${obs.id}">&times; Borrar</button>
                    </div>
                </div>
            `;
        });

        contenedor.innerHTML = html;
    }

    // Inicializar renders al cargar la página
    renderizarPanel();
    renderizarEstudiantes();
    renderizarApuntes();
    renderizarRecordatorios();
    renderizarObservacionesClase();

    // ==========================================================================
    // 3. DELEGACIÓN GLOBAL DE CLICS (EDITAR, BORRAR Y MODALES)
    // ==========================================================================
    document.addEventListener('click', function (e) {

        // A. EDITAR MATERIA (Abrir modal de edición)
        const btnEditMat = e.target.closest('.btn-editar-materia');
        if (btnEditMat) {
            e.stopPropagation();
            const idx = parseInt(btnEditMat.getAttribute('data-index'), 10);
            const materias = obtenerMaterias();
            if (materias[idx]) {
                document.getElementById('indexEditarMateria').value = idx;
                document.getElementById('textoEditarMateria').value = materias[idx].nombre;
                const modal = document.getElementById('ventanaEditarMateria');
                if (modal) modal.style.display = 'flex';
            }
            return;
        }

        // Guardar Edición de Materia
        if (e.target.closest('#guardarEditarMateria')) {
            const idx = parseInt(document.getElementById('indexEditarMateria').value, 10);
            const nuevoTexto = document.getElementById('textoEditarMateria').value.trim();
            if (!nuevoTexto) return alert('Por favor escribe el nombre de la materia.');

            const materias = obtenerMaterias();
            if (materias[idx]) {
                materias[idx].nombre = nuevoTexto;
                guardarMaterias(materias);
                renderizarPanel();
                renderizarEstudiantes();
                renderizarApuntes();
                inicializarSelectorCalificaciones();
            }
            const modal = document.getElementById('ventanaEditarMateria');
            if (modal) modal.style.display = 'none';
            return;
        }

        // Cancelar Edición de Materia
        if (e.target.closest('#cancelarEditarMateria')) {
            const modal = document.getElementById('ventanaEditarMateria');
            if (modal) modal.style.display = 'none';
            return;
        }

        // B. ELIMINAR MATERIA
        const btnElimMat = e.target.closest('.btn-eliminar-materia');
        if (btnElimMat) {
            e.stopPropagation();
            const idx = parseInt(btnElimMat.getAttribute('data-index'), 10);
            const materias = obtenerMaterias();
            if (materias[idx]) {
                if (confirm(`¿Estás seguro de eliminar la materia "${materias[idx].nombre}" y todos sus grupos?`)) {
                    materias.splice(idx, 1);
                    guardarMaterias(materias);
                    renderizarPanel();
                    renderizarEstudiantes();
                    renderizarApuntes();
                    inicializarSelectorCalificaciones();
                }
            }
            return;
        }

        // C. EDITAR GRUPO (Abrir modal de edición)
        const btnEditGrp = e.target.closest('.btn-editar-grupo');
        if (btnEditGrp) {
            e.stopPropagation();
            e.preventDefault();
            const matIdx = parseInt(btnEditGrp.getAttribute('data-materia-index'), 10);
            const grpIdx = parseInt(btnEditGrp.getAttribute('data-grupo-index'), 10);
            const materias = obtenerMaterias();

            if (materias[matIdx] && materias[matIdx].clases[grpIdx]) {
                document.getElementById('materiaIndexEditarGrupo').value = matIdx;
                document.getElementById('grupoIndexEditarGrupo').value = grpIdx;
                document.getElementById('textoEditarGrupo').value = materias[matIdx].clases[grpIdx].nombre;
                const modal = document.getElementById('ventanaEditarGrupo');
                if (modal) modal.style.display = 'flex';
            }
            return;
        }

        // Guardar Edición de Grupo (Actualiza también las observaciones asociadas)
        if (e.target.closest('#guardarEditarGrupo')) {
            const matIdx = parseInt(document.getElementById('materiaIndexEditarGrupo').value, 10);
            const grpIdx = parseInt(document.getElementById('grupoIndexEditarGrupo').value, 10);
            const nuevoTexto = document.getElementById('textoEditarGrupo').value.trim();
            if (!nuevoTexto) return alert('Por favor escribe el nombre del grupo.');

            const materias = obtenerMaterias();
            if (materias[matIdx] && materias[matIdx].clases[grpIdx]) {
                const urlAnterior = materias[matIdx].clases[grpIdx].urlNombre;
                const urlNueva = nuevoTexto.replace(/[^a-zA-Z0-9 ]/g, "");

                materias[matIdx].clases[grpIdx].nombre = nuevoTexto;
                materias[matIdx].clases[grpIdx].urlNombre = urlNueva;
                guardarMaterias(materias);

                // Actualizar observaciones asociadas al grupo modificado
                let observaciones = obtenerObservaciones();
                let huboCambiosObs = false;
                observaciones.forEach(obs => {
                    if (obs.claseNombre === urlAnterior) {
                        obs.claseNombre = urlNueva;
                        huboCambiosObs = true;
                    }
                });
                if (huboCambiosObs) guardarObservaciones(observaciones);

                renderizarPanel();
                renderizarEstudiantes();
                renderizarApuntes();
                inicializarSelectorCalificaciones();
            }
            const modal = document.getElementById('ventanaEditarGrupo');
            if (modal) modal.style.display = 'none';
            return;
        }

        // Cancelar Edición de Grupo
        if (e.target.closest('#cancelarEditarGrupo')) {
            const modal = document.getElementById('ventanaEditarGrupo');
            if (modal) modal.style.display = 'none';
            return;
        }

        // D. ELIMINAR GRUPO
        const btnElimGrp = e.target.closest('.btn-eliminar-grupo');
        if (btnElimGrp) {
            e.stopPropagation();
            e.preventDefault();
            const matIdx = parseInt(btnElimGrp.getAttribute('data-materia-index'), 10);
            const grpIdx = parseInt(btnElimGrp.getAttribute('data-grupo-index'), 10);
            const materias = obtenerMaterias();

            if (materias[matIdx] && materias[matIdx].clases[grpIdx]) {
                const nombreGrupo = materias[matIdx].clases[grpIdx].nombre;
                if (confirm(`¿Estás seguro de eliminar el grupo "${nombreGrupo}"?`)) {
                    materias[matIdx].clases.splice(grpIdx, 1);
                    guardarMaterias(materias);
                    renderizarPanel();
                    renderizarEstudiantes();
                    renderizarApuntes();
                    inicializarSelectorCalificaciones();
                }
            }
            return;
        }

        // E. Eliminar Recordatorio
        const btnEliminarRec = e.target.closest('.btn-eliminar-rec');
        if (btnEliminarRec) {
            const id = parseInt(btnEliminarRec.getAttribute('data-id'), 10);
            let lista = obtenerRecordatorios();
            lista = lista.filter(rec => rec.id !== id);
            guardarRecordatorios(lista);
            renderizarRecordatorios();
            return;
        }

        // F. Eliminar Observación de Maestro
        const btnEliminarObs = e.target.closest('.btn-eliminar-obs');
        if (btnEliminarObs) {
            if (confirm('¿Estás seguro de que deseas eliminar esta observación?')) {
                const id = parseInt(btnEliminarObs.getAttribute('data-id'), 10);
                let lista = obtenerObservaciones();
                lista = lista.filter(obs => obs.id !== id);
                guardarObservaciones(lista);
                renderizarObservacionesClase();
            }
            return;
        }

        // G. Editar Observación de Maestro
        const btnEditarObs = e.target.closest('.btn-editar-obs');
        if (btnEditarObs) {
            const id = parseInt(btnEditarObs.getAttribute('data-id'), 10);
            const lista = obtenerObservaciones();
            const obs = lista.find(o => o.id === id);

            if (obs) {
                document.getElementById('editandoObsId').value = obs.id;
                document.getElementById('fechaNota').value = obs.fecha;
                document.getElementById('categoriaNota').value = obs.categoria;
                document.getElementById('textoNota').value = obs.texto;

                document.getElementById('tituloFormObservacion').textContent = 'Editar Observación';
                document.getElementById('btnGuardarObs').textContent = 'Actualizar Observación';
                document.getElementById('btnCancelarEdicionObs').style.display = 'inline-block';

                document.getElementById('formularioObservacion').scrollIntoView({ behavior: 'smooth' });
            }
            return;
        }

        // H. Cancelar Edición de Observación
        if (e.target.closest('#btnCancelarEdicionObs')) {
            document.getElementById('editandoObsId').value = '';
            document.getElementById('formularioObservacion').reset();
            document.getElementById('tituloFormObservacion').textContent = 'Nueva Observación o Nota de Clase';
            document.getElementById('btnGuardarObs').textContent = 'Guardar Observación';
            document.getElementById('btnCancelarEdicionObs').style.display = 'none';
            return;
        }

        // I. Acordeón Plegar / Desplegar Materias
        const titulo = e.target.closest('.titulo-materia');
        if (titulo) {
            const contenedorClases = titulo.nextElementSibling;
            const flecha = titulo.querySelector('.flecha');
            if (contenedorClases && contenedorClases.classList.contains('contenedor-clases')) {
                const oculto = window.getComputedStyle(contenedorClases).display === 'none';
                contenedorClases.style.display = oculto ? 'flex' : 'none';
                if (flecha) flecha.textContent = oculto ? '▼' : '▶';
            }
            return;
        }

        // J. Modal Crear Materia
        if (e.target.closest('#botonAbrirMateria')) {
            const modal = document.getElementById('ventanaMateria');
            const input = document.getElementById('textoMateria');
            if (modal) { modal.style.display = 'flex'; if (input) input.focus(); }
            return;
        }

        if (e.target.closest('#cancelarMateria')) {
            const modal = document.getElementById('ventanaMateria');
            const input = document.getElementById('textoMateria');
            if (modal) modal.style.display = 'none';
            if (input) input.value = '';
            return;
        }

        if (e.target.closest('#guardarMateria')) {
            const input = document.getElementById('textoMateria');
            if (!input) return;
            const texto = input.value.trim();
            if (!texto) return alert('Por favor escribe el nombre de la materia.');

            const materias = obtenerMaterias();
            materias.push({ nombre: texto, clases: [] });
            guardarMaterias(materias);
            renderizarPanel();
            renderizarEstudiantes();
            renderizarApuntes();
            inicializarSelectorCalificaciones();

            input.value = '';
            const modal = document.getElementById('ventanaMateria');
            if (modal) modal.style.display = 'none';
            return;
        }

        // K. Modal Crear Grupo
        const btnGrupo = e.target.closest('.boton-agregar-grupo');
        if (btnGrupo) {
            indiceMateriaSeleccionada = btnGrupo.getAttribute('data-materia-index');
            const modal = document.getElementById('ventanaGrupo');
            const input = document.getElementById('textoGrupo');
            if (modal) { modal.style.display = 'flex'; if (input) input.focus(); }
            return;
        }

        if (e.target.closest('#cancelarGrupo')) {
            const modal = document.getElementById('ventanaGrupo');
            const input = document.getElementById('textoGrupo');
            if (modal) modal.style.display = 'none';
            if (input) input.value = '';
            indiceMateriaSeleccionada = null;
            return;
        }

        if (e.target.closest('#guardarGrupo')) {
            const input = document.getElementById('textoGrupo');
            if (!input) return;
            const texto = input.value.trim();
            if (!texto) return alert('Por favor escribe el nombre del grupo.');

            if (indiceMateriaSeleccionada !== null) {
                const materias = obtenerMaterias();
                const idx = parseInt(indiceMateriaSeleccionada, 10);
                if (materias[idx]) {
                    if (!materias[idx].clases) materias[idx].clases = [];
                    materias[idx].clases.push({
                        nombre: texto,
                        urlNombre: texto.replace(/[^a-zA-Z0-9 ]/g, ""),
                        alumnos: 0
                    });
                    guardarMaterias(materias);
                    renderizarPanel();
                    renderizarEstudiantes();
                    renderizarApuntes();
                    inicializarSelectorCalificaciones();
                }
            }
            input.value = '';
            const modal = document.getElementById('ventanaGrupo');
            if (modal) modal.style.display = 'none';
            indiceMateriaSeleccionada = null;
            return;
        }

        // L. Crear Columna en Tabla (+ Nueva Actividad)
        const botonElemento = e.target.closest('button');
        const btnColumna = e.target.closest('.boton-nueva-columna') || 
                           (botonElemento && botonElemento.textContent.includes('Nueva'));

        if (btnColumna && !btnColumna.id) {
            const seccionContenedora = btnColumna.closest('.seccion-detalle') || btnColumna.closest('.contenido-seccion');
            const tabla = seccionContenedora ? seccionContenedora.querySelector('.tabla-excel') : document.querySelector('.tabla-excel');

            if (tabla) {
                const nombre = prompt('Nombre de la actividad:', 'Tarea');
                if (nombre) {
                    const porcentaje = prompt('Porcentaje (ej. 20%):', '20%');
                    const tituloHeader = porcentaje ? `${nombre} (${porcentaje})` : nombre;

                    const filaTh = tabla.querySelector('thead tr');
                    if (filaTh) {
                        const ths = filaTh.querySelectorAll('th');
                        const nuevoTh = document.createElement('th');
                        nuevoTh.textContent = tituloHeader;
                        if (ths.length > 1) filaTh.insertBefore(nuevoTh, ths[ths.length - 1]);
                        else filaTh.appendChild(nuevoTh);
                    }

                    const filasTr = tabla.querySelectorAll('tbody tr');
                    filasTr.forEach(fila => {
                        const tds = fila.querySelectorAll('td');
                        const nuevoTd = document.createElement('td');
                        nuevoTd.innerHTML = '<input type="number" class="input-nota" value="0.0" step="0.1" min="0" max="5">';
                        if (tds.length > 1) fila.insertBefore(nuevoTd, tds[tds.length - 1]);
                        else fila.appendChild(nuevoTd);
                    });
                }
            }
            return;
        }

        // M. Confirmación visual "¡Guardado!"
        const btnGuardar = e.target.closest('.boton-guardar');
        if (btnGuardar && !btnGuardar.classList.contains('boton-nueva-columna') && !btnGuardar.textContent.includes('Nueva') && !btnGuardar.id.includes('Materia') && !btnGuardar.id.includes('Grupo')) {
            if (btnGuardar.type === 'submit' && btnGuardar.closest('form') && btnGuardar.closest('form').id !== 'formularioObservacion' && btnGuardar.closest('form').id !== 'formularioRecordatorio') {
                e.preventDefault();
            }

            const textoOriginal = btnGuardar.textContent;
            btnGuardar.textContent = '¡Guardado!';
            btnGuardar.style.backgroundColor = '#4CAF50';

            setTimeout(() => {
                btnGuardar.textContent = textoOriginal;
                btnGuardar.style.backgroundColor = '';
            }, 2000);
        }
    });

    // ==========================================================================
    // 4. FORMULARIO DE RECORDATORIOS
    // ==========================================================================
    const formRecordatorio = document.getElementById('formularioRecordatorio');
    if (formRecordatorio) {
        formRecordatorio.addEventListener('submit', function (e) {
            e.preventDefault();

            const inputTitulo = document.getElementById('tituloRecordatorio');
            const inputFecha = document.getElementById('fechaRecordatorio');
            const inputDesc = document.getElementById('descripcionRecordatorio');

            if (!inputTitulo || !inputFecha) return;

            const titulo = inputTitulo.value.trim();
            const fecha = inputFecha.value;
            const descripcion = inputDesc ? inputDesc.value.trim() : '';

            if (!titulo || !fecha) return alert('Por favor ingresa el título y la fecha límite.');

            const lista = obtenerRecordatorios();
            lista.push({
                id: Date.now(),
                titulo: titulo,
                fecha: fecha,
                descripcion: descripcion
            });

            guardarRecordatorios(lista);
            renderizarRecordatorios();

            inputTitulo.value = '';
            inputFecha.value = '';
            if (inputDesc) inputDesc.value = '';
        });
    }

    // ==========================================================================
    // 5. FORMULARIO DE OBSERVACIONES
    // ==========================================================================
    const formObs = document.getElementById('formularioObservacion');
    if (formObs) {
        formObs.addEventListener('submit', function (e) {
            e.preventDefault();

            const idEditando = document.getElementById('editandoObsId').value;
            const fechaInput = document.getElementById('fechaNota');
            const catInput = document.getElementById('categoriaNota');
            const txtInput = document.getElementById('textoNota');

            if (!txtInput || !fechaInput) return;

            const fecha = fechaInput.value;
            const categoria = (catInput && catInput.value.trim()) ? catInput.value.trim() : 'General';
            const texto = txtInput.value.trim();

            if (!fecha || !texto) return alert('Por favor completa la fecha y el detalle de la observación.');

            const parametrosUrl = new URLSearchParams(window.location.search);
            const claseActual = parametrosUrl.get('nombre') || 'Matematicas 1A';

            let lista = obtenerObservaciones();

            if (idEditando) {
                const idx = lista.findIndex(o => o.id === parseInt(idEditando, 10));
                if (idx !== -1) {
                    lista[idx].fecha = fecha;
                    lista[idx].categoria = categoria;
                    lista[idx].texto = texto;
                }
            } else {
                lista.push({
                    id: Date.now(),
                    claseNombre: claseActual,
                    fecha: fecha,
                    categoria: categoria,
                    texto: texto
                });
            }

            guardarObservaciones(lista);
            renderizarObservacionesClase();

            document.getElementById('editandoObsId').value = '';
            formObs.reset();
            document.getElementById('tituloFormObservacion').textContent = 'Nueva Observación o Nota de Clase';
            document.getElementById('btnGuardarObs').textContent = 'Guardar Observación';
            document.getElementById('btnCancelarEdicionObs').style.display = 'none';
        });
    }

    // ==========================================================================
    // 6. CÁLCULO EN TIEMPO REAL DEL PROMEDIO EN TABLAS
    // ==========================================================================
    document.addEventListener('input', function (e) {
        if (e.target && e.target.classList.contains('input-nota')) {
            const fila = e.target.closest('tr');
            if (fila) {
                const inputs = fila.querySelectorAll('.input-nota');
                let suma = 0;
                let cantidad = 0;

                inputs.forEach(input => {
                    const val = parseFloat(input.value);
                    if (!isNaN(val)) {
                        suma += val;
                        cantidad++;
                    }
                });

                const promedio = cantidad > 0 ? (suma / cantidad).toFixed(2) : '0.00';
                const tdDefinitiva = fila.querySelector('td:last-child');
                if (tdDefinitiva) {
                    tdDefinitiva.innerHTML = `<b>${promedio}</b>`;
                }
            }
        }
    });

    // ==========================================================================
    // 7. BUSCADOR EN TIEMPO REAL
    // ==========================================================================
    const buscador = document.getElementById('buscadorMaterias');
    if (buscador) {
        buscador.addEventListener('input', function (e) {
            const query = e.target.value.toLowerCase().trim();
            const bloques = document.querySelectorAll('.item-busqueda');

            bloques.forEach(bloque => {
                const coincide = bloque.textContent.toLowerCase().includes(query);
                const contenedor = bloque.querySelector('.contenedor-clases');
                const flecha = bloque.querySelector('.flecha');

                bloque.style.display = coincide ? 'block' : 'none';
                if (coincide && query !== '' && contenedor) {
                    contenedor.style.display = 'flex';
                    if (flecha) flecha.textContent = '▼';
                } else if (query === '' && contenedor) {
                    contenedor.style.display = 'none';
                    if (flecha) flecha.textContent = '▶';
                }
            });
        });
    }

    // ==========================================================================
    // 8. PARÁMETROS URL EN VER_CLASE.PHP
    // ==========================================================================
    const parametrosUrl = new URLSearchParams(window.location.search);
    const seccion = parametrosUrl.get('seccion');

    if (seccion && document.getElementById(seccion)) {
        document.querySelectorAll('.contenido-seccion').forEach(c => c.classList.remove('activa'));
        document.querySelectorAll('.boton-opcion').forEach(b => b.classList.remove('activa'));

        document.getElementById(seccion).classList.add('activa');
        document.querySelectorAll('.boton-opcion').forEach(b => {
            if (b.getAttribute('onclick') && b.getAttribute('onclick').includes(seccion)) {
                b.classList.add('activa');
            }
        });
    }

    // ==========================================================================
    // 9. SELECTOR DINÁMICO DE MATERIA Y GRUPO EN CALIFICACIONES.PHP
    // ==========================================================================
    function inicializarSelectorCalificaciones() {
        const selectMateria = document.getElementById('selectMateriaCalificaciones');
        const selectGrupo = document.getElementById('selectGrupoCalificaciones');
        const seccionTabla = document.getElementById('seccionTablaCalificaciones');
        const tituloBoletin = document.getElementById('tituloBoletin');

        if (!selectMateria || !selectGrupo || !seccionTabla) return;

        const materias = obtenerMaterias();

        selectMateria.innerHTML = '<option value="">-- Selecciona una materia --</option>';
        materias.forEach((mat, idx) => {
            const opt = document.createElement('option');
            opt.value = idx;
            opt.textContent = mat.nombre;
            selectMateria.appendChild(opt);
        });

        selectMateria.onchange = function () {
            const idxMat = this.value;
            selectGrupo.innerHTML = '<option value="">-- Selecciona un grupo --</option>';
            seccionTabla.style.display = 'none';

            if (idxMat !== '' && materias[idxMat]) {
                const clases = materias[idxMat].clases || [];
                if (clases.length === 0) {
                    selectGrupo.innerHTML = '<option value="">-- No hay grupos creados --</option>';
                    selectGrupo.disabled = true;
                } else {
                    clases.forEach(clase => {
                        const opt = document.createElement('option');
                        opt.value = clase.nombre;
                        opt.textContent = clase.nombre;
                        selectGrupo.appendChild(opt);
                    });
                    selectGrupo.disabled = false;
                }
            } else {
                selectGrupo.innerHTML = '<option value="">-- Primero elige una materia --</option>';
                selectGrupo.disabled = true;
            }
        };

        selectGrupo.onchange = function () {
            const grupoSeleccionado = this.value;
            if (grupoSeleccionado !== '') {
                seccionTabla.style.display = 'block';
                if (tituloBoletin) {
                    tituloBoletin.textContent = `Boletín de Calificaciones - ${grupoSeleccionado}`;
                }
            } else {
                seccionTabla.style.display = 'none';
            }
        };
    }

    inicializarSelectorCalificaciones();

});

// ==========================================================================
// 10. FUNCIONES GLOBALES
// ==========================================================================
window.cambiarSeccion = function (evento, idSeccion) {
    const contenidos = document.querySelectorAll('.contenido-seccion');
    contenidos.forEach(c => c.classList.remove('activa'));

    const botones = document.querySelectorAll('.boton-opcion');
    botones.forEach(b => b.classList.remove('activa'));

    const objetivo = document.getElementById(idSeccion);
    if (objetivo) objetivo.classList.add('activa');

    if (evento && evento.currentTarget) {
        evento.currentTarget.classList.add('activa');
    }
};

window.mostrarQR = function () {
    const caja = document.getElementById('cajaQR');
    if (caja) {
        caja.style.display = (caja.style.display === "none" || caja.style.display === "") ? "block" : "none";
    }
};

