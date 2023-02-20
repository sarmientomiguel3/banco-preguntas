'use strict';

//controlador principal de toda la aplicacion
miApp.controller('administradorCtrl', ['$scope','$mdDialog','$mdToast','recursoCrud',function($scope,$mdDialog,$mdToast,recursoCrud) {
	
    $scope.estado = false;
    $scope.persona = {};
    //$scope.persona = {Nom:"",PriApe:"",SegApe:"",FecNac:"",SexId:'F',EstCivID:1,Tel:"",Ema:"",CiuPro:"",PaiID:0,DirAct:"",dni:"",RUC:"",EstReg:'A'};
	$scope.usuario = {};
    $scope.paises = [{PaiID:1,Nom:"peru"},{PaiID:2,Nom:"argentina"},{PaiID:3,Nom:"bolivia"},{PaiID:4,Nom:"brasil"},{PaiID:5,Nom:"chile"},{PaiID:6,Nom:"colombia"},{PaiID:7,Nom:"ecuador"}];
	$scope.listRoles = [];
	
	// $scope.listarAdministrador = function (){
	// 	recursoCrud.get("ServicioUsuario.php", {accion:4} ).then(
	// 		function(data) {
    //             if(data.estado){
    //                 $scope.usuario = data.resultado.r1;
    //                 $scope.persona = data.resultado.r2;
    //                 $scope.persona.FecNac = new Date($scope.persona.FecNac);
    //             }
    //             $scope.estado= data.estado;
	// 		}, function(data) {
	// 			$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
	// 		}, function(data) {
	// 			$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
	// 		}
	// 	);
	// };
    
    $scope.registrarAdministrador = function (){
		
		var men = validarDatos($scope.persona,$scope.usuario);
		if( men!="" ){
			$mdToast.show($mdToast.simple().textContent(men).position('top right').hideDelay(2000));
			return;
		}
        
        var perID = {PerID:$scope.persona.PerID};
		
		recursoCrud.insertar("ServicioUsuario.php", {persona:$scope.persona,usuario:$scope.usuario}).then(
			function(data) {
				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado){
                    $scope.persona.PerID = data.ID;
                    $scope.usuario.UseId = data.ID;
				}
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
    $scope.guardarDatosAdministrador = function (ev){
		
		var men = validarDatos($scope.persona);
		if( men!="" ){
			$mdToast.show($mdToast.simple().textContent(men).position('top right').hideDelay(2000));
			return;
		}        
        var perID = {PerID:$scope.persona.PerID};
        
        var confirm = $mdDialog.confirm()
			.title('Mensaje de Confirmacion?')
			.textContent('Esta seguro que desea cambiar los datos personales del administrador')
			.ariaLabel('Lucky day')
			.targetEvent(ev)
			.ok('Aceptar')
			.cancel('Cancelar');
			  
		$mdDialog.show(confirm).then(function() {
		
            recursoCrud.actualizar("ServicioPersona.php", {dato:$scope.persona,ID: perID}).then(
                function(data) {
                    $mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
                }, function(data) {
                    $mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
                }, function(data) {
                    $mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
                }
            );
        }, function() {
            $scope.listarAdministrador();		  
		});
	};
    
	$scope.guardarDatosUsuario = function (ev){
        
        if( !$scope.usuario.NomUsu || $scope.usuario.NomUsu=="" ){
			$mdToast.show($mdToast.simple().textContent("Ingrese Nombre usuario").position('top right').hideDelay(2000));
			return;
		}
        if( !$scope.usuario.Pas || $scope.usuario.Pas=="" ){
			$mdToast.show($mdToast.simple().textContent("Ingrese Password").position('top right').hideDelay(2000));
			return;
		}
        
        var confirm = $mdDialog.confirm()
			.title('Mensaje de Confirmacion?')
			.textContent('Esta seguro que desea cambiar la contraseña del administrador de la empresa')
			.ariaLabel('Lucky day')
			.targetEvent(ev)
			.ok('Aceptar')
			.cancel('Cancelar');
			  
		$mdDialog.show(confirm).then(function() {
		
            var usuActualizar = {NomUsu:$scope.usuario.NomUsu,Pas:$scope.usuario.Pas};
            var UseId = {UseId:$scope.usuario.UseId};
            
            recursoCrud.actualizar("ServicioUsuario.php", {dato:usuActualizar,ID:UseId} ).then(
                function(data) {				
                    $mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
                }, function(data) {
                    $mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
                }, function(data) {
                    $mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
                }
            );
        
        }, function() {
            $scope.listarAdministrador();		  
		});
	};
    
    function validarDatos(persona,usuario){
	
        if(persona.dni == null || persona.dni == "" ){
			return 'Ingrese el numero dni';
		}
        if( isNaN(persona.dni) || persona.dni.length != 8 ){
			return 'El dni debe ser un numero de 8 digitos';
		}
		if(persona.Nom == null || persona.Nom == "" ){
			return 'Ingrese nombre';
		}
		if(persona.PriApe == null || persona.PriApe == "" ){
			return 'Ingrese primer apellido';
		}
		if(persona.SegApe == null || persona.SegApe == "" ){
			return 'Ingrese segundo apellido';
		}
		if(persona.FecNac == null || persona.FecNac == ""){
			return 'Ingrese fecha de nacimiento';
		}
        if(persona.SexId == 0 ){
			return 'Elija el sexo de la persona';
		}		
        if(persona.EstCivID == 0 ){
			return 'Elija el estado civil de la persona';
		}
		if(persona.Tel == null || persona.Tel == "" ){
			return 'Ingrese numero de contacto';
		}
		if(persona.Ema == null || persona.Ema == "" ){
			return 'Ingrese correo electronico';
		}
        if(persona.PaiID == 0 ){
			return 'Elija pais de origen';
		}
		if(persona.CiuPro == null || persona.CiuPro == "" ){
			return 'Ingrese ciudad o provincia';
		}
        
        if(usuario){
            if( !usuario.NomUsu || usuario.NomUsu=="" )
                return 'Ingrese Nombre usuario';
            if( !usuario.Pas || usuario.Pas=="" )
                return 'Ingrese Password';
        }
		
		return "";
	};
    
	$scope.cargarRoles = function () {
        recursoCrud.listar("ServicioRoles.php", { accion: 1, usuario: {} }).then(
            function (data) {
                $scope.listRoles = data.data;
                // $scope.listRoles = [{codRol:1,NomRol:"Administradores"},{codRol:1,NomRol:"Docentes"},{codRol:1,NomRol:"Revisores"}];
            }
        )
        // $scope.listRoles = [{codRol:1,NomRol:"Administradores"},{codRol:1,NomRol:"Docentes"},{codRol:1,NomRol:"Revisores"}];
    }
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