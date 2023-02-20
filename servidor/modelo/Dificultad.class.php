<?php

class Dificultad extends ModeloGenerico{

	function __construct(){

		parent::__construct("GZZ_DIFICULTAD");

	}
	public function findByOrganization($orgID){

		try{
			//consulta
			$sql = "SELECT * FROM " . $this->nombreTabla . " d WHERE d.\"OrgID\"=:1";

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
	public function findByOrganizationDificultad($orgID,$IdDif){

		try{
			//consulta
			$sql = "SELECT * FROM " . $this->nombreTabla . " d WHERE d.\"OrgID\"=:1 and d.\"IdDif\"=:2";

			$consulta = $this->coneccion->prepare($sql);
			$consulta->bindParam(':1', $orgID);
			$consulta->bindParam(':2', $IdDif);
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
	public function lastDificultad($orgID){
		//consulta
		$sql = "SELECT MAX(\"IdDif\") as \"IdDif\" FROM " . $this->nombreTabla;

		$consulta = $this->coneccion->prepare($sql);
	//	$consulta->bindParam(':1', $orgID);
		$consulta->execute();

		$resultado = $consulta->fetch(PDO::FETCH_ASSOC);

		if(!$resultado )
			return 0;

		return $resultado;
	}
}
?>
