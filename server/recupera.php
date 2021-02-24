<?php
header("Access-Control-Allow-Origin: *");

if($_GET['email']){
    include('db.php');
    
    $email = $_GET['email'];
    $pass = hash('sha256', $_GET['pass']);
    $num = $_GET['num'];

    global $pdo;
    $w = $pdo -> prepare("SELECT verificacao FROM user WHERE email = ?");
    $w->bindValue(1, $email);
    $w->execute();
    $r=$w->fetch();

    if($num == $r[0]){
        $y = $pdo -> prepare("UPDATE user SET pass = ?, verificacao = ? WHERE email = ?");
        $y->bindValue(1,$pass);
        $y->bindValue(2," ");
        $y->bindValue(3,$email);

        if($y->execute()){

            echo cria_token($email, $pass);
        }

    }else{
        echo "Erro inesperado, tente novamente";
    }
    
}   

?>