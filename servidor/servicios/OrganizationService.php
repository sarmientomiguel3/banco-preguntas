<?php

require "../modelo/modelo.inc.php";
require "../modelo/ModeloGenerico.php";

include  "FuncionJson.php";	

require "GenericService.php";

class ServicioOrganization extends GenericService{
	public function processGET($datos,$user){
		
		$organization = new Organization();
        
        switch($datos->accion){
			case 1:
                echo( json_encode( $organization->findOrganization() ) );
                return;
            default:
                echo( miJson( $organization->buscarTodos() ) );
        }
		
	}
	public function processPOST($datos,$user){
		
		$organization = new Organization();
        $datos->CreDat = $user->Dat;
		$datos->CreBy = $user->UseId;
        $datos->EstReg = 'A';
        echo( miJsonIns( $organization->insertarDato($datos) ) );
	
		
	}
	public function processPUT($datos,$user){
		
		$organization = new Organization();
		
		//FALTA
		if($datos->ID){
			$datos->dato->UpdDat = $user->Dat;
			$datos->dato->UpdByID = $user->UseId;
			echo( miJsonRes( $organization->actualizarDato($datos->dato,$datos->ID) ) );
		}
		else{
			$datos->dato->OrgID = 1;
			$datos->dato->CreDat = $user->Dat;
			$datos->dato->CreByID = $user->UseId;
			$datos->dato->UpdDat = $user->Dat;
			$datos->dato->UpdByID = $user->UseId;
			$datos->dato->RegSta = 'A';
			echo( miJsonIns( $organization->insertarDato($datos->dato) ) );
		}
        
        
		
        
	}
	public function processDELETE($datos,$user){
		
		$organization = new Organization();
		echo( miJsonRes( $organization->eliminarDato($datos) ) );
	}
}
	$servicio = new ServicioOrganization();
	$servicio->atenderSolicitud();

?>


