<?php

include('../connection.php');

if (empty($_POST['id'])) {
    $response['status'] = 'error';
    $response['message'] = 'ID is required';
    echo json_encode($response);
    exit;
}

$id = $_POST['id'];

$fields_to_update = [];

if (!empty($_POST['first_name'])) {
    $updated_first_name = $_POST['first_name'];
    $fields_to_update[] = "first_name = '$updated_first_name'";
}

if (!empty($_POST['last_name'])) {
    $updated_last_name = $_POST['last_name'];
    $fields_to_update[] = "last_name = '$updated_last_name'";
}

if(!empty($_POST['bio'])) {
    $updated_bio = $_POST['bio'];
    $fields_to_update[] = "bio = '$updated_bio'";
}

if(empty($fields_to_update)) {
    $response['status'] = 'error';
    $response['message'] = 'No fields to update';
    echo json_encode($response);
    exit;
}

$check_id = $mysqli->prepare("SELECT id, first_name, last_name, bio FROM users WHERE id = ?");
$check_id->bind_param('i', $id);
$check_id->execute();
$check_id->store_result();

if($check_id->num_rows > 0) {
    $update_query = "UPDATE users SET " . implode(', ', $fields_to_update) . " WHERE id = $id";
    $query = $mysqli->prepare($update_query);
    $query->execute();

    $check_id->execute();
    $check_id->store_result();
    $check_id->bind_result($id, $first_name, $last_name, $bio);
    $check_id->fetch();

    $response['status'] = 'success';
    $response['message'] = 'User updated';
    $response['data'] = [
        'id' => $id,
        'first_name' => $first_name,
        'last_name' => $last_name,
        'bio' => $bio
    ];

} else {
    $response['status'] = 'error';
    $response['message'] = 'User not found';
}

echo json_encode($response);



