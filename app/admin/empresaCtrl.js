'use strict';

//controlador principal de toda la aplicacion
miApp.controller('empresaCtrl',['$scope','$mdDialog','$mdToast','recursoCrud', function($scope,$mdDialog,$mdToast,recursoCrud) {
	
	$scope.empresa = {};
    $scope.paises = [{PaiID:1,Nom:"peru"},{PaiID:2,Nom:"argentina"},{PaiID:3,Nom:"bolivia"},{PaiID:4,Nom:"brasil"},{PaiID:5,Nom:"chile"},{PaiID:6,Nom:"colombia"},{PaiID:7,Nom:"ecuador"}];
	
	
	$scope.buscarEmpresa = function (){
		recursoCrud.get("OrganizationService.php", {accion:1} ).then(
			function(data) {
                if(data.estado){
                    $scope.empresa = data.resultado;
                }
                $scope.estado= data.estado;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
    $scope.guardarDatosEmpresa = function (ev){
		
		/*var men = validarDatos($scope.empresa);
		if( men!="" ){
			$mdToast.show($mdToast.simple().textContent(men).position('top right').hideDelay(2000));
			return;
		}*/
        var OrgID = {OrgID:$scope.empresa.OrgID};
        
        var confirm = $mdDialog.confirm()
			.title('Mensaje de Confirmacion?')
			.textContent('Esta seguro que desea cambiar los datos de la Empresa')
			.ariaLabel('Lucky day')
			.targetEvent(ev)
			.ok('Aceptar')
			.cancel('Cancelar');
			  
		$mdDialog.show(confirm).then(function() {
		
            recursoCrud.actualizar("OrganizationService.php", {dato:$scope.empresa,ID: OrgID}).then(
                function(data) {
                    $mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
                }, function(data) {
                    $mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
                }, function(data) {
                    $mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
                }
            );
        }, function() {
            $scope.buscarEmpresa();
		});
	};
    
    function validarDatos(empresa){
	
        if(empresa.dni == null || empresa.dni == "" ){
			return 'Ingrese el numero dni';
		}
        if( isNaN(empresa.dni) || empresa.dni.length != 8 ){
			return 'El dni debe ser un numero de 8 digitos';
		}
		if(empresa.Nom == null || empresa.Nom == "" ){
			return 'Ingrese nombre';
		}
		if(empresa.PriApe == null || empresa.PriApe == "" ){
			return 'Ingrese primer apellido';
		}
		if(empresa.SegApe == null || empresa.SegApe == "" ){
			return 'Ingrese segundo apellido';
		}
		if(empresa.FecNac == null || empresa.FecNac == ""){
			return 'Ingrese fecha de nacimiento';
		}		
		if(empresa.Tel == null || empresa.Tel == "" ){
			return 'Ingrese numero de contacto';
		}
		if(empresa.Ema == null || empresa.Ema == "" ){
			return 'Ingrese correo electronico';
		}
        if(empresa.PaiID == 0 ){
			return 'Elija pais de origen';
		}
		if(empresa.CiuPro == null || empresa.CiuPro == "" ){
			return 'Ingrese ciudad o provincia';
		}
		
		return "";
	};
    
    
    /*
    var confirm = $mdDialog.confirm()
			.title('Mensaje de Confirmacion?')
			.textContent('Esta seguro que validara la solicitud')
			.ariaLabel('Lucky day')
			.targetEvent(ev)
			.ok('Aceptar')
			.cancel('Cancelar');
			  
		$mdDialog.show(confirm).then(function() {
			
			s.IGV = s.MonPag/IGV;
			var subTot =  +(Math.round(s.IGV+ "e+1")  + "e-1");
			s.IGV = +(Math.round( s.MonPag - subTot+ "e+1")  + "e-1");
			
			
			recursoCrud.insertar("ServicioSolicitud.php", {solicitud:s,accion:2,periodoID:$scope.periodo.PerTauID,usuarioID:usuarioID}).then(
		
				function(data) {
					$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
					if(data.estado){
						$scope.solicitudes.splice(i, 1);
					}
				}, function(data) {
					$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
				}, function(data) {
					$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
				}
			);
			
			
		}, function() {
		  
		});
    */
}]);

