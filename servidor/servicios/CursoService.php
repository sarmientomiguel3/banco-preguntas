<?php

require "../modelo/modelo.inc.php";
require "../modelo/ModeloGenerico.php";

include  "FuncionJson.php";

require "GenericService.php";

class CursoService extends GenericService{
	public function processGET($datos,$user){

		$curso = new Curso();
        switch($datos->accion){
			case 1:
                echo( miJson( $curso->findByOrganization($user->OrgID) ) );
				return;
			case 2:
				return;
            default:
                echo( miJson( $curso->buscarTodos() ) );
		}
	}

	public function processPOST($datos,$user){

		$curso = new Curso();

/*		$datos->CreDat = $user->Dat;
		$datos->CreByID = $user->UseId;
		$datos->UpdDat = $user->Dat;
		$datos->UpdByID = $user->UseId;
		$datos->EstReg = 'A';
		//$datos->IdDif = $dificultad->IdDif+1;
		//$datos->IdDif = $res['ID'];
		//$datos->IdDif = 'IdDif' + 1;

		//$datos->OrgID = $user->OrgID;
*/
		$datos->EstReg = 'A';
		$res = $curso->insertarDato($datos);
	//	$res['ID'] = $datos->IdCur;
 

		echo( miJsonIns( $res) );

	}

	public function processPUT($datos,$user){

		$curso = new Curso();

		//$datos->dato->UpdDat = $user->Dat;
		//$datos->dato->UpdByID = $user->UseId;

		echo( miJsonRes( $curso->actualizarDato($datos->dato,$datos->IdCur) ) );
	}

	public function processDELETE($datos,$user){

		$curso = new Curso();
		echo( miJsonRes( $curso->eliminarDato($datos,$user) ) );
	}

}
	$servicio = new CursoService();
	$servicio->atenderSolicitud();

?>
