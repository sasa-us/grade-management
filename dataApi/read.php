<?php
// if(!isset(fromData)) {
// 	//it returns true only when the variable is not null.
// 	die('Unable to connect');
// }
require_once('mysql_connect.php');
//write a query that selects all the students from the database, all the data from each row
$query = "SELECT * FROM `student_data`";
$result = null;
//send the query to the database, store the result of the query into $result
$result = mysqli_query($conn, $query);


//check if $result is empty.
if(empty($result)) {
	$output['error'][] = mysqli_error($conn);
} else {
	if(mysqli_num_rows($result)>0) {
		$output['success'] = true;
		$output['data']=[];
		while($row=mysqli_fetch_assoc($result)) {
			$output['data'][] = $row;
		}//end while
		
	} else {
		$output['errors'][] = 'no data available';
	}
}

?>