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

        $response['status'] = 'success';
        $response['data'] = [
            'id' => $id,
            'user_id' => $user_id,
            'company_id' => $company_id,
            'description' => $description,
            'created_at' => $created_at
        ];

    } else {
        $response['status'] = 'error';
        $response['message'] = 'Post not found';
    }

} else {
    $get_all = $mysqli->prepare("SELECT * FROM posts");
    $get_all->execute();
    $get_all->store_result();

    if($get_all->num_rows > 0) {
        $get_all->bind_result($id, $user_id, $company_id, $description, $created_at);
        while($get_all->fetch()) {
            $post = [
                'id' => $id,
                'user_id' => $user_id,
                'company_id' => $company_id,
                'description' => $description,
                'created_at' => $created_at
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