<?php
session_start();

if($_SESSION["auth"] != true) {

    header('HTTP/1.0 403 Forbidden');

    die;
    
}

$_POST = json_decode(file_get_contents('php://input'), true);

$file = $_POST["file"];

$page = $_POST["page"];

if($file && $page) {

    copy("../backups/" . $file, "../../" . $page );

} else {

    header('HTTP/1.0 400 Bad Request');

}

