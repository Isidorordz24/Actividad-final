<?php
session_start();
require "php/db.php";

$error = "";
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = trim($_POST["username"] ?? "");
    $password = $_POST["password"] ?? "";

    if ($username === "" || $password === "") {
        $error = "Completa usuario y contraseña.";
    } else {
        $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
        $stmt->execute([$username]);
        if ($stmt->fetch()) {
            $error = "El usuario ya existe.";
        } else {
            $hash = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
            $stmt->execute([$username, $hash]);
            header("Location: login.php?registered=1");
            exit;
        }
    }
}
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Registrarse</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<div class="auth-box">
    <h2>Registrarse</h2>
    <?php if ($error): ?><div class="error"><?=htmlspecialchars($error)?></div><?php endif; ?>
    <form method="POST">
        <input name="username" placeholder="Usuario" required><br>
        <input name="password" type="password" placeholder="Contraseña" required><br>
        <button>Crear cuenta</button>
    </form>
    <p>¿Ya tienes cuenta? <a href="login.php">Entrar</a></p>
</div>
</body>
</html>
