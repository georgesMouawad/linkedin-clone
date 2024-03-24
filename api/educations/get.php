<?php

include('../connection.php');

if (!empty($_GET['id'])) {
    $id = $_GET['id'];

    $get_education = $mysqli->prepare("SELECT * FROM user_educations WHERE id = ?");
    $get_education->bind_param('i', $id);
    $get_education->execute();
    $get_education->store_result();

    if($get_education->num_rows > 0) {
        $get_education->bind_result($id, $user_id, $school, $degree, $field_of_study, $start_date, $end_date);
        $get_education->fetch();

        $response['status'] = 'success';
        $response['data'] = [
            'id' => $id,
            'user_id' => $user_id,
            'school' => $school,
            'degree' => $degree,
            'field_of_study' => $field_of_study,
            'start_date' => $start_date,
            'end_date' => $end_date
        ];
    
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Education History not found';
    }
} elseif (!empty($_GET['user_id'])) {

    $user_id = $_GET['user_id'];

    $get_all = $mysqli->prepare("SELECT * FROM user_educations WHERE user_id = ?");
    $get_all->bind_param('i', $user_id);
    $get_all->execute();
    $get_all->store_result();

    if($get_all->num_rows > 0) {
        $get_all->bind_result($id, $user_id, $school, $degree, $field_of_study, $start_date, $end_date);
        while($get_all->fetch()) {
            $education = [
                'id' => $id,
                'user_id' => $user_id,
                'school' => $school,
                'degree' => $degree,
                'field_of_study' => $field_of_study,
                'start_date' => $start_date,
                'end_date' => $end_date
            ];
            $user_educations[] = $education;
        }

        $response['status'] = 'success';
        $response['data'] = $user_educations;

    } else {
        $response['status'] = 'error';
        $response['message'] = 'No Education history found';
    }
} else {
    $response['status'] = 'error';
    $response['message'] = 'User Id or Education Id is required';
}

echo json_encode($response);