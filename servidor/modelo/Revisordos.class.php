<?php

class Revisordos extends ModeloGenerico{

	function __construct(){

		parent::__construct("pregunta_usuario");

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

	
	public function getPreguntasByUserAsignado($user){

		try{
			//consultaSELECT `IdCur`, `NomCur` FROM `gzz_curso` WHERE `EstReg`='A'
			$sql = "SELECT \"IdPreUsu\", mu.\"NomUsu\" , mp.\"Nom\" ||' '||mp.\"PriApe\"||' '||mp.\"SegApe\" as \"Nombres\" , \"IdPre\", \"EstRev1\", \"EstRev2\", \"Obs\" from pregunta_usuario as pu
					left join ma_user as mu on mu.\"UseId\" = pu.\"IdDoc\"
					left join ma_persona as mp on mu.\"fkIdPer\" = mp.\"PerID\"
					where \"IdRev2\" = :1 and \"EstRev1\"='Aceptada' and \"EstRev2\"!='Aceptada' order by \"IdPre\"
			";
			$consulta = $this->coneccion->prepare($sql);
			$consulta->bindParam(':1', $user->UseId);
			$consulta->execute();
			$resultado = $consulta->fetchAll(PDO::FETCH_ASSOC);
			if(!$resultado )
				return 0;
			return $resultado;

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

	public function getPreguntas(){

		try{
			//consultaSELECT `IdCur`, `NomCur` FROM `gzz_curso` WHERE `EstReg`='A'
			$sql = "SELECT IdPre, TxtPre as enunciado, IdCur as curso, IdAreSug as areasug FROM  g2_pregunta WHERE EstReg='A'";

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
