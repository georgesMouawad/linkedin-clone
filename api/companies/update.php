<?php

include('../connection.php');

if (empty($_POST['id'])) {
    $response['status'] = 'error';
    $response['message'] = 'ID is required';
    echo json_encode($response);
    exit;
}

$id = $_POST['id'];

$fields_to_update = [];

if (!empty($_POST['name'])) {
    $updated_name = $_POST['name'];
    $fields_to_update[] = "name = '$updated_name'";
}

if (!empty($_POST['description'])) {
    $updated_description = $_POST['description'];
    $fields_to_update[] = "description = '$updated_description'";
}

if(empty($fields_to_update)) {
    $response['status'] = 'error';
    $response['message'] = 'No fields to update';
    echo json_encode($response);
    exit;
}

$check_id = $mysqli->prepare("SELECT id, name, description FROM companies WHERE id = ?");
$check_id->bind_param('i', $id);
$check_id->execute();
$check_id->store_result();

if ($check_id->num_rows > 0) {
    $update_query = "UPDATE companies SET " . implode(', ', $fields_to_update) . " WHERE id = $id";
    $query = $mysqli->prepare($update_query);
    $query->execute();

    $check_id->execute();
    $check_id->store_result();
    $check_id->bind_result($id, $name, $description);
    $check_id->fetch();

    $response['status'] = 'success';
    $response['message'] = 'Company updated';
    $response['data'] = [
        'id' => $id,
        'name' => $name,
        'description' => $description
    ];

} else {
    $response['status'] = 'error';
    $response['message'] = 'Company not found';
}

echo json_encode($response);