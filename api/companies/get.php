<?php

include('../connection.php');

if (empty($_GET['id'])) {

    $get_all = $mysqli->prepare("SELECT id, name, email, description FROM companies");
    $get_all->execute();
    $get_all->store_result();

    if ($get_all->num_rows > 0) {
        $get_all->bind_result($id, $name, $email, $description);
        while ($get_all->fetch()) {
            $company = [
                'id' => $id,
                'name' => $name,
                'email' => $email,
                'description' => $description
            ];
            $companies[] = $company;
        }

        $response['status'] = 'success';
        $response['data'] = $companies;

    } else {
        $response['status'] = 'error';
        $response['message'] = 'No companies found';
    }
} else {
    $id = $_GET['id'];

    $query = $mysqli->prepare("SELECT id, name, email, description FROM companies WHERE id = ?");
    $query->bind_param('i', $id);
    $query->execute();
    $query->store_result();

    if ($query->num_rows > 0) {
        $query->bind_result($id, $name, $email, $description);
        $query->fetch();

        $response['status'] = 'success';
        $response['data'] = [
            'id' => $id,
            'name' => $name,
            'email' => $email,
            'description' => $description
        ];
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Company not found';
    }
}

echo json_encode($response);