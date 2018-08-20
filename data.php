<?php
define('fromData',true);

$method = $_SERVER['REQUEST_METHOD']; // POST

// if(empty(/* check if the get superglobal variable 'action' is empty*/)){
if(empty($_POST['action'])){
	exit('no action specified');
}
//require the mysql_connect.php file.  Make sure your properly configured it!
require_once('mysql_connect.php');


$output = [
	'success'=> false, //we assume we will fail
	'errors'=>[]
];

//switch(/*do a comparison switch on the get superglobal action*/){
	//data.php?action=readAll 
switch($_POST['action']){
	case 'readAll':
		//include the php file 'read.php'
		include 'dataApi/read.php';
		break;
	case 'insert':
		//include the php file insert.php
		include 'dataApi/insert.php';
		break;
	case 'delete':
		//include the php file delete.php
		include 'dataApi/delete.php';
		break;
	case 'update':
		include 'dataApi/update.php';
		break;
}


//convert the $output variable to json, store the result in $outputJSON
$output_json = json_encode($output);
//print $outputJSON
print($output_json);
//end
?>