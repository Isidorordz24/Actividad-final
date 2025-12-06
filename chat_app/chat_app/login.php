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
        $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch();
        if ($user && password_verify($password, $user['password'])) {
            // login correcto
            session_regenerate_id(true);
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            header("Location: chat.php");
            exit;
        } else {
            $error = "Usuario o contraseña incorrectos.";
        }
    }
}
$registered = isset($_GET['registered']);
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Login</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<div class="auth-box">
    <h2>Iniciar sesión</h2>
    <?php if ($registered): ?><div class="success">Cuenta creada. Inicia sesión.</div><?php endif; ?>
    <?php if ($error): ?><div class="error"><?=htmlspecialchars($error)?></div><?php endif; ?>
    <form method="POST">
        <input name="username" placeholder="Usuario" required><br>
        <input name="password" type="password" placeholder="Contraseña" required><br>
        <button>Entrar</button>
    </form>
    <p>¿No tienes cuenta? <a href="register.php">Registrarse</a></p>
</div>
</body>
</html>
