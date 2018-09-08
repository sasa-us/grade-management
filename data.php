<?php
define('fromData',true);

$method = $_SERVER['REQUEST_METHOD']; // POST

if(empty($_POST['action'])){
	exit('no action specified');
}
require_once('mysql_connect.php');
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$output = [
	'success'=> false, 
	'errors'=>[]
];

switch($_POST['action']){
	case 'readAll':
		include 'dataApi/read.php';
		break;
	case 'readMydata':
		include 'dataApi/readMydata.php';
		break;
	case 'insert':
		include 'dataApi/insert.php';
		break;
	case 'delete':
		include 'dataApi/delete.php';
		break;
	case 'update':
		include 'dataApi/update.php';
		break;


	case 'login':
		include 'dataApi/user/login.php';
		break;
	case 'logout':
		include 'dataApi/user/logout.php';
		break;
	case 'register':
		include 'dataApi/user/register.php';
		break;
	case 'checkLogin':
		include 'dataApi/user/checkloginstatus.php';
		break;
	case 'getAverageGrade':
		include 'dataApi/user/getAverageGrade.php';
		break;
}
$output_json = json_encode($output);
print($output_json);

?>