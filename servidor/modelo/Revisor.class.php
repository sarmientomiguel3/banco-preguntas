<?php

class Revisor extends ModeloGenerico{

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

	public function getRevisor(){

		try{
			//SELECT "IdPreUsu", mu."NomUsu" , mp."Nom" ||' '||mp."PriApe"||' '||mp."SegApe" as "Nombres" , "IdPre", "EstRev1", "EstRev2", "Obs" from pregunta_usuario as pu 
			//left join ma_user as mu on mu."UseId" = pu."IdDoc" 
			//left join ma_persona as mp on mu."fkIdPer" = mp."PerID" 
			
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
	public function getRevisorUno($user){

		try{
			//SELECT "IdPreUsu", mu."NomUsu" , mp."Nom" ||' '||mp."PriApe"||' '||mp."SegApe" as "Nombres" , "IdPre", "EstRev1", "EstRev2", "Obs" from pregunta_usuario as pu 
			//left join ma_user as mu on mu."UseId" = pu."IdDoc" 
			//left join ma_persona as mp on mu."fkIdPer" = mp."PerID" 
			
			$sql = "SELECT \"IdPreUsu\", mu.\"NomUsu\" , mp.\"Nom\" ||' '||mp.\"PriApe\"||' '||mp.\"SegApe\" as \"Nombres\" , \"IdPre\", \"EstRev1\", \"EstRev2\", \"Obs\" from pregunta_usuario as pu 
				left join ma_user as mu on mu.\"UseId\" = pu.\"IdDoc\" 	
				left join ma_persona as mp on mu.\"fkIdPer\" = mp.\"PerID\"
				where \"IdRev1\" = :1 and \"EstRev1\" is null
				order by \"IdPre\" 
			";
			$consulta = $this->coneccion->prepare($sql);
			$consulta->bindParam(':1', $user->UseId);
			$consulta->execute();
			$resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);
			// $resultados = $this->coneccion->query($sql,PDO::FETCH_ASSOC);

			if(!$resultados){
				return "no hay datos";
			}
			return $resultados;

		}catch (Exception $e){
			return "error en la consulta : ".pg_last_error();
		}
	}
	public function actualizarDato2($dato,$datoID){

		//consulta
		$sql = "UPDATE $this->nombreTabla ";

		//valores para actualizar
		$valores= "SET \"EstRev1\" = 'Rechazada' ,";
		
		//claves del dato \"TxtPre\"
		$where = " WHERE ";
		
		//$where.=$extra;

		//leendo los atributos del dato
		$i = 0;
		foreach($dato as $clave => $valor) {

			if( $i > 0 ){
				$valores.=",";
			}
			//$valores.="$clave = '$valor'";
			//$valores.="$clave = ".($valor?"'$valor'":"null");
			$valores.="\"$clave\" = ".(is_null($valor)?"null":"'$valor'");
			$i++;
		}
		
		//$valores.=$extra;
		//leendo las claves del dato
		$j = 0;
		foreach($datoID as $clave => $valor) {
			if( $j > 0 ){
				$where.=" and ";
			}
			$where.="\"$clave\" = '$valor'";
			$j++;
		}

		//consulta completa
		$sql.=$valores.$where;

		//return $sql;

		//preparando la consulta
		$consulta = $this->coneccion->prepare($sql);

		if($consulta->execute() )
			return array("estado" => true, "mensaje"=> "Se actualizo con exito");
		else
			return array("estado" => false, "mensaje"=> "ERROR en la actualizacion");
	}
	// Aceptar
	public function actualizarDato3($dato,$datoID){

		//consulta
		$sql = "UPDATE $this->nombreTabla ";

		//valores para actualizar
		$valores= "SET \"EstRev1\" = 'Aceptada' ,";
		
		//claves del dato \"TxtPre\"
		$where = " WHERE ";
		
		//$where.=$extra;

		//leendo los atributos del dato
		$i = 0;
		foreach($dato as $clave => $valor) {

			if( $i > 0 ){
				$valores.=",";
			}
			//$valores.="$clave = '$valor'";
			//$valores.="$clave = ".($valor?"'$valor'":"null");
			$valores.="\"$clave\" = ".(is_null($valor)?"null":"'$valor'");
			$i++;
		}
		
		//$valores.=$extra;
		//leendo las claves del dato
		$j = 0;
		foreach($datoID as $clave => $valor) {
			if( $j > 0 ){
				$where.=" and ";
			}
			$where.="\"$clave\" = '$valor'";
			$j++;
		}

		//consulta completa
		$sql.=$valores.$where;

		//return $sql;

		//preparando la consulta
		$consulta = $this->coneccion->prepare($sql);

		if($consulta->execute() )
			return array("estado" => true, "mensaje"=> "Se actualizo con exito");
		else
			return array("estado" => false, "mensaje"=> "ERROR en la actualizacion");
	}
}
?>
