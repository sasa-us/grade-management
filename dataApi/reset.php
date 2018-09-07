<?php
require_once('../mysql_connect.php');

$email = $_GET['email'];
$token = $_GET['token'];

$query = "SELECT `name`,  `email`, `token` 
            FROM `students` 
            WHERE `token`=?
            ";
        
if($stmt = mysqli_prepare($conn, $query)) {
    mysqli_stmt_bind_param($stmt, "s", $token);
    mysqli_stmt_execute($stmt);

    mysqli_stmt_bind_result($stmt, $name, $email, $token);
    mysqli_stmt_fetch($stmt);
    mysqli_stmt_close($stmt);


    if(isset($_POST['password']) && isset($_POST['confirmPassword'])) {
        if($_POST['password'] === $_POST['confirmPassword']) {
            
            $password = $_POST['password'];

            $hashFormat = "$2y$10$";
            $salt = "whyyoulookatmypassword";
            $hash_and_salt = $hashFormat . $salt;
            $hashedPassword  = crypt($password, $hash_and_salt);

            $updatequery = "UPDATE `students` SET `token`='', `password`='{$hashedPassword}' WHERE `email`=? ";
            
            if($stmt = mysqli_prepare($conn, $updatequery)) {
                mysqli_stmt_bind_param($stmt, "s", $email);
                mysqli_stmt_execute($stmt);

                if(mysqli_stmt_affected_rows($stmt) >=1 ) {
                    $passwordReset = true;
             
                }
                mysqli_stmt_close($stmt);

            } 
        }
    }

}


?>


<!DOCTYPE html>
<html lang="en">
<head>
    <title>grade-management-reset password</title>
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
</head>
<body>

<div class="container">
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <div class="text-center">

 <?php if(!isset( $passwordReset )): ?>
                            <h3><i class="fa fa-lock fa-4x"></i></h3>
                            <h2 class="text-center">Reset Password</h2>
                            <p>You can reset your password here.</p>
                            <div class="panel-body">

                                <form id="register-form" role="form" autocomplete="off" class="form" method="post">

                                    <div class="form-group">
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="glyphicon glyphicon-user color-blue"></i></span>
                                            <input id="password" name="password" placeholder="Enter password" class="form-control"  type="password">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="glyphicon glyphicon-ok color-blue"></i></span>
                                            <input id="confirmPassword" name="confirmPassword" placeholder="Confirm password" class="form-control"  type="password">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <input name="resetPassword" class="btn btn-lg btn-primary btn-block" value="Reset Password" type="submit">
                                    </div>

                                    <input type="hidden" class="hide" name="token" id="token" value="">
                                </form>

                            </div><!-- Body-->
<?php else: ?>
<h2>Your password updated successfully! </h2>
<p>Please Login <a href="http://localhost:8000/grade-management/">grade-management system </a>again</p>

<?php endIf; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      <footer>
            <div class="row">
                <div class="col-lg-12">
                    <p>Grade Management System</p>
                </div>
            </div>     
    </footer>
</div> 

    <script src="/cms/js/jquery.js"></script>
    <script src="/cms/js/bootstrap.min.js"></script>
</body>
</html>