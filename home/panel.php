<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inicio - Docentes</title>
    <link rel="stylesheet" href="../css/home.css">
</head>
<body>

    <!-- Menú Lateral -->
    <nav class="menu-lateral">
        <ul class="lista-menu">
            <li><a href="panel.php" class="activo">Inicio</a></li>
            <li><a href="estudiantes.php">Estudiantes / QR</a></li>
            <li><a href="calificaciones.php">Calificaciones</a></li>
            <li><a href="apuntes.php">Apuntes</a></li>
            <li><a href="recordatorios.php">Recordatorios</a></li>
            <li><a href="perfil.php">Tu perfil</a></li>
            <li><a href="../iniciar_sesion.php">Cerrar Sesión</a></li>
        </ul>
    </nav>

    <!-- Contenido Principal -->
    <main class="contenedor-principal">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
            <h1 style="color: #342e57; margin: 0;">Mis Materias y Grupos</h1>
            <button type="button" class="boton-crear" id="botonAbrirMateria">
                <span class="mas">+</span>
                <span>Nueva Materia</span>
            </button>
        </div>

        <!-- Contenedor cargado dinámicamente por js/script.js -->
        <div id="contenedorMaterias"></div>
    </main>

    <!-- Modal Nueva Materia -->
    <div class="ventana-modal" id="ventanaMateria" style="display: none;">
        <div class="contenido-modal">
            <h2>Crear Nueva Materia</h2>
            <input type="text" id="textoMateria" class="input-estilo" placeholder="Nombre de la materia (ej. Inglés)..." style="margin: 15px 0;">
            <div style="display: flex; gap: 10px; justify-content: flex-end;">
                <button type="button" class="boton-volver" id="cancelarMateria">Cancelar</button>
                <button type="button" class="boton-guardar" id="guardarMateria">Guardar</button>
            </div>
        </div>
    </div>

    <!-- Modal Nuevo Grupo -->
    <div class="ventana-modal" id="ventanaGrupo" style="display: none;">
        <div class="contenido-modal">
            <h2>Agregar Grupo / Clase</h2>
            <input type="text" id="textoGrupo" class="input-estilo" placeholder="Nombre del grupo (ej. Inglés 1°A)..." style="margin: 15px 0;">
            <div style="display: flex; gap: 10px; justify-content: flex-end;">
                <button type="button" class="boton-volver" id="cancelarGrupo">Cancelar</button>
                <button type="button" class="boton-guardar" id="guardarGrupo">Guardar</button>
            </div>
        </div>
    </div>

    <script src="../js/script.js"></script>
</body>
</html>