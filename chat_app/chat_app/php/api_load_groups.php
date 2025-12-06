<?php
session_start();
require "db.php";
if (!isset($_SESSION['user_id'])) { echo ""; exit; }
$me = $_SESSION['user_id'];

$stmt = $pdo->query("SELECT g.id, g.name,
    (SELECT COUNT(*) FROM group_members gm WHERE gm.group_id = g.id AND gm.user_id = $me) as am_member
    FROM groups g ORDER BY g.name ASC");

while ($r = $stmt->fetch()) {
    $id = intval($r['id']);
    $name = htmlspecialchars($r['name']);
    if ($r['am_member']) {
        echo "<div class='group-item' data-id='$id'>".$name." <small>(Miembro)</small></div>";
    } else {
        echo "<div class='group-item' data-id='$id'>".$name." <button class='join-group' data-id='$id'>Unirse</button></div>";
    }
}
