<?php
$servidor = "localhost";
$usuario = "root";
$password = "";
$base_datos = "docentes"; // El nombre exacto de tu base de datos

// Aquí creamos la variable $conexion que el registro necesita
$conexion = new mysqli($servidor, $usuario, $password, $base_datos);

// Si hay un error de conexión, lo detenemos aquí
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}
?>