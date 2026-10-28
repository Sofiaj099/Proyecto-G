<?php
// ==========================================================================
// CONTROL DE SESIÓN: Impide el acceso si el docente no está autenticado
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
    <title>Calificaciones - Docentes</title>
    <link rel="stylesheet" href="../css/home.css">
</head>
<body>

    <!-- MENÚ LATERAL DE NAVEGACIÓN -->
    <nav class="menu-lateral">
        <ul class="lista-menu">
            <li><a href="panel.php">Inicio</a></li>
            <li><a href="estudiantes.php">Estudiantes / QR</a></li>
            <li><a href="calificaciones.php" class="activo">Calificaciones</a></li>
            <li><a href="apuntes.php">Observaciones</a></li>
            <li><a href="recordatorios.php">Recordatorios</a></li>
            <li><a href="perfil.php">Tu perfil</a></li>
            <li><a href="../cerrar_sesion.php">Cerrar sesión</a></li>
        </ul>
    </nav>

    <!-- CONTENIDO PRINCIPAL -->
    <main class="contenedor-principal">
        <h1 style="color: #342e57; margin-bottom: 20px;">Gestión de Calificaciones</h1>

        <!-- 1. SECTOR DE FILTRADO POR MATERIA Y GRUPO -->
        <section class="seccion-detalle">
            <h2>Selecciona la materia y el grupo</h2>
            <p style="font-size: 0.85rem; color: #666; margin-bottom: 15px;">
                Selecciona una materia para cargar sus grupos asignados y visualizar la planilla de notas correspondiente.
            </p>

            <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                <!-- Desplegable 1: Materia -->
                <div style="flex: 1; min-width: 220px;">
                    <label for="selectMateriaCalificaciones" style="display: block; font-weight: bold; margin-bottom: 5px; font-size: 0.85rem; color: #342e57;">Materia:</label>
                    <select id="selectMateriaCalificaciones" class="input-estilo">
                        <option value="">-- Selecciona una materia --</option>
                    </select>
                </div>

                <!-- Desplegable 2: Grupo (Se habilita al elegir materia) -->
                <div style="flex: 1; min-width: 220px;">
                    <label for="selectGrupoCalificaciones" style="display: block; font-weight: bold; margin-bottom: 5px; font-size: 0.85rem; color: #342e57;">Grupo / Clase:</label>
                    <select id="selectGrupoCalificaciones" class="input-estilo" disabled>
                        <option value="">-- Primero elige una materia --</option>
                    </select>
                </div>
            </div>
        </section>

        <!-- 2. TABLA TIPO EXCEL DE CALIFICACIONES (Oculta hasta seleccionar un grupo) -->
        <section class="seccion-detalle" id="seccionTablaCalificaciones" style="display: none;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; flex-wrap: wrap; gap: 10px;">
                <h2 id="tituloBoletin">Boletín de Calificaciones</h2>
                <button type="button" class="boton-guardar boton-nueva-columna" style="font-size: 0.85rem;">+ Nueva Actividad</button>
            </div>

            <!-- Contenedor con scroll horizontal y bordes redondeados -->
            <div class="contenedor-tabla">
                <table class="tabla-excel">
                    <thead>
                        <tr>
                            <th>Estudiante</th>
                            <th>Tarea 1 (20%)</th>
                            <th>Taller (30%)</th>
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
                            <td><b>4.04</b></td>
                        </tr>
                        <tr>
                            <td>Ana Gómez</td>
                            <td><input type="number" class="input-nota" value="5.0" step="0.1"></td>
                            <td><input type="number" class="input-nota" value="4.2" step="0.1"></td>
                            <td><input type="number" class="input-nota" value="3.5" step="0.1"></td>
                            <td><b>4.01</b></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br>
            <button type="button" class="boton-guardar">Guardar Notas</button>
        </section>

    </main>

    <script src="../js/script.js"></script>
</body>
</html>