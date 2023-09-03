<?php

require_once('phpmailersend/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['name'];
$name2 = $_POST['name2'];
$phone = $_POST['phone'];
$phone2 = $_POST['phone2'];
$price = $_POST['price'];
$adress = $_POST['adress'];
$email = $_POST['email'];
$premium = $_POST['premium'];
$count = $_POST['count'];
$services = $_POST['services'];
$badget = $_POST['badget'];
$text = $_POST['text'];
$kp = $_POST['kp'];

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'quantmedia1@gmail.com'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'qzkjxvniujtxybzi'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('quantmedia1@gmail.com'); // от кого будет уходить письмо?
$mail->addAddress('Truecowater@gmail.com');     // Кому будет уходить письмо

//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Заявка с сайта www.quantm.ru';
$mail->Body    =
    'Имя: ' . $name . '<br>' .
    'Телефон: ' . $phone . '<br>' .
    'Далее поля из нижней формы, если она заполнена: <br><br>' .
    'Адрес доставки: ' . $adress . '<br>' .
    'Имя со 2 формы: ' . $name2 . ' <br>' .
    'Телефон со второй формы: ' . $phone2 . '<br>' .
    'Премиум ' . $premium . '<br>' .
    'Количество бутылей воды ' . $count . '<br>' .
    'Цена ' . $price . '<br>' .
$mail->AltBody = '';

$mail->send();
