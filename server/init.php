<?php
header("Access-Control-Allow-Origin: *");

if($_POST['token']){
    include('db.php');
    include('prototypes.php');
    $token_recebido = $_POST['token'];
    if(verifica_token($token_recebido)){

        $token=explode('.', $token_recebido);
		$dados=$token['1'];
		$dados = base64_decode($dados);
		$dados = json_decode($dados);
		$dados = (array) $dados;
        $chave = $dados['chave'];
        
        $u = json_decode($_POST['objecto']);
        $i = (array)$u;
        $a = new Bezinha($chave);
        //error_reporting(0);
        $a->salva($i);
        echo $a->store();
        
    }
    
    

}


?>