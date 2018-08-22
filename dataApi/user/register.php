<?php
session_start();

$email = $_POST['email'];
$name = $_POST['name'];
$password = $_POST['password'];

$query = "INSERT INTO `students`( `email`, `name`, `password`, `user_role`) 
               VALUES ('$email','$name','$password', 'student')
        ";
    
$result = mysqli_query($conn, $query);
if($result) {
    if(mysqli_affected_rows($conn) > 0) {
        $output['success'] = true;
    } else {
        $output['errors'] = 'invalide username or password';
    }

} else {
    echo "error: ". $query. mysqli_error($conn);
}


?>