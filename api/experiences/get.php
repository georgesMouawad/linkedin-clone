<?php

include('../connection.php');

if (!empty($_GET['id'])) {
    $id = $_GET['id'];

    $query = $mysqli->prepare("SELECT id, user_id, position, company, start_date, end_date FROM user_experiences WHERE id = ?");
    $query->bind_param('i', $id);
    $query->execute();
    $query->store_result();

    if($query->num_rows > 0) {
        $query->bind_result($id, $user_id, $position, $company, $start_date, $end_date);
        $query->fetch();

        $response['status'] = 'success';
        $response['data'] = [
            'id' => $id,
            'user_id' => $user_id,
            'position' => $position,
            'company' => $company,
            'start_date' => $start_date,
            'end_date' => $end_date
        ];
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Experience not found';
    }
} elseif (!empty($_GET['user_id'])) {

    $user_id = $_GET['user_id'];

    $get_all = $mysqli->prepare("SELECT id, position, company, start_date, end_date FROM user_experiences WHERE user_id = ?");
    $get_all->bind_param('i', $user_id);
    $get_all->execute();
    $get_all->store_result();

    if($get_all->num_rows > 0) {
        $get_all->bind_result($id, $position, $company, $start_date, $end_date);
        while($get_all->fetch()) {
            $experience = [
                'id' => $id,
                'user_id' => $user_id,
                'position' => $position,
                'company' => $company,
                'start_date' => $start_date,
                'end_date' => $end_date
            ];
            $user_experiences[] = $experience;
        }

        $response['status'] = 'success';
        $response['data'] = $user_experiences;

    } else {
        $response['status'] = 'error';
        $response['message'] = 'No Experiences found';
    }
} else {
    $response['status'] = 'error';
    $response['message'] = 'User Id or Experience Id is required';
}

echo json_encode($response);