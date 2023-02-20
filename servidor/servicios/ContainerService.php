<?php

require "../modelo/modelo.inc.php";
require "../modelo/ModeloGenerico.php";

include  "FuncionJson.php";	

require "GenericService.php";

class ContainerService extends GenericService{
	public function processGET($datos,$user){
		
		$container = new Container();
        switch($datos->accion){
			case 1:
                echo( miJson( $container->findByOrganization($user->OrgID,$datos->WebSitID) ) );
				return;
			case 2:                
				return;
            default:
                echo( miJson( $container->findByOrganization($user->OrgID,$datos->WebSitID) ) );
		}
        
		
	}
	
	public function processPOST($datos,$user){
		
		$container = new Container();
		
		$datos->CreDat = $user->Dat;
		$datos->CreByID = $user->UseId;
		$datos->UpdDat = $user->Dat;
		$datos->UpdByID = $user->UseId;
		$datos->RegSta = 'A';
		
		$datos->OrgID = $user->OrgID;
		
		$datos->ConID = $container->lastContainer($user->OrgID, $datos->WebSitID )['ConID'] + 1;
		
		
		$res = $container->insertarDato($datos);
		$res['ID'] = $datos->ConID;
		
		
		echo( miJsonIns( $res ) );
	
	}
	public function processPUT($datos,$user){
		
		$container = new Container();
		
		$datos->dato->UpdDat = $user->Dat;
		$datos->dato->UpdByID = $user->UseId;
	
		echo( miJsonRes( $container->actualizarDato($datos->dato,$datos->ID) ) );
	}
	public function processDELETE($datos,$user){
		
		$container = new Container();
	
		echo( miJsonRes( $container->delete($datos,$user) ) );
	}
}
	$servicio = new ContainerService();
	$servicio->atenderSolicitud();

?>


