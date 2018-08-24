<?php
session_start();
require_once('mysql_connect.php');
if(empty($_POST['name']) || empty($_POST['grade']) || empty($_POST['course_name'])) {
	$output['errors'][] = 'No enough data';
}

//check if you have all the data you need from the client-side call.  
//if not, add an appropriate error to errors

//write a query that deletes the student by the given student ID  
$deleteID = $_POST['id'];
$query = "DELETE FROM `student_data` WHERE `id`= $deleteID ";
$result = null;
//send the query to the database, store the result of the query into $result
$result = mysqli_query($conn, $query);

//check if $result is empty.  
if(empty($result)) {
	$outpu['errors'][] = 'database error';
} else {
	if(mysqli_affected_rows($conn) == 1) {
		$output['success'] = true;
	} else {
		$output['error'][] = 'delete error';
	}
}


	//if it is, add 'database error' to errors
//else: 
	//check if the number of affected rows is 1
		//if it did, change output success to true
		
	//if not, add to the errors: 'delete error'

?>