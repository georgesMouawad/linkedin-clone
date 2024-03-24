<?php

include('../connection.php');

if (!empty($_GET['id'])) {
    $id = $_GET['id'];

    $query = $mysqli->prepare("SELECT id, first_name, last_name, email, bio FROM users WHERE id = ?");
    $query->bind_param('i', $id);
    $query->execute();
    $query->store_result();

    if($query->num_rows > 0) {
        $query->bind_result($id, $first_name, $last_name, $email, $bio);
        $query->fetch();

        $response['status'] = 'success';
        $response['data'] = [
            'id' => $id,
            'first_name' => $first_name,
            'last_name' => $last_name,
            'email' => $email,
            'bio' => $bio
        ];
    } else {
        $response['status'] = 'error';
        $response['message'] = 'User not found';
    }

    echo json_encode($response);
    exit;

} else {
    $get_all = $mysqli->prepare("SELECT id, CONCAT(first_name, ' ', last_name) AS name, email, bio FROM users");
    $get_all->execute();
    $get_all->store_result();

    if($get_all->num_rows > 0) {
        $get_all->bind_result($id, $name, $email, $bio);
        while($get_all->fetch()) {
            $user = [
                'id' => $id,
                'name' => $name,
                'email' => $email,
                'bio' => $bio
            ];
            $users[] = $user;
        }

        $response['status'] = 'success';
        $response['data'] = $users;

    } else {
        $response['status'] = 'error';
        $response['message'] = 'No users found';
    }
}

echo json_encode($response);