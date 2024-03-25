<?php

include('../connection.php');

if (!empty($_GET['id'])) {
    $id = $_GET['id'];

    $query = $mysqli->prepare("SELECT * FROM posts WHERE id = ?");
    $query->bind_param('i', $id);
    $query->execute();
    $query->store_result();

    if($query->num_rows > 0) {
        $query->bind_result($id, $user_id, $company_id, $description, $created_at);
        $query->fetch();

        if($user_id) {
            $get_user_name= $mysqli->prepare("SELECT CONCAT(first_name, ' ', last_name), email FROM users WHERE id = ?"); 
            $get_user_name->bind_param('i', $user_id);
        } else {
            $get_user_name= $mysqli->prepare("SELECT name, email FROM companies WHERE id = ?");
            $get_user_name->bind_param('i', $company_id);
        }

        $get_user_name->execute();
        $get_user_name->store_result();
        $get_user_name->bind_result($poster_name, $email);
        $get_user_name->fetch();

        $response['status'] = 'success';
        $response['data'] = [
            'id' => $id,
            'poster_name' => $poster_name,
            'user_id' => $user_id,
            'company_id' => $company_id,
            'email' => $email,
            'description' => $description,
            'created_at' => $created_at
        ];

    } else {
        $response['status'] = 'error';
        $response['message'] = 'Post not found';
    }

} else {
    $get_all = $mysqli->prepare("SELECT posts.id, posts.description, posts.created_at, 
                                CONCAT(users.first_name, ' ', users.last_name) as username, users.email , companies.name, companies.email
                                FROM posts
                                LEFT JOIN users ON posts.user_id = users.id
                                LEFT JOIN companies ON posts.company_id = companies.id");
    $get_all->execute();
    $get_all->store_result();

    if($get_all->num_rows > 0) {
        $get_all->bind_result($id, $description, $created_at, $username, $useremail, $company , $companyemail);
        while($get_all->fetch()) {
            $post = [
                'id' => $id,
                'description' => $description,
                'created_at' => $created_at,
                'poster_name' => $username ? $username : $company,
                'email' => $useremail ? $useremail : $companyemail,
            ];
            $posts[] = $post;
        }

        $response['status'] = 'success';
        $response['data'] = $posts;

    } else {
        $response['status'] = 'error';
        $response['message'] = 'No posts found';
    }
}

echo json_encode($response);