<?php

class PreguntaUsuario extends ModeloGenerico{

	function __construct(){

		parent::__construct("PREGUNTA_USUARIO");

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
			$sql = "SELECT * FROM " . $this->nombreTabla . " w WHERE w.\"OrgID\"=:1 and w.\"IdPreUsu\"=:2";

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
		$sql = "SELECT MAX(IdPreUsu) as IdPreUsu FROM " . $this->nombreTabla;

		$consulta = $this->coneccion->prepare($sql);
		//$consulta->bindParam(':1', $orgID);
		$consulta->execute();

		$resultado = $consulta->fetch(PDO::FETCH_ASSOC);

		if(!$resultado )
			return 0;

		return $resultado;
	}


	public function getPreguntasCurso($IdCur){
		//consulta

		/* SELECT  g2_pregunta."IdPre",
					g2_pregunta."TxtPre",
					gzz_curso."NomCur"
			FROM ((((gzz_curso
			INNER JOIN gzz_tema on gzz_tema."fkIdCur"=gzz_curso."IdCur")
			INNER JOIN gzz_tema_especifico on gzz_tema."IdTem"=gzz_tema_especifico."fkIdTem")
			INNER JOIN g2_pregunta on g2_pregunta."fkIdTemEsp"=gzz_tema_especifico."IdTemEsp")
			INNER JOIN pregunta_usuario on pregunta_usuario."IdPre"=g2_pregunta."IdPre" AND pregunta_usuario."IdRev1" is null)
			where 
				"IdCur"=1
				
; */
		$sql = "select  g2_pregunta.\"IdPre\",
						g2_pregunta.\"TxtPre\",
						gzz_curso.\"NomCur\"
				FROM ((((gzz_curso
				INNER JOIN gzz_tema on gzz_tema.\"fkIdCur\"=gzz_curso.\"IdCur\")
				INNER JOIN gzz_tema_especifico on gzz_tema.\"IdTem\"=gzz_tema_especifico.\"fkIdTem\")
				INNER JOIN g2_pregunta on g2_pregunta.\"fkIdTemEsp\"=gzz_tema_especifico.\"IdTemEsp\")
				INNER JOIN pregunta_usuario on pregunta_usuario.\"IdPre\"=g2_pregunta.\"IdPre\" AND pregunta_usuario.\"IdRev1\" is null)
				where 
				\"IdCur\"=:1";

		$consulta = $this->coneccion->prepare($sql);
		$consulta->bindParam(':1', $IdCur);
		$consulta->execute();

		$resultado = $consulta->fetchAll(PDO::FETCH_ASSOC);

		if(!$resultado )
			return 0;

		return $resultado;
	}
	public function getPreguntasCurso2($IdCur){
		//consulta

		/* 
			SELECT  g2_pregunta."IdPre",
					g2_pregunta."TxtPre",
					gzz_curso."NomCur"
			FROM ((((gzz_curso
			INNER JOIN gzz_tema on gzz_tema."fkIdCur"=gzz_curso."IdCur")
			INNER JOIN gzz_tema_especifico on gzz_tema."IdTem"=gzz_tema_especifico."fkIdTem")
			INNER JOIN g2_pregunta on g2_pregunta."fkIdTemEsp"=gzz_tema_especifico."IdTemEsp")
			INNER JOIN pregunta_usuario on pregunta_usuario."IdPre"=g2_pregunta."IdPre" AND pregunta_usuario."IdRev2" is null AND pregunta_usuario."IdRev1" is not null)
			where 
				"IdCur"=4
				
; */
		$sql = "select  g2_pregunta.\"IdPre\",
						g2_pregunta.\"TxtPre\",
						gzz_curso.\"NomCur\"
				FROM ((((gzz_curso
				INNER JOIN gzz_tema on gzz_tema.\"fkIdCur\"=gzz_curso.\"IdCur\")
				INNER JOIN gzz_tema_especifico on gzz_tema.\"IdTem\"=gzz_tema_especifico.\"fkIdTem\")
				INNER JOIN g2_pregunta on g2_pregunta.\"fkIdTemEsp\"=gzz_tema_especifico.\"IdTemEsp\")
				INNER JOIN pregunta_usuario on pregunta_usuario.\"IdPre\"=g2_pregunta.\"IdPre\" AND pregunta_usuario.\"IdRev2\" is null AND pregunta_usuario.\"IdRev1\" is not null  AND pregunta_usuario.\"EstRev1\"='Aceptado' )
				where 
				\"IdCur\"=:1";

		$consulta = $this->coneccion->prepare($sql);
		$consulta->bindParam(':1', $IdCur);
		$consulta->execute();

		$resultado = $consulta->fetchAll(PDO::FETCH_ASSOC);

		if(!$resultado )
			return 0;

		return $resultado;
	}
	public function actualizarR1($datos){

		/* UPDATE pregunta_usuario
			SET "IdRev1"=8
			WHERE
			"IdPre"=169 */
		$limit=sizeof($datos->list);
		for ($i = 0; $i <= $limit; $i++) {
			$sql = " update $this->nombreTabla set \"IdRev1\"=:2 where \"IdPre\"= :1";
			$consulta = $this->coneccion->prepare($sql);
			$consulta->bindParam(':1', $datos->list[$i]);
			$consulta->bindParam(':2', $datos->IdRev1);

			if($i==$limit && $consulta->execute())
				return array("estado" => true, "mensaje"=> "Se Asigno con Éxito");
		    if(!$consulta->execute()){
				return array("estado" => false, "mensaje"=> "ERROR en la asignación IDPRE = ".$i);
			}

			
		}
		//$sql = " update $this->nombreTabla set \"IdRev1\"=:2 where \"IdPre\"= :1";
			
	}
	public function actualizarR2($datos){

		/* UPDATE pregunta_usuario
			SET "IdRev1"=8
			WHERE
			"IdPre"=169 */
		
			$limit=sizeof($datos->list);
			for ($i = 0; $i <= $limit; $i++) {
				$sql = " update $this->nombreTabla set \"IdRev2\"=:2 where \"IdPre\"= :1";
				$consulta = $this->coneccion->prepare($sql);
				$consulta->bindParam(':1', $datos->list[$i]);
				$consulta->bindParam(':2', $datos->IdRev2);
				
				$res=$consulta->execute();
				if($i==$limit && $res)
					return array("estado" => true, "mensaje"=> "Se Asigno con Éxito");
				if(!$res){
					return array("estado" => false, "mensaje"=> "ERROR en la asignación IDPRE = ".$i);
				}
				
				
			}
		//$sql = " update $this->nombreTabla set \"IdRev1\"=:2 where \"IdPre\"= :1";



	}
}
?>
