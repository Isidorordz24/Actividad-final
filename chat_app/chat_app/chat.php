<?php
session_start();
if (!isset($_SESSION['user_id'])) header("Location: login.php");
$username = $_SESSION['username'];
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Chat App</title>
<link rel="stylesheet" href="css/style.css">
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
<div class="topbar">
    <div>Logueado como: <b><?=htmlspecialchars($username)?></b></div>
    <div><a href="logout.php">Salir</a></div>
</div>

<div class="layout">
    <aside class="sidebar">
        <h3>Usuarios</h3>
        <div id="users-list">Cargando...</div>

        <h3>Grupos</h3>
        <div id="groups-list">Cargando...</div>
        <form id="create-group-form">
            <input id="group-name" placeholder="Nuevo grupo" required>
            <button type="submit">Crear</button>
        </form>
    </aside>

    <main class="main">
        <div class="chat-header">
            <select id="channel-select">
                <option value="global">Chat global</option>
            </select>
        </div>

        <div id="chat" class="chat-window">Cargando mensajes...</div>

        <div class="chat-input">
            <input type="text" id="msg" placeholder="Escribe tu mensaje...">
            <button id="send">Enviar</button>
        </div>
    </main>
</div>

<script src="js/chat.js"></script>
</body>
</html>
