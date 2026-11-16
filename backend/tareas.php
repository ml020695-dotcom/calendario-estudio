<?php
require __DIR__ . '/db.php';

header('access-control-Allow-Origin: *');
header('content-type: application/json; charset=utf-8');

$pdo = conectar();

$consulta = $pdo->query('SELECT id, titulo, descripcion, fecha, hecha FROM tareas ORDER BY fecha');

$tareas = $consulta->fetchAll();

echo json_encode($tareas, JSON_UNESCAPED_UNICODE);
