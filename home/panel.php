<?php
// ==========================================================================
// CONTROL DE SESIÓN: Impide el acceso sin autenticación
// ==========================================================================
session_start();
if (!isset($_SESSION['email'])) {
    header("Location: ../iniciar_sesion.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inicio - Docentes</title>
    <link rel="stylesheet" href="../css/home.css">
</head>
<body>

    <!-- MENÚ LATERAL DE NAVEGACIÓN -->
    <nav class="menu-lateral">
        <ul class="lista-menu">
            <li><a href="panel.php" class="activo">Inicio</a></li>
            <li><a href="estudiantes.php">Estudiantes / QR</a></li>
            <li><a href="calificaciones.php">Calificaciones</a></li>
            <li><a href="apuntes.php">Observaciones</a></li>
            <li><a href="recordatorios.php">Recordatorios</a></li>
            <li><a href="perfil.php">Tu perfil</a></li>
            <li><a href="../cerrar_sesion.php">Cerrar sesión</a></li>
        </ul>
    </nav>

    <!-- CONTENIDO PRINCIPAL EN 2 COLUMNAS -->
    <main class="contenedor-principal">
        <div class="diseno-panel">
            
            <!-- COLUMNA IZQUIERDA: Lista de Materias y Grupos -->
            <div class="columna-izquierda">
                <div class="encabezado-panel" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h1 style="color: #342e57;">Mis materias y grupos</h1>
                    <button type="button" class="boton-crear" id="botonAbrirMateria" style="width: auto; padding: 10px 20px;">+ Nueva materia</button>
                </div>

                <!-- Las materias, grupos y sus botones de edición/borrado se cargan aquí -->
                <div id="contenedorMaterias"></div>
            </div>

            <!-- COLUMNA DERECHA: Cuadro de Recordatorios Próximos -->
            <div class="columna-derecha">
                <section class="seccion-detalle">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 5px;">
                        <h2 style="margin: 0; font-size: 1.1rem;">Próximos recordatorios</h2>
                        <a href="recordatorios.php" class="boton-volver" style="margin: 0; font-size: 0.8rem; padding: 5px 10px;">Administrar &rarr;</a>
                    </div>
                    <p style="font-size: 0.8rem; color: #666; margin-bottom: 12px;">Ordenados por fecha más cercana.</p>

                    <div id="rejillaRecordatorios" class="contenedor-scroll-recordatorios"></div>
                </section>
            </div>

        </div>
    </main>

    <!-- VENTANAS MODALES PARA CREAR Y EDITAR -->

    <!-- Modal 1: Crear Nueva Materia -->
    <div class="ventana-modal" id="ventanaMateria" style="display:none">
        <div class="contenido-modal">
            <h2>Crear nueva materia</h2>
            <input type="text" id="textoMateria" class="input-estilo" placeholder="Nombre de la materia" style="margin:15px 0">
            <div class="acciones-modal">
                <button type="button" class="boton-volver" id="cancelarMateria">Cancelar</button>
                <button type="button" class="boton-guardar" id="guardarMateria">Guardar</button>
            </div>
        </div>
    </div>

    <!-- Modal 2: Editar Materia Existente -->
    <div class="ventana-modal" id="ventanaEditarMateria" style="display:none">
        <div class="contenido-modal">
            <h2>Editar materia</h2>
            <input type="hidden" id="indexEditarMateria" value="">
            <input type="text" id="textoEditarMateria" class="input-estilo" placeholder="Nuevo nombre de la materia" style="margin:15px 0">
            <div class="acciones-modal">
                <button type="button" class="boton-volver" id="cancelarEditarMateria">Cancelar</button>
                <button type="button" class="boton-guardar" id="guardarEditarMateria">Guardar Cambios</button>
            </div>
        </div>
    </div>

    <!-- Modal 3: Agregar Nuevo Grupo -->
    <div class="ventana-modal" id="ventanaGrupo" style="display:none">
        <div class="contenido-modal">
            <h2>Agregar grupo o clase</h2>
            <input type="text" id="textoGrupo" class="input-estilo" placeholder="Nombre del grupo" style="margin:15px 0">
            <div class="acciones-modal">
                <button type="button" class="boton-volver" id="cancelarGrupo">Cancelar</button>
                <button type="button" class="boton-guardar" id="guardarGrupo">Guardar</button>
            </div>
        </div>
    </div>

    <!-- Modal 4: Editar Grupo Existente -->
    <div class="ventana-modal" id="ventanaEditarGrupo" style="display:none">
        <div class="contenido-modal">
            <h2>Editar grupo</h2>
            <input type="hidden" id="materiaIndexEditarGrupo" value="">
            <input type="hidden" id="grupoIndexEditarGrupo" value="">
            <input type="text" id="textoEditarGrupo" class="input-estilo" placeholder="Nuevo nombre del grupo" style="margin:15px 0">
            <div class="acciones-modal">
                <button type="button" class="boton-volver" id="cancelarEditarGrupo">Cancelar</button>
                <button type="button" class="boton-guardar" id="guardarEditarGrupo">Guardar Cambios</button>
            </div>
        </div>
    </div>

    <script src="../js/script.js"></script>
</body>
</html>