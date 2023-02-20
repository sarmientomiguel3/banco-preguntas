<?php
		/**
		    * Este Clase tiene la funcion de tener funciones globales
			*Para no redundar en la creacion de metodos que seran usados por la mayoria de clases
			*Patron de Diseño Utilizado: Factory Method
		*/
	class ModeloGenerico{

		/**
			* coneccion BD
		*/
		
		protected $coneccion;
		protected $nombreTabla;

		/*
		*funciones para hacer transacciones entre clases
		*/
		public function iniciarTranccion(){
			$this->coneccion->beginTransaction();
		}
		public function finalizarTranccion(){
			$this->coneccion->commit();
		}
		public function interrumpirTranccion(){
			$this->coneccion->rollback();
		}


		/**
		 * selecciona un registro por su ID
		 * @return {Object} data
		 */
		public function buscarDato($datoID){
			//consulta
			$sql = "SELECT * FROM " . $this->nombreTabla ;

			//claves del dato
			$where = " WHERE ";
			//leendo las claves del dato
			$j = 0;
			foreach($datoID as $clave => $valor) {
				if( $j > 0 ){
					$where.=" and ";
				}
				$where.="$clave = '$valor'";
				$j++;
			}
			$sql = $sql . $where;

			$consulta = $this->coneccion->prepare($sql);
				$consulta->execute();

			//$resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);
			$resultado = $consulta->fetch(PDO::FETCH_ASSOC);
			//$resultado = $consulta->fetch(PDO::FETCH_LAZY);


			if(!$resultado )
				return array("estado" => false, "mensaje"=> "ERROR en el registro");

			return array("estado" => true,"resultado" => $resultado, "mensaje"=> "si se encontro dato");

		}
		/**
		* seleccion todos
		* @return {Object} data
		*/
		public function buscarTodos(){

			try{
				//consulta
				$sql = "SELECT * FROM " . $this->nombreTabla . " ";

				$resultados = $this->coneccion->query($sql,PDO::FETCH_ASSOC);

				if(!$resultados){
					return "no hay datos";
				}
				return $resultados;

			}catch (Exception $e){
				return "error en la consulta : ".pg_last_error();
			}
		}
        public function buscarTodosOrdenados($orden){
			try{
				//consulta
				$sql = "SELECT * FROM " . $this->nombreTabla . " ORDER BY $orden";

				$resultados = $this->coneccion->query($sql,PDO::FETCH_ASSOC);

				if(!$resultados){
					return "no hay datos";
				}
				return $resultados;
			}catch (Exception $e){
				return "error en la consulta : ".pg_last_error();
			}
		}
		public function buscarTodos2(){
			try{
				//consulta
				$sql = "SELECT * FROM " . $this->nombreTabla . " ";

				$consulta = $this->coneccion->prepare($sql);
				$consulta->execute();

				$resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);

				if(!$resultados){
					return "no hay datos";
				}
				return $resultados;
			}catch (Exception $e){
				return "error en la consulta : ".pg_last_error();
			}
		}
        public function buscarTodosOrdenados2($orden){
			try{
				//consulta
				$sql = "SELECT * FROM " . $this->nombreTabla . " ORDER BY $orden";

				$consulta = $this->coneccion->prepare($sql);
				$consulta->execute();

				$resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);

				if(!$resultados){
					return "no hay datos";
				}
				return $resultados;
			}catch (Exception $e){
				return "error en la consulta : ".pg_last_error();
			}
		}
        public function buscarTodosActivos(){
			try{
				//consulta
				$sql = "SELECT * FROM " . $this->nombreTabla . " WHERE EstReg='A'";

				$consulta = $this->coneccion->prepare($sql);
				$consulta->execute();

				$resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);

				if(!$resultados){
					return "no hay datos";
				}
				return $resultados;
			}catch (Exception $e){
				return "error en la consulta : ".pg_last_error();
			}
		}

		public function insertarDato($dato){

			// if(isset($dato->nomId)){
			// 	$nomId = $dato->nomId;
			// 	unset($dato->nomId);
			// }

			//consulta
			$sql = "INSERT INTO $this->nombreTabla ";
			//columnas de la tabla
			$claves = "(";
			//valores para insertar
			$valores= "VALUES(";

			//leendo los atributos del dato
			$i = 0;
			foreach($dato as $clave => $valor) {
				if( $i > 0 ){
					$claves.=",";
					$valores.=",";
				}
				$claves.="\"$clave\"";
				//$valores.=($valor?"'$valor'":"null");
                $valores.=(is_null($valor)?"null":"'$valor'");
				$i++;
			}
			$claves.=") ";
			$valores.=") ";

			//consulta completa
			$sql.=$claves.$valores;

			//preparando la consulta
			$consulta = $this->coneccion->prepare($sql);

			//ejecutando
			if($consulta->execute() )
				return array("estado" => true,"ID" => $this->coneccion->lastInsertId(), "mensaje"=> "se registro con exito");
			else
				return array("estado" => false, "mensaje"=> "ERROR en el registro");
		}
		public function actualizarDato($dato,$datoID){

			//consulta
			$sql = "UPDATE $this->nombreTabla ";

			//valores para actualizar
			$valores= "SET ";

			//claves del dato
			$where = " WHERE ";

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
				return array("estado" => true, "mensaje"=> "Se actualizo con éxito");
			else
				return array("estado" => false, "mensaje"=> "ERROR en la actualizacion");
		}
        public function delete($datoID,$user){

            $sql = "UPDATE $this->nombreTabla ";

			//valores para actualizar
			$valores= "SET EstReg = 'E'";

			// verificando quien elimino
			if($user){
				$valores.= " UpdDat = $user->Dat";
				$valores.= " UpdByID = $user->UseId";
			}


			//claves del dato
			$where = " WHERE ";
			//leendo las claves del dato
			$j = 0;
			foreach($datoID as $clave => $valor) {
				if( $j > 0 ){
					$where.=" and ";
				}
				$where.="$clave = '$valor'";
				$j++;
			}
            //consulta completa
			$sql.=$valores.$where;

			//preparando la consulta
			$consulta = $this->coneccion->prepare($sql);

			//ejecutando
			if($consulta->execute() )
				return array("estado" => true, "mensaje"=> "Se elimino con exito");
			else
				return array("estado" => false, "mensaje"=> "ERROR en la eliminacion");
		}

		public function eliminarDato($datoID){

			//consulta
			$sql = "DELETE FROM $this->nombreTabla ";

			//claves del dato
			$where = " WHERE ";

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
			$sql.=$where;

			//return $sql;

			//preparando la consulta
			$consulta = $this->coneccion->prepare($sql);

			//ejecutando
			if($consulta->execute() )
				return array("estado" => true, "mensaje"=> "Se elimino con exito");
			else
				return array("estado" => false, "mensaje"=> "ERROR en la eliminacion");
		}

		public function buscarID($ID){

			return "";
			/*
			$resultados = null;

			//consulta
			$query = "SELECT * FROM " . $this.nombre_tabla . " ";

			$resultados = $this->coneccion->query($query);
			return $resultados;*/
		}
		public function actualizar($ID){
			/*
			$resultados = null;

			//consulta
			$query = "SELECT * FROM " . $this.nombre_tabla . " ";

			$resultados = $this->coneccion->query($query);
			return $resultados;*/
		}
		protected function borrar($ID){
			/*
			$resultados = null;

			//consulta
			$query = "SELECT * FROM " . $this.nombre_tabla . " ";

			$resultados = $this->coneccion->query($query);
			return $resultados;*/
		}


		/**
		* constructor
		*/
		public function __construct($nombre){

			$this->nombreTabla = $nombre;
			//abrimos la coneccion a la base de datos
			$this->coneccion = ConeccionBD::getConeccionBD();

		/*	$this->coneccion = new coneccionBD();
			$this->coneccion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$this->coneccion->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);*/
		}
		function __destruct() {
			//ConeccionBD::cerrarConeccionBD();
		}
	}
?>
