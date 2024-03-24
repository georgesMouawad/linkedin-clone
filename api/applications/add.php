<?php

include('../connection.php');

if(empty($_POST['job_id']) || empty($_POST['user_id'])) {
    $response['status'] = 'error';
    $response['message'] = 'Missing required fields';
    echo json_encode($response);
    exit;
}

$job_id = $_POST['job_id'];
$user_id = $_POST['user_id'];

$check_user_id = $mysqli->prepare("SELECT * FROM users WHERE id = ?");
$check_user_id->bind_param('i', $user_id);
$check_user_id->execute();
$check_user_id->store_result();

$check_job_id = $mysqli->prepare("SELECT * FROM jobs WHERE id = ?");
$check_job_id->bind_param('i', $job_id);
$check_job_id->execute();
$check_job_id->store_result();


if($check_user_id->num_rows > 0 && $check_job_id->num_rows > 0) 
{
    $check_id = $mysqli->prepare("SELECT * FROM job_applications WHERE job_id = ? AND user_id = ?");
    $check_id->bind_param('ii', $job_id, $user_id);
    $check_id->execute();
    $check_id->store_result();

    if($check_id->num_rows > 0) {
        $response['status'] = 'error';
        $response['message'] = 'Already applied to this job';
    } else {
        $add_job = $mysqli->prepare("INSERT INTO job_applications (job_id, user_id) VALUES (?, ?)");
        $add_job->bind_param('ii', $job_id, $user_id);
        $add_job->execute();

        $response['status'] = 'success';
        $response['message'] = 'Applied to job';
    }
} else {
    $response['status'] = 'error';
    $response['message'] = 'User or job not found';
}

echo json_encode($response);