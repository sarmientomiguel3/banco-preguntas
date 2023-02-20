<?php

require "../modelo/modelo.inc.php";
require "../modelo/ModeloGenerico.php";

include  "FuncionJson.php";

require "GenericService.php";

class PreguntaService extends GenericService{
	public function processGET($datos,$user){

		$pregunta = new Pregunta();
        switch($datos->accion){
			case 1:
			echo( miJson( $pregunta->getLibros() ) );
				return;
			case 2:
			echo( miJson( $pregunta->getCursos() ) );
				return;
			case 3:
			echo( miJson( $pregunta->getAreaSug() ) );
				return;
			case 4:
			echo( miJson( $pregunta->getPreguntas() ) );
				return;
			case 5:
			echo( miJson( $pregunta->getPreguntasPaginado($datos->pagina,$datos->tamPagina) ) );
				return;
			case 6:
			echo( miJson( $pregunta->buscarID($datos->ID) ) );
				return;
			case 7:
			echo( miJson( $pregunta->buscarIDVista($datos->ID) ) );
				return;
            default:
                echo( miJson( $pregunta->getCursos() ) );
		}
	}

	public function processPOST($datos,$user){
		/**eliminadcion de fkIdTem u fkIdCur */
		$pregunta = new Pregunta();
		$imagenPre = $datos->ImgPre;

		$nuevoPregunta = new stdClass();
		$nuevoPregunta->TxtPre = $datos->TxtPre;
		$nuevoPregunta->fkIdTemEsp = $datos->fkIdTemEsp;
		$nuevoPregunta->fkIdAreSug = $datos->fkIdAreSug;
		$nuevoPregunta->fkIdDif = $datos->fkIdDif;
		$nuevoPregunta->fkIdJus = $datos->fkIdJus;
		$nuevoPregunta->EstReg = 'A';

		$resPregunta = $pregunta->insertarDato($nuevoPregunta);
		if($imagenPre){
			$updateDatos = new stdClass();
			$imgPreName = $resPregunta['ID'].'-pre'.$imagenPre;
			$updateDatos->ImgPre = $imgPreName;
			$datoID = new stdClass();
			$datoID->IdPre = $resPregunta['ID'];
			$pregunta->actualizarDato($updateDatos,$datoID);
		}

		$pregunta_usuario = new PreguntaUsuario();

		$nuevoPreguntaUsuario = new stdClass();
		$nuevoPreguntaUsuario->IdDoc = $user->UseId;
		$nuevoPreguntaUsuario->IdPre = $resPregunta['ID'];

		$pregunta_usuario->insertarDato($nuevoPreguntaUsuario);

		echo( miJsonIns( $resPregunta) );
	}

	public function processPUT($datos,$user){
		$pregunta = new Pregunta();

		$imagenPre = $datos->dato->ImgPre;

		$updatePregunta = new stdClass();

		$updatePregunta->TxtPre = $datos->dato->TxtPre;
		$updatePregunta->fkIdAreSug = intval($datos->dato->fkIdAreSug);
		$updatePregunta->fkIdDif = intval($datos->dato->fkIdDif);
		$updatePregunta->fkIdTemEsp = intval($datos->dato->fkIdTemEsp);
		
		$res = $pregunta->actualizarDato($updatePregunta,$datos->IdPre);

		if($imagenPre){
			$updateDatos = new stdClass();
			$updateDatos->ImgPre = $imagenPre;
			$pregunta->actualizarDato($updateDatos,$datos->IdPre);
		}

		echo( miJsonIns( $res) );
	}
	/*	solo en esta funcion para actualizar preguntas se hace un parseop primero se guarda la pregunta y luego se guardar las alternativas
		larespuesta al front envia un conjunto de datos con las claves las cuales seran prosesadas en el front	
	 */
	public function processPOST2($datos,$user){
		$pregunta = new Pregunta();
		
		$objPreguntaNuevo = new STDClass();
		$objPreguntaNuevo->TxtPre = $datos->TxtPre;
		$objPreguntaNuevo->EstReg = 'A';
		$objPreguntaNuevo->fkIdAreSug = intval($datos->areaSujerida);
		$objPreguntaNuevo->fkIdDif = intval($datos->dificultad);
		$objPreguntaNuevo->ImgPre = $datos->imagenPre;
		$objPreguntaNuevo->fkIdTemEsp = intval($datos->temaEspecifico);
		
		$res = $pregunta->insertarDato($objPreguntaNuevo);
		$NuevoIdPre = intval($res['ID']);
		$alterID = array();

		// $res['ID'] = $objPreguntaNuevo->IdPre;
		
		if(isset($datos->alternativa)){
			$alternativa = new Alternativa();
			foreach($datos->alternativa as $item){
				$objAlternativaNuevo = new STDClass();
				$objAlternativaNuevo->DesAlt = $item->descripcionPregunta;
				$objAlternativaNuevo->ImgAlt = $item->imagenPre;
				$objAlternativaNuevo->EstReg = 'A';
				$objAlternativaNuevo->fkIdPre = $NuevoIdPre;
				$resAlternativa = $alternativa->insertarDato($objAlternativaNuevo);
				$alterID[] = $resAlternativa['ID'];
			}
		}
		$res['alterID'] = $alterID;

		// echo( miJsonIns( $res) );
		echo( json_encode($res) );

	}
	public function processDELETE($datos,$user){

		$pregunta = new Pregunta();
		echo( miJsonRes( $pregunta->eliminarDato($datos,$user) ) );
	}

}
	$servicio = new PreguntaService();
	$servicio->atenderSolicitud();

?>
