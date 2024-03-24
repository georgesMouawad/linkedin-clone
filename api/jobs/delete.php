<?php

include('../connection.php');

if (empty($_POST['id'])) {
    $response['status'] = 'error';
    $response['message'] = 'Missing required fields';
    echo json_encode($response);
    exit;
}

$id = $_POST['id'];

$check_id = $mysqli->prepare("SELECT * FROM jobs WHERE id = ?");
$check_id->bind_param('i', $id);
$check_id->execute();
$check_id->store_result();

if ($check_id->num_rows > 0) {
    $delete_query = $mysqli->prepare("DELETE FROM jobs WHERE id = ?");
    $delete_query->bind_param('i', $id);
    $delete_query->execute();

    $response['status'] = 'success';
    $response['message'] = 'Job deleted';

} else {
    $response['status'] = 'error';
    $response['message'] = 'Job not found';
}