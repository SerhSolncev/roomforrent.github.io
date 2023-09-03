<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

include_once __DIR__ . "/PHPMailer/src/PHPMailer.php";
include_once __DIR__ . "/PHPMailer/src/SMTP.php";
include_once __DIR__ . "/PHPMailer/src/Exception.php";

$phone = isset($_POST['phone']) && $_POST['phone'] ? $_POST['phone'] : '';
$name = isset($_POST['name']) && $_POST['name'] ? $_POST['name'] : '';

$subject = "Хочу записаться на пробное занятие";
$message = 'Привет. Меня зовут ' . $name . '.  Хочу записаться на пробное занятие. tel:' .$phone;

$mail = new PHPMailer(true);

$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
$mail->isSMTP();                                            //Send using SMTP
$mail->Host       = 'smtp.example.com';                     //Set the SMTP server to send through
$mail->SMTPAuth   = true;                                   //Enable SMTP authentication
$mail->Username   = 'user@example.com';                     //SMTP username
$mail->Password   = 'secret';                               //SMTP password
$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
$mail->Port       = 465;

//Recipients
//$mail->setFrom('tyler145688887@gmail.com', 'Mailer');
//$mail->addAddress('edmondboxer2014@yandex.ru');
//$mail->addAddress('varyagclub-pd@yandex.ru');
//$mail->addAddress('Varyagclubpd@gmail.com');
$mail->addReplyTo('serhdmc96@gmail.com', 'Information');

$mail->isHTML(true);                                  //Set email format to HTML
$mail->Subject = 'Хочу записаться на пробное занятие';
$mail->Body    = 'Привет. Меня зовут ' . $name . '.  Хочу записаться на пробное занятие. tel:' .$phone;

if ($name) {
    //$mail->send();
    $to      = 'serhdmc96@gmail.com';
    $headers = 'From: tyler145688887@gmail.com' . "\r\n" .
        'Reply-To: serhdmc96@gmail.com' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();
    mail($to, $subject, $message, $headers); // Вот здесь отправляэм это все
    echo json_encode(array('success' => 1));

} else {
    echo json_encode(array('success' => 0));
}
