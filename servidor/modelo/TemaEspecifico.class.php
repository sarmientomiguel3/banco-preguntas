<?php

class TemaEspecifico extends ModeloGenerico{

	function __construct(){

		parent::__construct("GZZ_TEMA_ESPECIFICO");

	}
	public function findByOrganization($IdSuc){

		try{
			//consulta
			$sql = "SELECT * FROM " . $this->nombreTabla . " d WHERE d.\"IdSuc\"=:1";

			$consulta = $this->coneccion->prepare($sql);
			$consulta->bindParam(':1', $IdSuc);
			$consulta->execute();

			$resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);

			if(!$resultados){
				return "no hay datos";
			}
			return $resultados;

		}
		catch (Exception $e){
			return "error en la consulta : ".mysql_error();
		}
	}
	public function findByTema($IdTema){

		try{
			//consulta
			$sql = "SELECT * FROM " . $this->nombreTabla . " d WHERE d.\"fkIdTem\"=:1";

			$consulta = $this->coneccion->prepare($sql);
			$consulta->bindParam(':1', $IdTema);
			$consulta->execute();

			$resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);

			if(!$resultados){
				return "no hay datos";
			}
			return $resultados;

		}
		catch (Exception $e){
			return "error en la consulta : ".mysql_error();
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
			//return "error en la consulta : ".mysql_error();
			return "error en la consulta : ";
		}
	}
	public function buscarTodosTemaCurso(){
		try{
			//consulta
			$sql = "select \"IdTemEsp\",\"DesTemEsp\",GTM.\"EstReg\",\"fkIdTem\",\"fkIdCur\" from GZZ_TEMA_ESPECIFICO as GTM
				left join GZZ_TEMA as GT on GTM.\"fkIdTem\" = GT.\"IdTem\" order by \"IdTemEsp\" ";

			$consulta = $this->coneccion->prepare($sql);
			$consulta->execute();

			$resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);

			if(!$resultados){
				return "no hay datos";
			}
			return $resultados;

		}
		catch (Exception $e){
			return "error en la consulta : ".mysql_error();
		}
	}
}
?>
