<?php
define('fromData',true);
if(empty($_POST['action'])){
	exit('no action specified');
}
print_r($_POST);
?>