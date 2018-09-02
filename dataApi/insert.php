<?php
session_start();
require_once('mysql_connect.php');
if(empty($_POST['name']) || empty($_POST['grade']) || empty($_POST['course_name'])) {
	$output['errors'][] = 'No enough data';
}

$name = $_POST['name'];
$grade = $_POST['grade'];
$courseName = $_POST['course_name'];
$student_id = $_POST['student_id'];

$query = "INSERT INTO `student_data`(`name`, `grade`, `course_name`, `student_id`) VALUES ('$name','$grade','$courseName', '$student_id')";
$result = null;
$result = mysqli_query($conn, $query);
print_r($result);
if(empty($result)) {
	$output['error'][] = 'database error';
} else {
	if(mysqli_affected_rows($conn)>0) {
		$output['success'] = true;
		$insertID = mysqli_insert_id($conn);
		$output['insertID'] = $insertID;

	} else {
			$output['errors'][] = 'no data';
	}
}

?>