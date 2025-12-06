<?php include('conexion.php'); ?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Registro de Libros</title>
  <link rel="stylesheet" href="style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap" rel="stylesheet">
</head>
<body>

  <div class="container">
    <div class="left">
      <img src="https://cdn-icons-png.flaticon.com/512/2983/2983782.png" alt="Libros">
      <h2>Biblioteca Digital</h2>
      <p>Registrá nuevos libros y administrá tu colección fácilmente.</p>
    </div>

    <div class="right">
      <h3>Registrar nuevo libro</h3>

      <form action="guardar.php" method="POST">
        <input type="text" name="titulo" placeholder="Título" required>
        <input type="text" name="autor" placeholder="Autor" required>
        <input type="number" step="0.01" name="precio" placeholder="Precio" required>
        <input type="text" name="editorial" placeholder="Editorial">
        <input type="url" name="enlace" placeholder="Enlace">
        <button type="submit">Guardar libro</button>
      </form>

      <h3>Lista de libros</h3>
      <table>
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Autor</th>
          <th>Precio</th>
          <th>Editorial</th>
          <th>Enlace</th>
        </tr>

        <?php
        $sql = "SELECT * FROM libros";
        $result = $conn->query($sql);

        if ($result->num_rows > 0):
            while ($row = $result->fetch_assoc()):
        ?>
          <tr>
            <td><?= $row["id"] ?></td>
            <td><?= htmlspecialchars($row["titulo"]) ?></td>
            <td><?= htmlspecialchars($row["autor"]) ?></td>
            <td>$<?= number_format($row["precio"], 2) ?></td>
            <td><?= htmlspecialchars($row["editorial"]) ?></td>
            <td><a href="<?= htmlspecialchars($row["enlace"]) ?>" target="_blank">Ver</a></td>
          </tr>
        <?php
            endwhile;
        else:
            echo "<tr><td colspan='6'>No hay libros registrados</td></tr>";
        endif;
        ?>
      </table>
    </div>
  </div>

</body>
</html>
