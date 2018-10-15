<?php
require '../mysql_connect.php';
require 'mysql_connect_backup.php';
if($conn) {
    print("conn connect");
}
if($conn_backup) {
    print('backup is connected');
}

$query1 = "DELETE FROM `students` WHERE 1";
$result1 = mysqli_query($conn, $query1);

$query2 = "DELETE FROM `student_data` WHERE 1";
$result2 = mysqli_query($conn, $query2);
print("Delete query ran: $result2");



$querySelect1 = "SELECT * FROM `students` WHERE 1";
$resultSelect1 = mysqli_query($conn_backup, $querySelect1);
if(empty($resultSelect1)) {
    print('database error');
} else {
    if($resultSelect1) {
        $row = [];
        while( $row = mysqli_fetch_assoc($resultSelect1)) {
            $id = $row['id'];
            $email = $row['email'];
            $name = $row['name'];
            $password = $row['password'];
            $user_role = $row['user_role'];

            $update_query = "INSERT INTO `students`(`id`, `email`, `name`, `password`, `user_role`) 
                                VALUES ($id, '{$email}', '{$name}', '{$password}','{$user_role}')
                            ";

            print($update_query);
            mysqli_query($conn, $update_query);
        }
    } else {
        $output['error'] = 'no data';
    }

}

$querySelect2 = "SELECT * FROM `student_data` WHERE 1";
$resultSelect2 = mysqli_query($conn_backup, $querySelect2);
if(empty($resultSelect2)) {
    print('database error');
} else {
    if($resultSelect2) {
        $row = [];
        while( $row = mysqli_fetch_assoc($resultSelect2)) {
            $id = $row['id'];
            $name = $row['name'];
            $grade = $row['grade'];
            $course_name = $row['course_name'];
            $password = $row['password'];
            $student_id = $row['student_id'];

            $update_query2 = "INSERT INTO `student_data`(`id`, `name`, `grade`, `course_name`, `password`, `student_id`) 
                                VALUES ($id,'{$name}', $grade, '{$course_name}', '{$password}', $student_id)
                             ";
            print($update_query2);
            mysqli_query($conn, $update_query2);
        }
    } else {
        $output['error'] = 'no data';
    }
}

?>