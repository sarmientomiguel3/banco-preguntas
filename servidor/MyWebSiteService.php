<?php

require "bd/coneccionBD.php";
require "modelo/ModeloGenerico.php";
include "modelo/WebSite.class.php";
include "modelo/Container.class.php";
include "modelo/Dificultad.class.php";
include "modelo/Libro.class.php";
include "modelo/Curso.class.php";
include "modelo/Area.class.php";
include "modelo/Tema.class.php";
include "modelo/Pregunta.class.php";
include "modelo/Estadisticas.class.php";
include "modelo/Revisor.class.php";
include "modelo/Revisordos.class.php";


	function processGET($user){

		$web = new WebSite();
		$con = new Container();
		$dificultad = new Dificultad();
		$libro = new Libro();
		$curso = new Curso();
		$area = new Area();
		$tema = new Tema();
		$pregunta = new Pregunta();
		$estadisticas = new Estadisticas();
		$revisor = new Revisor();
		$revisordos = new Revisordos();
		
    switch($user->accion){
			case 1:
				return;
			case 2:
				return;
            default:


			$json = "{";
			$json .= "\"web\":" . json_encode($web->findByOrganizationWeb($user->org,$user->web));
			$json .= ',';
			$json .= "\"sections\":" . json_encode($con->findByOrganization($user->org,$user->web));
			$json .= ",";
			$json .= "\"dificultad\":" . json_encode($dificultad->findByOrganization($user->org,$user->dificultad));
			$json .= ',';
			$json .= "\"libro\":" . json_encode($libro->findByOrganization($user->org,$user->libro));
			$json .= ",";
			$json .= "\"curso\":" . json_encode($curso->findByOrganization($user->org,$user->curso));
			$json .= ",";
			$json .= "\"area\":" . json_encode($area->findByOrganization($user->org,$user->area));
			$json .= ",";
			$json .= "\"tema\":" . json_encode($tema->findByOrganization($user->org,$user->tema));
			$json .= ",";
			$json .= "\"pregunta\":" . json_encode($pregunta->findByOrganization($user->org,$user->pregunta));
			$json .= ",";
			$json .= "\"estadisticas\":" . json_encode($estadisticas->findByOrganization($user->org,$user->estadisticas));
			$json .= "}";
			$json .= "\"revisor\":" . json_encode($revisor->findByOrganization($user->org,$user->revisor));
			$json .= "}";
			$json .= "\"revisordos\":" . json_encode($revisordos->findByOrganization($user->org,$user->revisordos));
			$json .= "}";

			echo( $json );
		}

	}

	function atenderSolicitud(){

		//recibiendo el tipo de metodo
		$metodo = $_SERVER['REQUEST_METHOD'];


		// Dependiendo del método de la petición ejecutaremos la acción correspondiente.
		switch ($metodo) {
			// Lectura
			// código para método GET
			case 'GET':
				$user = (object)$_GET;
				processGET($user);
				break;
			//case 'POST':

			default:
				echo('{"data":"ERROR"}');
				break;
		}
	}
	atenderSolicitud();

?>
