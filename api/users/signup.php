<?php

include('../connection.php');

if(empty($_POST['email']) || empty($_POST['password'])) {
    $response['status'] = 'error';
    $response['message'] = 'Please fill all the fields';
    echo json_encode($response);
    exit;
}

$email = $_POST['email'];
$password = $_POST['password'];
$isCompany = $_POST['isCompany'];

if($isCompany) {
    $query = $mysqli->prepare("SELECT * WHERE email = ?");
} else {
    $query = $mysqli->prepare("SELECT * FROM users WHERE email = ?");
}

$query->bind_param('s', $email);
$query->execute();
$query->store_result();

if($query->num_rows > 0) {
    $response['status'] = 'error';
    $response['message'] = 'Email already exists';

} else {
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    if($isCompany) {
        $query = $mysqli->prepare("INSERT INTO companies (email, password) VALUES (?, ?)");
    } else {
        $query = $mysqli->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
    }

    $query->bind_param('ss', $email, $hashed_password);
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
