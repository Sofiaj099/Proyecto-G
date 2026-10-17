<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calificaciones - Docentes</title>
    <link rel="stylesheet" href="../css/home.css">
</head>
<body>

    <!-- Menú Lateral -->
    <nav class="menu-lateral">
        <ul class="lista-menu">
            <li><a href="panel.php">Inicio</a></li>
            <li><a href="estudiantes.php">Estudiantes / QR</a></li>
            <li><a href="calificaciones.php" class="activo">Calificaciones</a></li>
            <li><a href="apuntes.php">Observaciones</a></li>
            <li><a href="recordatorios.php">Recordatorios</a></li>
            <li><a href="perfil.php">Tu perfil</a></li>
            <li><a href="../iniciar_sesion.php">Cerrar Sesión</a></li>
        </ul>
    </nav>

    <!-- Contenido Principal -->
    <main class="contenedor-principal">
        <h1 style="color: #342e57; margin-bottom: 20px;">Planilla General de Calificaciones</h1>

        <div class="seccion-detalle">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                <h2>Matemáticas 1°A</h2>
                <button type="button" class="boton-guardar" style="font-size: 0.85rem;">+ Nueva Columna</button>
            </div>

            <div style="overflow-x: auto; margin-top: 15px;">
                <table class="tabla-excel">
                    <thead>
                        <tr>
                            <th>Estudiante</th>
                            <th>Taller 1 (25%)</th>
                            <th>Taller 2 (25%)</th>
                            <th>Examen (50%)</th>
                            <th>Definitiva</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Carlos Mendoza</td>
                            <td><input type="number" class="input-nota" value="4.5" step="0.1"></td>
                            <td><input type="number" class="input-nota" value="3.8" step="0.1"></td>
                            <td><input type="number" class="input-nota" value="4.0" step="0.1"></td>
                            <td><b>4.07</b></td>
                        </tr>
                        <tr>
                            <td>Ana Gómez</td>
                            <td><input type="number" class="input-nota" value="5.0" step="0.1"></td>
                            <td><input type="number" class="input-nota" value="4.2" step="0.1"></td>
                            <td><input type="number" class="input-nota" value="3.5" step="0.1"></td>
                            <td><b>4.05</b></td>
                        </tr>
                        <tr>
                            <td>Juan Pérez</td>
                            <td><input type="number" class="input-nota" value="3.0" step="0.1"></td>
                            <td><input type="number" class="input-nota" value="2.8" step="0.1"></td>
                            <td><input type="number" class="input-nota" value="3.5" step="0.1"></td>
                            <td><b>3.20</b></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <br>
            <button type="button" class="boton-guardar">Guardar Notas</button>
        </div>
    </main>
    <script src="../js/script.js"></script>

</body>
</html>