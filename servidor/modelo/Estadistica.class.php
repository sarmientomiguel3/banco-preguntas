<?php

class Estadistica extends ModeloGenerico{

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
	public function findByOrganizationEstadisticas($orgID,$IdPre){

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
	public function lastEstadisticas($orgID){
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

	public function getPreguntas_Usuario(){

		try{
			//consultaSELECT `IdCur`, `NomCur` FROM `gzz_curso` WHERE `EstReg`='A'
			//SELECT * FROM public.pregunta_usuario
			/*
			$sql = "SELECT \"IdPreUsu\", mu.\"NomUsu\" , mp.\"Nom\" ||' '||mp.\"PriApe\"||' '||mp.\"SegApe\" as \"Nombres\" , \"IdPre\", \"EstRev1\", \"EstRev2\", \"Obs\" from pregunta_usuario as pu 
				left join ma_user as mu on mu.\"UseId\" = pu.\"IdDoc\" 	
				left join ma_persona as mp on mu.\"fkIdPer\" = mp.\"PerID\"
				order by \"IdPre\" 
			";
				*/
			$sql = "SELECT \"IdPreUsu\", mu.\"NomUsu\" , mp.\"Nom\" ||' '||mp.\"PriApe\"||' '||mp.\"SegApe\" as \"Nombres\" , \"IdPre\", \"EstRev1\", \"EstRev2\", \"Obs\" from pregunta_usuario as pu 
				left join ma_user as mu on mu.\"UseId\" = pu.\"IdDoc\" 	
				left join ma_persona as mp on mu.\"fkIdPer\" = mp.\"PerID\"
				order by \"IdPre\" 
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
	public function getPreguntas_Usuario_Aceptadas(){

		try{
			//consultaSELECT `IdCur`, `NomCur` FROM `gzz_curso` WHERE `EstReg`='A' \"EstReg\"='A'
			//SELECT * FROM public.pregunta_usuario
			//$sql = "SELECT * FROM pregunta_usuario  WHERE \"EstRev1\" = 'Aceptada'";
			$sql = "SELECT \"IdPreUsu\", mu.\"NomUsu\" , mp.\"Nom\" ||' '||mp.\"PriApe\"||' '||mp.\"SegApe\" as \"Nombres\" , \"IdPre\", \"EstRev1\", \"EstRev2\", \"Obs\" from pregunta_usuario as pu 
				left join ma_user as mu on mu.\"UseId\" = pu.\"IdDoc\" 	
				left join ma_persona as mp on mu.\"fkIdPer\" = mp.\"PerID\"
				WHERE \"EstRev1\" = 'Aceptada'
				order by \"IdPre\" 
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
	public function getPreguntas_Usuario_Rechazadas(){

		try{
			//consultaSELECT `IdCur`, `NomCur` FROM `gzz_curso` WHERE `EstReg`='A' \"EstReg\"='A'
			//SELECT * FROM public.pregunta_usuario getPreguntas_Usuario_Rechazadas
			//$sql = "SELECT * FROM pregunta_usuario  WHERE \"EstRev1\" = 'Rechazada'";

			$sql = "SELECT \"IdPreUsu\", mu.\"NomUsu\" , mp.\"Nom\" ||' '||mp.\"PriApe\"||' '||mp.\"SegApe\" as \"Nombres\" , \"IdPre\", \"EstRev1\", \"EstRev2\", \"Obs\" from pregunta_usuario as pu 
				left join ma_user as mu on mu.\"UseId\" = pu.\"IdDoc\" 	
				left join ma_persona as mp on mu.\"fkIdPer\" = mp.\"PerID\"
				WHERE \"EstRev1\" = 'Rechazada'
				order by \"IdPre\" 
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
}
?>
