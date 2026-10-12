<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crea tu cuenta | Organización Docente</title>

    <link rel="stylesheet" href="css/landing.css">
    <link rel="stylesheet" href="css/cuentas.css">

</head>
<body>

    <main class="contenedor-principal">
        <section class="tarjeta-registro">

            <div class="encabezado">
                <h3>Crea tu cuenta para organizar todas tus actividades académicas en un solo lugar.</h3>
            </div>

            <form action="  registrar.php" method="POST">

                <div class="campo">
                    <label for="nombre">Nombre</label>
                    <input type="text" id="nombre" name="nombre" placeholder="Nombre" required>
                </div>

                <div class="campo">
                    <label for="apellido">Apellido</label>
                    <input type="text" id="apellido" name="apellido" placeholder="Apellido" required>
                </div>

                <div class="campo">
                    <label for="correo">Correo electrónico</label>
                    <input type="email" id="correo" name="correo" placeholder="E-mail@.com" required>
                </div>

                <div class="campo">
                    <label for="contrasena">Contraseña</label>
                    <input type="password" id="contrasena" name="contrasena" placeholder="Mínimo 6 caracteres" required>
                </div>

                <button type="submit" class="boton-registro">Registrarme</button>

                <p class="enlace-inicio">
                    ¿Ya tienes una cuenta? <a href="iniciar_sesion.php">Inicia sesión aquí</a>
                </p>

            </form>

        </section>
    </main>

</body>
</html>