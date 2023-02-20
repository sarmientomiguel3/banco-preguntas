<?php

		/**
		 * Autor: Eduardo Sutta
		 * Fecha: 12 - 10 - 19
		    *Este Clase tiene la funcion de tener una instancia global de la coneccion a la base de datos
			*Cualquier clase que tenga que hacer uso de la base de datos, y que aya accedido a la al sistema y que 
			*aya sido validado su token para acceder, tendra la posibilidad de hacer consultas, inserciones, etc. todas
			*las operaciones relacionadas con la base de datos.
			*Patron de Diseño Utilizado: Singleton
		*/
	require_once('configBD.php');
	
	class ConeccionBD {

		protected static $instance;
		protected function __construct() {}
		public static function getConeccionBD()
		{
	
			if( empty( self::$instance ) )
			{
				$dsn =  'pgsql:host=' . HOST_BD .
						';dbname='    . NOMBRE_BD .
						';port='      . PUERTO_BD .
						';connect_timeout=15';            
				$db_user = USUARIO_BD;             
				$db_pass = PASSWORD_BD;
	
				try
				{
					self::$instance = new PDO( $dsn, $db_user, $db_pass );
					self::$instance->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
				}  
				catch( PDOException $e )
				{  
					echo "ERROR DE CONECCION DE BASE DE DATOS " . $e->getMessage();
					// new Log( 6, "DB Class failed to connect to dbase: $e" );
				}                          
			}
			return self::$instance;
		}
	}



?>