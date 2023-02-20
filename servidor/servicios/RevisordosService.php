<?php

require "../modelo/modelo.inc.php";
require "../modelo/ModeloGenerico.php";

include  "FuncionJson.php";

require "GenericService.php";

class RevisordosService extends GenericService{
	public function processGET($datos,$user){

		$revisordos = new Revisordos();
        switch($datos->accion){
			case 1:
			echo( miJson( $revisordos->getPreguntasByUserAsignado($user) ) );
				return;
			case 2:
			echo( miJson( $revisordos->getCursos() ) );
				return;
			case 3:
			echo( miJson( $revisordos->getAreaSug() ) );
				return;
			case 4:
			echo( miJson( $revisordos->getPreguntas() ) );
				return;
            default:
                echo( miJson( $revisordos->getCursos() ) );
		}
	}
 
	public function processPUT($datos, $user)
	{
		$revisordos = new Revisordos();

		// $updatedato = new stdClass();
		// $updatedato->DesJus = $datos->dato->DesJus;
		
		$res = $revisordos->actualizarDato($datos->dato,$datos->IdPreUsu);

		echo( miJsonIns( $res) );
	}

}
	$servicio = new RevisordosService();
	$servicio->atenderSolicitud();

?>
