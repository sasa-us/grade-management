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
$result = mysqli_query($conn, $query);

if(empty($result)) {
	$output['errors'][] = mysqli_error($conn);
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