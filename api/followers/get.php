<?php

include('../connection.php');

if (empty($_GET['user_id'])) {
    $response['status'] = 'error';
    $response['message'] = 'User ID is required';
    echo json_encode($response);
    exit;
}

$user_id = $_GET['user_id'];

$check_user_id = $mysqli->prepare("SELECT id FROM users WHERE id = ?");
$check_user_id->bind_param('i', $user_id);
$check_user_id->execute();
$check_user_id->store_result();

if($check_user_id->num_rows > 0) {
    $get_total_following = $mysqli->prepare("SELECT COUNT(*) FROM followers WHERE follower_id = ?");
    $get_total_following->bind_param('i', $user_id);
    $get_total_following->execute();
    $get_total_following->bind_result($total_following);
    $get_total_following->fetch();  

    $response['status'] = 'success';
    $response['data'] = [
        'user_id' => $user_id,
        'total_following' => $total_following,
    ];
} else {
    $response['status'] = 'error';
    $response['message'] = 'User not found';
}

echo json_encode($response);


