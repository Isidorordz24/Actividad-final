<?php
session_start();
require "db.php";
if (!isset($_SESSION['user_id'])) { echo "No autorizado"; exit; }
$name = trim($_POST['name'] ?? '');
if ($name === '') { echo "Nombre vacío"; exit; }

$pdo->beginTransaction();
try {
    $stmt = $pdo->prepare("INSERT INTO groups (name) VALUES (?)");
    $stmt->execute([$name]);
    $group_id = $pdo->lastInsertId();
    $stmt = $pdo->prepare("INSERT INTO group_members (group_id, user_id) VALUES (?, ?)");
    $stmt->execute([$group_id, $_SESSION['user_id']]);
    $pdo->commit();
    echo "OK";
} catch (Exception $e) {
    $pdo->rollBack();
    echo "Error: " . $e->getMessage();
}
