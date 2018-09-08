<?php
// require '../vendor/autoload.php';
require('phpmailer/phpmailer/PHPMailerAutoload.php');

require_once('../mysql_connect.php');
require_once('phpmailer/email_config.php');
// echo $_SERVER['HTTP_REFERER']; 
//print_r($_SERVER);
function ifItIsMethod($method=null){
    if($_SERVER['REQUEST_METHOD'] == strtoupper($method)){
        return true;
    }
    return false;
}

function confirmQuery($result) {  
    global $conn;
    if(!$result ) { 
          die("QUERY FAILED ." . mysqli_error($conn));    
      }
}
function email_exists($email){
    global $conn;
    $query = "SELECT `email` 
                FROM `students` 
                WHERE `email` = '$email'
                ";
    $result = mysqli_query($conn, $query);
    confirmQuery($result);

    if(mysqli_num_rows($result) > 0) {
        return true;
    } else {
        return false;
    }
}

if(ifItIsMethod('POST')) {
    global $conn;
    if(isset($_POST['email'])) {
        $email = $_POST['email'];
        $length = 50;
        $token = bin2hex(openssl_random_pseudo_bytes($length));

       
        if(email_exists($email)) {
            $stmt = mysqli_prepare($conn, "UPDATE `students` SET `token`='{$token}' WHERE `email`= ?");
                mysqli_stmt_bind_param($stmt, "s", $email);
                mysqli_stmt_execute($stmt);
                mysqli_stmt_close($stmt);

                $mail = new PHPMailer();

                $mail->SMTPDebug = 0; 
                $mail->isSMTP();                                     
                $mail->Host = 'smtp.gmail.com';
                $mail->SMTPAuth = true;

                $mail->Username = EMAIL_USER;                
                $mail->Password = EMAIL_PASS; 
                                           
                $mail->SMTPSecure = 'tls'; 
                $mail->Port = 587;  
                $options = array(
                    'ssl' => array(
                        'verify_peer' => false,
                        'verify_peer_name' => false,
                        'allow_self_signed' => true
                    )
                );
                $mail->smtpConnect($options);

                $email->From = "sunny.server2000@gmail.com";
                $email->FromName = "Grade-management server";
                
                $mail->isHTML(true); 
                $mail->CharSet = 'UTF-8';  //used to let other language work  
                
                
                $mail->addAddress($email);
              

                $mail->Subject = 'change password confrim';

                $hostname = pathinfo($_SERVER['HTTP_REFERER'])['dirname']; //http://localhost:8000/grade-management/ 
                $path = "http://{$_SERVER['SERVER_NAME']}:{$_SERVER['SERVER_PORT']}/grade-management/";
                $mail->Body = '<p>Please click link to reset password.

                <a href='.$path.'dataApi/reset.php?email='.$email.'&token='.$token.'> dataApi/reset.php?email='.$email.'&token='.$token.'</a>
            
                </p>';

                // <a href="http://localhost:8000/grade-management/dataApi/reset.php?email='.$email.'&token='.$token.' ">http://localhost:8000/grade-management/dataApi/reset.php?email='.$email.'&token='.$token.'</a>

                if($mail->send()) {
                    $emailSent = true;
                } else {
                    echo 'not sent email !!!';
                }
        }
    }
}


?>


<!DOCTYPE html>
<html lang="en">
<head>
    <title>appmonstaTest</title>

    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">

        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
        crossorigin="anonymous"> 
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
</head>
<body>
<div class="container">

    <div class="form-gap"></div>
    <div class="container">
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <div class="text-center">
    <?php if(!isset( $emailSent )): ?>

                                <h3><i class="fa fa-lock fa-4x"></i></h3>
                                <h2 class="text-center">Forgot Password?</h2>
                                <p>You can reset your password here.</p>
                                <div class="panel-body">

                                    <form id="register-form" role="form" autocomplete="off" class="form" method="post">

                                        <div class="form-group">
                                            <div class="input-group">
                                                <span class="input-group-addon"><i class="glyphicon glyphicon-envelope color-blue"></i></span>
                                                <input id="email" name="email" placeholder="email address" class="form-control"  type="text">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <input name="recover-submit" class="btn btn-lg btn-primary btn-block" value="Reset Password" type="submit">
                                        </div>

                                        <input type="hidden" class="hide" name="token" id="token" value="">
                                    </form>

                                </div><!-- Body-->
<?php else: ?>
<h2>Please check your email</h2>
<?php endIf; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <hr>
    <footer>
            <div class="row">
                <div class="col-lg-12">
                    <p>Grade Management System</p>
                </div>
            </div>     
    </footer>

</div> 
<script type="text/javascript" src="../assets/js/lib/jquery-2.1.4.min.js"></script>
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
</body>
</html>