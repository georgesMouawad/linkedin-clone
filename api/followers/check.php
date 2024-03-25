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

$get_total_following = $mysqli->prepare("SELECT * FROM followers WHERE (follower_id = ? AND followee_id = ? AND followee_type = ?)");
$get_total_following->bind_param('iis', $follower_id, $followee_id, $followee_type);
$get_total_following->execute();
$get_total_following->store_result();


if ($get_total_following->num_rows > 0) {
    $response['status'] = 'success';
    $response['data'] =  true;
} else {
    $response['status'] = 'error';
    $response['data'] = false;
}

echo json_encode($response);


