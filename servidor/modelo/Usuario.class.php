<?php
		/**
		    * Este Clase se encargade averiguar si el usuario logeado tiene los permisos necesarios
			* Este es la capa mas cercana a la base de datos (Modelo)
			* Patron de Diseño Utilizado: Factory Method
		*/
class Usuario extends ModeloGenerico{
		
	function __construct(){
		
		parent::__construct("MA_USER");
		// public PDO::__construct("ma_user");
		
	}
	public function buscarUsuario($usuario,$password){
		//consulta
		$sql = "SELECT u.\"UseId\",u.\"NomUsu\",u.\"fkIdSuc\",r.\"RolID\",r.\"Nom\" as rol,p.\"dni\",p.\"RUC\",p.\"Nom\",p.\"PriApe\",p.\"SegApe\",p.\"FecNac\",p.\"CiuPro\",p.\"DirAct\",p.\"Ema\",p.\"Tel\",p.\"SexId\",p.\"PaiID\",p.\"EstCivID\",p.\"Img\" FROM ma_user as u 
		JOIN ma_persona as p ON u.\"fkIdPer\"=p.\"PerID\" LEFT JOIN ma_rol as r ON u.\"fkIdRol\"=r.\"RolID\" 
		WHERE \"NomUsu\" = :1 and \"Pas\" = :2 and u.\"EstReg\"='A';";
		// $sentencia = $this->coneccion->query($sql);
		// echo "\n ----- CONSULTA2 -----\n";

		//echo $sql;
		//echo "\n\n\n";
		//echo $usuario;
		//echo $password;

		$consulta = $this->coneccion->prepare($sql);
		// $consulta = $sentencia->fetchAll(PDO::FETCH_OBJ);
		$consulta->bindParam(':1', $usuario);
		$consulta->bindParam(':2', $password);
		$consulta->execute();
		
		//$resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);
		$resultado = $consulta->fetch(PDO::FETCH_ASSOC);
		//$resultado = $consulta->fetch(PDO::FETCH_LAZY);
		
		
		if(!$resultado )
			return array("estado" => false, "mensaje"=> "ERROR en el registro");
		
		return array("estado" => true,"resultado" => $resultado, "mensaje"=> "el usuario si esta registrado");
		
	}
    public function getUsuario($usuarioID){
		//consulta
		$sql = "SELECT u.\"UseId\",u.\"NomUsu\",u.\"Pas\"  FROM " . $this->nombreTabla . " as u ".
                "WHERE UseId = :1 and u.\"EstReg\"='A'";
	
		$consulta = $this->coneccion->prepare($sql);
		$consulta->bindParam(':1', $usuarioID);
		$consulta->execute();
		
		//$resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);
		$resultado = $consulta->fetch(PDO::FETCH_ASSOC);
		//$resultado = $consulta->fetch(PDO::FETCH_LAZY);
		
		
		if(!$resultado )
			return array("estado" => false, "mensaje"=> "no se encuentra el usuario");
		
		return array("estado" => true,"resultado" => $resultado, "mensaje"=> "el usuario si esta registrado");
		
	}
    public function verficarUsuario($usuario,$password){
		//consulta
		$sql = "SELECT u.\"UseId\", p.\"Ema\" FROM " . $this->nombreTabla . " as u ".
                "JOIN MA_PERSONA as p ON u.\"UseId\"=p.\"PerID\" ".
                "WHERE \"NomUsu\" = :1 and \"Pas\" = :2 and u.\"EstReg\"='A'";
	
		$consulta = $this->coneccion->prepare($sql);
		$consulta->bindParam(':1', $usuario);
		$consulta->bindParam(':2', $password);
		$consulta->execute();
		
		//$resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);
		$resultado = $consulta->fetch(PDO::FETCH_ASSOC);
		//$resultado = $consulta->fetch(PDO::FETCH_LAZY);
		
		
		if(!$resultado )
			return array("estado" => false, "mensaje"=> "La contraseña es incorrecta, vuelva a intentarlo");
		
		return array("estado" => true,"resultado" => $resultado, "mensaje"=> "el usuario si esta registrado");
		
	}
	public function buscarTrabajadores($usuario,$password){
		//consulta
		$sql = "SELECT u.\"UseId\",u.\"NomUsu\",u.\"EstID\",r.\"RolID\",r.\"Nom\" as rol FROM " . $this->nombreTabla . " as u LEFT JOIN MA_ROL as r ON u.\"RolID\"=r.\"RolID\" WHERE NomUsu = :1 and Pas = :2 and r.\"RolID\"!=3";
	
		$consulta = $this->coneccion->prepare($sql);
		$consulta->bindParam(':1', $usuario);
		$consulta->bindParam(':2', $password);
		$consulta->execute();
		
		//$resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);
		$resultado = $consulta->fetch(PDO::FETCH_ASSOC);
		//$resultado = $consulta->fetch(PDO::FETCH_LAZY);
		
		
		if(!$resultado )
			return array("estado" => false, "mensaje"=> "ERROR en el registro");
		
		return array("estado" => true,"resultado" => $resultado, "mensaje"=> "se registro con exito");
		
	}
	public function buscarDistribuidor($usuario,$password){
		//consulta
		$sql = "SELECT d.\"DisID\" as UseId,p.\"Nom\" as NomUsu,r.\"RolID\",r.\"Nom\" as rol, dp.\"DisPerID\" FROM CV_DISTRIBUIDOR as d LEFT JOIN CO_DISTRIBUIDOR_PER as dp ON d.\"DisID\"=dp.\"DisID\",MA_PERSONA as p, MA_USER as u LEFT JOIN MA_ROL as r ON u.\"RolID\"=r.\"RolID\" ".
				"WHERE d.\"DIsID\" = :1 and d.\"UseId\"=u.\"UseId\" and u.\"Pas\" = :2 and d.\"PerID\"=p.\"PerID\" and dp.\"EstReg\"='A'";
	
		$consulta = $this->coneccion->prepare($sql);
		$consulta->bindParam(':1', $usuario);
		$consulta->bindParam(':2', $password);
		$consulta->execute();
		
		//$resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);
		$resultado = $consulta->fetch(PDO::FETCH_ASSOC);
		//$resultado = $consulta->fetch(PDO::FETCH_LAZY);
		
		
		if(!$resultado )
			return array("estado" => false, "mensaje"=> "ERROR en el registro");
		
		return array("estado" => true,"resultado" => $resultado, "mensaje"=> "se registro con exito");
		
	}
	public function actualizarConstraseña($dato,$datoID){
			
		//consulta
		$sql = "UPDATE $this->nombreTabla SET Pas='$dato' WHERE UseId=$datoID";
		
		//return $sql;
		
		//preparando la consulta
		$consulta = $this->coneccion->prepare($sql);
		
		//ejecutando
		if($consulta->execute() )
			return true;
		else
			return false;
	}
	
