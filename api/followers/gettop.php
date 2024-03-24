<?php

include('../connection.php');


$get_top_3 = $mysqli->prepare("SELECT followee_id, followee_type, COUNT(followee_id) as followers FROM followers GROUP BY followee_id ORDER BY followers DESC LIMIT 3");
$get_top_3->execute();
$get_top_3->store_result();

if($get_top_3->num_rows > 0) {
    $get_top_3->bind_result($followee_id, $followee_type, $followers);
    while($get_top_3->fetch()) {
        $follower = [
            'followee_id' => $followee_id,
            'followee_type' => $followee_type,
            'followers' => $followers
        ];
        $followers[] = $follower;
    }

    $response['status'] = 'success';
    $response['data'] = $followers;

} else {
    $response['status'] = 'error';
    $response['message'] = 'No followers found';
}

echo json_encode($response);