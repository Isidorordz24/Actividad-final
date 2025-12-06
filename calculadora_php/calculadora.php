<?php
// calculadora.php

$pantalla = isset($_POST['pantalla']) ? $_POST['pantalla'] : '0';

if (isset($_POST['boton'])) {
    $boton = $_POST['boton'];

    if ($boton == 'C') {
        $pantalla = '0';
    } elseif ($boton == '=') {
        try {
            $expresion = preg_replace('/[^0-9+\\-.*\\/]/', '', $pantalla);
            $resultado = eval("return $expresion;");
            $pantalla = $resultado;
        } catch (Throwable $e) {
            $pantalla = 'Error';
        }
    } else {
        if ($pantalla == '0' || $pantalla == 'Error') {
            $pantalla = $boton;
        } else {
            $pantalla .= $boton;
        }
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Calculadora PHP</title>
    <link rel="stylesheet" href="estilos.css">
</head>
<body>
    <form method="post" class="calculadora">
        <input type="text" id="pantalla" name="pantalla" value="<?= htmlspecialchars($pantalla) ?>" readonly>

        <div class="botones">
            <button type="submit" name="boton" value="C" class="limpiar">C</button>
            <button type="submit" name="boton" value="/" class="operador">/</button>
            <button type="submit" name="boton" value="*" class="operador">×</button>
            <button type="submit" name="boton" value="-" class="operador">-</button>

            <button type="submit" name="boton" value="7">7</button>
            <button type="submit" name="boton" value="8">8</button>
            <button type="submit" name="boton" value="9">9</button>
            <button type="submit" name="boton" value="+" class="operador">+</button>

            <button type="submit" name="boton" value="4">4</button>
            <button type="submit" name="boton" value="5">5</button>
            <button type="submit" name="boton" value="6">6</button>
            <button type="submit" name="boton" value="=" class="igual">=</button>

            <button type="submit" name="boton" value="1">1</button>
            <button type="submit" name="boton" value="2">2</button>
            <button type="submit" name="boton" value="3">3</button>

            <button type="submit" name="boton" value="0" class="cero">0</button>
            <button type="submit" name="boton" value=".">.</button>
        </div>
    </form>
</body>
</html>
