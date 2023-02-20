<?php
	
	function datosAJson($datos){
		
		$json = "[";
		
		//si existen datos		
		if($datos){
			$i =0;
			foreach($datos as $dato){
							
				if($i > 0){
					$json .= ",";
				}
				
				$json .= json_encode($dato,JSON_NUMERIC_CHECK);
				
				$i++;
			}
		}
		
		$json .= "]";					
					
							
		//retornamos el json
		return $json;	
	}
	function miJson($datos){
		
		if( gettype($datos)=="string" )
			return $datos;
			
		$json = "";
		
		$json .= "{";
		$json .= "\"data\":" . datosAJson($datos);
		$json .= "}";		
		
		return $json;
	}
	function miJsonIns($datos){
		
		$json = "";
		$json .= "{";
		$json .= "\"estado\":" . json_encode($datos['estado']);
		if( isset($datos['ID']) ){
			$json .= ",";
			$json .= "\"ID\":" . json_encode($datos['ID']);
		}
		$json .= ",";
		$json .= "\"mensaje\":" . json_encode($datos['mensaje']);
		$json .= "}";
		
		return $json;
	}
	function miJsonIns2($datos){
		
		$json = "";
		$json .= "{";
		$json .= "\"estado\":" . json_encode($datos['estado']);
		if( isset($datos['dato']) ){
			$json .= ",";
			$json .= "\"dato\":" . json_encode($datos['ID']);
		}
		$json .= ",";
		$json .= "\"mensaje\":" . json_encode($datos['mensaje']);
		$json .= "}";
		
		return $json;
	}
    function miJsonIns3($datos){
		
		$json = "";
		$json .= "{";
		$json .= "\"estado\":" . json_encode($datos['estado']);
		if( isset($datos['ID']) ){
			$json .= ",";
			$json .= "\"ID\":" . json_encode($datos['ID']);
		}
        if( isset($datos['Cod']) ){
			$json .= ",";
			$json .= "\"Cod\":" . json_encode($datos['Cod']);
		}
		$json .= ",";
		$json .= "\"mensaje\":" . json_encode($datos['mensaje']);
		$json .= "}";
		
		return $json;
	}
	function miJsonGet($datos){
		
		$json = "";
		$json .= "{";
		$json .= "\"estado\":" . json_encode($datos['estado']);
		
		if( isset($datos['resultado']) ){
			$json .= ",";
			$json .= "\"resultado\":" . json_encode($datos['resultado']);
		}
		$json .= ",";
		$json .= "\"mensaje\":" . json_encode($datos['mensaje']);
		$json .= "}";
		
		return $json;
	}
    function miJsonGetNumber($datos){
		
		$json = "";
		$json .= "{";
		$json .= "\"estado\":" . json_encode($datos['estado']);
		
		if( isset($datos['resultado']) ){
			$json .= ",";
			$json .= "\"resultado\":" . json_encode($datos['resultado'],JSON_NUMERIC_CHECK);
		}
		$json .= ",";
		$json .= "\"mensaje\":" . json_encode($datos['mensaje']);
		$json .= "}";
		
		return $json;
	}
	function miJsonRes($datos){
		
		$json = "";
		$json .= "{";
		$json .= "estado:" . json_encode($datos['estado']);
		$json .= ",";
		$json .= "mensaje:" . json_encode($datos['mensaje']);
		$json .= "}";
		
		return $json;
	}
	function miJsonRes2($estado,$mensaje){
		
		$json = "";
		$json .= "{";
		$json .= "\"estado\":" . json_encode($estado);
		$json .= ",";
		$json .= "\"mensaje\":" . json_encode($mensaje);
		$json .= "}";
		
		return $json;
	}
?>	