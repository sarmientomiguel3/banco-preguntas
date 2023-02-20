<?php

require "../modelo/modelo.inc.php";
require "../modelo/ModeloGenerico.php";

include  "FuncionJson.php";

require "GenericService.php";

class TemaService extends GenericService{
	public function processGET($datos,$user){

		$tema = new Tema();
        switch($datos->accion){
			case 1:
                echo( miJson( $tema->findByOrganization($user->OrgID) ) );
				return;
			case 2:
				echo( miJson( $tema->findByCurso($datos->IdCur) ) );
				return;
			case 3:
				echo( miJson( $tema->buscarTodos() ) );
				return;
            default:
                echo( miJson( $tema->buscarTodos() ) );
		}
	}

	public function processPOST($datos,$user){

		$tema = new Tema();

	/*	$datos->CreDat = $user->Dat;
		$datos->CreByID = $user->UseId;
		$datos->UpdDat = $user->Dat;
		$datos->UpdByID = $user->UseId;*/
		//$datos->IdDif = $dificultad->IdDif+1;
		//$datos->IdDif = $res['ID'];
		//$datos->IdDif = 'IdDif' + 1;

		//$datos->OrgID = $user->OrgID;

		//$datos->IdTem= $tema->lastTema($user->OrgID)['IdTem'] + 1;
		// $nuevoTema = new stdClass();
		// $nuevoTema->fkIdCur = intval($datos->curso);
		// $nuevoTema->EstReg = $datos->DesTem;
		$datos->EstReg = 'A';


		$res = $tema->insertarDato($datos);
		//$res['ID'] = $datos->IdTem;


		echo( miJsonIns( $res) );

	}

	public function processPUT($datos,$user){

		$tema = new Tema();

		//$datos->dato->UpdDat = $user->Dat;
		//$datos->dato->UpdByID = $user->UseId;

		echo( miJsonRes( $tema->actualizarDato($datos->dato,$datos->IdTem) ) );
	}

	public function processDELETE($datos,$user){

		$tema = new Tema();
		echo( miJsonRes( $tema->eliminarDato($datos,$user) ) );
	}

}
	$servicio = new TemaService();
	$servicio->atenderSolicitud();

?>
