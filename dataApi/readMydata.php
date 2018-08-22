<?php
session_start();
$email = $_POST['email'];

$query = "SELECT * 
            FROM `student_data` 
            WHERE `student_id` 
            IN 
            (SELECT `id` FROM `students` WHERE `email`='$email')
        ";
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
		$output['error'][] = 'no data available';
    }
}
?>