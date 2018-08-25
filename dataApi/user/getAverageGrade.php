<?php
session_start();
// [student_id] => 1 [action] => getAverageGrade
$student_id = $_POST['student_id'];

// $query = "SELECT `grade`, `student_id`
$query = "SELECT AVG(grade) AS average
            FROM `student_data` 
           WHERE `student_id` = $student_id
        ";

$result = null;

$result = mysqli_query($conn, $query);

if(empty($result)) {
    $output['errors'][] = mysqli_error($conn);
} 
else {
    // if(mysqli_num_rows($result)>0) {
    //     $output['success'] = true;
    //     $output['data'] = [];

    //     while($row=mysqli_fetch_assoc($result)) {
    //         $output['data'][] = $row;
    //     }
    // }
    if(mysqli_num_rows($result)>0) {
            $output['success'] = true;
           
            
           $row=mysqli_fetch_assoc($result);
             
           $output['average'] = $row;
            
       }
     
    else {
        $output['errors'][] = 'no grade to calculate.';
    }

}
?>