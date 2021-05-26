<?php
session_start();

if($_SESSION["auth"] != true) {

    header('HTTP/1.0 403 Forbidden');

    die;
    
}

$_POST = json_decode(file_get_contents('php://input'), true);

$newFile = "../../kdjsiofs82ehq8s7d77.html";

if($_POST["html"]){
   file_put_contents($newFile, $_POST["html"]);
} else {
    header('HTTP/1.0 400 Bad Request');
}
