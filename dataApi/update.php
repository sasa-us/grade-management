<?php
require_once('mysql_connect.php');
print($_GET);
if(empty($_GET['name']) || empty($_GET['grade']) || empty($_GET['course_name'])) {
	$output['errors'][] = 'No enough data';
}

//check if you have all the data you need from the client-side call.  This should include the fields being changed and the ID of the student to be changed
//if not, add an appropriate error to errors

//write a query that updates the data at the given student ID.  
$query = "UPDATE `student_data` SET `grade`= 100 WHERE `id`=16";
$result = null;
//send the query to the database, store the result of the query into $result
$result = mysqli_query($conn, $query);

//check if $result is empty.  
if(empty($result)) {
	$output['error'][] = 'database error';
}else {
	if(mysqli_affected_rows($conn) == 1) {
		$output['success'] = true;

	} else if(mysqli_affected_rows($conn) == 0) {
		print('update with same value');
	} 
	
	else {
		$output['error'][] = 'update error';
	}
}
	//if it is, add 'database error' to errors
//else: 
	//check if the number of affected rows is 1.  Please note that if the data updated is EXCACTLY 
	//the same as the original data, it will show a result of 0??
		//if it did, change output success to true
	//if not, add to the errors: 'update error'

?>