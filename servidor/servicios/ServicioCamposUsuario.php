<?php

require "../modelo/modelo.inc.php";
require "../modelo/ModeloGenerico.php";

/*
include  "../modelo/Pais.class.php";
include  "../modelo/EstadoCivil.class.php";
include  "../modelo/Sexo.class.php";
*/
include  "FuncionJson.php";	

require "GenericService.php";

class ServicioCamposUsuario extends GenericService{
	public function processGET($datos){
		
		$sexo = new Sexo();
		$pais = new Pais();
		$estadoCivil = new EstadoCivil();
		
			
		$json = "";
		
		$json .= '{';
		$json .= '"paises":' . datosAJson( $pais->buscarTodos() ) ;
		$json .= ',';
		$json .= '"estadosCiviles":' . datosAJson( $estadoCivil->buscarTodos() ) ;		
		$json .= ',';
		$json .= '"sexos":' . datosAJson( $sexo->buscarTodos() );
		$json .= '}';
			
		
		echo( $json );
		
		//echo('{"data":'.json_encode($datos[Nom]).'}');
	}
}
	$servicio = new ServicioCamposUsuario();
	$servicio->atenderSolicitud();


?>


