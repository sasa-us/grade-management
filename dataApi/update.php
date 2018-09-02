<?php
session_start();
require_once('mysql_connect.php');
// print_r($_POST);
// exit();
    // [name] => aa
    // [course_name] => aa
    // [grade] => 11
    // [id] => 22
    // [action] => update

if(empty($_POST['id'])){
	$output['errors'][] = 'NO id given!';
};
if(empty($_POST['name'])){
	$output['errors'][] = 'NO student name given!';
};
if(empty($_POST['course_name'])) {
	$output['errors'][] = 'NO course name given!';
};
if(empty($_POST['grade'])) {
	$output['errors'][] = 'NO grade given!';
};

$id = $_POST['id'];
$name = filter_var($_POST['name']);
$course_name = filter_var($_POST['course_name']);
$grade = $_POST['grade'];

$query = "UPDATE `student_data` 
			 SET `name`= '$name', `grade`='$grade', `course_name`='$course_name'
		   WHERE `id`= '$id'
		";

$result = null;
$result = mysqli_query($conn, $query);

if(empty($result)) {
	$output['errors'][] = 'database error';
}else {
	if(mysqli_affected_rows($conn) > 0) {
		$output['success'] = true;
	} 
	else {
		$output['errors'][] = 'update error';
	}
}
	
?>