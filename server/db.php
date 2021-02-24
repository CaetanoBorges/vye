<?php

//$pdo = new PDO('mysql:host=localhost;dbname=edeangol_banco','edeangol_geral', 'Wambembe1');
$pdo = new PDO('mysql:host=localhost;dbname=aguaprec_notas', 'aguaprec_borge','12345admin54321');
if($pdo){

}else{
	echo "false";
}

	


	#######################################################################################################################
	function registar($email, $passe){
		global $pdo;
		
		$query = $pdo -> prepare("SELECT * FROM user WHERE email = ?");
		$query -> bindValue(1, $email);
		$query -> execute();
		$res = $query ->fetch();

		$see = $query -> rowCount();
		if($see > 0){
			return "Erro";
		}else{
			$chave= md5(time().rand());
			$pass = hash('sha256', $passe);
			$queryy = $pdo -> prepare("INSERT INTO user (chave_user, email, pass) VALUES ( ?, ?, ?)");
			$queryy -> bindValue(1, $chave);
			$queryy -> bindValue(2, $email);
			$queryy -> bindValue(3, $pass);
			$queryy -> execute();

			$login = cria_token($email, $pass);
			return $login;

		}

	}


	function cria_token($email, $passe){ 
		global $pdo;
		
		$query = $pdo -> prepare("SELECT * FROM user WHERE email = ? and pass = ?");
		$query -> bindValue(1, $email);
		$query -> bindValue(2, $passe);
		$query -> execute();
		$res = $query ->fetch();

		$see = $query -> rowCount();

		if ($see > 0 ) {
			$key = $email.$passe;

			$header = [
				'typ' => 'JWT',
				'alg' => 'HS526'
			];
			$header = json_encode($header);
			$header = base64_encode($header);

			$payload = [
				'id' => $res['id'],
				'chave' => $res['chave_user'],
				'senha' => $res['pass'],
				'email' => $res['email']
			];
			$payload = json_encode($payload);
			$payload = base64_encode($payload);


			$assinatura = hash_hmac('sha256', '$header.$payload', $key, true);
			$assinatura = base64_encode($assinatura);

			$token = "$header.$payload.$assinatura";

			return "$token";
		}else{
			return 0 ;
		}
	
}


function verifica_token($token_recebido) {
	global $pdo;

	$token = explode('.', $token_recebido);
	$dados = $token['1'];

	$dados = base64_decode($dados);
	$dados = json_decode($dados);
	$dados = (array) $dados;
	$chave = $dados['chave'];
	$email = $dados['email'];

		$query = $pdo -> prepare("SELECT * FROM user WHERE chave_user = ? and email = ?");
		$query -> bindValue(1, $chave);
		$query -> bindValue(2, $email);
		$query -> execute();
		$res = $query ->fetch();

		$see = $query -> rowCount();
		$passe = $res['pass'];
		if ($see > 0 ) {
			$key = $email.$passe;

			$header = [
				'typ' => 'JWT',
				'alg' => 'HS526'
			];
			$header = json_encode($header);
			$header = base64_encode($header);

			$payload = [
				'id' => $res['id'],
				'chave' => $res['chave_user'],
				'senha' => $res['pass'],
				'email' => $res['email']
			];
			$payload = json_encode($payload);
			$payload = base64_encode($payload);


			$assinatura = hash_hmac('sha256', '$header.$payload', $key, true);
			$assinatura = base64_encode($assinatura);

			$token = "$header.$payload.$assinatura";

			return "$token";
		}

}
?>
