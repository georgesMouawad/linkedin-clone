<?php

include('../connection.php');

if (empty($_POST['id']) || empty($_POST['school']) || empty($_POST['degree']) || empty($_POST['field_of_study']) || empty($_POST['start_date'])) {
    $response['status'] = 'error';
    $response['message'] = 'Missing required fields';
    echo json_encode($response);
    exit;
}

$user_id = $_POST['id'];
$school = $_POST['school'];
$degree = $_POST['degree'];
$field_of_study = $_POST['field_of_study'];
$start_date = $_POST['start_date'];
$end_date = $_POST['end_date'] ?? null;

$get_user = $mysqli->prepare("SELECT * FROM users WHERE id = ?");
$get_user->bind_param('i', $user_id);
$get_user->execute();
$get_user->store_result();

if ($get_user->num_rows > 0) {
    $query = $mysqli->prepare("INSERT INTO user_educations (user_id, school, degree, field_of_study, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?)");
    $query->bind_param('isssss', $user_id, $school, $degree, $field_of_study, $start_date, $end_date);
    $query->execute();

    $id = $mysqli->insert_id;

    $response['status'] = 'success';
    $response['message'] = 'Education added';
    $response['data'] = [
        'id' => $id,
        'school' => $school,
        'degree' => $degree,
        'field_of_study' => $field_of_study,
        'start_date' => $start_date,
        'end_date' => $end_date,
    ];
} else {
    $response['status'] = 'error';
    $response['message'] = 'User not found';
}

echo json_encode($response);

