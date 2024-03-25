<?php

include('../connection.php');

if(empty($_POST['email']) || empty($_POST['password']) || empty($_POST['name'])) {
    $response['status'] = 'error';
    $response['message'] = 'Please fill all the fields';
    echo json_encode($response);
    exit;
}

$email = $_POST['email'];
$password = $_POST['password'];
$name = $_POST['name'];

!empty($_POST['is_company']) ? $is_company = $_POST['is_company'] : $is_company = false;

$is_company ? $query = $mysqli->prepare("SELECT * FROM companies WHERE email = ?") : $query = $mysqli->prepare("SELECT * FROM users WHERE email = ?");

$query->bind_param('s', $email);
$query->execute();
$query->store_result();

if($query->num_rows > 0) {
    $response['status'] = 'error';
    $response['message'] = 'Email already exists';

} else {
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    if($is_company) {
        $query = $mysqli->prepare("INSERT INTO companies (name, email, password) VALUES (?, ?, ?)");
    } else {
        $query = $mysqli->prepare("INSERT INTO users (first_name, email, password) VALUES (?, ?, ?)");
    }

    $query->bind_param('sss',$name, $email, $hashed_password);
    $query->execute();

    $id = $mysqli->insert_id;

    $response['status'] = 'success';
    $response['message'] = 'Signup successful';
    $response['data'] = [
        'id' => $id,
        'email' => $email
    ];
}

echo json_encode($response);
