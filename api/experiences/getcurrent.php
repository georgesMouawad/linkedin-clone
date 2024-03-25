<?php

include('../connection.php');

if (!empty($_GET['user_id'])) {

    $id = $_GET['user_id'];

    $query = $mysqli->prepare("SELECT id, user_id, position, company, start_date, end_date FROM user_experiences WHERE user_id = ? AND end_date IS NULL");
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
        $queryRecent = $mysqli->prepare("SELECT id, user_id, position, company, start_date, end_date FROM user_experiences WHERE user_id = ? ORDER BY start_date DESC LIMIT 1");
        $queryRecent->bind_param('i', $id);
        $queryRecent->execute();
        $queryRecent->store_result();

        if ($queryRecent->num_rows > 0) {
            $queryRecent->bind_result($id, $user_id, $position, $company, $start_date, $end_date);
            $queryRecent->fetch();

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
    }
}

echo json_encode($response);