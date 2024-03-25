<?php

include('../connection.php');

if(empty($_GET['user_id'])) {
    $response['status'] = 'error';
    $response['message'] = 'Missing User Id fields';
    echo json_encode($response);
    exit;
}

$user_id = $_GET['user_id'];

if (!empty($_GET['is_company'])) {
 $type = $_GET['is_company'];
} else {
    $type = 'user';
}

$get_top = $mysqli->prepare("SELECT followers.followee_id,followers.followee_type, 
                                CASE 
                                    WHEN followers.followee_type = 'user' THEN CONCAT(users.first_name, ' ', users.last_name)
                                    ELSE companies.name 
                                END AS followee_name,
                                COUNT(followers.followee_id) AS followerscount
                                FROM followers
                                LEFT JOIN users ON followers.followee_id = users.id AND followers.followee_type = 'user'
                                LEFT JOIN companies ON followers.followee_id = companies.id AND followers.followee_type = 'company'
                                WHERE NOT (followers.followee_id = ? AND followers.followee_type = ?)
                                GROUP BY followers.followee_id, followers.followee_type
                                ORDER BY followerscount DESC
                                LIMIT 5
");

$get_top->bind_param('is', $user_id , $type);
$get_top->execute();
$get_top->store_result();

if($get_top->num_rows > 0) {
    $get_top->bind_result($followee_id, $followee_type, $followee_name, $followers);
    while($get_top->fetch()) {
        $follower = [
            'followee_id' => $followee_id,
            'followee_name' => $followee_name,
            'followee_type' => $followee_type,
            'followers' => $followers
        ];
        $top_followers[] = $follower;
    }

    $response['status'] = 'success';
    $response['data'] = $top_followers;

} else {
    $response['status'] = 'error';
    $response['message'] = 'No followers found';
}

echo json_encode($response);