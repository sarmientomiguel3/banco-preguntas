<?php

require "../modelo/modelo.inc.php";
require "../modelo/ModeloGenerico.php";
/*
include  "../modelo/Rol.class.php";
include  "../modelo/UsuarioVentana.class.php";
*/
include  "FuncionJson.php";	

require "GenericService.php";

class ServicioRol extends GenericService{
	public function processGET($datos,$user){
		
		$rol = new Rol();
		switch($datos->accion){
			case 1:		
				echo( miJson( $rol->buscarTodos() ) );		
				break;
			case 2:				
				echo( miJson( $rol->buscarTrabajadores() ) );			
				break;
			
		}
	}
	
	public function processPOST($datos,$user){
		
		$rol = new Rol();
		
		$res = $rol->insertarDato($datos->rol);
		
		$rolID = $res['ID'];
		$ventana = new UsuarioVentana();
		foreach($datos->ventanas as $v){
			
			$objVentana = (object)array("RolID" => $rolID ,"VenID" => $v->VenID, "Per"=> "T");
			$ventana->insertarDato($objVentana);
		}
		
		echo( miJsonIns( $res ) );
	
	}
	public function processPUT($datos,$user){
		
		$rol = new Rol();
	
		//echo( $rol->actualizarDato($datos->dato,$datos->ID) );
		if( count($datos->ventanas ) > 0 ){
			//eliminado todos las funciones del rol
			$rol->eliminarVentanas($datos->ID->RolID);
			
			//creando los nuevos funciones de rol
			$ventana = new UsuarioVentana();
			foreach($datos->ventanas as $i => $val){
				$objVentana = (object)array("RolID" => $datos->ID->RolID ,"VenID" => $val,"NumOrd" => $i+1, "Per"=> "T");
				$ventana->insertarDato($objVentana);
			}
		}		
		echo( miJsonIns( $rol->actualizarDato($datos->dato,$datos->ID) ) );
		
	}
	public function processDELETE($datos,$user){
		
		$rol = new Rol();
		
		//eliminado todos las funciones del rol
		$rol->eliminarVentanas($datos->RolID);
		
		echo( miJsonRes( $rol->eliminarDato($datos) ) );
	}
}
	$servicio = new ServicioRol();
	$servicio->atenderSolicitud();

?>


