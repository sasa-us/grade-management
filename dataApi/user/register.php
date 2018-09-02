<?php
session_start();
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$email = trim($_POST['email']);
$name = trim($_POST['name']);
$password = trim($_POST['password']);

$email = filter_var($email, FILTER_SANITIZE_EMAIL);

if($name == '') {
    $output['errors']['name'] = 'name can not be empty';
}

if($email ==''){
    $output['errors']['email'] = 'Email cannot be empty';
}

if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $output['validation'] = true;
 } else {
    $output['errors']['email'] = "$email is not a valid email address";
 }

if(email_exist($email)) {
    $output['errors']['email'] = 'email already exist, pick another';
}

function email_exist($email){
    global $conn;
    $query = "SELECT `email` FROM `students` WHERE `email`= '$email'";
    $result = mysqli_query($conn, $query);
    confirmQuery($result);
    if(mysqli_num_rows($result) > 0) {
        return true;
    } else {
        return false;
    }
}
function confirmQuery($result) {
    global $conn;
    if(!$result ) {      
          die("QUERY FAILED ." . mysqli_error($conn));
      }
}



if(empty($output['errors'])){
    // signup_user($name, $email, $password);
    $name = mysqli_real_escape_string($conn, $name);
    $email = mysqli_real_escape_string($conn, $email);

    $password = mysqli_real_escape_string($conn, $password);
    $hashFormat = "$2y$10$";
    $salt = "whyyoulookatmypassword";
    $hash_and_salt = $hashFormat . $salt;
    $password = crypt($password, $hash_and_salt);
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


} else {
    $output['errors'][] = 'please input valid information to sign up';
}

    





?>