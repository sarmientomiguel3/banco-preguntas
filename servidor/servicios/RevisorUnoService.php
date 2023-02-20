<?php

require "../modelo/modelo.inc.php";
require "../modelo/ModeloGenerico.php";

/*
include  "../modelo/Usuario.class.php";
include  "../modelo/Persona.class.php";
include  "../modelo/UsuarioVentana.class.php";
*/

include  "FuncionJson.php";	

require "GenericService.php";

class RevisorUnoService extends GenericService{
	
	public function processGET($datos,$user){
		$r1 = new RevisorUno();
		
		switch($datos->accion){
			case 1:
				echo( miJson( $r1->buscarR1($datos->IdCur) ) );
				break;
			case 2:
				echo( miJson( $r1->buscarR2($datos->IdCur) ) );
				break;			
			default:
				echo( miJson( $r1->buscarTodos() ) );
		}	
	}
}
	$servicio = new RevisorUnoService();
	$servicio->atenderSolicitud();

?>


