<?php
ob_start();
?>
<?php

require "bd/coneccionBD.php";
require "modelo/ModeloGenerico.php";

include  "modelo/Usuario.class.php";
include  "modelo/UsuarioVentana.class.php";


use \Firebase\JWT\JWT;

class ServicioLogin {
	public function processPOST($datos){
		$usuario = new Usuario();
		$res = $usuario->buscarUsuario($datos->NomUsu,$datos->Pas);
		//FALTA
		if( $res['estado'] ){
			
			//haciendo una copia al usuario
			$usu = $res['resultado'];
			//echo print_r($usu ,1);
            $res = (new UsuarioVentana())->buscarTodosPorRol($usu['RolID']);

            if($res['estado']){
                $listaMenus = $res['resultado'];

                $tiempoInicio = time();
                date_default_timezone_set('America/Lima');
				//FALTA
                //$idsession = $usuario->iniciarSession($usu['UseId'],"".date("Y-m-d H:i:s",$tiempoInicio) );
				$idsession = 1;

                require_once('vendor/firebase/php-jwt/src/JWT.php');
                include  "servicios/MiJWT.php";
	
                $json = "{";
				//$json .= "\"jwt\":" . json_encode( JWT::encode(MiJWT::generarToken2($idsession,$usu['SucId'],$usu['RolID'],$usu['UseId'],$tiempoInicio,JWT::$tiempoMaxEx), MiJWT::$miClave, MiJWT::$miAlgoritmo) );
				$json .= "\"jwt\":" . json_encode( JWT::encode(MiJWT::generarToken2($idsession,$usu['fkIdSuc'],$usu['RolID'],$usu['UseId'],$tiempoInicio,JWT::$tiempoMaxEx), MiJWT::$miClave, MiJWT::$miAlgoritmo) );
                $json .= ',';
                $json .= "\"conectado\":" . json_encode(true);
                $json .= ',';
                $json .= "\"usuario\":" . json_encode( $usu );
                $json .= ',';
                $json .= "\"menus\":" . json_encode($listaMenus);
                $json .= ',';
				$json .= "\"periodo\":" . json_encode("1");
                $json .= ',';
                $json .= "\"url\":" . '"app/"';
                $json .= "}";

				echo( $json );
				// (new Usuario())->iniciarSession($usu['UseId'],"".date("Y-m-d H:i:s"));
            }
            else{
                echo( $res['mensaje'] );
            }


		}
		else{
			//echo( "{}" );
			echo( "El usuario o contraseña son incorrectos" );
		}
	}
	public function processGET($datos){
	
		if(!isset( $_SERVER["HTTP_AUTORIZACION"]) || empty($_SERVER["HTTP_AUTORIZACION"])){
			//mejorar la validación, pero si está aquí es que no tenemos el token

			/*
			 * la solicitud no cuenta con un token
			 */
			header('HTTP/1.0 400 consulta fallida');
			echo 'El Token de autorizacion no se encuentra en su solicitud';
			return;
		}
		else{
			//require_once('../vendor/firebase/php-jwt/src/JWT.php');
			//require_once('../vendor/autoload.php');
            require_once('vendor/firebase/php-jwt/src/JWT.php');
            include  "servicios/MiJWT.php";
			try{
				//$JWT = JWT::decode($cabecera["autorizacion"], MiJWT::$miClave, array(MiJWT::$miAlgoritmo) );
				$JWT = JWT::decode($_SERVER["HTTP_AUTORIZACION"], MiJWT::$miClave, array(MiJWT::$miAlgoritmo) );
			} catch (Exception $e) {
                /*
                 * the token was not able to be decoded.
                 * this is likely because the signature was not able to be verified (tampered token)
                 */
                date_default_timezone_set('America/Lima');
                // (new Usuario())->cerrarSession($e->getCode(),"".date("Y-m-d H:i:s"));
                header('HTTP/1.0 401 No autorizado');
				echo $e->getMessage();
				return;
			}

		}
	}
    public function processDELETE(){

		if(!isset( $_SERVER["HTTP_AUTORIZACION"]) || empty($_SERVER["HTTP_AUTORIZACION"])){
			//mejorar la validación, pero si está aquí es que no tenemos el token

			/*
			 * la solicitud no cuenta con un token
			 */
			header('HTTP/1.0 400 consulta fallida');
			echo 'El Token de autorizacion no se encuentra en su solicitud';
			return;
		}
		else{
            require_once('vendor/firebase/php-jwt/src/JWT.php');
            include  "servicios/MiJWT.php";
			try{
				//$JWT = JWT::decode($cabecera["autorizacion"], MiJWT::$miClave, array(MiJWT::$miAlgoritmo) );
				$JWT = JWT::decode($_SERVER["HTTP_AUTORIZACION"], MiJWT::$miClave, array(MiJWT::$miAlgoritmo) );
                date_default_timezone_set('America/Lima');
                // (new Usuario())->cerrarSession($JWT->ses,"".date("Y-m-d H:i:s"));
			} catch (Exception $e) {
                /*
                 * the token was not able to be decoded.
                 * this is likely because the signature was not able to be verified (tampered token)
                 */
                date_default_timezone_set('America/Lima');
                // (new Usuario())->cerrarSession($e->getCode(),"".date("Y-m-d H:i:s"));
                header('HTTP/1.0 401 No autorizado');
				echo $e->getMessage();
				return;
			}
		}
	}
	public function atenderSolicitud(){

		//recibiendo el tipo de metodo
		$metodo = $_SERVER['REQUEST_METHOD'];

		// Dependiendo del método de la petición ejecutaremos la acción correspondiente.
		switch ($metodo) {
			// Creacion
			// código para método POST
			case 'POST':
				$datos = json_decode(file_get_contents('php://input'));
				$this->processPOST($datos);
				break;
			case 'GET':
				$datos = (object)$_GET;
				$this->processGET($datos);
				break;
            case 'DELETE':
				$this->processDELETE();
				break;
			default:
				header('HTTP/1.0 405 Metodo no permitido');
				echo 'Error 400!!! Solo se permite consultas POST';
				break;
		}
	}
}
	$servicio = new ServicioLogin();
	$servicio->atenderSolicitud();

?>
<?php
ob_end_flush();
?>
