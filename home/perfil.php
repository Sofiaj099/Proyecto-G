<?php
session_start();

// Obtener datos del docente logueado desde la sesión (o valores por defecto)
$nombre       = $_SESSION['nombre']       ?? 'Docente';
$apellido     = $_SESSION['apellido']     ?? '';
$email        = $_SESSION['email']        ?? 'correo@colegio.edu';
$telefono     = $_SESSION['telefono']     ?? '';
$id_docente   = $_SESSION['id_docente']   ?? '48291';
$especialidad = $_SESSION['especialidad'] ?? 'Educación Básica y Secundaria';

// Generar iniciales automáticas para el avatar
$iniciales = strtoupper(substr($nombre, 0, 1) . substr($apellido, 0, 1));
if (empty(trim($iniciales))) {
    $iniciales = 'DOC';
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tu Perfil - Docentes</title>
    <link rel="stylesheet" href="../css/home.css">
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
            <li><a href="perfil.php" class="activo">Tu perfil</a></li>
            <li><a href="../iniciar_sesion.php">Cerrar Sesión</a></li>
        </ul>
    </nav>

    <!-- Contenido Principal -->
    <main class="contenedor-principal">
        <h1 style="color: #342e57; margin-bottom: 20px;">Perfil del Docente</h1>

        <!-- Tarjeta de Resumen con datos dinámicos -->
        <div class="seccion-detalle" style="display: flex; align-items: center; gap: 20px; flex-wrap: wrap; margin-bottom: 25px;">
            <div style="width: 75px; height: 75px; background-color: #837bb9; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; font-weight: bold;">
                <?php echo htmlspecialchars($iniciales); ?>
            </div>
            <div>
                <h2 style="margin: 0; color: #342e57;"><?php echo htmlspecialchars(trim($nombre . ' ' . $apellido)); ?></h2>
                <p style="margin: 4px 0 0 0; color: #666; font-size: 0.9rem;"><?php echo htmlspecialchars($especialidad); ?></p>
                <p style="margin: 2px 0 0 0; color: #837bb9; font-size: 0.85rem; font-weight: bold;">ID Docente: #<?php echo htmlspecialchars($id_docente); ?></p>
            </div>
        </div>

        <!-- Formulario de Información Personal -->
        <div class="seccion-detalle">
            <h2>Información Personal</h2>
            <form id="formularioPerfil" style="margin-top: 15px; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 15px;">
                <div>
                    <label style="display: block; margin-bottom: 5px; font-size: 0.85rem; color: #342e57; font-weight: bold;">Nombre</label>
                    <input type="text" class="input-estilo" value="<?php echo htmlspecialchars($nombre); ?>" required>
                </div>

                <div>
                    <label style="display: block; margin-bottom: 5px; font-size: 0.85rem; color: #342e57; font-weight: bold;">Apellido</label>
                    <input type="text" class="input-estilo" value="<?php echo htmlspecialchars($apellido); ?>" required>
                </div>

                <div>
                    <label style="display: block; margin-bottom: 5px; font-size: 0.85rem; color: #342e57; font-weight: bold;">Correo Electrónico</label>
                    <input type="email" class="input-estilo" value="<?php echo htmlspecialchars($email); ?>" required>
                </div>

                <div>
                    <label style="display: block; margin-bottom: 5px; font-size: 0.85rem; color: #342e57; font-weight: bold;">Teléfono de Contacto</label>
                    <input type="tel" class="input-estilo" value="<?php echo htmlspecialchars($telefono); ?>">
                </div>

                <div style="grid-column: 1 / -1; margin-top: 10px;">
                    <button type="submit" class="boton-guardar">Guardar Cambios</button>
                </div>
            </form>
        </div>

        <!-- Formulario de Cambio de Contraseña -->
        <div class="seccion-detalle" style="margin-top: 25px;">
            <h2>Seguridad / Cambiar Contraseña</h2>
            <form id="formularioPassword" style="margin-top: 15px; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 15px;">
                <div>
                    <label style="display: block; margin-bottom: 5px; font-size: 0.85rem; color: #342e57; font-weight: bold;">Contraseña Actual</label>
                    <input type="password" class="input-estilo" placeholder="••••••••">
                </div>

                <div>
                    <label style="display: block; margin-bottom: 5px; font-size: 0.85rem; color: #342e57; font-weight: bold;">Nueva Contraseña</label>
                    <input type="password" class="input-estilo" placeholder="••••••••">
                </div>

                <div style="grid-column: 1 / -1; margin-top: 10px;">
                    <button type="submit" class="boton-guardar">Actualizar Contraseña</button>
                </div>
            </form>
        </div>
    </main>

    <script src="../js/script.js"></script>
</body>
</html>