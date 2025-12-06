<?php
session_start();
require "db.php";
if (!isset($_SESSION['user_id'])) { echo ""; exit; }
$me = $_SESSION['user_id'];

$stmt = $pdo->prepare("SELECT id, username FROM users WHERE id != ? ORDER BY username ASC");
$stmt->execute([$me]);
while ($r = $stmt->fetch()) {
    echo "<div class='user-item' data-id='".intval($r['id'])."'>".htmlspecialchars($r['username'])."</div>";
}
