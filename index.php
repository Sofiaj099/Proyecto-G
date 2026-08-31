<?php

include("php/conexion.php");

$sql = "SELECT * FROM usuario";

$resultado = $conn->query($sql);

?>

<!DOCTYPE html>
<html lang="es">

<head>

    <meta charset="UTF-8">

    <title>Tabla dinámica</title>

    <link rel="stylesheet" href="css/estilos.css">

</head>

<body>

    <h1>Agregar información</h1>


    <!-- FORMULARIO -->

    <form action="php/guardar.php" method="POST">

        <label>Nombre:</label>

        <input 
            type="text"
            name="nombre"
            placeholder="Escriba un nombre"
            required
        >


        <label>Número:</label>

        <input 
            type="number"
            name="numero"
            placeholder="Escriba un número"
            required
        >
<label>materia:</label>
<input 
            type="text"
            name="materia"
            placeholder="Escriba una materia"
            required>

        <button type="submit">
            Agregar
        </button>

    </form>


    <!-- TABLA -->

    <table>

        <thead>

            <tr>

                <th>Nombre</th>

                <th>Número</th>

                <th>Materia</th>
            </tr>

        </thead>


        <tbody>

            <?php

            while ($fila = $resultado->fetch_assoc()) {

            ?>

                <tr>

                    <td>
                        <?php echo $fila["nombre"]; ?>
                    </td>


                    <td>

                        <!-- AQUÍ SE CREA EL BOTÓN -->

                        <button type="button">

                            <?php echo $fila["numero"]; ?>

                        </button>

                    </td>

                    <td>
                        <?php echo $fila["materia"]; ?>
                    </td>

                </tr>

            <?php

            }

            ?>

        </tbody>

    </table>


</body>

</html>