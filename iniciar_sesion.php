<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar sesión</title>
    <link rel="stylesheet" href="css/landing.css">
    <link rel="stylesheet" href="css/cuentas.css">
</head>
<body>
    <main class="contenedor-principal">
        <section class="tarjeta-registro">
            <div class="encabezado">
                <h1>Iniciar sesión</h1>
                <p>¡Bienvenido, docente!</p>
            </div>

            <form action="login.php" method="POST">
                <div class="campo">
                    <label for="correo">Correo electrónico</label>
                    <input type="email" id="correo" name="correo" placeholder="Correo electrónico" required>
                </div>

                <div class="campo">
                    <label for="contrasena">Contraseña</label>
                    <div class="contenedor-contrasena">
                        <input type="password" id="contrasena" name="contrasena" placeholder="Contraseña" required>
                    </div>
                </div>

                <button type="submit" class="boton-registro" style="width: 100%; border: none; cursor: pointer;">
                    Iniciar sesión
                </button>

                <p class="enlace-inicio">
                    ¿No tienes una cuenta? <a href="crear_cuenta.php">Crear cuenta</a>
                </p>
            </form>
        </section>
    </main>
</body>
</html>