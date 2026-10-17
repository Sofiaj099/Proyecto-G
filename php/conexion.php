<?php
$host = "localhost";
$usuario = "root";
$clave = "";
$bd = "docentes";

$conexion = mysqli_connect($host, $usuario, $clave, $bd);

if (!$conexion) {
    die("Error de conexión a la base de datos: " . mysqli_connect_error());
}

mysqli_set_charset($conexion, "utf8");
?>