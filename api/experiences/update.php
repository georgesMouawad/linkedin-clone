<?php

include('../connection.php');

if (empty($_POST['id'])) {
    $response['status'] = 'error';
    $response['message'] = 'Missing required fields';
    echo json_encode($response);
    exit;
}

$id = $_POST['id'];

$check_id = $mysqli->prepare("SELECT * FROM user_experiences WHERE id = ?");
$check_id->bind_param('i', $id);
$check_id->execute();
$check_id->store_result();

if ($check_id->num_rows === 0) {
    $response['status'] = 'error';
    $response['message'] = 'Experience not found';
    echo json_encode($response);
    exit;
}

$fields_to_update = [];

if (!empty($_POST['position'])) {
    $updated_position = $_POST['position'];
    $fields_to_update[] = "position = '$updated_position'";
}

if (!empty($_POST['company_id'])) {
    $updated_company = $_POST['company'];
    $fields_to_update[] = "company = '$updated_company'";
}

if (!empty($_POST['start_date'])) {
    $updated_start_date = $_POST['start_date'];
    $fields_to_update[] = "start_date = '$updated_start_date'";
}

if (!empty($_POST['end_date'])) {
    $updated_end_date = $_POST['end_date'];
    $fields_to_update[] = "end_date = '$updated_end_date'";
}

if (empty($fields_to_update)) {
    $response['status'] = 'error';
    $response['message'] = 'No fields to update';
    echo json_encode($response);
    exit;
}

$update_query = "UPDATE user_experiences SET " . implode(', ', $fields_to_update) . " WHERE id = $id";
$query = $mysqli->prepare($update_query);
$query->execute();

$check_id->execute();
$check_id->store_result();
$check_id->bind_result($id, $user_id, $position, $company, $start_date, $end_date);
$check_id->fetch();

$response['status'] = 'success';
$response['message'] = 'Experience updated';
$response['data'] = [
    'id' => $id,
    'user_id' => $user_id,
    'position' => $position,
    'company' => $company,
    'start_date' => $start_date,
    'end_date' => $end_date,
];

echo json_encode($response);
