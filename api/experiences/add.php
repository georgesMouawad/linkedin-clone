<?php

include('../connection.php');

if (empty($_POST['id']) || empty($_POST['position']) || empty($_POST['company']) || empty($_POST['start_date'])) {
    $response['status'] = 'error';
    $response['message'] = 'Missing required fields';
    echo json_encode($response);
    exit;
}

$id = $_POST['id'];

$check_id = $mysqli->prepare("SELECT * FROM users WHERE id = ?");
$check_id->bind_param('i', $id);
$check_id->execute();
$check_id->store_result();

if ($check_id->num_rows === 0) {
    $response['status'] = 'error';
    $response['message'] = 'User not found';
    echo json_encode($response);
    exit;
}

$position = $_POST['position'];
$company = $_POST['company'];
$start_date = $_POST['start_date'];
$end_date = $_POST['end_date'] ?? null;


$query = $mysqli->prepare("INSERT INTO user_experiences (user_id, position, company, start_date, end_date) VALUES (?, ?, ?, ?, ?)");
$query->bind_param('issss',$id, $position, $company, $start_date, $end_date);
$query->execute();

$id = $mysqli->insert_id;

$response['status'] = 'success';
$response['message'] = 'Experience added';
$response['data'] = [
    'id' => $id,
    'position' => $position,
    'company' => $company,
    'start_date' => $start_date,
    'end_date' => $end_date,
];

echo json_encode($response);

