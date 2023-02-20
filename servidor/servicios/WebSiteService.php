<?php

require "../modelo/modelo.inc.php";
require "../modelo/ModeloGenerico.php";

include  "FuncionJson.php";	

require "GenericService.php";

class WebSiteService extends GenericService{
	public function processGET($datos,$user){
		
		$web = new WebSite();
        switch($datos->accion){
			case 1:
                echo( miJson( $web->findByOrganization($user->OrgID) ) );
				return;
			case 2:                
				return;
            default:
                echo( miJson( $web->buscarTodos() ) );
		}
        
		
	}
	
	public function processPOST($datos,$user){
		
		$web = new WebSite();
		
		$datos->CreDat = $user->Dat;
		$datos->CreByID = $user->UseId;
		$datos->UpdDat = $user->Dat;
		$datos->UpdByID = $user->UseId;
		$datos->RegSta = 'A';
		
		$datos->OrgID = $user->OrgID;
		
		$datos->WebSitID = $web->lastWebSite($user->OrgID)['WebSitID'] + 1;
		
		$res = $web->insertarDato($datos);
		$res['ID'] = $datos->WebSitID;
		
		
		echo( miJsonIns( $res) );
	
	}
	public function processPUT($datos,$user){
		
		$web = new WebSite();
		
		$datos->dato->UpdDat = $user->Dat;
		$datos->dato->UpdByID = $user->UseId;
	
		echo( miJsonRes( $web->actualizarDato($datos->dato,$datos->ID) ) );
	}
	public function processDELETE($datos,$user){
		
		$web = new WebSite();
	
		echo( miJsonRes( $web->delete($datos,$user) ) );
	}
}
	$servicio = new WebSiteService();
	$servicio->atenderSolicitud();

?>


