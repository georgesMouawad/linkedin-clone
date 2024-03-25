<?php

header('Access-Control-Allow-Origin: http://localhost:*');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$host = 'localhost';
$db_user = 'root';
$db_pass = null;
$db_name = 'linkedinclonedb';

$mysqli = new mysqli($host, $db_user, $db_pass, $db_name);

if ($mysqli->connect_error) {
    die('Connection Failed: ' . $mysqli->connect_error);
}