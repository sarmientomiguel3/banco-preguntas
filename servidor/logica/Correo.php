<?php

function mensajeBienvenida($destinatario,$codigo,$pass){
	$nombre = "taured";
	$email = "presidente@taured.net";


	// Definir el correo de destino:
	 
	// Estas son cabeceras que se usan para evitar que el correo llegue a SPAM:
	$headers = "From: $nombre <$email>\r\n";  
	$headers .= "X-Mailer: PHP5\n";
	$headers .= 'MIME-Version: 1.0' . "\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
	 
	// Aqui definimos el asunto y armamos el cuerpo del mensaje
	$asunto = "Registro Taured";

	$cuerpo = '<html style="font-family: cursive">'.
		'<head><title>Email con HTML</title></head>'.
		'<body style=""> <img src="http://www.taured.net/smtaured/resources/img/logo.jpg" />'.
		'<h1>BIENVENIDO A TAURED</h1><br/>'.
		'ya es un disribuidor taurense<br>'.
		'codigo distribuidor: '.$codigo.'<br>'.
		'password: '.$pass.'<br>'.
		'<hr>'.
		'ingresa a tu perfil taurense aqui : <a href="http://www.taured.net/smtaured" target="_blank">http://www.taured.net/smtaured</a>'.
		'</body>'.
		'</html>';
	 
	mail($destinatario,$asunto,$cuerpo,$headers); //ENVIAR!
};
function mensajeDatos($destinatario,$nombre,$codigo,$pass){
	$nombre = "taured";
	$email = "presidente@taured.net";


	// Definir el correo de destino:
	 
	// Estas son cabeceras que se usan para evitar que el correo llegue a SPAM:
	$headers = "From: $nombre <$email>\r\n";  
	$headers .= "X-Mailer: PHP5\n";
	$headers .= 'MIME-Version: 1.0' . "\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
	 
	// Aqui definimos el asunto y armamos el cuerpo del mensaje
	$asunto = "Datos Distribuidor Taurense";

	$cuerpo = '<html style="font-family: cursive">'.
		'<head><title>Email con HTML</title></head>'.
		'<body style=""> <img src="http://www.taured.net/smtaured/resources/img/logo.jpg" />'.
		'<h1>DATOS TAURENSE</h1><br/>'.
		'hola $nombre, tus datos de usuario son:<br>'.
		'codigo distribuidor: '.$codigo.'<br>'.
		'password: '.$pass.'<br>'.
		'<hr>'.
		'ingresa a tu perfil taurense aqui : <a href="http://www.taured.net/smtaured" target="_blank">http://www.taured.net/smtaured</a>'.
		'</body>'.
		'</html>';
	 
	mail($destinatario,$asunto,$cuerpo,$headers); //ENVIAR!
};
?>