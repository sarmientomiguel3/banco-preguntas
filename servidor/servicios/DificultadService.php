<?php

require "../modelo/modelo.inc.php";
require "../modelo/ModeloGenerico.php";

include  "FuncionJson.php";

require "GenericService.php";

class DificultadService extends GenericService{
	public function processGET($datos,$user){

		$dificultad = new Dificultad();
        switch($datos->accion){
			case 1:
                echo( miJson( $dificultad->findByOrganization($user->OrgID) ) );
				return;
			case 2:
				return;
            default:
                echo( miJson( $dificultad->buscarTodos() ) );
		}
	}

	public function processPOST($datos,$user){

		$dificultad = new Dificultad();
		// $datos->CreByID = $user->UseId;
		// $datos->EstReg = 'A';
		//$datos->IdDif = $dificultad->IdDif+1;
		//$datos->IdDif = $res['ID'];
		//$datos->IdDif = 'IdDif' + 1;
		//$datos->OrgID = $user->OrgID;
		// $datos->IdDif= $dificultad->lastDificultad($user->OrgID)['IdDif'] + 1;
		// $datos->nomId = "IdDif";
		$res = $dificultad->insertarDato($datos);
		// $res['ID'] = $datos->IdDif;
		echo( miJsonIns( $res) );

	}

	public function processPUT($datos,$user){

		$dificultad = new Dificultad();

		// $datos->dato->UpdDat = $user->Dat;
		// $datos->dato->UpdByID = $user->UseId;

		echo( miJsonRes( $dificultad->actualizarDato($datos->dato,$datos->IdDif) ) );
	}

	public function processDELETE($datos,$user){

		$dificultad = new Dificultad();
		echo( miJsonRes( $dificultad->eliminarDato($datos,$user) ) );
	}

}
	$servicio = new DificultadService();
	$servicio->atenderSolicitud();

?>
