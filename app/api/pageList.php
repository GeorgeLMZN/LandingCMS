<?php
$htmlFiles = glob("../../*.html");

$response = [];

foreach ($htmlFiles as $file) {
    array_push($response, basename($file));
}

echo json_encode($response);