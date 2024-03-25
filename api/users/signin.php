<?php

include('../connection.php');

if (!empty($_POST['email']) && !empty($_POST['password'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];

} else {
    $response['status'] = 'error';
    $response['message'] = 'Please fill all the fields';
    echo json_encode($response);
    exit;
}

$query = $mysqli->prepare("SELECT id, CONCAT(first_name, ' ', last_name) AS name, email, password FROM users WHERE email = ?");
$query->bind_param('s', $email);
$query->execute();
$query->store_result();

if($query->num_rows > 0) {
    $query->bind_result($id, $name, $email, $hashed_password);
    $query->fetch();
    $isCompany = false;
    
    if (password_verify($password, $hashed_password)) {
        $response['status'] = 'success';
        $response['message'] = 'Login successful';
        $response['data'] = [
            'id' => $id,
            'email' => $email,
            'isCompany' => $isCompany
        ];
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Invalid password';
    }
} else {
    $query = $mysqli->prepare("SELECT id, name, email, password FROM companies WHERE email = ?");
    $query->bind_param('s', $email);
    $query->execute();
    $query->store_result();

    if($query->num_rows > 0) {
        $query->bind_result($id, $name, $email, $hashed_password);
        $query->fetch();
        $isCompany = true;
        
        if (password_verify($password, $hashed_password)) {
            $response['status'] = 'success';
            $response['message'] = 'Login successful';
            $response['data'] = [
                'id' => $id,
                'email' => $email,
                'isCompany' => $isCompany
            ];
        } else {
            $response['status'] = 'error';
            $response['message'] = 'Invalid password';
        }
    }
} 

echo json_encode($response);