	public function buscarTodosTrabajadores(){
		//consulta
		$sql = "SELECT u.\"UseId\",u.\"NomUsu\",u.\"Pas\",u.\"RolID\",u.\"EstID\",r.\"Nom\" as rol,u.\"EstReg\" FROM " . $this->nombreTabla . " as u JOIN MA_ROL as r ON u.\"RolID\"=r.\"RolID\" WHERE u.\"RolID\">3";
	
		$consulta = $this->coneccion->prepare($sql);
		$consulta->execute();
		
		$resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);
		
		if(!$resultados){
			return "error en la consulta : ".pg_last_error();
		}			
		return $resultados;
	}
    public function buscarAdmin(){
		//consulta
		$sql = "SELECT u.\"UseId\",u.\"NomUsu\",u.\"Pas\",u.\"fkIdRol\" FROM $this->nombreTabla as u WHERE u.\"fkIdRol\"=1";
		
		$consulta = $this->coneccion->prepare($sql);
		$consulta->execute();
		$resultado = $consulta->fetch(PDO::FETCH_ASSOC);
        
        if(!$resultado )
			return array("estado" => false, "mensaje"=> "ERROR en el registro");
		
		return array("estado" => true,"resultado" => $resultado, "mensaje"=> "se registro con exito");
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
        $consulta->bindParam(':1', $resultado['UseId']);
		$consulta->execute();
		$resultado2 = $consulta->fetch(PDO::FETCH_ASSOC);
        
        if(!$resultado2 )
			return array("estado" => false, "mensaje"=> "ERROR no esta registrado el usuario administrador");
		
		return array("estado" => true,"resultado" => array("r1" => $resultado, "r2"=> $resultado2) , "mensaje"=> "se registro con exito");
	}
    public function iniciarSession($usuarioID,$fechaI){			
        $sql = "INSERT INTO MA_REGISTRO_LOG (FecIniSes,UseId)".
        " VALUES('$fechaI','$usuarioID')";
        $consulta = $this->coneccion->prepare($sql);
        $consulta->execute();
        
        return $this->coneccion->lastInsertId();
    }
    public function cerrarSession($sessionID,$fechaF){
        $sql = "UPDATE MA_REGISTRO_LOG SET FecFinSes='$fechaF' WHERE RegLogID=$sessionID";
        $consulta = $this->coneccion->prepare($sql);
        $consulta->execute();
    }

    public function todosLosUsuarios(){
		$sql = "
		SELECT mu.\"UseId\", mu.\"NomUsu\", mp.\"PerID\", mp.\"dni\" as \"dni\", CONCAT(mp.\"Nom\",' ',mp.\"PriApe\",' ',mp.\"SegApe\") as \"Nombres\",mr.\"RolID\", mr.\"Nom\" as \"Rol\"  
		FROM ma_user as mu 
		left join ma_persona as mp on mu.\"fkIdPer\" = mp.\"PerID\" left join ma_rol as mr on mr.\"RolID\" = mu.\"fkIdRol\" where mu.\"EstReg\" = 'A' order by mu.\"UseId\"
		";
        $consulta = $this->coneccion->prepare($sql);
		$consulta->execute();
		$resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);
		return $resultados;
    }

	
	public function insertar($dato){
		
		$consulta = $this->coneccion->prepare('INSERT INTO '.$this->nombreTabla.' ("NomUsu", "Pas", "EstReg", "fkIdRol", "fkIdSuc", "fkIdPer") VALUES(:NomUsu,:Pas,:EstReg,:fkIdRol,:fkIdSuc,:fkIdPer)');
		
		$consulta->bindParam(':NomUsu', $dato->NomUsu);
		$consulta->bindParam(':Pas', $dato->Pas);
		$consulta->bindParam(':EstReg', $dato->EstReg);
		$consulta->bindParam(':fkIdRol', $dato->fkIdRol);
		$consulta->bindParam(':fkIdSuc', $dato->fkIdSuc);
		$consulta->bindParam(':fkIdPer', $dato->fkIdPer);
		
		
		if($consulta->execute())
			return array("estado" => true,"ID" => $this->coneccion->lastInsertId(), "mensaje"=> "se registro con exito");
		else
			return array("estado" => false, "mensaje"=> "ERROR en el registro");
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
        $consulta->bindParam(':1', $resultado['UseId']);
		$consulta->execute();
		$resultado2 = $consulta->fetch(PDO::FETCH_ASSOC);
        
        if(!$resultado2 )
			return array("estado" => false, "mensaje"=> "ERROR no esta registrado el usuario administrador");
		
		return array("estado" => true,"resultado" => array("r1" => $resultado, "r2"=> $resultado2) , "mensaje"=> "se registro con exito");
	}
	public function buscarRevisor2(){
		//consulta
		$sql = "SELECT * FROM MA_USER as u WHERE u.\"RolID\"=6";
        $consulta = $this->coneccion->prepare($sql);
		$consulta->execute();
		$resultado = $consulta->fetch(PDO::FETCH_ASSOC);
        
        if(!$resultado )
			return array("estado" => false, "mensaje"=> "ERROR no esta registrado el administrador");
        
        $sql2 = "SELECT * FROM MA_PERSONA as p WHERE p.\"PerID\"=:1";
	
		$consulta = $this->coneccion->prepare($sql2);
        $consulta->bindParam(':1', $resultado['UseId']);
		$consulta->execute();
		$resultado2 = $consulta->fetch(PDO::FETCH_ASSOC);
        
        if(!$resultado2 )
			return array("estado" => false, "mensaje"=> "ERROR no esta registrado el usuario administrador");
		
		return array("estado" => true,"resultado" => array("r1" => $resultado, "r2"=> $resultado2) , "mensaje"=> "se registro con exito");
	}



}
?>