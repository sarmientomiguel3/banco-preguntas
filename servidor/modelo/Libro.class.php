<?php

class Libro extends ModeloGenerico{

	function __construct(){

		parent::__construct("GZZ_LIBRO");

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
	public function findByOrganizationLibro($orgID,$IDLib){

		try{
			//consulta
			$sql = "SELECT * FROM " . $this->nombreTabla . " d WHERE d.\"OrgID\"=:1 and d.\"IDLib\"=:2";

			$consulta = $this->coneccion->prepare($sql);
			$consulta->bindParam(':1', $orgID);
			$consulta->bindParam(':2', $IDLib);
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
	public function lastLibro($orgID){
		//consulta
		$sql = "SELECT MAX(IDLib) as IDLib FROM " . $this->nombreTabla;

		$consulta = $this->coneccion->prepare($sql);
		//$consulta->bindParam(':1', $orgID);
		$consulta->execute();

		$resultado = $consulta->fetch(PDO::FETCH_ASSOC);

		if(!$resultado )
			return 0;

		return $resultado;
	}
}
?>
