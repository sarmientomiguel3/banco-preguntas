'use strict';

//controlador principal de toda la aplicacion
miApp.controller('productoCtrl', ['$scope','$mdDialog','$mdToast','recursoCrud','upload',function($scope,$mdDialog,$mdToast,recursoCrud,upload) {
    	
	$scope.producto = {Cod:"",Nom:"",Des:"",Img:"",Img2:"",Img3:"",Can:0,PreCom:0,UniMedID:0,MonID:0,CatID:0,ImpID:1,EstReg:'A'};
	$scope.productoSel = {};
	$scope.listaUnidades = [{Nom:"unidad",UniMedID:1},{Nom:"docena",UniMedID:2}];
	$scope.listaMonedas = [];
	$scope.listaCategorias = [];
	$scope.establecimientos = [];
	$scope.listaProductos = [];
	$scope.imagen = {};
    $scope.imagen2 = {};
    $scope.imagen3 = {};
	
	listarMedidas();
	listarEstablecimientos();
		
	$scope.registrarProducto = function (){
		
		var men = validarDatos($scope.producto,$scope.productosSel);
		if( men!="" ){
			$mdToast.show($mdToast.simple().textContent(men).position('top right').hideDelay(2000));
			return;
		}
		
		if($scope.producto.CatID==1){
			$scope.producto.Des = "Contiene: ";
			for(var i=0;i<$scope.productosSel.length;i++){
				
				$scope.producto.Des += $scope.productosSel[i].Cod+" ";
			}
		}
		
		recursoCrud.insertar("ServicioProducto.php", $scope.producto ).then(
		
			function(data) {				
				if(data.estado){
					$scope.producto.ProID = data.ID;
                    $scope.producto.Cod = data.Cod;					
					
					if($scope.imagen.name){
                        $scope.producto.Img = $scope.producto.Cod+$scope.producto.Img;
						upload.enviarArchivo2($scope.imagen,"archivos/",$scope.producto.Img,true).then(function(res){                            
							$scope.imagen = {};
                            if(!$scope.imagen.name && !$scope.imagen2.name && !$scope.imagen3.name){
                                $scope.listaProductos.push($scope.producto);
                                $scope.producto = {Cod:"",Nom:"",Des:"",Img:"",Img2:"",Img3:"",Can:0,PreCom:0,UniMedID:0,MonID:0,CatID:0,ImpID:1,EstReg:'A'};
                                $scope.productosSel = [];
                                
                                reiniciarImg("imagenes");
                                $mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
                            }
						});
					}
                    if($scope.imagen2.name){
                        $scope.producto.Img2 = $scope.producto.Cod+$scope.producto.Img2;
						upload.enviarArchivo2($scope.imagen2,"archivos/",$scope.producto.Img2).then(function(res){                            
							$scope.imagen2 = {};
                            if(!$scope.imagen.name && !$scope.imagen2.name && !$scope.imagen3.name){
                                $scope.listaProductos.push($scope.producto);
                                $scope.producto = {Cod:"",Nom:"",Des:"",Img:"",Img2:"",Img3:"",Can:0,PreCom:0,UniMedID:0,MonID:0,CatID:0,ImpID:1,EstReg:'A'};
                                $scope.productosSel = [];
                                
                                reiniciarImg("imagenes");
                                $mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
                            }
						});
					}
                    if($scope.imagen3.name){
                        $scope.producto.Img3 = $scope.producto.Cod+$scope.producto.Img3;
						upload.enviarArchivo2($scope.imagen3,"archivos/",$scope.producto.Img3).then(function(res){                            
							$scope.imagen3 = {};
                            if(!$scope.imagen.name && !$scope.imagen2.name && !$scope.imagen3.name){
                                $scope.listaProductos.push($scope.producto);
                                $scope.producto = {Cod:"",Nom:"",Des:"",Img:"",Img2:"",Img3:"",Can:0,PreCom:0,UniMedID:0,MonID:0,CatID:0,ImpID:1,EstReg:'A'};
                                $scope.productosSel = [];
                                
                                reiniciarImg("imagenes");
                                $mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
                            }
						});
					}                   
                    if(!$scope.imagen.name && !$scope.imagen2.name && !$scope.imagen3.name){
                        $scope.listaProductos.push($scope.producto);
                        $scope.producto = {Cod:"",Nom:"",Des:"",Img:"",Img2:"",Img3:"",Can:0,PreCom:0,UniMedID:0,MonID:0,CatID:0,ImpID:1,EstReg:'A'};
                        $scope.productosSel = [];
                        
                        reiniciarImg("imagenes");
                        $mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
                    }
				}
                else
                    $mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	function listarMedidas(){
		recursoCrud.listar("ServicioMedidas.php", {} ).then(
			function(data) {
				$scope.listaUnidades = data.unidades;
				$scope.listaMonedas = data.monedas;
				$scope.listaCategorias = data.categorias;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};    
	$scope.listarProductos = function (){
		recursoCrud.listar("ServicioProducto.php", {accion:1} ).then(
			function(data) {
                for(var i=0;i<data.data.length;i++){
					data.data[i].Nom2 = data.data[i].Nom.toLowerCase();
				}
				$scope.listaProductos = data.data;
                
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
    
	$scope.actualizarProducto = function (p){
		
		var productoActualizar = {Cod:p.Cod,Nom:p.Nom,Des:p.Des,Img:p.Img,Img2:p.Img2,Img3:p.Img3,Can:p.Can,PreCom:p.PreCom,UniMedID:p.UniMedID,MonID:p.MonID,CatID:p.CatID};
		var productoID = {ProID:p.ProID};
		
		recursoCrud.actualizar("ServicioProducto.php", {dato:productoActualizar,ID:productoID} ).then(
			function(data) {				
				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado)
					recursoCrud.copiar($scope.productoSel,productoActualizar);
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	$scope.eliminarProducto = function (ev,i,p){
		var productoID = {ProID:p.ProID};
		
        var confirm = $mdDialog.confirm()
			.title('Mensaje de Confirmacion?')
			.textContent('Esta seguro que desea eliminar el producto')
			.ariaLabel('Lucky day')
			.targetEvent(ev)
			.ok('Aceptar')
			.cancel('Cancelar');
			  
		$mdDialog.show(confirm).then(function() {
            
            recursoCrud.eliminar("ServicioProducto.php", productoID ).then(
                function(data) {				
                    $mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
                    if(data.estado)
                        $scope.listaProductos.splice(i,1);
                }, function(data) {
                    $mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
                }, function(data) {
                    $mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
                }
            );
        }, function() {
		});
	};	
	$scope.prepararEditar = function(ev,p) {
        
		$scope.productoSel = p;
		$mdDialog.show({
		  controller: ['$scope', '$mdDialog','recursoCrud','upload','producto','unidades','monedas','categorias',DialogControllerProducto],
		  templateUrl: 'administracion/productos/dialogoEditarProducto.tmpl.html',
		  parent: angular.element(document.body),
		  targetEvent: ev,
		  clickOutsideToClose:true,
		  locals: { producto: p , unidades:$scope.listaUnidades,monedas:$scope.listaMonedas,categorias:$scope.listaCategorias}
		})
		.then(function(dato) {
			//guardadno lo cambios hechos            
            if(dato){
                recursoCrud.copiar($scope.productoSel,dato);
                $mdToast.show($mdToast.simple().textContent("Se actualizo correctamente").position('top right').hideDelay(2000));				
            }
            else{
                $mdToast.show($mdToast.simple().textContent("No se pudo actualizar").position('top right').hideDelay(2000));
            }
            //alert("ssis");
            
			
		}, function() {
			//cancelando la funcion
		});
        
        
	};
	$scope.elegirCategoria = function(c) {
		for(var i=0;i<$scope.listaCategorias.length;i++){
			if($scope.listaCategorias[i].CatID == c){
				$scope.producto.Cod =$scope.listaCategorias[i].Pre + "-";
				break;
			}
		}
	};
    
    // ******************************
    // Auto completar
    // ******************************
    $scope.productosSel = [];
    $scope.busquedaProducto = function (query) {
      return query ? $scope.listaProductos.filter( createFilterFor(query) ) : $scope.listaProductos;
    };
    function createFilterFor(query) {
      var res = angular.lowercase(query).split(" ",3);      
      return function filterFn(item) {
          var pos = 0;
          for(var i = 0;i < res.length;i++){
              pos = item.Nom2.indexOf(res[i],pos);
              if(pos==-1)
                  return false;
          }
          return true;
      };
    };
	// ******************************
    // Fin Auto completar
    // ******************************
	
	
	function listarEstablecimientos(){
		recursoCrud.listar("ServicioEstablecimiento.php", {accion:2} ).then(
			function(data) {
				$scope.establecimientos = data.data;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	
	$scope.prepararUbicar = function(ev,p) {
		
		recursoCrud.listar("ServicioEstablecimiento.php", {accion:3,idProducto:p.ProID} ).then(
			function(data) {
				var es = $scope.establecimientos;
				var esP = [];
				var ubicacines = data.data;
				var entro = false;
				
				for(var i=0;i<es.length;i++){
					for(var j=0;j<ubicacines.length;j++){
						if( es[i].EstID == ubicacines[j].EstID){
							entro = true;
							break;
						}
					}
					//si no entro
					if(!entro){
						esP.push(es[i]);
					}
					entro = false;
				}
				$mdDialog.show({
				controller: ['$scope', '$mdDialog','$mdToast','recursoCrud','producto','establecimientos','ubicaciones',DialogControllerUbicar],
				templateUrl: 'administracion/productos/dialogoUbicar.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:true,
				locals: { producto: p,establecimientos:esP,ubicaciones:ubicacines}
				})
				.then(function(dato) {
					$scope.actualizarProducto(dato.p);
				}, function() {});
				
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	
	function validarDatos(producto,productosSel){
		
		if(producto.CatID == 0 ){
			return 'Elija Categoria del producto';
		}
		if(producto.Nom == null || producto.Nom == "" ){
			return 'Ingrese nombre del producto';
		}
		if( producto.CatID==1 ){
			if( productosSel.length == 0 )
				return 'elija productos para el pack';
		}else{
			if( producto.Des == null || producto.Des == "" ){
				return 'Ingrese descripcion del producto';
			}
		}
		if( isNaN(producto.Can) ){
			return 'Ingrese una Cantidad valida';
		}
		if(producto.UniMedID == 0 ){
			return 'Ingrese tipo de unidad';
		}
		if( isNaN(producto.PreCom) ){
			return 'Ingrese un Precio valido';
		}
		if(producto.MonID == 0 ){
			return 'Ingrese Tipo de Moneda';
		}
		
		return "";
	};
	

}]);

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function DialogControllerProducto($scope, $mdDialog,recursoCrud,upload,producto,unidades,monedas,categorias) {
	
	$scope.productoSel = JSON.parse(JSON.stringify(producto));
	$scope.listaUnidades = JSON.parse(JSON.stringify(unidades));
	$scope.listaMonedas = JSON.parse(JSON.stringify(monedas));
	$scope.listaCategorias = JSON.parse(JSON.stringify(categorias));

	$scope.imagen = {};
    $scope.imagen2 = {};
    $scope.imagen3 = {};

	$scope.cancelar = function() {
		$mdDialog.cancel();
	};
	$scope.guardarCambios = function() {
        if($scope.imagen.name && $scope.productoSel.Img!="")
            $scope.productoSel.Img = $scope.productoSel.Cod+$scope.productoSel.Img;
        if($scope.imagen2.name &&$scope.productoSel.Img2!="")
            $scope.productoSel.Img2 = $scope.productoSel.Cod+$scope.productoSel.Img2;
        if($scope.imagen3.name &&$scope.productoSel.Img3!="")
            $scope.productoSel.Img3 = $scope.productoSel.Cod+$scope.productoSel.Img3;
        
        var p = $scope.productoSel;
        var productoActualizar = {Cod:p.Cod,Nom:p.Nom,Des:p.Des,Img:p.Img,Img2:p.Img2,Img3:p.Img3,Can:p.Can,PreCom:p.PreCom,UniMedID:p.UniMedID,MonID:p.MonID,CatID:p.CatID};
		var productoID = {ProID:p.ProID};
        
        recursoCrud.actualizar("ServicioProducto.php", {dato:productoActualizar,ID:productoID} ).then(
			function(data) {				
				
				if(data.estado){
                    if($scope.imagen.name)
                        upload.enviarArchivo2($scope.imagen,"archivos/",p.Img,true).then(function(res){
                            $scope.imagen = {};
                            if(!$scope.imagen.name && !$scope.imagen2.name && !$scope.imagen3.name){ 
                                $mdDialog.hide(p);
                            }
                            
                        });
                    if($scope.imagen2.name)
                        upload.enviarArchivo2($scope.imagen2,"archivos/",p.Img2).then(function(res){
                            $scope.imagen2 = {};
                            if(!$scope.imagen.name && !$scope.imagen2.name && !$scope.imagen3.name){ 
                                $mdDialog.hide(p);
                            }
                            
                        });
                        
                    if($scope.imagen3.name)
                        upload.enviarArchivo2($scope.imagen3,"archivos/",p.Img3).then(function(res){
                            $scope.imagen3 = {};
                            if(!$scope.imagen.name && !$scope.imagen2.name && !$scope.imagen3.name){ 
                                $mdDialog.hide(p);
                            }
                            
                        });
                        
                    if(!$scope.imagen.name && !$scope.imagen2.name && !$scope.imagen3.name){ 
                        $mdDialog.hide(p);
                    }
                }
                else
                    $mdDialog.hide();
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
            
        
        
		
	};
  
	$scope.elegirCategoria = function(c) {
		for(var i=0;i<$scope.listaCategorias.length;i++){
			if($scope.listaCategorias[i].CatID == c){
				$scope.productoSel.Cod =$scope.listaCategorias[i].Pre + $scope.productoSel.Cod.substr( $scope.productoSel.Cod.indexOf('-'));
				break;
			}
		}
	};
};

function DialogControllerUbicar($scope, $mdDialog,$mdToast,recursoCrud,producto,establecimientos,ubicaciones) {
	
	$scope.ubicaciones = ubicaciones;
	$scope.producto = producto;
	$scope.ubicacion = {EstID:0,Can:0,ProID:$scope.producto.ProID};
	$scope.establecimientos = establecimientos;

	$scope.cancelar = function() {
		$mdDialog.cancel();
	};
	$scope.agregarUbicacion = function() {
		recursoCrud.insertar("ServicioEstablecimiento.php", {accion:2,ubicacion:$scope.ubicacion} ).then(
			function(data) {
				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado){
					actualizarEstablecimiento($scope.ubicacion.EstID);
					$scope.ubicaciones.push($scope.ubicacion);
					sumarTotal();
					$scope.ubicacion = {EstID:0,Can:0,ProID:$scope.producto.ProID};
				}
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	function actualizarEstablecimiento(id){
		for(var i=0;i<$scope.establecimientos.length;i++){
			if($scope.establecimientos[i].EstID == id){
				$scope.ubicacion.Nom = $scope.establecimientos[i].Nom;
				$scope.establecimientos.splice(i,1);
				break;
			}
		}
	};
	function sumarTotal(){
		var tot = 0;
		for(var i=0;i<$scope.ubicaciones.length;i++){
			tot += Number($scope.ubicaciones[i].Can);
		}
		$scope.producto.Can = tot;
		/*
		recursoCrud.actualizar("ServicioProducto.php", {dato:{Can:tot},ID:{ProID:$scope.producto.ProID}} ).then(
			function(data) {				
				//$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado)
					$scope.producto.Can = tot;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);*/
	};
};