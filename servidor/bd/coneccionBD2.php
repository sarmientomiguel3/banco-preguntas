<?php
	require_once('configBD.php');
	
	class ConeccionBD{
		public $coneccion;
		public static $instancia = null;		
		
		public final function __construct(){

			try {
				$coneccion = new PDO("pgsql:host=". HOST_BD .";port=" . PUERTO_BD . ";dbname=" . NOMBRE_BD ,USUARIO_BD, PASSWORD_BD);
				$coneccion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			} catch (Exception $e) {
				echo "ERROR DE CONECCION DE BASE DE DATOS " . $e->getMessage();
			}
			
		}
		public static function getConeccionBD(){
			// verificando si la instancia ya existe

			if(self::$instancia == null) {
				self::$instancia = new ConeccionBD();
			}
			// try {
			// 	$base_de_datos = new PDO("pgsql:host=127.0.0.1;port=5432;dbname='mascotas'", "postgres", "root");
			// 	$base_de_datos->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			// } catch (Exception $e) {
			// 	echo "Ocurrió un error con la base de datos: " . $e->getMessage();
			// }
			// $data = $base_de_datos;
			// $sentencia = $data->query("select id, nombre, edad from mascotas");
			// $mascotas = $sentencia->fetchAll(PDO::FETCH_OBJ);
			
			$conex = new ConeccionBD();

			echo print_r($conex,1);
			
			return self::$instancia->coneccion;
		
		}
	}
?>