<?php

class Tema extends ModeloGenerico{

	function __construct(){

		parent::__construct("GZZ_TEMA");

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
	public function findByCurso($CurId){

		try{
			//consulta
			$sql = "SELECT * FROM " . $this->nombreTabla . " d WHERE d.\"fkIdCur\"=:1";

			$consulta = $this->coneccion->prepare($sql);
			$consulta->bindParam(':1', $CurId);
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
	public function findByOrganizationTema($orgID,$IdTem){

		try{
			//consulta
			$sql = "SELECT * FROM " . $this->nombreTabla . " d WHERE d.\"OrgID\"=:1 and d.\"IdTem\"=:2";

			$consulta = $this->coneccion->prepare($sql);
			$consulta->bindParam(':1', $orgID);
			$consulta->bindParam(':2', $IdTem);
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
	public function lastTema($orgID){
		//consulta
		$sql = "SELECT MAX(IdTem) as IdTem FROM " . $this->nombreTabla;

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
