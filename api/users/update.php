<?php

include('../connection.php');

if (empty($_POST['id']) || empty($_POST['bio'])) {
    $response['status'] = 'error';
    $response['message'] = 'Please fill all the fields';
    echo json_encode($response);
    exit;
}

$id = $_POST['id'];
$bio = $_POST['bio'];

$check_id = $mysqli->prepare("SELECT id,bio FROM users WHERE id = ?");
$check_id->bind_param('i', $id);
$check_id->execute();
$check_id->store_result();

if($query->num_rows > 0) {
    $query = $mysqli->prepare("UPDATE users SET bio = ? WHERE id = ?");
    $query->bind_param('si', $bio, $id);
    $query->execute();

    $check_id->execute();
    $check_id->store_result();
    $check_id->bind_result($id, $bio);

    $response['status'] = 'success';
    $response['message'] = 'Bio updated';
    $response['data'] = [
        'id' => $id,
        'bio' => $bio
    ];
    
} else {
    $response['status'] = 'error';
    $response['message'] = 'User not found';
}

echo json_encode($response);



