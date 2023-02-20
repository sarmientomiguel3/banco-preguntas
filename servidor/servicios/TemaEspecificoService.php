<?php

require "../modelo/modelo.inc.php";
require "../modelo/ModeloGenerico.php";

include  "FuncionJson.php";

require "GenericService.php";

class TemaEspecificoService extends GenericService{
	public function processGET($datos,$user){

		$temaEspecifico = new TemaEspecifico();
        switch($datos->accion){
			case 1:
                echo( miJson( $temaEspecifico->findByOrganization($user->OrgID) ) );
				return;
			case 2:
				echo( miJson( $temaEspecifico->findByTema($user->OrgID) ) );
				return;
			case 3:
				echo( miJson( $temaEspecifico->buscarTodosTemaCurso($user->OrgID) ) );
				return;
            default:
                echo( miJson( $temaEspecifico->buscarTodos() ) );
		}
	}

	public function processPOST($datos,$user){

		$temaEspecifico = new TemaEspecifico();
		$nuevoTemaEspecifico = new stdClass();

		$nuevoTemaEspecifico->DesTemEsp = $datos->DesTemEsp;
		$nuevoTemaEspecifico->EstReg = 'A';
		$nuevoTemaEspecifico->fkIdTem = $datos->fkIdTem;
	
		$res = $temaEspecifico->insertarDato($nuevoTemaEspecifico);

		echo( miJsonIns( $res) );

	}

	public function processPUT($datos,$user){

		$temaEspecifico = new TemaEspecifico();

		$updateTemaEspecifico = new stdClass();
		$updateTemaEspecifico->DesTemEsp = $datos->dato->DesTemEsp;
		$updateTemaEspecifico->fkIdTem = $datos->dato->fkIdTem;

		echo( miJsonRes( $temaEspecifico->actualizarDato($updateTemaEspecifico,$datos->IdTemEsp) ) );
	}

	public function processDELETE($datos,$user){

		$temaEspecifico = new TemaEspecifico();
		echo( miJsonRes( $temaEspecifico->eliminarDato($datos,$user) ) );
	}

}
	$servicio = new TemaEspecificoService();
	$servicio->atenderSolicitud();

?>
