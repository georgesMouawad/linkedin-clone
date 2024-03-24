<?php

include('../connection.php');

if (empty($_POST['id'])|| empty($_POST['user_id'])) {
    $response['status'] = 'error';
    $response['message'] = 'Missing required fields';
    echo json_encode($response);
    exit;
}

$id = $_POST['id'];
$user_id = $_POST['user_id'];

$check_id = $mysqli->prepare("SELECT * FROM user_educations WHERE id = ? AND user_id = ?");
$check_id->bind_param('ii', $id, $user_id);
$check_id->execute();
$check_id->store_result();

if($check_id->num_rows > 0) {
    $delete_query = $mysqli->prepare("DELETE FROM user_educations WHERE id = ?");
    $delete_query->bind_param('i', $id);
    $delete_query->execute();

    $response['status'] = 'success';
    $response['message'] = 'Education deleted';

} else {
    $response['status'] = 'error';
    $response['message'] = 'Education not found';
}

echo json_encode($response);