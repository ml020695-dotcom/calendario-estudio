<?php

require __DIR__ . '/db.php';

header('Access-control-Allow-Origin: *');
header('Access-control-Allow-Methods: POST, OPTIONS');
header('Access-control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

$datos = json_decode(file_get_contents('php://input'), true);

$titulo = trim($datos['titulo'] ?? '');
$fecha = $datos['fecha'] ?? '';
$descripcion = trim($datos['descripcion'] ?? '');

if ($titulo === '' || $fecha === '') {
    http_response_code(400);
    echo json_encode(['error' => 'El titulo y la fecha son obligatorios']);
    exit;
}

$pdo = conectar();

$consulta = $pdo->prepare(
    'INSERT INTO tareas (titulo, descripcion,fecha) VALUES (?, ?, ?)'
);

$consulta->execute([$titulo, $descripcion, $fecha]);

echo json_encode(['id' => $pdo->lastInsertId()]);
