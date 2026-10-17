document.addEventListener('DOMContentLoaded', function () {

    // ==========================================================================
    // 1. DATOS INICIALES Y MEMORIA COMPARTIDA (LOCALSTORAGE)
    // ==========================================================================
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

    function obtenerMaterias() {
        try {
            const guardadas = localStorage.getItem('docentes_materias');
            if (!guardadas) {
                localStorage.setItem('docentes_materias', JSON.stringify(materiasPredeterminadas));
                return materiasPredeterminadas;
            }
            const parseadas = JSON.parse(guardadas);
            if (!Array.isArray(parseadas) || parseadas.length === 0) {
                localStorage.setItem('docentes_materias', JSON.stringify(materiasPredeterminadas));
                return materiasPredeterminadas;
            }
            return parseadas;
        } catch (e) {
            localStorage.setItem('docentes_materias', JSON.stringify(materiasPredeterminadas));
            return materiasPredeterminadas;
        }
    }

    function guardarMaterias(lista) {
        localStorage.setItem('docentes_materias', JSON.stringify(lista));
    }

    let indiceMateriaSeleccionada = null;

    // ==========================================================================
    // 2. RENDERIZADO DINÁMICO EN PANTALLAS
    // ==========================================================================
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
                materia.clases.forEach(clase => {
                    htmlClases += `
                        <a href="ver_clase.php?nombre=${encodeURIComponent(clase.urlNombre)}" class="tarjeta-clase">
                            <h3>${clase.nombre}</h3>
                            <p>${clase.alumnos || 0} Alumnos</p>
                        </a>
                    `;
                });
            }

            bloque.innerHTML = `
                <div class="titulo-materia">
                    <span class="flecha">▼</span>
                    <h2>${materia.nombre}</h2>
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

    // Inicializar renders según la página actual
    renderizarPanel();
    renderizarEstudiantes();
    renderizarApuntes();

    // ==========================================================================
    // 3. MANEJADOR GLOBAL DE CLICS (MODALES, ACORDEÓN Y EXCEL)
    // ==========================================================================
    document.addEventListener('click', function (e) {

        // A. Acordeón Plegar / Desplegar Materias
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

        // B. Abrir Modal Materia
        if (e.target.closest('#botonAbrirMateria')) {
            const modal = document.getElementById('ventanaMateria');
            const input = document.getElementById('textoMateria');
            if (modal) { modal.style.display = 'flex'; if (input) input.focus(); }
            return;
        }

        // C. Cancelar Modal Materia
        if (e.target.closest('#cancelarMateria')) {
            const modal = document.getElementById('ventanaMateria');
            const input = document.getElementById('textoMateria');
            if (modal) modal.style.display = 'none';
            if (input) input.value = '';
            return;
        }

        // D. Guardar Modal Materia
        if (e.target.closest('#guardarMateria')) {
            const input = document.getElementById('textoMateria');
            if (!input) return;
            const texto = input.value.trim();
            if (!texto) return alert('Por favor escribe el nombre de la materia.');

            const materias = obtenerMaterias();
            materias.push({ nombre: texto, clases: [] });
            guardarMaterias(materias);
            renderizarPanel();

            input.value = '';
            const modal = document.getElementById('ventanaMateria');
            if (modal) modal.style.display = 'none';
            return;
        }

        // E. Abrir Modal Grupo
        const btnGrupo = e.target.closest('.boton-agregar-grupo');
        if (btnGrupo) {
            indiceMateriaSeleccionada = btnGrupo.getAttribute('data-materia-index');
            const modal = document.getElementById('ventanaGrupo');
            const input = document.getElementById('textoGrupo');
            if (modal) { modal.style.display = 'flex'; if (input) input.focus(); }
            return;
        }

        // F. Cancelar Modal Grupo
        if (e.target.closest('#cancelarGrupo')) {
            const modal = document.getElementById('ventanaGrupo');
            const input = document.getElementById('textoGrupo');
            if (modal) modal.style.display = 'none';
            if (input) input.value = '';
            indiceMateriaSeleccionada = null;
            return;
        }

        // G. Guardar Modal Grupo
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
                }
            }
            input.value = '';
            const modal = document.getElementById('ventanaGrupo');
            if (modal) modal.style.display = 'none';
            indiceMateriaSeleccionada = null;
            return;
        }

        // H. Crear Columna en Tabla Estilo Excel
        const btnColumna = e.target.closest('.boton-nueva-columna') || 
                           (e.target.tagName === 'BUTTON' && e.target.textContent.includes('Nueva'));
        if (btnColumna && btnColumna.id !== 'botonAbrirMateria' && btnColumna.id !== 'guardarMateria' && btnColumna.id !== 'guardarGrupo') {
            const tabla = document.querySelector('.tabla-excel');
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

        // I. Notificación de Guardado en Botones Generales
        const btnGuardar = e.target.closest('.boton-guardar');
        if (btnGuardar && btnGuardar.id !== 'guardarMateria' && btnGuardar.id !== 'guardarGrupo' && btnGuardar.id !== 'botonAbrirMateria') {
            if (btnGuardar.type === 'submit' && btnGuardar.closest('form') && btnGuardar.closest('form').id !== 'formularioObservacion') {
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
    // 4. BUSCADOR EN TIEMPO REAL
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
    // 5. PARÁMETROS DE URL EN VER_CLASE.PHP
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
    // 6. FORMULARIO DE OBSERVACIONES EN VER_CLASE.PHP
    // ==========================================================================
    const formObs = document.getElementById('formularioObservacion');
    if (formObs) {
        formObs.addEventListener('submit', function (e) {
            e.preventDefault();

            const catInput = document.getElementById('categoriaNota');
            const txtInput = document.getElementById('textoNota');
            const lista = document.getElementById('listaObservaciones');

            if (!txtInput || !lista) return;

            const categoria = (catInput && catInput.value.trim()) ? catInput.value.trim() : 'General';
            const texto = txtInput.value.trim();

            if (!texto) return alert('Por favor ingresa el texto de la observación.');

            const fecha = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
            const tarjeta = document.createElement('div');
            tarjeta.style.backgroundColor = '#fdf4e5';
            tarjeta.style.borderLeft = '4px solid #837bb9';
            tarjeta.style.padding = '12px';
            tarjeta.style.borderRadius = '6px';

            tarjeta.innerHTML = `
                <p style="font-size: 0.8rem; color: #666; margin-bottom: 4px;"><b>${categoria}</b> - ${fecha}</p>
                <p style="font-size: 0.95rem; color: #342e57;">${texto}</p>
            `;

            lista.prepend(tarjeta);
            if (catInput) catInput.value = '';
            txtInput.value = '';
        });
    }

});

// ==========================================================================
// 7. FUNCIONES GLOBALES PARA ONCLICK EN HTML
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