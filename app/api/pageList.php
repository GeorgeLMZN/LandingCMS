<?php
session_start();

if($_SESSION["auth"] != true) {

    header('HTTP/1.0 403 Forbidden');

    die;
    
}

$htmlFiles = glob("../../*.html");

$response = [];

foreach ($htmlFiles as $file) {
    array_push($response, basename($file));
}

echo json_encode($response);