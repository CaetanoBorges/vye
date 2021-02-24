<?php
header("Access-Control-Allow-Origin: *");
include('db.php');

if(isset($_GET['objecto'])){
    $objecto = (array) json_decode($_GET['objecto']);
    $email = $objecto['email'];
    $passe = hash('sha256', $objecto['pass']);
    $login = cria_token($email, $passe);

    echo $login;
}