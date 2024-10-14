<?php
include('database.php');

if (isset($_POST['id']) && isset($_POST['nombre']) && isset($_POST['edad']) && isset($_POST['sexo']) && isset($_POST['fecha_nacimiento'])) {
    $id = $_POST['id'];
    $nombre = $_POST['nombre'];
    $edad = $_POST['edad'];
    $sexo = $_POST['sexo'];
    $fecha_nacimiento = $_POST['fecha_nacimiento'];

    // Actualizamos la mascota con los nuevos datos
    $query = "UPDATE mascotas SET nombre='$nombre', edad='$edad', sexo='$sexo', fecha_nacimiento='$fecha_nacimiento' WHERE id='$id'";
    $result = mysqli_query($connection, $query);

    if (!$result) {
        die('Error en la actualización: ' . mysqli_error($connection));
    }

    echo 'Mascota actualizada correctamente';
} else {
    echo 'Error: faltan datos o ID no proporcionado';
}
?>
