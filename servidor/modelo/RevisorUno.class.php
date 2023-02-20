<?php
		/**
		    * Este Clase se encargade averiguar si el usuario logeado tiene los permisos necesarios
			* Este es la capa mas cercana a la base de datos (Modelo)
			* Patron de Diseño Utilizado: Factory Method
		*/
class RevisorUno extends ModeloGenerico{
		
	function __construct(){
		
		parent::__construct("MA_USER");
		// public PDO::__construct("ma_user");
		
	}
	public function buscarTodos(){
		return array("estado" => false,"resultado" => "No hay buscar todos", "mensaje"=> "BPUNSA");
	}
	public function buscarR1($idCur){
        //CONSULTA

        /* 
        select 
            "NomUsu",
            "Pas",
            "fkIdRol",
            "fkIdPer",
            curso_persona."fkIdCur",
            ma_persona."Nom",
            ma_persona."PriApe",
            ma_persona."SegApe"
        from 
            ma_user 
            inner join curso_persona on ma_user."fkIdPer"=curso_persona."fkPerID" 
            inner join ma_persona on ma_user."fkIdPer"=ma_persona."PerID"
        where 
            "fkIdRol"=5 
        AND
            "fkIdCur"=2
 */

        $sql = "select 
                    \"UseId\",
                    \"NomUsu\",
                    \"Pas\",
                    \"fkIdRol\",
                    \"fkIdPer\",
                    curso_persona.\"fkIdCur\",
                    ma_persona.\"Nom\",
                    ma_persona.\"PriApe\",
                    ma_persona.\"SegApe\"
                from 
                    ma_user 
                    inner join curso_persona on ma_user.\"fkIdPer\"=curso_persona.\"fkPerID\" 
                    inner join ma_persona on ma_user.\"fkIdPer\"=ma_persona.\"PerID\"
                where 
                \"fkIdRol\"=:1 
                AND
                \"fkIdCur\"=:2";
		$consulta = $this->coneccion->prepare($sql);
		// $consulta = $sentencia->fetchAll(PDO::FETCH_OBJ);
        $rev1=5;
        $consulta->bindParam(':1', $rev1);
        $consulta->bindParam(':2',  $idCur);
		
		$consulta->execute();
		
		//$resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);
		$resultado = $consulta->fetchAll(PDO::FETCH_ASSOC);
		//$resultado = $consulta->fetch(PDO::FETCH_LAZY);
		
		
		if(!$resultado)
        //	return array("estado" => false, "mensaje"=> "Registro Invalido");      
            return 0;
        //return array($resultado);
        return $resultado   ;
    }
    public function buscarR2($idCur){
        //CONSULTA

        /* 
        select 
            "NomUsu",
            "Pas",
            "fkIdRol",
            "fkIdPer",
            curso_persona."fkIdCur",
            ma_persona."Nom",
            ma_persona."PriApe",
            ma_persona."SegApe"
        from 
            ma_user 
            inner join curso_persona on ma_user."fkIdPer"=curso_persona."fkPerID" 
            inner join ma_persona on ma_user."fkIdPer"=ma_persona."PerID"
        where 
            "fkIdRol"=5 
        AND
            "fkIdCur"=2
 */

        $sql = "select 
                    \"UseId\",
                    \"NomUsu\",
                    \"Pas\",
                    \"fkIdRol\",
                    \"fkIdPer\",
                    curso_persona.\"fkIdCur\",
                    ma_persona.\"Nom\",
                    ma_persona.\"PriApe\",
                    ma_persona.\"SegApe\"
                from 
                    ma_user 
                    inner join curso_persona on ma_user.\"fkIdPer\"=curso_persona.\"fkPerID\" 
                    inner join ma_persona on ma_user.\"fkIdPer\"=ma_persona.\"PerID\"
                where 
                \"fkIdRol\"=:1
                AND
                \"fkIdCur\"=:2";
		$consulta = $this->coneccion->prepare($sql);
		// $consulta = $sentencia->fetchAll(PDO::FETCH_OBJ);
        $rev2=6;
        $consulta->bindParam(':1',$rev2);
        $consulta->bindParam(':2',$idCur);
		
		$consulta->execute();
		
		//$resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);
		$resultado = $consulta->fetchAll(PDO::FETCH_ASSOC);
		//$resultado = $consulta->fetch(PDO::FETCH_LAZY);
		
		
		if(!$resultado)
        //	return array("estado" => false, "mensaje"=> "Registro Invalido");      
            return 0;
        //return array($resultado);
        return $resultado   ;
	}

    public function buscarAdministrador(){
		//consulta
		$sql = "SELECT * FROM MA_USER as u WHERE u.\"RolID\"=2";
        $consulta = $this->coneccion->prepare($sql);
		$consulta->execute();
		$resultado = $consulta->fetch(PDO::FETCH_ASSOC);
        
        if(!$resultado )
			return array("estado" => false, "mensaje"=> "ERROR no esta registrado el administrador");
        
        $sql2 = "SELECT * FROM MA_PERSONA as p WHERE p.\"PerID\"=:1";
	
		$consulta = $this->coneccion->prepare($sql2);
        $consulta->bindParam(':1', $resultado['UseID']);
		$consulta->execute();
		$resultado2 = $consulta->fetch(PDO::FETCH_ASSOC);
        
        if(!$resultado2 )
			return array("estado" => false, "mensaje"=> "ERROR no esta registrado el usuario administrador");
		
		return array("estado" => true,"resultado" => array("r1" => $resultado, "r2"=> $resultado2) , "mensaje"=> "se registro con exito");
	}


	public function buscarRevisor1(){
		//consulta
		$sql = "SELECT * FROM MA_USER as u WHERE u.\"RolID\"=5";
        $consulta = $this->coneccion->prepare($sql);
		$consulta->execute();
		$resultado = $consulta->fetch(PDO::FETCH_ASSOC);
        
        if(!$resultado )
			return array("estado" => false, "mensaje"=> "ERROR no esta registrado el administrador");
        
        $sql2 = "SELECT * FROM MA_PERSONA as p WHERE p.\"PerID\"=:1";
	
		$consulta = $this->coneccion->prepare($sql2);
        $consulta->bindParam(':1', $resultado['UseID']);
		$consulta->execute();
		$resultado2 = $consulta->fetch(PDO::FETCH_ASSOC);
        
        if(!$resultado2 )
			return array("estado" => false, "mensaje"=> "ERROR no esta registrado el usuario administrador");
		
		return array("estado" => true,"resultado" => array("r1" => $resultado, "r2"=> $resultado2) , "mensaje"=> "se registro con exito");
	}




}
?>