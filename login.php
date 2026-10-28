<?php
session_start();
include("php/conexion.php");

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    header("Location: iniciar_sesion.php");
    exit;
}

$correo = trim($_POST["correo"] ?? "");
$contrasena = $_POST["contrasena"] ?? "";

$sql = "SELECT id, nombre, apellido, correo, contrasena FROM usuarios WHERE correo = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("s", $correo);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows == 1) {
    $usuario = $resultado->fetch_assoc();

    if (password_verify($contrasena, $usuario["contrasena"])) {
        session_regenerate_id(true);

        $_SESSION["id_usuario"] = $usuario["id"];
        $_SESSION["nombre"]     = $usuario["nombre"];
        $_SESSION["apellido"]   = $usuario["apellido"];
        $_SESSION["email"]      = $usuario["correo"];

        header("Location: home/panel.php");
        exit;
    }
}

echo "<script>alert('Correo o contraseña incorrectos.'); window.location.href = 'iniciar_sesion.php';</script>";

$stmt->close();
$conexion->close();
?>