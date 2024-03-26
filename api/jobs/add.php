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

$check_company_id = $mysqli->prepare("SELECT name FROM companies WHERE id = ?");
$check_company_id->bind_param('i', $company_id);
$check_company_id->execute();
$check_company_id->store_result();

if($check_company_id->num_rows == 0) {
    $response['status'] = 'error';
    $response['message'] = 'Company not found';
    echo json_encode($response);
    exit;
}

$check_company_id->bind_result($company_name);
$check_company_id->fetch();

$query = $mysqli->prepare("INSERT INTO jobs (title, description, company_id) VALUES (?, ?, ?)");
$query->bind_param('ssi', $title, $description, $company_id);
$query->execute();

$id = $mysqli->insert_id;

$response['status'] = 'success';
$response['message'] = 'Job added';
$response['data'] = [
    'id' => $id,
    'title' => $title,
    'job_description' => $description,
    'company_id' => $company_id,
    'company_name' => $company_name,
    'created_at' => date('Y-m-d H:i:s')
];

echo json_encode($response);