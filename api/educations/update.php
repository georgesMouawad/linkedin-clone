<?php

include('../connection.php');

if (empty($_POST['id'])) {
    $response['status'] = 'error';
    $response['message'] = 'Missing required fields';
    echo json_encode($response);
    exit;
}

$id = $_POST['id'];

$check_id = $mysqli->prepare("SELECT * FROM user_educations WHERE id = ?");
$check_id->bind_param('i', $id);
$check_id->execute();
$check_id->store_result();

if($check_id->num_rows === 0) {
    $response['status'] = 'error';
    $response['message'] = 'Education Id not found';
    echo json_encode($response);
    exit;
}

$fields_to_update = [];

if (!empty($_POST['school'])) {
    $updated_school = $_POST['school'];
    $fields_to_update[] = "school = '$updated_school'";
}

if (!empty($_POST['degree'])) {
    $updated_degree = $_POST['degree'];
    $fields_to_update[] = "degree = '$updated_degree'";
}

if (!empty($_POST['field_of_study'])) {
    $updated_field_of_study = $_POST['field_of_study'];
    $fields_to_update[] = "field_of_study = '$updated_field_of_study'";
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

$update_query = "UPDATE user_educations SET " . implode(', ', $fields_to_update) . " WHERE id = $id";
$query = $mysqli->prepare($update_query);
$query->execute();

$check_id->execute();
$check_id->store_result();
$check_id->bind_result($id, $user_id, $school, $degree, $field_of_study, $start_date, $end_date);
$check_id->fetch();

$response['status'] = 'success';
$response['message'] = 'Education updated';
$response['data'] = [
    'id' => $id,
    'user_id' => $user_id,
    'school' => $school,
    'degree' => $degree,
    'field_of_study' => $field_of_study,
    'start_date' => $start_date,
    'end_date' => $end_date
];

echo json_encode($response);
