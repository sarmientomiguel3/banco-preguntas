<?php


	class Alternativa extends ModeloGenerico{
			
		function __construct(){
			
			parent::__construct("G2_ALTERNATIVA");
			
		}
		public function buscarPorPregunta($ID){
			try{
				//consulta
				// $sql = "SELECT * FROM " . $this->nombreTabla . " w WHERE w.\"OrgID\"=:1 and w.\"IdPre\"=:2";
				$sql = "SELECT \"IdAlt\", \"DesAlt\", \"ImgAlt\", \"EstReg\", \"fkIdPre\", \"CorAlt\" FROM g2_alternativa where \"fkIdPre\"=:1 ";
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
	}
?>