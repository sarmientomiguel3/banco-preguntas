<?php

require "../modelo/modelo.inc.php";
require "../modelo/ModeloGenerico.php";
/*
include  "../modelo/Unidad.class.php";
include  "../modelo/Moneda.class.php";
include  "../modelo/Categoria.class.php";
*/
include  "FuncionJson.php";	

require "GenericService.php";

class ServicioMedidas extends GenericService{
	public function processGET($datos){
		
		$unidad = new Unidad();
		$moneda = new Moneda();
		$categoria = new Categoria();
		
			
		$json = "";
		
		$json .= '{';
		$json .= '"unidades":' . datosAJson( $unidad->buscarTodos() ) ;		
		$json .= ',';
		$json .= '"monedas":' . datosAJson( $moneda->buscarTodos() );
		$json .= ',';
		$json .= '"categorias":' . datosAJson( $categoria->buscarTodos() );
		$json .= '}';
			
		
		echo( $json );
		
		//echo('{"data":'.json_encode($datos[Nom]).'}');
	}
}
	$servicio = new ServicioMedidas();
	$servicio->atenderSolicitud();


?>


