<?php

include('../connection.php');

if (empty($_GET['follower_id']) || empty($_GET['followee_id']) || empty($_GET['followee_type'])) {
    $response['status'] = 'error';
    $response['message'] = 'Missing fields';
    echo json_encode($response);
    exit;
}

$follower_id = $_GET['follower_id'];
$followee_id = $_GET['followee_id'];
$followee_type = $_GET['followee_type'];

$check_follower_id = $mysqli->prepare("SELECT id FROM users WHERE id = ?");
$check_follower_id->bind_param('i', $follower_id);
$check_follower_id->execute();
$check_follower_id->store_result();

if($check_follower_id->num_rows > 0) {
    $get_total_following = $mysqli->prepare("SELECT * FROM followers WHERE follower_id = ? AND followee_id = ? AND followee_type = ?");
    $get_total_following->bind_param('iis', $follower_id, $followee_id, $followee_type);
    $get_total_following->execute();

    $response['status'] = 'success';
    $response['data'] =  true;

} else {
    $response['status'] = 'error';
    $response['message'] = 'User not found';
    $response['data'] = false;
}

echo json_encode($response);


