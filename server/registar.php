<?php
header("Access-Control-Allow-Origin: *");

if($_GET['objecto']){
    include('db.php');
    include('prototypes.php');

    $objecto = (array) json_decode($_GET['objecto']);
    $email = $objecto['email'];
    $pass = $objecto['pass'];
    
    echo registar($email, $pass);

}

?>