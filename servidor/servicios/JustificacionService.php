<?php

require "../modelo/modelo.inc.php";
require "../modelo/ModeloGenerico.php";

include  "FuncionJson.php";

require "GenericService.php";

class JustificacionService extends GenericService{
	public function processGET($datos,$user){

		$justificacion = new Justificacion();
        switch($datos->accion){
			case 1:
                echo( miJson( $justificacion->findByOrganization($user->OrgID) ) );
				return;
			case 2:
				echo( miJson( $justificacion->buscarID($datos->ID) ) );
				return;
            default:
                echo( miJson( $justificacion->buscarTodos() ) );
		}
	}

	public function processPOST($datos,$user){

		$justificacion = new Justificacion();
		$imagenJus = $datos->ImgJus;

		$nuevoJustificacion = new stdClass();
		$nuevoJustificacion->DesJus = $datos->DesJus;
		$nuevoJustificacion->EstReg = 'A';
		
		$res = $justificacion->insertarDato($nuevoJustificacion);

		if($imagenJus){
			$updateDatos = new stdClass();
			$imgPreName = $res['ID']."-jus".$imagenJus;
			$updateDatos->ImgJus = $imgPreName;
			$datoID = new stdClass();
			$datoID->IdJus = $res['ID'];
			$justificacion->actualizarDato($updateDatos,$datoID);
		}

	//	$res['ID'] = $datos->IdCur;
 

		echo( miJsonIns( $res) );

	}

	public function processPUT($datos,$user){

		$justificacion = new Justificacion();

		$imagenJus = $datos->dato->ImgJus;

		$updateJustificacion = new stdClass();
		$updateJustificacion->DesJus = $datos->dato->DesJus;
		
		
		$res = $justificacion->actualizarDato($updateJustificacion,$datos->IdJus);

		if($imagenJus){
			$updateDatos = new stdClass();
			$updateDatos->ImgJus = $imagenJus;
			$justificacion->actualizarDato($updateDatos,$datos->IdJus);
		}

	//	$res['ID'] = $datos->IdCur;
		echo( miJsonIns( $res) );
		
	}

	public function processDELETE($datos,$user){

		$justificacion = new Justificacion();
		echo( miJsonRes( $justificacion->eliminarDato($datos,$user) ) );
	}

}
	$servicio = new JustificacionService();
	$servicio->atenderSolicitud();

?>
