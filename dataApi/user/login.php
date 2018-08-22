<?
session_start();
require_once('mysql_connect.php');
if(mysqli_connect_errno()) {
    echo 'fail to coonect MYSQL: '.mysqli_connect_error();
}

$email = $_POST['email'];
$password = $_POST['password'];

$query = "SELECT * 
            FROM `students` 
           WHERE `email`='{$email}' 
             AND `password`='{$password}' 
         ";
$result = mysqli_query($conn, $query);
    
if($result) {
    if(mysqli_num_rows($result) > 0) {
        $userData = mysqli_fetch_assoc($result);
//$userData = the column name from select above
        $output['user'] = $userData;
        $output['success'] = true;
        
        $_SESSION['userID'] = $userData['id'];
        $_SESSION['valid'] = true;            
        // print_r($_SESSION);
        // [userID] => 1
        // [valid] => 1
    } else {
        $output['errors'] = 'invalide username or password';
    }
} else {
    $output['errors'] = 'you are not regeistered';
}
    
// output:
// "success":true,
// "errors":[],
// "user":{"id":"1",
//         "email":"aa",
//         "name":"aa",
//         "password":"aa",
//         "rights":"0",
//         "token":""}

?>