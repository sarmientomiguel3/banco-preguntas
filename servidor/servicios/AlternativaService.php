<?php

require "../modelo/modelo.inc.php";
require "../modelo/ModeloGenerico.php";

include  "FuncionJson.php";

require "GenericService.php";

class AlternativaService extends GenericService{
	public function processGET($datos,$user){

		$alternativa = new Alternativa();
        switch($datos->accion){
			case 1:
                echo( miJson( $alternativa->findByOrganization($user->OrgID) ) );
				return;
			case 2:
				echo( miJson( $alternativa->buscarPorPregunta($datos->ID) ) );
				return;
            default:
                echo( miJson( $alternativa->buscarTodos() ) );
		}
	}

	public function processPOST($datos,$user){

		$alternativa = new Alternativa();
		$imagenAlt = $datos->ImgAlt;

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
		$res = $alternativa->insertarDato($datos);
		if($imagenAlt){
			$updateDatos = new stdClass();
			$imgAltName = $datos->fkIdPre.'-'.$res['ID'].'-alt'.$imagenAlt;
			$updateDatos->ImgAlt = $imgAltName;
			$datoID = new stdClass();
			$datoID->IdAlt = $res['ID'];
			$alternativa->actualizarDato($updateDatos,$datoID);
		}
	//	$res['ID'] = $datos->IdCur;
 

		echo( miJsonIns( $res) );

	}

	public function processPUT($datos,$user){

		$alternativa = new Alternativa();

		$imagenAlt = $datos->dato->ImgAlt;

		$updateAlternativa = new stdClass();
		$updateAlternativa->DesAlt = $datos->dato->DesAlt;
		
		$res = $alternativa->actualizarDato($updateAlternativa,$datos->IdAlt);

		if($imagenAlt){
			$updateDatos = new stdClass();
			$updateDatos->ImgAlt = $imagenAlt;
			$alternativa->actualizarDato($updateDatos,$datos->IdAlt);
		}

	//	$res['ID'] = $datos->IdCur;
		echo( miJsonIns( $res) );
	}

	public function processDELETE($datos,$user){

		$alternativa = new Alternativa();
		echo( miJsonRes( $alternativa->eliminarDato($datos,$user) ) );
	}

}
	$servicio = new AlternativaService();
	$servicio->atenderSolicitud();

?>
