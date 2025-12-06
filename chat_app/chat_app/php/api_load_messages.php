<?php
session_start();
require "db.php";
if (!isset($_SESSION['user_id'])) { echo "No autorizado"; exit; }

$type = $_GET['type'] ?? 'global';

function esc($s){ return htmlspecialchars($s, ENT_QUOTES, 'UTF-8'); }

if ($type === 'global') {
    $stmt = $pdo->query("SELECT m.message, m.created_at, u.username FROM messages_global m JOIN users u ON u.id = m.user_id ORDER BY m.id ASC");
    while ($r = $stmt->fetch()) {
        $time = date("H:i", strtotime($r['created_at']));
        echo "<div><small>{$time}</small> <b>".esc($r['username'])."</b>: ".esc($r['message'])."</div>";
    }
} elseif ($type === 'private') {
    $with = intval($_REQUEST['with'] ?? 0);
    $me = $_SESSION['user_id'];
    if (!$with) { echo "Selecciona un usuario."; exit; }
    $stmt = $pdo->prepare("SELECT pm.from_id, pm.to_id, pm.message, pm.created_at, u.username
        FROM private_messages pm
        JOIN users u ON u.id = pm.from_id
        WHERE (from_id = ? AND to_id = ?) OR (from_id = ? AND to_id = ?)
        ORDER BY pm.id ASC");
    $stmt->execute([$me, $with, $with, $me]);
    while ($r = $stmt->fetch()) {
        $time = date("H:i", strtotime($r['created_at']));
        $sender = ($r['from_id'] == $me) ? 'Tú' : $r['username'];
        echo "<div><small>{$time}</small> <b>".esc($sender)."</b>: ".esc($r['message'])."</div>";
    }
} elseif ($type === 'group') {
    $group_id = intval($_REQUEST['group_id'] ?? 0);
    if (!$group_id) { echo "Grupo no válido."; exit; }
    // verificar miembro (permiso de lectura)
    $stmt = $pdo->prepare("SELECT id FROM group_members WHERE group_id=? AND user_id=?");
    $stmt->execute([$group_id, $_SESSION['user_id']]);
    if (!$stmt->fetch()) { echo "No eres miembro del grupo."; exit; }

    $stmt = $pdo->prepare("SELECT gm.message, gm.created_at, u.username FROM group_messages gm JOIN users u ON u.id = gm.user_id WHERE gm.group_id = ? ORDER BY gm.id ASC");
    $stmt->execute([$group_id]);
    while ($r = $stmt->fetch()) {
        $time = date("H:i", strtotime($r['created_at']));
        echo "<div><small>{$time}</small> <b>".esc($r['username'])."</b>: ".esc($r['message'])."</div>";
    }
} else {
    echo "Tipo inválido.";
}
