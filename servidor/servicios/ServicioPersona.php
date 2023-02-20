<?php

require "../modelo/modelo.inc.php";
require "../modelo/ModeloGenerico.php";
/*
include  "../modelo/Persona.class.php";
*/
include  "FuncionJson.php";	

require "GenericService.php";

class ServicioPersona extends GenericService{
	public function processGET($datos,$user){
        echo print_r($datos, 1);
        switch($datos->accion){
		 	case 1:
				
		 		break;
             default:
                 $persona = new Persona();
                 echo( miJson( $persona->buscarTodos() ) );
		 }
		
	}
	public function processPOST($datos,$user){
		$persona = new Persona();
        // date_default_timezone_set('America/Lima');
        // $datos->FecNac = "".date('Y-m-d', strtotime(urldecode($datos->FecNac)));
        // $datos->FecCre = "".date("Y-m-d H:i:s");
		// echo( miJsonIns(  ) );
		$datosPersona = $datos->persona;

		$nuevaPersona = new stdClass();
		$nuevaPersona->dni = $datosPersona->dni;
		$nuevaPersona->RUC = null;
		$nuevaPersona->Nom = $datosPersona->Nom;
		$nuevaPersona->PriApe = $datosPersona->PriApe;
		$nuevaPersona->SegApe = $datosPersona->SegApe;
		$nuevaPersona->FecNac = $datosPersona->FecNac;
		$nuevaPersona->CiuPro = $datosPersona->CiuPro;
		$nuevaPersona->DirAct = $datosPersona->DirAct;
		$nuevaPersona->Ema = $datosPersona->Ema;
		$nuevaPersona->Tel = $datosPersona->Tel;
		$nuevaPersona->Img = $datosPersona->Img;
		$nuevaPersona->FecCre = new DateTime();
		$nuevaPersona->EstReg = 'A';
		$nuevaPersona->SexId = $datosPersona->SexId;
		$nuevaPersona->PaiID = intval($datosPersona->PaiID);
		$nuevaPersona->Id_ubigeo = null;


		$resPersona = $persona->insertar($datosPersona);

		$datosUsuario = $datos->usuario;

		$usuario = new Usuario();

		$nuevoUsuario = new stdClass();

		$nuevoUsuario->NomUsu = $datosUsuario->NomUsu;
		$nuevoUsuario->Pas = $datosUsuario->pasNuevo;
		$nuevoUsuario->EstReg = 'A';
		$nuevoUsuario->fkIdRol = $datosUsuario->IdRol;
		$nuevoUsuario->fkIdSuc = 1;
		$nuevoUsuario->fkIdPer = intval($resPersona['ID']);

		$resUsuario = $usuario->insertar($nuevoUsuario);

		echo miJsonIns($nuevaPersona);
	}
	public function processPUT($datos,$user){
        $persona = new Persona();
        date_default_timezone_set('America/Lima');
        $datos->dato->FecNac = "".date('Y-m-d', strtotime(urldecode($datos->dato->FecNac)));
        echo( miJsonRes( $persona->actualizarDato($datos->dato,$datos->ID) ) );
	}
	public function processDELETE($datos,$user){
		
		$persona = new Persona();
		
		echo( miJsonRes( $persona->eliminarDato($datos) ) );
	}
}
	$servicio = new ServicioPersona();
	$servicio->atenderSolicitud();

?>


