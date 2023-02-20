<?php

require "../modelo/modelo.inc.php";
require "../modelo/ModeloGenerico.php";

include  "FuncionJson.php";

require "GenericService.php";

class EstadisticaService extends GenericService{
	public function processGET($datos,$user){

		$estadistica = new Estadistica();
        switch($datos->accion){
			case 1:
			echo( miJson( $estadistica->getLibros() ) );
				return;
			case 2:
			echo( miJson( $estadistica->getCursos() ) );
				return;
			case 3:
			echo( miJson( $estadistica->getAreaSug() ) );
				return;
			case 4:
			echo( miJson( $estadistica->getPreguntas() ) );
				return;
			case 5:
			echo( miJson( $estadistica->getPreguntas_Usuario() ) );
				return;
			case 6:
			echo( miJson( $estadistica->getPreguntas_Usuario_Aceptadas() ) );
				return;
			case 7:
			echo( miJson( $estadistica->getPreguntas_Usuario_Rechazadas() ) );
				return;
					
            default:
                echo( miJson( $estadistica->getCursos() ) );
		}
	}


	public function processPOST($datos,$user){

		$estadistica = new Estadistica();

		$datos->CreDat = $user->Dat;
		$datos->CreByID = $user->UseId;
		$datos->UpdDat = $user->Dat;
		$datos->UpdByID = $user->UseId;
		$datos->EstReg = 'A';
		//$datos->IDDif = $dificultad->IDDif+1;
		//$datos->IDDif = $res['ID'];
		//$datos->IDDif = 'IDDif' + 1;

		//$datos->OrgID = $user->OrgID;curso
		$myObj = new STDClass();
		$myObj->IdPre = $aceptada->lastEstadistica($user->OrgID)['IdPre'] + 1;
		$myObj->TxtPre = $datos->enunciado;
		$myObj->CreDat = $user->Dat;
		$myObj->CreByID = $user->UseId;
		$myObj->UpdDat = $user->Dat;
		$myObj->UpdByID = $user->UseId;
		$myObj->EstReg = 'A';
		$myObj->IDAreSug = intval($datos->areasug);
		$myObj->IDDif = intval($datos->dificultad);
		$myObj->IDLib = 1;
		$myObj->IdCur = intval($datos->curso);
		$myObj->IdTem = 1;
		$myObj->IDEstRev = 1;

		//$myJSON = json_encode($myObj);
		
		//$datos->IDPre= $pregunta->lastPregunta($user->OrgID)['IDPre'] + 1;



		$res = $estadistica->insertarDato($myObj);
		$res['ID'] = $myObj->IdPre;


		echo( miJsonIns( $res) );

	}



}
	$servicio = new EstadisticaService();
	$servicio->atenderSolicitud();

?>
