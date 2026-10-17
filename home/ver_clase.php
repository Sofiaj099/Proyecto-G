<?php
$nombreClase = isset($_GET['nombre']) ? htmlspecialchars($_GET['nombre']) : 'Matemáticas 1°A';
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clase - <?php echo $nombreClase; ?></title>
    <link rel="stylesheet" href="../css/home.css">
    <link rel="stylesheet" href="../css/ver_clase.css">
</head>
<body>

    <!-- Menú Lateral -->
    <nav class="menu-lateral">
      <ul class="lista-menu">
        <li><a href="panel.php">Inicio</a></li>
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
        <a href="panel.php" class="boton-volver">&larr; Volver al Panel</a>
        
        <h1 style="margin-bottom: 15px; color: #342e57;"><?php echo $nombreClase; ?></h1>

        <!-- Botones de Secciones -->
        <div class="barra-opciones">
            <button class="boton-opcion activa" onclick="cambiarSeccion(event, 'sec-estudiantes')">Estudiantes & QR</button>
            <button class="boton-opcion" onclick="cambiarSeccion(event, 'sec-notas')">Notas (Excel)</button>
            <button class="boton-opcion" onclick="cambiarSeccion(event, 'sec-apuntes')">Observaciones del Maestro</button>
        </div>

        <!-- ================= SECCIÓN 1: ESTUDIANTES Y QR ================= -->
        <div id="sec-estudiantes" class="contenido-seccion activa">
            <div class="seccion-detalle">
                <h2>Registro de Alumnos</h2>
                <p style="margin-bottom: 15px; font-size: 0.9rem;">
                    Muestra este código QR a tus alumnos en clase para que se registren desde sus teléfonos.
                </p>
                
                <button type="button" class="boton-guardar" onclick="mostrarQR()">Generar Código QR</button>

                <div id="cajaQR" style="display: none; margin-top: 20px; text-align: center;">
                    <p><b>Escanea para registrarte en <?php echo $nombreClase; ?>:</b></p>
                    <br>
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=http://localhost/docentes/registro_estudiante.php?clase=1" alt="QR Registro" style="border: 2px solid #837bb9; padding: 10px; background: white; border-radius: 8px;">
                </div>
            </div>

            <div class="seccion-detalle">
                <h2>Lista de Estudiantes Registrados</h2>
                <table class="tabla-excel" style="margin-top: 10px;">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Documento</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Carlos</td>
                            <td>Mendoza</td>
                            <td>10023456</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Ana</td>
                            <td>Gómez</td>
                            <td>10087654</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- ================= SECCIÓN 2: NOTAS TIPO EXCEL ================= -->
        <div id="sec-notas" class="contenido-seccion">
            <div class="seccion-detalle">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <h2>Boletín de Calificaciones</h2>
                    <button type="button" class="boton-guardar" style="font-size: 0.85rem;">+ Nueva Actividad</button>
                </div>

                <div style="overflow-x: auto;">
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
            </div>
        </div>

        <!-- ================= SECCIÓN 3: OBSERVACIONES DEL MAESTRO ================= -->
        <div id="sec-apuntes" class="contenido-seccion">
            
            <!-- Formulario para agregar una nueva observación -->
            <div class="seccion-detalle">
                <h2>Nueva Observación o Nota de Clase</h2>
                <form id="formularioObservacion" style="margin-top: 15px;">
                    <div style="display: flex; gap: 15px; margin-bottom: 12px; flex-wrap: wrap;">
                        <div style="flex: 1; min-width: 200px;">
                            <label style="font-size: 0.85rem; font-weight: bold; display: block; margin-bottom: 5px;">Fecha / Categoria:</label>
                            <input type="text" id="categoriaNota" class="input-estilo" placeholder="Ej. Tarea, Comportamiento, Repaso">
                        </div>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label style="font-size: 0.85rem; font-weight: bold; display: block; margin-bottom: 5px;">Detalle de la observación:</label>
                        <textarea id="textoNota" placeholder="Escribe aquí los apuntes o notas sobre este grupo..."></textarea>
                    </div>
                    <button type="submit" class="boton-guardar">Guardar Observación</button>
                </form>
            </div>

            <!-- Historial de Observaciones Registradas -->
            <div class="seccion-detalle">
                <h2>Historial de Observaciones</h2>
                <div id="listaObservaciones" style="margin-top: 15px; display: flex; flex-direction: column; gap: 12px;">
                    <div style="background-color: #fdf4e5; border-left: 4px solid #837bb9; padding: 12px; border-radius: 6px;">
                        <p style="font-size: 0.8rem; color: #666; margin-bottom: 4px;"><b>Rendimiento Taller</b> - 14 Octubre</p>
                        <p style="font-size: 0.95rem; color: #342e57;">El grupo mostró excelente rendimiento en el taller de ecuaciones. Pendiente revisar el ejercicio 4 con Carlos y Ana.</p>
                    </div>
                </div>
            </div>

        </div>

    </main>

    <script src="../js/script.js"></script>
    <script>
        // Función para cambiar de sección
        function cambiarSeccion(evento, idSeccion) {
            const contenidos = document.querySelectorAll('.contenido-seccion');
            contenidos.forEach(c => c.classList.remove('activa'));

            const botones = document.querySelectorAll('.boton-opcion');
            botones.forEach(b => b.classList.remove('activa'));

            document.getElementById(idSeccion).classList.add('activa');
            if (evento) evento.currentTarget.classList.add('activa');
        }

        function mostrarQR() {
            const caja = document.getElementById('cajaQR');
            caja.style.display = (caja.style.display === "none" || caja.style.display === "") ? "block" : "none";
        }
    </script>
    <script src="../js/script.js"></script>
</body>
</html>