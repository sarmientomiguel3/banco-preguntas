<?php

class Pregunta extends ModeloGenerico{

	function __construct(){

		parent::__construct("G2_PREGUNTA");

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
	public function findByOrganizationPregunta($orgID,$IdPre){

		try{
			//consulta
			$sql = "SELECT * FROM " . $this->nombreTabla . " w WHERE w.\"OrgID\"=:1 and w.\"IdPre\"=:2";

			$consulta = $this->coneccion->prepare($sql);
			$consulta->bindParam(':1', $orgID);
			$consulta->bindParam(':2', $IdPre);
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
	public function lastPregunta($orgID){
		//consulta
		$sql = "SELECT MAX(IdPre) as IdPre FROM " . $this->nombreTabla;

		$consulta = $this->coneccion->prepare($sql);
		//$consulta->bindParam(':1', $orgID);
		$consulta->execute();

		$resultado = $consulta->fetch(PDO::FETCH_ASSOC);

		if(!$resultado )
			return 0;

		return $resultado;
	}


	public function getCursos(){

		try{
			//consultaSELECT `IdCur`, `NomCur` FROM `gzz_curso` WHERE `EstReg`='A'
			$sql = "SELECT IdCur, NomCur FROM  gzz_curso WHERE EstReg='A'";

			$resultados = $this->coneccion->query($sql,PDO::FETCH_ASSOC);

			if(!$resultados){
				return "no hay datos";
			}
			return $resultados;

		}catch (Exception $e){
			return "error en la consulta : ".pg_last_error();
		}
	}

	
	public function getLibros(){

		try{
			//consultaSELECT `IdCur`, `NomCur` FROM `gzz_curso` WHERE `EstReg`='A'
			$sql = "SELECT IDLib, NomLib FROM  gzz_libro WHERE EstReg='A'";

			$resultados = $this->coneccion->query($sql,PDO::FETCH_ASSOC);

			if(!$resultados){
				return "no hay datos";
			}
			return $resultados;

		}catch (Exception $e){
			return "error en la consulta : ".pg_last_error();
		}
	}

	public function getAreaSug(){

		try{
			//consultaSELECT `IdCur`, `NomCur` FROM `gzz_curso` WHERE `EstReg`='A'
			$sql = "SELECT IdAreSug, DesAreSug FROM  gzz_area_sugerida WHERE EstReg='A'";

			$resultados = $this->coneccion->query($sql,PDO::FETCH_ASSOC);

			if(!$resultados){
				return "no hay datos";
			}
			return $resultados;

		}catch (Exception $e){
			return "error en la consulta : ".pg_last_error();
		}
	}

	public function buscarID($ID){
		
		
		try{
			//consulta
			// $sql = "SELECT * FROM " . $this->nombreTabla . " w WHERE w.\"OrgID\"=:1 and w.\"IdPre\"=:2";
			$sql = "SELECT \"IdPre\", \"TxtPre\", gp.\"EstReg\", \"fkIdAreSug\", \"fkIdDif\", \"ImgPre\", \"fkIdTemEsp\", \"fkIdTem\", \"fkIdCur\",\"fkIdJus\"
			FROM g2_pregunta as gp
			left join gzz_tema_especifico as gte on gp.\"fkIdTemEsp\" = gte.\"IdTemEsp\"
			left join gzz_tema as gt on gte.\"fkIdTem\" = gt.\"IdTem\" WHERE \"IdPre\"= :1";
			// $sql = "SELECT * FROM $this->nombreTabla WHERE \"IdPre\"= :1 ";

			$consulta = $this->coneccion->prepare($sql);
			$consulta->bindParam(':1', $ID);
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
	public function buscarIDVista($ID){
		
		
		try{
			//consulta
			// $sql = "SELECT * FROM " . $this->nombreTabla . " w WHERE w.\"OrgID\"=:1 and w.\"IdPre\"=:2";
			$sql = "SELECT \"IdPre\", \"TxtPre\", gp.\"EstReg\", \"DesAreSug\", \"DesDif\", \"ImgPre\", \"DesTemEsp\", \"DesTem\", \"NomCur\",\"fkIdJus\"
			FROM g2_pregunta as gp
			left join gzz_tema_especifico as gte on gp.\"fkIdTemEsp\" = gte.\"IdTemEsp\"
			left join gzz_tema as gt on gte.\"fkIdTem\" = gt.\"IdTem\" 
			left join gzz_curso as gc on gc.\"IdCur\" = gt.\"fkIdCur\" 
			left join gzz_area_sugerida as gas on gas.\"IdAreSug\" = gp.\"fkIdAreSug\"
			left join gzz_dificultad as gd on gd.\"IdDif\" = gp.\"fkIdDif\"
			WHERE \"IdPre\"=:1";
			
			// $sql = "SELECT * FROM $this->nombreTabla WHERE \"IdPre\"= :1 ";

			$consulta = $this->coneccion->prepare($sql);
			$consulta->bindParam(':1', $ID);
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
	
	public function getPreguntas(){

		try{
			//consultaSELECT `IDCur`, `NomCur` FROM `gzz_curso` WHERE `EstReg`='A'
			// $sql = "SELECT \"IdPre\", \"TxtPre\", \"EstReg\", \"fkIdAreSug\", \"fkIdDif\", \"ImgPre\", \"fkIdTemEsp\" FROM $this->nombreTabla WHERE \"EstReg\"='A' order by \"IdPre\"";
			// $sql = "SELECT \"IdPre\", \"TxtPre\", \"EstReg\", \"fkIdAreSug\", \"fkIdDif\", \"ImgPre\", \"fkIdTemEsp\" FROM $this->nombreTabla WHERE \"EstReg\"='A' order by \"IdPre\"";
			$sql = "
			SELECT \"IdPre\", \"TxtPre\" , GAS.\"DesAreSug\", GD.\"DesDif\", \"ImgPre\", GTE.\"DesTemEsp\" , GT.\"DesTem\" , GC.\"NomCur\" 
			FROM $this->nombreTabla as GP
			left join gzz_tema_especifico as GTE on GP.\"fkIdTemEsp\" = GTE.\"IdTemEsp\"
			left join gzz_tema as GT on GT.\"IdTem\" = GTE.\"fkIdTem\"
			left join gzz_curso as GC on GC.\"IdCur\" = GT.\"fkIdCur\"
			left join gzz_area_sugerida as GAS on GAS.\"IdAreSug\" = GP.\"fkIdAreSug\"
			left join gzz_dificultad as GD on GD.\"IdDif\" = GP.\"fkIdDif\"
			WHERE GP.\"EstReg\"='A' order by \"IdPre\" DESC limit 20
			";

			$resultados = $this->coneccion->query($sql,PDO::FETCH_ASSOC);

			if(!$resultados){
				return "no hay datos";
			}
			return $resultados;

		}catch (Exception $e){
			return "error en la consulta : ".pg_last_error();
		}
	}
	public function getPreguntasPaginado($pagina,$tamPagina){

		try{
			//consultaSELECT `IDCur`, `NomCur` FROM `gzz_curso` WHERE `EstReg`='A'
			// $sql = "SELECT \"IdPre\", \"TxtPre\", \"EstReg\", \"fkIdAreSug\", \"fkIdDif\", \"ImgPre\", \"fkIdTemEsp\" FROM $this->nombreTabla WHERE \"EstReg\"='A' order by \"IdPre\"";
			// $sql = "SELECT \"IdPre\", \"TxtPre\", \"EstReg\", \"fkIdAreSug\", \"fkIdDif\", \"ImgPre\", \"fkIdTemEsp\" FROM $this->nombreTabla WHERE \"EstReg\"='A' order by \"IdPre\"";
			$sql = "
			SELECT \"IdPre\", \"TxtPre\" , GAS.\"DesAreSug\", GD.\"DesDif\", \"ImgPre\", GTE.\"DesTemEsp\" , GT.\"DesTem\" , GC.\"NomCur\" 
			FROM $this->nombreTabla as GP
			left join gzz_tema_especifico as GTE on GP.\"fkIdTemEsp\" = GTE.\"IdTemEsp\"
			left join gzz_tema as GT on GT.\"IdTem\" = GTE.\"fkIdTem\"
			left join gzz_curso as GC on GC.\"IdCur\" = GT.\"fkIdCur\"
			left join gzz_area_sugerida as GAS on GAS.\"IdAreSug\" = GP.\"fkIdAreSug\"
			left join gzz_dificultad as GD on GD.\"IdDif\" = GP.\"fkIdDif\"
			WHERE GP.\"EstReg\"='A' order by \"IdPre\" DESC limit :1  OFFSET :2
			";

			$consulta = $this->coneccion->prepare($sql);
			$consulta->bindParam(':1', $pagina);
			$consulta->bindParam(':2', $tamPagina);
			$resultados = $this->coneccion->query($sql,PDO::FETCH_ASSOC);

			if(!$resultados){
				return "no hay datos";
			}
			return $resultados;

		}catch (Exception $e){
			return "error en la consulta : ".pg_last_error();
		}
	}
}
?>
