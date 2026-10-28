<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Estudiantes y QR - Docentes</title>
    <link rel="stylesheet" href="../css/home.css">
</head>
<body>

    <!-- Menú Lateral -->
    <nav class="menu-lateral">
        <ul class="lista-menu">
            <li><a href="panel.php">Inicio</a></li>
            <li><a href="estudiantes.php" class="activo">Estudiantes / QR</a></li>
            <li><a href="calificaciones.php">Calificaciones</a></li>
            <li><a href="apuntes.php">Observaciones</a></li>
            <li><a href="recordatorios.php">Recordatorios</a></li>
            <li><a href="perfil.php">Tu perfil</a></li>
            <li><a href="../iniciar_sesion.php">Cerrar Sesión</a></li>
        </ul>
    </nav>

    <!-- Contenido Principal -->
    <main class="contenedor-principal">
        <h1 style="color: #342e57; margin-bottom: 20px;">Estudiantes y Código QR por Materia</h1>

        <!-- Buscador de Materias y Clases -->
        <div class="seccion-detalle">
            <h2>Buscar Materia o Clase</h2>
            <input type="text" id="buscadorMaterias" class="input-estilo" placeholder="Escribe el nombre de la materia o grupo (ej. Matemáticas, 1°A)...">
        </div>

        <!-- Contenedor con Materias y Clases -->
        <div id="contenedorListaEstudiantes">
            
            <!-- Bloque Materia 1 -->
            <div class="bloque-materia item-busqueda">
                <div class="titulo-materia">
                    <span class="flecha">▶</span>
                    <h2>Matemáticas</h2>
                </div>
                <div class="contenedor-clases" style="display: none;">
                    
                    <a href="ver_clase.php?nombre=Matematicas 1A&seccion=sec-estudiantes" class="tarjeta-clase">
                        <h3>Matemáticas 1°A</h3>
                        <p>Ver lista de alumnos y código QR &rarr;</p>
                    </a>

                    <a href="ver_clase.php?nombre=Matematicas 2B&seccion=sec-estudiantes" class="tarjeta-clase">
                        <h3>Matemáticas 2°B</h3>
                        <p>Ver lista de alumnos y código QR &rarr;</p>
                    </a>

                </div>
            </div>

            <!-- Bloque Materia 2 -->
            <div class="bloque-materia item-busqueda">
                <div class="titulo-materia">
                    <span class="flecha">▶</span>
                    <h2>Historia</h2>
                </div>
                <div class="contenedor-clases" style="display: none;">
                    
                    <a href="ver_clase.php?nombre=Historia 2B&seccion=sec-estudiantes" class="tarjeta-clase">
                        <h3>Historia 2°B</h3>
                        <p>Ver lista de alumnos y código QR &rarr;</p>
                    </a>

                </div>
            </div>

        </div>
    </main>

    <script src="../js/script.js"></script>
    
</body>
</html>
