<?php
$connection = mysqli_connect(
    'localhost',  // Servidor
    'root',       // Usuario
    '',           // Contraseña vacía
    'veterinaria'     // Base de datos
);

// Verificar la conexión
if (!$connection) {
    die("Error de conexión: " . mysqli_connect_error());
}

?>
