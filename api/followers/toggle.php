<?php

include('../connection.php');

if (empty($_POST['follower_id']) || empty($_POST['followee_id']) || empty($_POST['followee_type'])) {
    $response['status'] = 'error';
    $response['message'] = 'Missing required fields';
    echo json_encode($response);
    exit;
}

$follower_id = $_POST['follower_id'];
$followee_id = $_POST['followee_id'];
$followee_type = $_POST['followee_type'];

if ($followee_type !== 'company' && $followee_type !== 'user') {
    $response['status'] = 'error';
    $response['message'] = 'Invalid followee type (user or company)';
    echo json_encode($response);
    exit;
}

$check_follower_id = $mysqli->prepare("SELECT * FROM users WHERE id = ?");
$check_follower_id->bind_param('i', $follower_id);
$check_follower_id->execute();
$check_follower_id->store_result();

if ($check_follower_id->num_rows === 0) {
    $response['status'] = 'error';
    $response['message'] = 'Follower not found';
    echo json_encode($response);
    exit;
}

$followee_types = 'company' 
    ? $check_followee_id = $mysqli->prepare("SELECT * FROM companies WHERE id = ?") 
    : $check_followee_id = $mysqli->prepare("SELECT * FROM users WHERE id = ?");

$check_followee_id->bind_param('i', $followee_id);
$check_followee_id->execute();
$check_followee_id->store_result();

if ($check_followee_id->num_rows === 0) {
    $response['status'] = 'error';
    $response['message'] = 'Followee not found';
    echo json_encode($response);
    exit;
}

$check_follow = $mysqli->prepare("SELECT * FROM followers WHERE follower_id = ? AND followee_id = ? AND followee_type = ?");
$check_follow->bind_param('iis', $follower_id, $followee_id, $followee_type);
$check_follow->execute();
$check_follow->store_result();

if ($check_follow->num_rows > 0) {

    $delete_query = $mysqli->prepare("DELETE FROM followers WHERE follower_id = ? AND followee_id = ? AND followee_type = ?");
    $delete_query->bind_param('iis', $follower_id, $followee_id, $followee_type);
    $delete_query->execute();
    $response['status'] = 'success';
    $response['message'] = 'Follow removed';
    $response['data'] = false;
    echo json_encode($response);
    exit;
}

$follow_query = $mysqli->prepare("INSERT INTO followers (follower_id, followee_id, followee_type) VALUES (?, ?, ?)");
$follow_query->bind_param('iis', $follower_id, $followee_id, $followee_type);
$follow_query->execute();

$id = $mysqli->insert_id;

$response['status'] = 'success';
$response['message'] = 'Follow added';
$response['data'] = true;

echo json_encode($response);
