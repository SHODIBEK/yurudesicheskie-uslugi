<?php
// ini_set('display_errors', 1);
// error_reporting(E_ALL);

// Файлы phpmailer
require './phpmailer/src/PHPMailer.php';
require './phpmailer/src/SMTP.php';
require './phpmailer/src/Exception.php';

//  $mail = new PHPMailer;  // Создаем экземпляр мейлера почты
$mail = new PHPMailer\PHPMailer\PHPMailer();
$mail->SMTPDebug = 1;  // Режим отладки
$mail->isSMTP();   // Включаем мейлер в режим SMTP
$mail->SMTPAuth = true; // Включаем SMTP аутентификацию
$mail->CharSet = 'utf-8';

// Настройки вашей почты (взять у провайдера)
$mail->Host = 'smtp.gmail.com';  // SMTP сервер
$mail->Username = 'mail@mitusov.com'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'password'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';  // Протокол шифрования SSL или TLS
$mail->Port = 465; // TCP порт для подключения

// Получатель письма
$mail->setFrom("mail@mitusov.com"); // От кого будет уходить письмо?
$mail->addAddress('mail@mitusov.com'); // Кому будет уходить письмо 

  // Тело письма 

$body = '<p>Заявка с сайта sanctions-22.ru</p>';

if(trim(!empty($_POST['name']))) {
  $body .= '<p><strong>Имя:&nbsp;</strong>' .$_POST['name']. '</p>';
};

if(trim(!empty($_POST['phone']))) {
  $body .= '<p><strong>Телефон:&nbsp;</strong>' .$_POST['phone']. '</p>';
};

if(trim(!empty($_POST['email']))) {
  $body .= '<p><strong>Эл-почта:&nbsp;</strong>' .$_POST['email']. '</p>';
};

if(trim(!empty($_POST['sfera']))) {
  $body.='<p><strong>Сфера деятельности вашей компании:&nbsp;</strong>' .$_POST['sfera']. '</p>';
};

if(trim(!empty($_POST['sanksy']))) {
  $body.='<p><strong>Каким образом санкции повлияли на вашу финансово-хозяйственную деятельность?:&nbsp;</strong>' .$_POST['sanksy']. '</p>';
};

if(trim(!empty($_POST['gosuchast']))) {
  $body.='<p><strong>Государсивенное участие в компании?:&nbsp;</strong>' .$_POST['gosuchast']. '</p>';
};

if(trim(!empty($_POST['sanksykomp']))) {
  $body.='<p><strong>Под действие санкции каких стран попала ваша компания?:&nbsp;</strong>' .$_POST['sanksykomp']. '</p>';
};

if(trim(!empty($_POST['scheta']))) {
  $body.='<p><strong>Есть ли заблокированные счета за рубежом?:&nbsp;</strong>' .$_POST['scheta']. '</p>';
};

// Само письмо

$mail->isHTML(true);  // Задаём формат письма (HTML)

$mail->Subject = 'Заявка с сайта sanctions-22.ru';
$mail->Body    = $body;

// Функии рекапчи
function reCaptchaCheck() {
	$rCode = $_POST['g-recaptcha-response'];
	$rUrl = 'https://www.google.com/recaptcha/api/siteverify';
	$rSecret = '6LcmO50fAAAAAGEWtc4Jd6U1shogpwBRbNEGTpW_';
	$ip = $_SERVER['REMOTE_ADDR'];

	$curl = curl_init($rUrl);

	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true);
	curl_setopt($curl, CURLOPT_POST, true);
	curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
	curl_setopt($curl, CURLOPT_POSTFIELDS, 'secret='.$rSecret.'&response='.$rCode.'&remoteip='.$ip);
	curl_setopt($curl, CURLINFO_HEADER_OUT, false);
	curl_setopt($curl, CURLOPT_HEADER, false);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

	$res = curl_exec($curl);
	curl_close($curl);
	$res = json_decode($res);

	if ($res->success) {
		return true;
	} else {
		return false;
	}

}

if(reCaptchaCheck()) 
{
  if ($mail->send()) {
    echo 'Письмо отправленно';
  } else {
    echo "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
  }
} else {
  echo 'Ошибка ввода reCaptcha!';
}