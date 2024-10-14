<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'database.php'; // Asegúrate de que la conexión esté bien establecida

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'];
    $edad = $_POST['edad'];
    $sexo = $_POST['sexo'];
    $fecha_nacimiento = $_POST['fecha_nacimiento'];

    // Aquí va la consulta SQL para insertar en la base de datos
    $stmt = $connection->prepare("INSERT INTO mascotas (nombre, edad, sexo, fecha_nacimiento) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("siss", $nombre, $edad, $sexo, $fecha_nacimiento);

    if ($stmt->execute()) {
        echo "Mascota guardada con éxito.";
    } else {
        echo "Error al guardar la mascota: " . $stmt->error;
    }
    $stmt->close();
}

$connection->close();
?>
