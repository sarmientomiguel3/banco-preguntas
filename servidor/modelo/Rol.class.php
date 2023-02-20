<?php

class Rol extends ModeloGenerico{
		
	function __construct(){
		
		parent::__construct("MA_ROL");
		
	}
	
	public function buscarTodosSinDistribuidor(){
		//consulta
		$sql = "SELECT * FROM " . $this->nombreTabla . " WHERE RolID!=3";
	
		$consulta = $this->coneccion->prepare($sql);
		$consulta->execute();
		
		$resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);
		
		if(!$resultados){
			return "error en la consulta : ".pg_last_error();
		}			
		return $resultados;
	}
    public function buscarTrabajadores(){
		//consulta
		$sql = "SELECT * FROM " . $this->nombreTabla . " WHERE RolID >3";
	
		$consulta = $this->coneccion->prepare($sql);
		$consulta->execute();
		
		$resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);
		
		if(!$resultados){
			return "error en la consulta : ".pg_last_error();
		}			
		return $resultados;
	}
	
	public function eliminarVentanas($datoID){
			
		//consulta
		$sql = "DELETE FROM MA_ROL_VEN WHERE RolID=$datoID";
		
		//preparando la consulta
		$consulta = $this->coneccion->prepare($sql);
		
		//ejecutando
		if($consulta->execute() )
			return "se elimino con exito";
		else
			return "ERROR en la eliminacion";
	}
	/*
	public function insertar($dato){
		
		$consulta = $this->coneccion->prepare('INSERT INTO '.$this->nombreTabla.' (Cod,Nom,Des,Can,Pre,UniMedID,MonID) VALUES(:Cod,:Nom,:Des,:Can,:Pre,:UniMedID,:MonID)');
		$consulta->bindParam(':Cod', $dato->Cod);
		$consulta->bindParam(':Nom', $dato->Nom);
		$consulta->bindParam(':Des', $dato->Des);
		$consulta->bindParam(':Can', $dato->Can);
		$consulta->bindParam(':Pre', $dato->Pre);
		$consulta->bindParam(':UniMedID', $dato->UniMedID);
		$consulta->bindParam(':MonID', $dato->MonID);
		
		$consulta->execute();	
		
	}*/
}
?>