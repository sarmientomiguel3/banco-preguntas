<?php

require "../modelo/modelo.inc.php";
require "../modelo/ModeloGenerico.php";

include  "FuncionJson.php";

require "GenericService.php";

class RevisorService extends GenericService{
	public function processGET($datos,$user){

		$revisor = new Revisor();
        switch($datos->accion){
			case 1:
			echo( miJson( $revisor->getRevisor() ) );
				return;
			case 2:
			echo( miJson( $revisor->getCursos() ) );
				return;
			case 3:
			echo( miJson( $revisor->getAreaSug() ) );
				return;
			case 4:
			echo( miJson( $revisor->getPreguntas() ) );
				return;
				case 5:
			echo( miJson( $revisor->getRevisorUno($user) ) );
				return;
				case 6:
			echo( miJson( $revisor->getRevisorAceptar() ) );
				return;
            default:
                echo( miJson( $revisor->getCursos() ) );
		}
	}


	public function processPOST($datos,$user){

		$pregunta = new Pregunta();

		$datos->CreDat = $user->Dat;
		$datos->CreByID = $user->UseId;
		$datos->UpdDat = $user->Dat;
		$datos->UpdByID = $user->UseId;
		$datos->EstReg = 'A';
		//$datos->IdDif = $dificultad->IdDif+1;
		//$datos->IdDif = $res['ID'];
		//$datos->IdDif = 'IdDif' + 1;

		//$datos->OrgID = $user->OrgID;curso
		$myObj = new STDClass();
		$myObj->IdPre = $pregunta->lastPregunta($user->OrgID)['IdPre'] + 1;
		$myObj->TxtPre = $datos->enunciado;
		$myObj->CreDat = $user->Dat;
		$myObj->CreByID = $user->UseId;
		$myObj->UpdDat = $user->Dat;
		$myObj->UpdByID = $user->UseId;
		$myObj->EstReg = 'A';
		$myObj->IdAreSug = intval($datos->areasug);
		$myObj->IdDif = intval($datos->dificultad);
		$myObj->IDLib = 1;
		$myObj->IdCur = intval($datos->curso);
		$myObj->IdTem = 1;
		$myObj->IDEstRev = 1;

		//$myJSON = json_encode($myObj);
		
		//$datos->IDPre= $pregunta->lastPregunta($user->OrgID)['IDPre'] + 1;



		$res = $pregunta->insertarDato($myObj);
		$res['ID'] = $myObj->IdPre;


		echo( miJsonIns( $res) );

	}

	public function processPUT($datos,$user){

		$revisor = new Revisor();

		// $datos->dato->UpdDat = $user->Dat;
		// $datos->dato->UpdByID = $user->UseID;
		switch($datos->accion){
			case 1:
				echo( miJsonIns( $revisor->actualizarDato2($datos->dato,$datos->IdPreUsu) ) );
			return;
			case 2:
				echo( miJsonIns( $revisor->actualizarDato3($datos->dato,$datos->IdPreUsu) ) );
			return;
			default:
                echo( miJsonIns( $revisor->actualizarDato($datos->dato,$datos->IdPreUsu) ) );
		}
		
		//echo( miJsonRes( $revisor->actualizarDato3($datos->dato,$datos->IdPreUsu) ) );
		
	}



}
	$servicio = new RevisorService();
	$servicio->atenderSolicitud();

?>
