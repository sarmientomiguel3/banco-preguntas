'use strict';

//controlador principal de toda la aplicacion
miApp.controller('trabajadorCtrl', ['$scope','$mdDialog','$mdToast','recursoCrud',function($scope,$mdDialog,$mdToast,recursoCrud) {
	
    $scope.persona = {Nom:"",PriApe:"",SegApe:"",FecNac:"",SexId:'F',EstCivID:1,Tel:"",Ema:"",CiuPro:"",PaiID:0,DirAct:"",dni:""};
	$scope.usu = {NomUsu:"",Pas:"",RolID:0,EstID:0,EstReg:'A'};
	$scope.usuSel = {};
	$scope.listaUsuarios = [];
	$scope.listaRoles = [];
	$scope.establecimientos = [];
	$scope.establecimientosSel = [];
    
    $scope.paises = [{PaiID:1,Nom:"peru"},{PaiID:2,Nom:"argentina"},{PaiID:3,Nom:"bolivia"},{PaiID:4,Nom:"brasil"},{PaiID:5,Nom:"chile"},{PaiID:6,Nom:"colombia"},{PaiID:7,Nom:"ecuador"}];
	
	listarRoles();
	listarEstablecimientos();
	
	function listarRoles(){
		recursoCrud.listar("ServicioRoles.php", {accion:2} ).then(
			function(data) {
				$scope.listaRoles = data.data;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				//alert( data);
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	function listarEstablecimientos(){
		recursoCrud.listar("ServicioEstablecimiento.php", {accion:4} ).then(
			function(data) {
				$scope.establecimientos = data.data;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				//alert( data);
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	$scope.elegirEstablecimientos = function (){
		
		$scope.usu.EstID = 0;
		/*
		var rol = {};
		for(var i=0;i<$scope.listaRoles.length;i++)
			if( $scope.usu.RolID == $scope.listaRoles[i].RolID ){
				rol = $scope.listaRoles[i];
				break;				
			}*/
		$scope.establecimientosSel = [];
	
		for(var i=0;i<$scope.establecimientos.length;i++){
			if( $scope.usu.RolID.TipEst == $scope.establecimientos[i].TipEstID ){
				$scope.establecimientosSel.push($scope.establecimientos[i]);			
			}
		}
	};
	
	$scope.registrarUsu = function (){
		
		var men = validarDatos($scope.persona,$scope.usu,$scope.establecimientosSel);
		if( men!="" ){
			$mdToast.show($mdToast.simple().textContent(men).position('top right').hideDelay(2000));
			return;
		}
        
        if( $scope.confirmacionPas !== $scope.usu.Pas ){
			$mdToast.show($mdToast.simple().textContent("la contraseña ingresada no coincide, ingrese de nuevo").position('top right').hideDelay(1000));
            $scope.confirmacionPas ="";
			return;
		}
        
		$scope.usu.RolID = $scope.usu.RolID.RolID;
		
		recursoCrud.insertar("ServicioUsuario.php", {persona:$scope.persona,usuario:$scope.usu} ).then(
		
			function(data) {
				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado){
					$scope.usu.UseId = data.ID;
					for (var i in $scope.listaRoles)
						if($scope.listaRoles[i].RolID == $scope.usu.RolID ){
							$scope.usu.rol = $scope.listaRoles[i].Nom;
							break;
						}
					$scope.listaUsuarios.push($scope.usu);
					$scope.persona = {Nom:"",PriApe:"",SegApe:"",FecNac:"",SexId:'F',EstCivID:1,Tel:"",Ema:"",CiuPro:"",PaiID:0,DirAct:"",dni:""};
                    $scope.usu = {NomUsu:"",Pas:"",RolID:0,EstID:0,EstReg:'A'};
                    $scope.confirmacionPas ="";
				}
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	$scope.listarUsuarios = function (){
		recursoCrud.listar("ServicioUsuario.php", {accion:2} ).then(
			function(data) {
				$scope.listaUsuarios = data.data;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	$scope.actualizarUsu = function (u){
		
		//$scope.usu.RolID = $scope.usu.RolID.RolID;
		
		var usuActualizar = {NomUsu:u.NomUsu,Pas:u.Pas,RolID:u.RolID.RolID,EstID:u.EstID};
		var UseId = {UseId:u.UseId};
		
		recursoCrud.actualizar("ServicioUsuario.php", {dato:usuActualizar,ID:UseId} ).then(
			function(data) {				
				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado)
					recursoCrud.copiar($scope.usuSel,u);
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	$scope.eliminarUsu = function (ev,i,miUsu){
		var UseId = {UseId:miUsu.UseId};
		var confirm = $mdDialog.confirm()
			.title('Mensaje de Confirmacion?')
			.textContent('Esta seguro que desea eliminar al usuario')
			.ariaLabel('Lucky day')
			.targetEvent(ev)
			.ok('Aceptar')
			.cancel('Cancelar');
			  
		$mdDialog.show(confirm).then(function() {
            
            recursoCrud.eliminar("ServicioUsuario.php", UseId ).then(
                function(data) {				
                    $mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
                    if(data.estado)
                        $scope.listaUsuarios.splice(i,1);
                }, function(data) {
                    $mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
                }, function(data) {
                    $mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
                }
            );
        }, function() {	  
		});
	};
	
	$scope.prepararEditar = function(ev,u) {
		
		$scope.usuSel = u;
		$mdDialog.show({
		  controller: DialogControllerUsu,
		  templateUrl: 'administracion/dialogoTrabajador.html',
		  parent: angular.element(document.body),
		  targetEvent: ev,
		  clickOutsideToClose:true,
		  locals: { usu: u, roles:$scope.listaRoles ,establecimientos:$scope.establecimientos}
		})
		.then(function(usuEditado) {
			//guardadno lo cambios hechos
			$scope.actualizarUsu(usuEditado);
		}, function() {
			//cancelando la funcion
		});
	};
	

}]);

function validarDatos(persona,usuario,establecimientos){

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
            return 'Ingrese Nombre de usuario';
        if( !usuario.Pas || usuario.Pas=="" )
            return 'Ingrese Password';
    }
    if(usuario.RolID == 0 )
        return 'Ingrese Rol de usuario';
    if( !isNaN( usuario.RolID.TipEst ) > 0 ){
        if(establecimientos.length == 0)
            return 'No hay Establecimientos para asignar';
        if(usuario.EstID == 0)
            return 'Ingrese el Establecimiento al que pertenecera el usuario';
        
    }
    
    return "";
};
function validarDatos2(usuario,establecimientos){
    
    if( !usuario.NomUsu || usuario.NomUsu=="" )
        return 'Ingrese Nombre de usuario';
    if( !usuario.Pas || usuario.Pas=="" )
        return 'Ingrese Password';
    if(usuario.RolID == 0 )
        return 'Ingrese Rol de usuario';
    if( !isNaN( usuario.RolID.TipEst ) > 0 ){
        if(establecimientos.length == 0)
            return 'No hay Establecimientos para asignar';
        if(usuario.EstID == 0)
            return 'Ingrese el Establecimiento al que pertenecera el usuario';
        
    }
    
    return "";
};

function DialogControllerUsu($scope, $mdDialog,$mdToast,usu,roles,establecimientos) {
	$scope.usuSel = JSON.parse(JSON.stringify(usu));
	$scope.listaRoles = roles;
	$scope.establecimientos = establecimientos;
	$scope.establecimientosSel = [];
	
	elegirEstablecimientos();
	
	$scope.cancelar = function() {
		$mdDialog.cancel();
	};
	$scope.guardarCambios = function() {
		
		var men = validarDatos2($scope.usuSel,$scope.establecimientosSel);
		if( men!="" ){
			$mdToast.show($mdToast.simple().textContent(men).position('top right').hideDelay(2000));
			return;
		}
		$scope.usuSel.rol = $scope.usuSel.RolID.Nom;
		/*
		for (var i in $scope.listaRoles)
			if($scope.listaRoles[i].RolID == $scope.usuSel.RolID ){
				$scope.usuSel.rol = $scope.listaRoles[i].Nom;
				break;
			}
		*/	
		$mdDialog.hide($scope.usuSel);
	};
	$scope.elegirEstablecimientos = function (){
		$scope.usuSel.EstID = 0;
		/*var rol = {};
		for(var i=0;i<$scope.listaRoles.length;i++)
			if( $scope.usuSel.RolID == $scope.listaRoles[i].RolID ){
				rol = $scope.listaRoles[i];
				break;				
			}*/
		$scope.establecimientosSel = [];
	
		for(var i=0;i<$scope.establecimientos.length;i++){
			if( $scope.usuSel.RolID.TipEst == $scope.establecimientos[i].TipEstID ){
				$scope.establecimientosSel.push($scope.establecimientos[i]);			
			}
		}
	};
	function elegirEstablecimientos(){
		for(var i=0;i<$scope.listaRoles.length;i++)
			if( $scope.usuSel.RolID == $scope.listaRoles[i].RolID ){
				$scope.usuSel.RolID = $scope.listaRoles[i];
				break;				
			}
		$scope.establecimientosSel = [];
	
		for(var i=0;i<$scope.establecimientos.length;i++){
			if( $scope.usuSel.RolID.TipEst == $scope.establecimientos[i].TipEstID ){
				$scope.establecimientosSel.push($scope.establecimientos[i]);			
			}
		}
	};
};
