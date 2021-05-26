<?php
session_start();

if($_SESSION["auth"] != true) {

    header('HTTP/1.0 403 Forbidden');

    die;
    
}

$deletedFile = '../../kdjsiofs82ehq8s7d77.html';

if(file_exists($deletedFile)){
    unlink($deletedFile);
} else {
    header('HTTP/1.0 400 Bad Request');
}
