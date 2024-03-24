<?php

include('../connection.php');

if(empty($_POST['skill']) || empty($_POST['user_id'])) {
    $response['status'] = 'error';
    $response['message'] = 'Missing required fields';
    echo json_encode($response);
    exit;
}

$skill = $_POST['skill'];
$user_id = $_POST['user_id'];

$check_user_id = $mysqli->prepare("SELECT * FROM users WHERE id = ?");
$check_user_id->bind_param('i', $user_id);
$check_user_id->execute();
$check_user_id->store_result();

if($check_user_id->num_rows > 0 ) 
{
    $check_id = $mysqli->prepare("SELECT * FROM user_skills WHERE skill = ? AND user_id = ?");
    $check_id->bind_param('si', $skill, $user_id);
    $check_id->execute();
    $check_id->store_result();

    if($check_id->num_rows > 0) {
        $response['status'] = 'error';
        $response['message'] = 'Skill already added';
    } else {
        $add_skill = $mysqli->prepare("INSERT INTO user_skills (skill, user_id) VALUES (?, ?)");
        $add_skill->bind_param('si', $skill, $user_id);
        $add_skill->execute();

        $response['status'] = 'success';
        $response['message'] = 'Skill added';
    }
}

echo json_encode($response);



