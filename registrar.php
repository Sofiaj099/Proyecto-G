<?php
// Como registrar.php está en la raíz, entramos a la carpeta php para buscar la conexión
include 'php/conexion.php';

$nombre = trim($_POST['nombre']);
$apellido = trim($_POST['apellido']);
$correo = trim($_POST['correo']);
$contrasena_plana = $_POST['contrasena'];

$verificar_correo = "SELECT * FROM usuarios WHERE correo = '$correo'";
$resultado = $conexion->query($verificar_correo);

if ($resultado && $resultado->num_rows > 0) {
    // Como ya no estamos dentro de la carpeta php, apuntamos directo a iniciar_sesion.php
    echo "<script>alert('Este correo ya está registrado. Inicia sesión con él.'); window.location.href = 'iniciar_sesion.php';</script>";
} else {
    $contrasena_segura = password_hash($contrasena_plana, PASSWORD_DEFAULT);

    $sql_guardar = "INSERT INTO usuarios (nombre, apellido, correo, contrasena) VALUES ('$nombre', '$apellido', '$correo', '$contrasena_segura')";

    if ($conexion->query($sql_guardar) === TRUE) {
        echo "<script>alert('¡Cuenta creada con éxito! Ya puedes iniciar sesión.'); window.location.href = 'iniciar_sesion.php';</script>";
    } else {
        echo "<script>alert('Ups, algo salió mal al registrarte. Inténtalo de nuevo.'); window.history.back();</script>";
    }
}

$conexion->close();
?>
