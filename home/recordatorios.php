<?php
// ==========================================================================
// CONTROL DE SESIÓN: Verifica que el usuario haya iniciado sesión
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
    <title>Recordatorios - Docentes</title>
    <link rel="stylesheet" href="../css/home.css">
</head>
<body>

    <!-- MENÚ LATERAL -->
    <nav class="menu-lateral">
        <ul class="lista-menu">
            <li><a href="panel.php">Inicio</a></li>
            <li><a href="estudiantes.php">Estudiantes / QR</a></li>
            <li><a href="calificaciones.php">Calificaciones</a></li>
            <li><a href="apuntes.php">Observaciones</a></li>
            <li><a href="recordatorios.php" class="activo">Recordatorios</a></li>
            <li><a href="perfil.php">Tu perfil</a></li>
            <li><a href="../cerrar_sesion.php">Cerrar sesión</a></li>
        </ul>
    </nav>

    <!-- CONTENIDO PRINCIPAL DE RECORDATORIOS -->
    <main class="contenedor-principal">
        <h1 style="color: #342e57; margin-bottom: 20px;">Mis recordatorios</h1>

        <!-- SECCIÓN 1 (ARRIBA): Cuadro 3x3 de Actividades Pendientes -->
        <section class="seccion-detalle">
            <h2>Actividades pendientes</h2>
            <p style="font-size: 0.85rem; color: #666; margin-bottom: 10px;">
                Se muestran ordenadas desde la fecha más cercana. Puedes eliminarlas individualmente.
            </p>
            <!-- El script JS pintará aquí la rejilla 3x3 de izquierda a derecha -->
            <div id="listaRecordatorios"></div>
        </section>

        <!-- SECCIÓN 2 (ABAJO): Formulario para crear un nuevo recordatorio -->
        <section class="seccion-detalle" style="margin-top: 25px;">
            <h2>Agregar recordatorio</h2>
            <form id="formularioRecordatorio" style="margin-top: 15px; display: grid; gap: 15px;">
                <div>
                    <label for="tituloRecordatorio" style="display: block; font-weight: bold; margin-bottom: 5px; font-size: 0.85rem; color: #342e57;">Actividad</label>
                    <input id="tituloRecordatorio" class="input-estilo" type="text" maxlength="100" placeholder="Ej. Entregar notas de Matemáticas" required>
                </div>
                <div>
                    <label for="fechaRecordatorio" style="display: block; font-weight: bold; margin-bottom: 5px; font-size: 0.85rem; color: #342e57;">Fecha límite</label>
                    <input id="fechaRecordatorio" class="input-estilo" type="date" required>
                </div>
                <div>
                    <label for="descripcionRecordatorio" style="display: block; font-weight: bold; margin-bottom: 5px; font-size: 0.85rem; color: #342e57;">Descripción (opcional)</label>
                    <textarea id="descripcionRecordatorio" class="input-estilo" rows="3" placeholder="Detalles de la actividad"></textarea>
                </div>
                <div>
                    <button type="submit" class="boton-guardar">Guardar recordatorio</button>
                </div>
            </form>
        </section>
    </main>

    <script src="../js/script.js"></script>
</body>
</html>