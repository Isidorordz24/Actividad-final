<?php

session_start();
require "db.php";
if (!isset($_SESSION['user_id'])) { echo "No autorizado"; exit; }
$group_id = intval($_POST['group_id'] ?? 0);
if ($group_id <= 0) { echo "Grupo inválido"; exit; }

try {
    $stmt = $pdo->prepare("INSERT IGNORE INTO group_members (group_id, user_id) VALUES (?, ?)");
    $stmt->execute([$group_id, $_SESSION['user_id']]);
    echo "OK";
} catch (Exception $e) {
    echo "Error: ". $e->getMessage();
}
