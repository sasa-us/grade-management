<?php
session_start();
//print_r($_SESSION['userdata']);
$output = ['success'=>false];
if(!empty($_SESSION['userdata'])){
    $output['success'] = true;
    $output['loginuser'] = $_SESSION['userdata'];
    
} 

?>