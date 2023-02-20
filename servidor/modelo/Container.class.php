<?php

class Container extends ModeloGenerico{
		
	function __construct(){
		
		parent::__construct("WS_CONTAINER");
		
	}
	public function findByOrganization($orgID,$webSitID){
		
		try{
			//consulta
			$sql = "SELECT * FROM " . $this->nombreTabla . " c WHERE c.\"OrgID\"=:1 AND c.\"WebSitID\"=:2";
		
			$consulta = $this->coneccion->prepare($sql);
			$consulta->bindParam(':1', $orgID);
			$consulta->bindParam(':2', $webSitID);
			$consulta->execute();
			
			$resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);			
			
			if(!$resultados){
				return $resultados;//"no hay datos ";
			}			
			return $resultados;
		}
		catch (Exception $e){
			return "error en la consulta : ".pg_last_error();
		}
	}
	public function lastContainer($orgID,$webSitID){
		//consulta
		//$sql = "SELECT MAX(ConID) as ConID FROM " . $this->nombreTabla ." WHERE OrgID=:1 AND WebSitID=:2";
		$sql = "SELECT MAX(ConID) as ConID FROM " . $this->nombreTabla ." ";
	
		$consulta = $this->coneccion->prepare($sql);
		//$consulta->bindParam(':1', $orgID);
		//$consulta->bindParam(':2', $webSitID);
		$consulta->execute();
		
		$resultado = $consulta->fetch(PDO::FETCH_ASSOC);
		
		if(!$resultado )
			return 0;
		
		return $resultado;
	}
}
?>