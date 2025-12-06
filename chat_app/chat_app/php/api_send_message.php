<?php
session_start();
header('Content-Type: application/json');
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['ok'=>false,'msg'=>'No autorizado']); exit;
}
require "db.php";

$me = $_SESSION['user_id'];
$type = $_POST['type'] ?? 'global';
$msg = trim($_POST['msg'] ?? '');
if ($msg === '') { echo json_encode(['ok'=>false,'msg'=>'Mensaje vacío']); exit; }

try {
    if ($type === 'global') {
        $stmt = $pdo->prepare("INSERT INTO messages_global (user_id, message) VALUES (?, ?)");
        $stmt->execute([$me, $msg]);
    } elseif ($type === 'private') {
        $to = intval($_POST['to_id'] ?? 0);
        if ($to <= 0) throw new Exception('Destino inválido');
        $stmt = $pdo->prepare("INSERT INTO private_messages (from_id, to_id, message) VALUES (?, ?, ?)");
        $stmt->execute([$me, $to, $msg]);
    } elseif ($type === 'group') {
        $group_id = intval($_POST['group_id'] ?? 0);
        if ($group_id <= 0) throw new Exception('Grupo inválido');
        $stmt = $pdo->prepare("SELECT id FROM group_members WHERE group_id=? AND user_id=?");
        $stmt->execute([$group_id, $me]);
        if (!$stmt->fetch()) throw new Exception('No eres miembro del grupo');
        $stmt = $pdo->prepare("INSERT INTO group_messages (group_id, user_id, message) VALUES (?, ?, ?)");
        $stmt->execute([$group_id, $me, $msg]);
    } else {
        throw new Exception('Tipo inválido');
    }

    echo json_encode(['ok'=>true]);
} catch (Exception $e) {
    echo json_encode(['ok'=>false,'msg'=>$e->getMessage()]);
}
