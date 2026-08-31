<?php

include("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $nombre = $_POST["nombre"];
    $numero = $_POST["numero"];
    $materia = $_POST["materia"];

    $sql = "INSERT INTO usuario (nombre, numero, materia)
            VALUES ('$nombre', '$numero' , '$materia')";

    if ($conn->query($sql) === TRUE) {

        header("Location: ../index.php");
        exit();

    } else {

        echo "Error: " . $conn->error;

    }
}

?>