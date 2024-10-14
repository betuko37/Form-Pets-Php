<?php
include('database.php');

$query = "SELECT * FROM mascotas"; 
$result = mysqli_query($connection, $query);

if (!$result) {
    die('Error en la consulta: ' . mysqli_error($connection));
}

$mascotas = array();

while ($row = mysqli_fetch_assoc($result)) {
    $mascotas[] = $row;
}

echo json_encode($mascotas);
?>
