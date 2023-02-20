<?php

require "../modelo/modelo.inc.php";
require "../modelo/ModeloGenerico.php";

include  "FuncionJson.php";

require "GenericService.php";

class AreaService extends GenericService{
	public function processGET($datos,$user){

		$area = new Area();
        switch($datos->accion){
			case 1:
                echo( miJson( $area->findByOrganization($user->OrgID) ) );
				return;
			case 2:
				return;
            default:
                echo( miJson( $area->buscarTodos() ) );
		}
	}

	public function processPOST($datos,$user){

		$area = new Area();

		// $datos->CreDat = $user->Dat;
		// $datos->CreByID = $user->UseId;
		// $datos->UpdDat = $user->Dat;
		// $datos->UpdByID = $user->UseId;
		$datos->EstReg = 'A';
		//$datos->IdDif = $dificultad->IdDif+1;
		//$datos->IdDif = $res['ID'];
		//$datos->IdDif = 'IdDif' + 1;

		//$datos->OrgID = $user->OrgID;


		$res = $area->insertarDato($datos);
		// $res['ID'] = $datos->IdAreSug;


		echo( miJsonIns( $res) );

	}

	public function processPUT($datos,$user){

		$area = new Area();

		// $datos->dato->UpdDat = $user->Dat;
		// $datos->dato->UpdByID = $user->UseId;

		echo( miJsonRes( $area->actualizarDato($datos->dato,$datos->IdAreSug) ) );
	}

	public function processDELETE($datos,$user){

		$area = new Area();
		echo( miJsonRes( $area->eliminarDato($datos,$user) ) );
	}

}
	$servicio = new AreaService();
	$servicio->atenderSolicitud();

?>
