<?php

class WebSite extends ModeloGenerico{
		
	function __construct(){
		
		parent::__construct("WS_WEBSITE");
		
	}
	public function findByOrganization($orgID){
		
		try{
			//consulta
			$sql = "SELECT * FROM " . $this->nombreTabla . " w WHERE w.\"OrgID\"=:1";
		
			$consulta = $this->coneccion->prepare($sql);
			$consulta->bindParam(':1', $orgID);
			$consulta->execute();
			
			$resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);
			
			if(!$resultados){
				return "no hay datos";
			}			
			return $resultados;
		
		}
		catch (Exception $e){
			return "error en la consulta : ".pg_last_error();
		}
	}
	public function findByOrganizationWeb($orgID,$webSitID){
		
		try{
			//consulta
			$sql = "SELECT * FROM " . $this->nombreTabla . " w WHERE w.\"OrgID\"=:1 and w.\"WebSitID\"=:2";
		
			$consulta = $this->coneccion->prepare($sql);
			$consulta->bindParam(':1', $orgID);
			$consulta->bindParam(':2', $webSitID);
			$consulta->execute();
			
			$resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);
			
			if(!$resultados){
				return "no hay datos";
			}			
			return $resultados;
		
		}
		catch (Exception $e){
			return "error en la consulta : ".pg_last_error();
		}
	}
	public function lastWebSite($orgID){
		//consulta
		$sql = "SELECT MAX(WebSitID) as WebSitID FROM " . $this->nombreTabla ." WHERE OrgID=:1";
	
		$consulta = $this->coneccion->prepare($sql);
		$consulta->bindParam(':1', $orgID);
		$consulta->execute();
		
		$resultado = $consulta->fetch(PDO::FETCH_ASSOC);
		
		if(!$resultado )
			return 0;
		
		return $resultado;
	}
}
?>