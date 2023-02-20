<?php

class Persona extends ModeloGenerico{
		
	function __construct(){
		
		parent::__construct("MA_PERSONA");
		
	}

    public function buscarPorDNI($dni){
		//consulta
		$sql = "SELECT * FROM " . $this->nombreTabla . " WHERE dni = :1 ";
	
		$consulta = $this->coneccion->prepare($sql);
		$consulta->bindParam(':1', $dni);
		$consulta->execute();
		$resultado = $consulta->fetch(PDO::FETCH_ASSOC);		
		
		if(!$resultado )
			return array("estado" => false, "mensaje"=> "ERROR en el registro");
		
		return array("estado" => true,"resultado" => $resultado, "mensaje"=> "se registro con exito");
	}
	public function buscarTodos(){
		//consulta
		$sql = "SELECT * FROM " . $this->nombreTabla ;
	
		$consulta = $this->coneccion->prepare($sql);
		$consulta->execute();
		$resultado = $consulta->fetch(PDO::FETCH_ASSOC);		
		
		if(!$resultado )
			return array("estado" => false, "mensaje"=> "ERROR en el registro");
		
		return array("estado" => true,"resultado" => $resultado, "mensaje"=> "se registro con exito");
	}
    
    public function buscarPersona($usuario,$password){
		//consulta
		$sql = "SELECT * FROM " . $this->nombreTabla . " WHERE NomUsu = :1 and Pas = :2";
	
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
	
	public function insertar($dato){
		/*tenedi cuidado con dni - dni* fijarse bien en las mayusulas y minusculas  */
		$consulta = $this->coneccion->prepare('INSERT INTO '.$this->nombreTabla.' 
		( dni, "Nom", "PriApe", "SegApe", "FecNac", "CiuPro", "DirAct", "Ema", "Tel", "Img", "FecCre", "EstReg", "SexId", "PaiID", "EstCivID", "Id_ubigeo") 
		VALUES (:dni,:Nom,:PriApe,:SegApe,:FecNac,:CiuPro,:DirAct,:Ema,:Tel,:Img,:FecCre,:EstReg,:SexId,:PaiID,:EstCivID,:Id_ubigeo);');

		$consulta->bindParam(':dni', $dato->dni);
		$consulta->bindParam(':Nom', $dato->Nom);
		$consulta->bindParam(':PriApe', $dato->PriApe);
		$consulta->bindParam(':SegApe', $dato->SegApe);
		$consulta->bindParam(':FecNac', $dato->FecNac);
		$consulta->bindParam(':CiuPro', $dato->CiuPro);
		$consulta->bindParam(':DirAct', $dato->DirAct);
		$consulta->bindParam(':Ema', $dato->Ema);
		$consulta->bindParam(':Tel', $dato->Tel);
		$consulta->bindParam(':Img', $dato->Img);
		$consulta->bindParam(':FecCre', $dato->FecCre);
		$consulta->bindParam(':EstReg', $dato->EstReg);
		$consulta->bindParam(':SexId', $dato->SexId);
		$consulta->bindParam(':PaiID', $dato->PaiID);
		$consulta->bindParam(':EstCivID', $dato->EstCivID);
		$consulta->bindParam(':Id_ubigeo', $dato->Id_ubigeo);
		
		$consulta->execute();	
		
		if($consulta->execute() )
			return array("estado" => true,"ID" => $this->coneccion->lastInsertId(), "mensaje"=> "se registro con exito");
		else
			return array("estado" => false, "mensaje"=> "ERROR en el registro");

	}
}
?>