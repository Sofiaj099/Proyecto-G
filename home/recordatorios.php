<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recordatorios - Docentes</title>
    <link rel="stylesheet" href="../css/home.css">
</head>
<body>

    <!-- Menú Lateral -->
    <nav class="menu-lateral">
        <ul class="lista-menu">
            <li><a href="panel.php">Inicio</a></li>
            <li><a href="estudiantes.php">Estudiantes / QR</a></li>
            <li><a href="calificaciones.php">Calificaciones</a></li>
            <li><a href="apuntes.php">Observaciones</a></li>
            <li><a href="recordatorios.php" class="activo">Recordatorios</a></li>
            <li><a href="perfil.php">Tu perfil</a></li>
            <li><a href="../iniciar_sesion.php">Cerrar Sesión</a></li>
        </ul>
    </nav>

    <!-- Contenido Principal -->
    <main class="contenedor-principal">
        <h1 style="color: #342e57; margin-bottom: 20px;">Recordatorio de Actividades</h1>

        <div class="seccion-detalle">
            <h2>Actividades de Clases Pasadas</h2>
            <ul style="padding-left: 20px; margin-top: 10px; line-height: 1.8;">
                <li><b>10-Oct (Matemáticas 1°A):</b> Explicación de ecuaciones de primer grado. Faltó resolver ejercicio 4.</li>
                <li><b>12-Oct (Historia 2°B):</b> Exposición sobre la Revolución Industrial. Faltan 2 grupos por pasar.</li>
            </ul>
        </div>

        <div class="seccion-detalle" style="margin-top: 20px;">
            <h2>Próximas Tareas y Exámenes</h2>
            <textarea placeholder="Escribe nuevos recordatorios para tus clases futuras..."></textarea>
            <br><br>
            <button type="button" class="boton-guardar">Guardar Recordatorio</button>
        </div>
    </main>

    <script src="../js/script.js"></script>
</body>
</html>