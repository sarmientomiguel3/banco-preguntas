<?php
ob_start();
?>
<?php
use \Firebase\JWT\JWT;

class GenericService{
	
	public function processPOST($datos,$user){
		echo('{"data":'.json_encode($datos->Cod).'}');
	}
	public function processGET($datos,$user){
		
		/*$argumentos = (object)$_GET;
				
		echo('{"data":'.json_encode($argumentos->Nom).'}');*/
		
		echo('{"data":'.json_encode($datos[Nom]).'}');
	}
	public function processPUT($datos,$user){
		echo('{"data":'.json_encode($datos->Des).'}');
	}
	public function processDELETE($datos,$user){
		echo('{"data":'.json_encode($datos->Pre).'}');
	}		
	
	public function atenderSolicitud(){
	 
		$user = new stdClass();
		
		//if(!isset($cabecera["autorizacion"]) || empty($cabecera["autorizacion"])){
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
            require_once('../vendor/firebase/php-jwt/src/JWT.php');
			include  "MiJWT.php";
			try{
				//$JWT = JWT::decode($cabecera["autorizacion"], MiJWT::$miClave, array(MiJWT::$miAlgoritmo) );
				$JWT = JWT::decode($_SERVER["HTTP_AUTORIZACION"], MiJWT::$miClave, array(MiJWT::$miAlgoritmo) );
				// obteniendo el ID del usuario
				$user->UseId = $JWT->aud;
				$user->OrgID = $JWT->org;
                
				/*
                if($JWT->rol > 2){
					
                    require  "../modelo/Periodo.class.php";
                    $periodo = (new Periodo())->buscarPeriodoActual();                    
                    if(!$periodo['estado']){
                        header('HTTP/1.0 401 No autorizado');
                        date_default_timezone_set('America/Lima');
                        (new Usuario())->cerrarSession($JWT->ses,"".date("Y-m-d H:i:s"));
                        echo( "El Periodo Taurense a finalizado" );
                        return;
                    }
                }*/
                
                
			} catch (Exception $e) {
                /*
                 * the token was not able to be decoded.
                 * this is likely because the signature was not able to be verified (tampered token)
                 */
                date_default_timezone_set('America/Lima');
				//FALTA
                //(new Usuario())->cerrarSession($e->getCode(),"".date("Y-m-d H:i:s"));
                header('HTTP/1.0 401 No autorizado');
				echo $e->getMessage()+">"+$e->getCode();
				return;
            }
			
		}
		
		
		//recibiendo el tipo de metodo
		$metodo = $_SERVER['REQUEST_METHOD'];
		
		///obteniendo la fecha de la operacion
		date_default_timezone_set('America/Lima');
		$user->Dat = "".date('Y-m-d H:i:s');
		
		 
		// Dependiendo del método de la petición ejecutaremos la acción correspondiente.
		switch ($metodo) {
			// Creacion
			// código para método POST
			case 'POST':
				$datos = json_decode(file_get_contents('php://input'));
				$this->processPOST($datos,$user);
				break;
			// Lectura
			// código para método GET
			case 'GET':
				$datos = (object)$_GET;
				$this->processGET($datos,$user);
				break;
			// Actualizacion
			// código para método PUT
			case 'PUT':				
				$datos = json_decode(file_get_contents('php://input'));
				$this->processPUT($datos,$user);
				break;
			// Eliminar
			// código para método DELETE
			case 'DELETE':
				$datos = json_decode(file_get_contents('php://input'));
				$this->processDELETE($datos,$user);
				break;
			default:
				echo('{"data":"ERROR"}');
				break;
		}
	}
}
spl_autoload_register('clases_autoload');

?>
<?php
ob_end_flush();
?>

