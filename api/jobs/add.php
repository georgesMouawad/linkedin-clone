<?php

include('../connection.php');

if (empty($_POST['title']) || empty($_POST['description']) || empty($_POST['company_id'])) {
    $response['status'] = 'error';
    $response['message'] = 'Missing required fields';
    echo json_encode($response);
    exit;
}

$title = $_POST['title'];
$description = $_POST['description'];
$company_id = $_POST['company_id'];

$query = $mysqli->prepare("INSERT INTO jobs (title, description, company_id) VALUES (?, ?, ?)");
$query->bind_param('ssi', $title, $description, $company_id);
$query->execute();

$id = $mysqli->insert_id;

$response['status'] = 'success';
$response['message'] = 'Job added';
$response['data'] = [
    'id' => $id,
    'title' => $title,
    'description' => $description,
    'company_id' => $company_id,
    'timestamp' => date('Y-m-d H:i:s')
];

echo json_encode($response);