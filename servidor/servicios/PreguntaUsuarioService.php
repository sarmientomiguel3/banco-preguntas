<?php

require "../modelo/modelo.inc.php";
require "../modelo/ModeloGenerico.php";

include  "FuncionJson.php";

require "GenericService.php";

class PreguntaUsuarioService extends GenericService{

	public function processGET($datos,$user){

		$pregunta = new PreguntaUsuario();

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
				echo( miJson( $pregunta->getPreguntasCurso($datos->IdCur)));
			return;
			case 6:
				echo( miJson( $pregunta->getPreguntasCurso2($datos->IdCur)));
			return;
			
            default:
                echo( miJson( $pregunta->getCursos() ) );
		}
	}
	public function processPOST($datos,$user){

		$pregunta = new PreguntaUsuario();
		//$res=$pregunta.insertarR1($datos);

		switch($datos->accion){
			case 1:
				echo($pregunta.insertarR1($datos));
				//echo( miJsonIns( $res ) );
				return;
			case 2:
			//	echo( miJson( $pregunta->getCursos() ) );
				return;	
            default:
                echo( miJson( $pregunta->getCursos() ) );
		}

	}
	public function processPUT($datos,$user){
		$pregunta = new PreguntaUsuario();
	//	$res=$pregunta.insertarR1($datos);

		switch($datos->accion){
			case 1:
				echo( miJsonIns( $pregunta->actualizarR1($datos) ) );
				//echo( miJsonIns( $res ) );
				return;
			case 2:
				echo( miJsonIns( $pregunta->actualizarR2($datos) ) );
				return;	
            default:
                echo( miJson( $pregunta->getCursos() ) );
		}
      
	}

}
	$servicio = new PreguntaUsuarioService();
	$servicio->atenderSolicitud();

?>
