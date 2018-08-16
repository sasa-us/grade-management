<?php
require_once('mysql_connect.php');
if(empty($_GET['name']) || empty($_GET['grade']) || empty($_GET['course_name'])) {
	$output['errors'][] = 'No enough data';
}

print_r($_GET);
//check if you have all the data you need from the client-side call.  
//if not, add an appropriate error to errors

//write a query that inserts the data into the database.  remember that ID doesn't need to be set as it is auto incrementing
$name = $_GET['name'];
$grade = $_GET['grade'];
$courseName = $_GET['course_name'];
$query = "INSERT INTO `student_data`(`name`, `grade`, `course_name`) VALUES ('$name','$grade','$courseName')";
$result = null;
//send the query to the database, store the result of the query into $result
$result = mysqli_query($conn, $query);
print_r($result);
if(empty($result)) {
	$output['error'][] = 'database error';
} else {
	if(mysqli_affected_rows($conn)>0) {
		$output['success'] = true;
		$insertID = mysqli_insert_id($conn);
		$output['insertID'] = $insertID;
		print('insert success');

	} else {
			$output['errors'][] = 'no data';
	}
}

//check if $result is empty.  
	//if it is, add 'database error' to errors
//else: 
	//check if the number of affected rows is 1
		//if it did, change output success to true
		//get the insert ID of the row that was added
		//add 'insertID' to $outut and set the value to the row's insert ID
	//if not, add to the errors: 'insert error'

?>