<?php

require "../modelo/modelo.inc.php";
require "../modelo/ModeloGenerico.php";

include  "FuncionJson.php";

require "GenericService.php";

class LibroService extends GenericService{
	public function processGET($datos,$user){

		$libro = new Libro();
        switch($datos->accion){
			case 1:
                echo( miJson( $libro->findByOrganization($user->OrgID) ) );
				return;
			case 2:
				return;
            default:
                echo( miJson( $libro->buscarTodos() ) );
		}
	}

	public function processPOST($datos,$user){

		$libro = new Libro();

		$datos->CreDat = $user->Dat;
		$datos->CreByID = $user->UseId;
		$datos->UpdDat = $user->Dat;
		$datos->UpdByID = $user->UseId;
		$datos->EstReg = 'A';
		//$datos->IdDif = $dificultad->IdDif+1;
		//$datos->IdDif = $res['ID'];
		//$datos->IdDif = 'IdDif' + 1;

		//$datos->OrgID = $user->OrgID;

		$datos->IDLib= $libro->lastLibro($user->OrgID)['IDLib'] + 1;

		$res = $libro->insertarDato($datos);
		$res['ID'] = $datos->IDLib;


		echo( miJsonIns( $res) );

	}

	public function processPUT($datos,$user){

		$libro = new Libro();

		$datos->dato->UpdDat = $user->Dat;
		$datos->dato->UpdByID = $user->UseId;

		echo( miJsonRes( $libro->actualizarDato($datos->dato,$datos->IDLib) ) );
	}

	public function processDELETE($datos,$user){

		$libro = new Libro();
		echo( miJsonRes( $libro->eliminarDato($datos,$user) ) );
	}

}
	$servicio = new LibroService();
	$servicio->atenderSolicitud();

?>
