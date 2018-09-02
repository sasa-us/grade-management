<?php
session_start();
require_once('mysql_connect.php');
if(empty($_POST['name']) || empty($_POST['grade']) || empty($_POST['course_name'])) {
	$output['errors'][] = 'No enough data';
}

$deleteID = $_POST['id'];
$query = "DELETE FROM `student_data` WHERE `id`= $deleteID ";
$result = null;
$result = mysqli_query($conn, $query);

if(empty($result)) {
	$outpu['errors'][] = 'database error';
} else {
	if(mysqli_affected_rows($conn) == 1) {
		$output['success'] = true;
	} else {
		$output['error'][] = 'delete error';
	}
}


?>