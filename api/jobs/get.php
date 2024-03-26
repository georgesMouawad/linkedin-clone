<?php

include('../connection.php');

if (!empty($_GET['id'])) {
    $id = $_GET['id'];

    $query = $mysqli->prepare("SELECT id, title, description, company_id FROM jobs WHERE id = ?");
    $query->bind_param('i', $id);
    $query->execute();
    $query->store_result();

    if($query->num_rows > 0) {
        $query->bind_result($id, $title, $description, $company_id);
        $query->fetch();

        $response['status'] = 'success';
        $response['data'] = [
            'id' => $id,
            'title' => $title,
            'description' => $description,
            'company_id' => $company_id
        ];
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Job not found';
    }

} else {
    $get_all = $mysqli->prepare("SELECT jobs.id, jobs.title, jobs.description, jobs.company_id, jobs.created_at, companies.name 
                                FROM jobs 
                                JOIN companies ON jobs.company_id = companies.id;");
    $get_all->execute();
    $get_all->store_result();

    if($get_all->num_rows > 0) {
        $get_all->bind_result($id, $title, $description, $company_id, $created_at, $company_name );
        while($get_all->fetch()) {
            $job = [
                'id' => $id,
                'title' => $title,
                'job_description' => $description,
                'company_id' => $company_id,
                'company_name' => $company_name,
                'created_at' => $created_at
            ];
            $jobs[] = $job;
        }

        $response['status'] = 'success';
        $response['data'] = $jobs;

    } else {
        $response['status'] = 'error';
        $response['message'] = 'No jobs found';
    }
}

echo json_encode($response);