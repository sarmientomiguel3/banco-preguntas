<?php
class MiJWT{
	public static $miClave = '123456';
	public static $miDominio = 'http://localhost/smtaured/';
	public static $miAlgoritmo = 'HS256';
	
	public static function generarToken($tiempoEx){
		$tiempoInicio = time();
		$token = array(
			"iss" => MiJWT::$miDominio,
			"aud" => MiJWT::$miDominio,
			"iat" => $tiempoInicio,
			"exp" => ($tiempoInicio + $tiempoEx)
		);
		return $token;
	}
    public static function generarToken2($session,$organization,$rol,$usuario,$tiempoInicio,$tiempoEx){
		$token = array(
			"iss" => MiJWT::$miDominio,
			"aud" => $usuario,
			"org" => $organization,
            "rol" => $rol,
            "ses" => $session,
			"iat" => $tiempoInicio,
			"exp" => ($tiempoInicio + $tiempoEx)
		);
		return $token;
	}
	/*
	public static function decodificarJWT($jwt){
		
		//JWT::$leeway = 60; // $leeway in seconds
		return JWT::decode($jwt, MiJWT::$miClave, array(MiJWT::$miAlgoritmo) );
	}*/
}
?>	