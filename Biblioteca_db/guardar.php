<?php
include('conexion.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $titulo = $_POST['titulo'];
    $autor = $_POST['autor'];
    $precio = $_POST['precio'];
    $editorial = $_POST['editorial'];
    $enlace = $_POST['enlace'];

    $sql = "INSERT INTO libros (titulo, autor, precio, editorial, enlace)
            VALUES ('$titulo', '$autor', '$precio', '$editorial', '$enlace')";

    if ($conn->query($sql) === TRUE) {
        header("Location: index.php");
        exit();
    } else {
        echo "Error al guardar: " . $conn->error;
    }
}
?>
