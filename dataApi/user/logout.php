<?php
session_start();

// print_r($_SESSION);

unset($_SESSION['userID']);
unset($_SESSION['valid']);
session_destroy();
session_commit();

$output = [
    'success' => true
];

?>