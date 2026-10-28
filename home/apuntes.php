<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Apuntes - Docentes</title>
    <link rel="stylesheet" href="../css/home.css">
</head>
<body>

    <!-- Menú Lateral -->
    <nav class="menu-lateral">
        <ul class="lista-menu">
            <li><a href="panel.php">Inicio</a></li>
            <li><a href="estudiantes.php">Estudiantes / QR</a></li>
            <li><a href="calificaciones.php">Calificaciones</a></li>
            <li><a href="apuntes.php" class="activo">Observaciones</a></li>
            <li><a href="recordatorios.php">Recordatorios</a></li>
            <li><a href="perfil.php">Tu perfil</a></li>
            <li><a href="../iniciar_sesion.php">Cerrar Sesión</a></li>
        </ul>
    </nav>

    <!-- Contenido Principal -->
    <main class="contenedor-principal">
        <h1 style="color: #342e57; margin-bottom: 20px;">Apuntes y Observaciones por Materia</h1>

        <!-- Buscador de Materias y Clases -->
        <div class="seccion-detalle">
            <h2>Buscar Materia o Clase</h2>
            <input type="text" id="buscadorMaterias" class="input-estilo" placeholder="Escribe el nombre de la materia o grupo (ej. Matemáticas, 1°A)...">
        </div>

        <!-- Contenedor con Materias y Clases -->
        <div id="contenedorListaApuntes">
            
            <!-- Bloque Materia 1 -->
            <div class="bloque-materia item-busqueda">
                <div class="titulo-materia">
                    <span class="flecha">▶</span>
                    <h2>Matemáticas</h2>
                </div>
                <!-- Oculto inicialmente con display: none -->
                <div class="contenedor-clases" style="display: none;">
                    
                    <!-- Tarjeta Apunte Clase 1°A -->
                    <div class="seccion-detalle" style="margin-top: 10px; border-left: 4px solid #837bb9;">
                        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                            <h3>Matemáticas 1°A</h3>
                            <a href="ver_clase.php?nombre=Matematicas 1A&seccion=sec-apuntes" class="boton-volver" style="margin:0; font-size:0.85rem;">Ver Clase Completa &rarr;</a>
                        </div>
                        <p style="font-size: 0.85rem; color: #666; margin: 8px 0;"><b>Última observación registrada:</b></p>
                        <blockquote style="background: #fdf4e5; padding: 12px; border-radius: 6px; font-size: 0.9rem; color: #342e57;">
                            "El grupo mostró excelente rendimiento en el taller de ecuaciones. Pendiente revisar el ejercicio 4 con Carlos y Ana."
                        </blockquote>
                    </div>

                    <!-- Tarjeta Apunte Clase 2°B -->
                    <div class="seccion-detalle" style="margin-top: 10px; border-left: 4px solid #837bb9;">
                        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                            <h3>Matemáticas 2°B</h3>
                            <a href="ver_clase.php?nombre=Matematicas 2B&seccion=sec-apuntes" class="boton-volver" style="margin:0; font-size:0.85rem;">Ver Clase Completa &rarr;</a>
                        </div>
                        <p style="font-size: 0.85rem; color: #666; margin: 8px 0;"><b>Última observación registrada:</b></p>
                        <blockquote style="background: #fdf4e5; padding: 12px; border-radius: 6px; font-size: 0.9rem; color: #342e57;">
                            "Se reprogramó la entrega del taller para el próximo martes. Repasar fracciones antes de la evaluación."
                        </blockquote>
                    </div>

                </div>
            </div>

            <!-- Bloque Materia 2 -->
            <div class="bloque-materia item-busqueda">
                <div class="titulo-materia">
                    <span class="flecha">▶</span>
                    <h2>Historia</h2>
                </div>
                <!-- Oculto inicialmente con display: none -->
                <div class="contenedor-clases" style="display: none;">
                    
                    <!-- Tarjeta Apunte Clase 2°B -->
                    <div class="seccion-detalle" style="margin-top: 10px; border-left: 4px solid #837bb9;">
                        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                            <h3>Historia 2°B</h3>
                            <a href="ver_clase.php?nombre=Historia 2B&seccion=sec-apuntes" class="boton-volver" style="margin:0; font-size:0.85rem;">Ver Clase Completa &rarr;</a>
                        </div>
                        <p style="font-size: 0.85rem; color: #666; margin: 8px 0;"><b>Última observación registrada:</b></p>
                        <blockquote style="background: #fdf4e5; padding: 12px; border-radius: 6px; font-size: 0.9rem; color: #342e57;">
                            "Faltan dos grupos por exponer el tema de la Revolución Industrial."
                        </blockquote>
                    </div>

                </div>
            </div>

        </div>
    </main>

     <script src="../js/script.js"></script>
</body>
</html>
