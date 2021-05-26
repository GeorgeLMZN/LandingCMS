<?php
session_start();

if($_SESSION["auth"] != true) {

    header('HTTP/1.0 403 Forbidden');

    die;
    
}

$_POST = json_decode(file_get_contents('php://input'), true);

$file =  $_POST["pageName"];

$newHtml = $_POST["html"];

if(!is_dir("../backups/")) {

    mkdir("../backups/");

}

$backups = json_decode(file_get_contents("../backups/backups.json"));

if(!is_array($backups)){

    $backups = [];

}

if($newHtml && $file){
   

    $backupFilename = uniqid() . ".html";

    copy("../../" . $file, "../backups/" . $backupFilename);

    array_push($backups, ["page" => $file, "file" => $backupFilename, "time" => date("H:i:s d.m.y")]);

    file_put_contents("../backups/backups.json", json_encode($backups));

    file_put_contents("../../" . $file, $newHtml);

} else {

    header('HTTP/1.0 400 Bad Request');

}