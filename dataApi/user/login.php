<?
session_start();
//require('sessions.inc.php'); for store session id to db


if(mysqli_connect_errno()) {
    echo 'fail to coonect MYSQL: '.mysqli_connect_error();
}

$email = $_POST['email'];
$password = $_POST['password'];


$email = mysqli_real_escape_string($conn, $email);   
$password = mysqli_real_escape_string($conn, $password);
$hashFormat = "$2y$10$";
$salt = "whyyoulookatmypassword";
$hash_and_salt = $hashFormat . $salt;
$password = crypt($password, $hash_and_salt);


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

        //if(empty($_SESSION)) {
            $_SESSION['userdata'] = $userData;
            // $_SESSION['userdata'] = ['id'=>$userData['id'], 
            //                         'name'=>$userData['name'], 
            //                         'email'=>$userData['email'],
            //                         'user_role'=>$userData['user_role']
            //                         ];
        //echo "<p>new data exists:<pre>".print_r($_SESSION['userdata'])."</pre></p>";
        //} 
        // else {
        //     echo "<p>Session data exists:<pre>".print_r($_SESSION,1)."</pre></p>";
            // [id] => 1
            // [email] => aa
            // [name] => aa
            // [password] => aa
            // [user_role] => student
            // [token] => 
            // [user_image] => 
        // }

    
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
session_write_close(); 
?>