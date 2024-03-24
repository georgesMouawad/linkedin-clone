<?php

include ('../connection.php');

if (empty($_GET['user_id'])) {
    $response['status'] = 'error';
    $response['message'] = 'User ID is required';
    echo json_encode($response);
    exit;
}

$user_id = $_GET['user_id'];

$check_user_id = $mysqli->prepare("SELECT id FROM users WHERE id = ?");
$check_user_id->bind_param('i', $user_id);
$check_user_id->execute();
$check_user_id->store_result();

if ($check_user_id->num_rows > 0) {
    $get_all_user_skills = $mysqli->prepare("SELECT id, skill FROM user_skills WHERE user_id = ?");
    $get_all_user_skills->bind_param('i', $user_id);
    $get_all_user_skills->execute();
    $get_all_user_skills->store_result();

    if ($get_all_user_skills->num_rows > 0) {
        $get_all_user_skills->bind_result($id, $skill);
        while ($get_all_user_skills->fetch()) {
            $user_skill = [
                'id' => $id,
                'skill' => $skill
            ];
            $user_skills[] = $user_skill;
        }

        $response['status'] = 'success';
        $response['data'] = $user_skills;

    } else {
        $response['status'] = 'error';
        $response['message'] = 'No skills found';
    }

} else {
    $response['status'] = 'error';
    $response['message'] = 'User not found';
}

echo json_encode($response);