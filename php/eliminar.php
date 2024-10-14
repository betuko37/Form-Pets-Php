<?php
include('database.php');

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    // Eliminar la mascota con el ID especificado
    $query = "DELETE FROM mascotas WHERE id='$id'";
    $result = mysqli_query($connection, $query);

    if (!$result) {
        die('Error al eliminar: ' . mysqli_error($connection));
    }

    echo 'Mascota eliminada correctamente';
} else {
    echo 'Error: no se recibió el ID';
}
?>
