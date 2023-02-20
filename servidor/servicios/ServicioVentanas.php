<?php
/* 
	Class ServicioVentana: Intermediario entre el backend y frontend
	Autor: Chapi Suyo Jesús
	Fecha: 15 - 10 - 2019
*/

require "../modelo/modelo.inc.php";
require "../modelo/ModeloGenerico.php";
/*
include  "../modelo/Ventana.class.php";
*/
include  "FuncionJson.php";	

require "GenericService.php";

class ServicioVentana extends GenericService{
	public function processGET($datos,$user){
		
		$ventana = new Ventana();
        switch($datos->accion){
			case 1:
                echo( miJson( $ventana->buscarTodosSinPadres() ) );
				return;
			case 2:                
				return;
            default:
                echo( miJson( $ventana->buscarTodos() ) );
		}
        
		
	}
	
	public function processPOST($datos,$user){
		
		$Ventana = new Ventana();
		echo( miJsonIns( $Ventana->insertarDato($datos) ) );
	
	}
	public function processPUT($datos,$user){
		
		$Ventana = new Ventana();
	
		echo( miJsonIns( $Ventana->actualizarDato($datos->dato,$datos->ID) ) );
	}
	public function processDELETE($datos,$user){
		
		$Ventana = new Ventana();
	
		echo( miJsonRes( $Ventana->eliminarDato($datos) ) );
	}
}
	$servicio = new ServicioVentana();
	$servicio->atenderSolicitud();

?>


