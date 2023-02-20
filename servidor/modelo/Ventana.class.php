<?php
/* 
	Class Ventana: Encargado de acceder directamente a la base de datos Ventana
	Autor: Chapi Suyo Jesús
	Fecha: 15 - 10 - 2019
*/
class Ventana extends ModeloGenerico{
		
	function __construct(){
		
		parent::__construct("MA_VENTANA");
		
	}
	public function buscarTodosSinPadres(){
		//consulta
		$sql = "SELECT * FROM " . $this->nombreTabla . " v WHERE v.\"VenPadID\" IS null and v.\"EstReg\"='A'";
	
		$consulta = $this->coneccion->prepare($sql);
		$consulta->execute();
		
		$resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);
		
		if(!$resultados){
			return "error en la consulta : ".pg_last_error();
		}			
		return $resultados; 
	}
}
?>