<?php

include('../connection.php');

if (empty($_POST['description']) || empty($_POST['email'])) {
    $response['status'] = 'error';
    $response['message'] = 'Missing required fields';
    echo json_encode($response);
    exit;
}


$description = $_POST['description'];
$email = $_POST['email'];

$get_poster_id = $mysqli->prepare("SELECT id FROM users WHERE email = ?");
$get_poster_id->bind_param('s', $email);
$get_poster_id->execute();
$get_poster_id->store_result();

if ($get_poster_id->num_rows === 0) {
    $get_poster_id_from_companies = $mysqli->prepare("SELECT id FROM companies WHERE email = ?");
    $get_poster_id_from_companies->bind_param('s', $email);
    $get_poster_id_from_companies->execute();
    $get_poster_id_from_companies->store_result();

    if ($get_poster_id_from_companies->num_rows === 0) {
        $response['status'] = 'error';
        $response['message'] = 'User or company not found';
        echo json_encode($response);
        exit;
    }

    $get_poster_id_from_companies->bind_result($poster_id);
    $get_poster_id_from_companies->fetch();
    
    $add_post = $mysqli->prepare("INSERT INTO posts (description, company_id) VALUES (?, ?)");
    $add_post->bind_param('si', $description, $poster_id);
    $add_post->execute();


} else {
    $get_poster_id->bind_result($poster_id);
    $get_poster_id->fetch();

    $add_post = $mysqli->prepare("INSERT INTO posts (description, user_id) VALUES (?, ?)");
    $add_post->bind_param('si', $description, $poster_id);
    $add_post->execute();
}

$response['status'] = 'success';
$response['message'] = 'Post added';
$response['data'] = [
    'description' => $description,
    'poster_id' => $poster_id,
    'poster_email' => $email,
    'created_at' => date('Y-m-d H:i:s')
];

echo json_encode($response);