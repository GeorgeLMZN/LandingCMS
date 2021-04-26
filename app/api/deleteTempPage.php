<?php
$_POST = json_decode(file_get_contents('php://input'), true);

$deletedFile = '../../' . $_POST['name'];

if(file_exists($deletedFile)){
    unlink($deletedFile);
} else {
    header('HTTP/1.0 400 Bad Request');
}
