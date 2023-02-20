<?php

class Organization extends ModeloGenerico{
		
	function __construct(){
		
		parent::__construct("MA_ORGANIZATION");
		
	}
	public function findOrganization(){
		//consulta
		$sql = "SELECT * FROM " . $this->nombreTabla . " WHERE RegSta = 'A'";
	
		$consulta = $this->coneccion->prepare($sql);
		$consulta->execute();
		
		//$resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);
		$resultado = $consulta->fetch(PDO::FETCH_ASSOC);
		//$resultado = $consulta->fetch(PDO::FETCH_LAZY);
		
		
		if(!$resultado )
			return array("estado" => false, "mensaje"=> "ERROR no se pudo econtrar la organizacion");
		
		return array("estado" => true,"resultado" => $resultado, "mensaje"=> "se econtro la organizacion");
		
	}
}
?>