<?php 
header("Access-Control-Allow-Origin: *");

if($_GET['email']){
    include('db.php');

    global $pdo;
    $w= $pdo -> prepare("SELECT * FROM user WHERE email = ?");
    $w->bindValue(1,$_GET['email']);
    $w->execute();
    $r = $w -> fetch();

    if(count($r) > 0){

        function generateRandomString($length = 10) {
            $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            $charactersLength = strlen($characters);
            $randomString = '';
            for ($i = 0; $i < $length; $i++) {
                $randomString .= $characters[rand(0, $charactersLength - 1)];
            }
            return $randomString;
        }

        $codigo = generateRandomString();
        
        $corpo=' ';
        $corpo .= '<div style="display:block;width:250px;margin:0 auto;border:1px solid #ccc;padding:10px;">';
        $corpo .= '<div style="width:100%;display:block;background:red;margin:0;"><h2 style="text-align:center;margin:0;">'.$codigo.'</h2></div>';        
        $corpo .= '<p style="font-size:12px;text-align:center;">O código é <b>'.$codigo.'</b><br></p>';
        $corpo .= '<p style="color:black;text-align:center;font-size:9px;margin:0;"> Use esse código no aplicativo para recuperar a sua conta, através de uma nova palavra-passe</p>';
        $corpo .= '</div>';

        require('_email/PHPMailerAutoload.php');

        $mail = new PHPMailer();                              // Passing `true` enables exceptions
        try {
            //Server settings
            $mail->SMTPDebug = 0;                                 // Enable verbose debug output
            $mail->isSMTP();                                      // Set mailer to use SMTP
            $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
            $mail->SMTPAuth = true;                               // Enable SMTP authentication
            $mail->Username = "aplicativonotas@gmail.com";                 // SMTP username
            $mail->Password = "cinzentoprimeiro";                           // SMTP password
            $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
            $mail->Port = 465;                                    // TCP port to connect to

            //Recipients
            $mail->setFrom("aplicativonotas@gmail.com", "Aplicativo Notas");
            //$mail->addAddress('joe@example.net', 'Joe User');     // Add a recipient
            $mail->addAddress($_GET['email']);// Name is optional              
            //$mail->addReplyTo('info@example.com', 'Information');
            //$mail->addCC('cc@example.com');
            //$mail->addBCC('bcc@example.com');

            //Attachments
            //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
            //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

            //Content
            $mail->isHTML(true);                                  // Set email format to HTML
            $mail->Subject = 'Recuperar conta '.date("d-m-Y H:i");
            $mail->Body    = $corpo; 
            $mail->AltBody = $corpo;

            
            if($mail->send()){
                echo 'certo';
                $v = $pdo -> prepare("UPDATE user SET verificacao = ? WHERE email = ? ");
                $v->bindValue(1,$codigo);
                $v->bindValue(2,$_GET['email']);
                $v->execute();
            }else{
                echo 'nada';
            }
        } catch (Exception $e) {
            echo 'erro', $mail->ErrorInfo;
        }



    }else{
        echo 'Este email não se encontra na base de dados, registre-se';
    }

    
}
?>