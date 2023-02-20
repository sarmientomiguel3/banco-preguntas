'use strict';

//controlador principal de toda la aplicacion
miApp.controller('listaSolicitudesCtrl',['$scope','$mdToast','$mdDialog','recursoCrud', function($scope,$mdToast,$mdDialog,recursoCrud) {
	
	$scope.solicitudes = [];
    $scope.filtros = [];
	$scope.solicitud = {};
	$scope.periodo = "";
	
	buscarPeriodoActual();
	
	$scope.listarSolicitudes = function(){
		recursoCrud.listar("ServicioSolicitud.php", {accion:1} ).then(
			function(data) {
				$scope.solicitudes = data.data;
                iniciarPosiciones($scope.solicitudes);
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
    $scope.prepararConfirmacion= function (ev,s,usuarioID){
        
        if( $scope.periodo=="" ){
			$mdToast.show($mdToast.simple().textContent("no pudo aceptar solicitud, por que no se inicio el Periodo Taured").position('top right').hideDelay(3000));
			return;
		}
		if(s.RUC==null){
			s.RUC = 0;
		}
        
        recursoCrud.listar("ServicioEstablecimiento.php", {accion:3,idProducto:s.ProPacID} ).then(
			function(res) {
                
				var ubicacines = res.data;
                
				$mdDialog.show({
				controller: ['$scope','$mdDialog','$mdToast','recursoCrud','solicitud','ubicaciones','periodoID','usuarioID',DialogControllerConfirmarSolicitud],
				templateUrl: 'administracion/usuarios/dialogoConfirmarSolicitud.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:true,
				locals: {solicitud:s, ubicaciones:ubicacines, periodoID:$scope.periodo.PerTauID,usuarioID:usuarioID}
				})
				.then(function(dato) {
					$scope.solicitudes.splice(s.i, 1);
				}, function() {});
				
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	
	$scope.verDatos = function(ev,s) {
		$mdDialog.show({
		  controller: DialogControllerSolicitud,
		  templateUrl: 'administracion/usuarios/dialogoSolicitud.tmpl.html',
		  parent: angular.element(document.body),
		  targetEvent: ev,
		  clickOutsideToClose:true,
		  locals: { datos: s }
		})
		.then(function(dato) {
			
			recursoCrud.actualizar("ServicioSolicitud.php", {accion:1,SolID:dato.SolID}).then(
		
				function(data) {
					$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
					if(data.estado){
						$scope.solicitudes.splice(s.i, 1);
					}
				}, function(data) {
					$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
				}, function(data) {
					$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
				}
			);
			
		}, function() {
			//cancelando la funcion
		});
	};
	function buscarPeriodoActual(){
		recursoCrud.get("ServicioPeriodo.php", {accion:1} ).then(
			function(data) {
				if(data.estado)
					$scope.periodo = data.resultado;
				else
					$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	
}]);

function DialogControllerSolicitud($scope,$mdDialog,datos) {
	
  $scope.datosSel = JSON.parse(JSON.stringify(datos));
  $scope.cancelar = function() {
    $mdDialog.cancel();
  };
  $scope.observarSolicitud = function() {
	  
	/* var confirm = $mdDialog.confirm()
			.title('Mensaje de Confirmacion?')
			.textContent('Esta seguro que hay una observacion en la Solicitud')
			.ariaLabel('Lucky day')
			.targetEvent(ev)
			.ok('Aceptar')
			.cancel('Cancelar');
			  
		$mdDialog.show(confirm).then(function() {*/
			$mdDialog.hide($scope.datosSel);			
		/*}, function() {
		  
		});*/
    
  };
  
  
};

function DialogControllerConfirmarSolicitud($scope,$mdDialog,$mdToast,recursoCrud,solicitud,ubicaciones,periodoID,usuarioID) {
	
  $scope.datosSel = solicitud;
  $scope.ubicaciones = ubicaciones;
  var IGV = 1.18;
  
  $scope.cancelar = function() {
    $mdDialog.cancel();
  };
  
  $scope.aceptarSolicitud = function() {
      
    var cantidad = buscarContenido($scope.ubicaciones,"EstID","Can",Number($scope.EstSel));
      
    if( cantidad <=0){
        $mdToast.show($mdToast.simple().textContent("No hay stock del pack").position('top right').hideDelay(2000));
        return;
    }
      
      var s = $scope.datosSel;
      
        s.IGV = s.MonPag/IGV;
        var subTot =  +(Math.round(s.IGV+ "e+1")  + "e-1");
        s.IGV = +(Math.round( s.MonPag - subTot+ "e+1")  + "e-1");
        
        
        recursoCrud.insertar("ServicioSolicitud.php", {solicitud:s,accion:2,periodoID:periodoID,usuarioID:usuarioID,EstID:$scope.EstSel}).then(
    
            function(data) {
                $mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
                if(data.estado){                    
                    $mdDialog.hide();
                }
            }, function(data) {
                $mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
            }, function(data) {
                $mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
            }
        );
    
  };
  
  
};
