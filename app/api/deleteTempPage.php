<?php

$deletedFile = '../../kdjsiofs82ehq8s7d77.html';

if(file_exists($deletedFile)){
    unlink($deletedFile);
} else {
    header('HTTP/1.0 400 Bad Request');
}
