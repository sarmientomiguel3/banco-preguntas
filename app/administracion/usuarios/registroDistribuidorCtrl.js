'use strict';

//controlador principal de toda la aplicacion
miApp.controller('registroDistribuidorCtrl',['$scope','$mdToast','$mdDialog','recursoCrud', function($scope,$mdToast,$mdDialog,recursoCrud) {
	
	$scope.persona = {Nom:"",PriApe:"",SegApe:"",FecNac:"",SexId:'F',EstCivID:1,Tel:"",Ema:"",CiuPro:"",PaiID:0,DirAct:"",dni:"",RUC:"",EstReg:'A',Img:""};
	$scope.distribuidor = {DisID:"",PunVal:0,PunValGru:0,NumPat:0,UseId:0,StaID:0,EstReg:'A',ForPagID:1};
	$scope.registro = {DisID:"",Tot:0,IGV:0,PunTot:0,PunPat:0,ProPacID:0,FecCre:"",UseId:0,ValVen:0};
	$scope.usu = {NomUsu:"",Pas:"",RolID:3,EstReg:'A'};
	$scope.periodo = "";
	
	buscarPeriodoActual();
	
	
	$scope.paises = [{PaiID:1,Nom:"peru"},{PaiID:2,Nom:"argentina"},{PaiID:3,Nom:"bolivia"},{PaiID:4,Nom:"brasil"},{PaiID:5,Nom:"chile"},{PaiID:6,Nom:"colombia"},{PaiID:7,Nom:"ecuador"}];
		
	$scope.distribuidores = [];
    
    $scope.confirmacionPas ="";
	
	$scope.registrarDistribuidor = function (idUsuario){
		
		
		var men = validarDatos($scope.periodo,$scope.persona,$scope.distribuidor);
		if( men!="" ){
			$mdToast.show($mdToast.simple().textContent(men).position('top right').hideDelay(2000));
			return;
		}
        
        if( $scope.confirmacionPas !== $scope.usu.Pas ){
			$mdToast.show($mdToast.simple().textContent("la contraseña ingresada no coincide, ingrese de nuevo").position('top right').hideDelay(1000));
            $scope.confirmacionPas ="";
			return;
		}
		
		$scope.registro.UseId = idUsuario;
		
		recursoCrud.insertar("ServicioDistribuidor.php", {accion:1, persona:$scope.persona,usuario:$scope.usu,distribuidor:$scope.distribuidor,registro:$scope.registro,periodoID:$scope.periodo.PerTauID} ).then(		
		
			function(data) {
				$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
				if(data.estado){
					//VER
					/*$scope.distribuidor.DisID = data.ID;
					$scope.distribuidores.push($scope.distribuidor);*/
					
					$scope.persona = {Nom:"",PriApe:"",SegApe:"",FecNac:"",SexId:'F',EstCivID:1,Tel:"",Ema:"",CiuPro:"",PaiID:0,DirAct:"",dni:"",RUC:"",EstReg:'A',Img:""};
					$scope.distribuidor = {DisID:"",PunVal:0,PunValGru:0,NumPat:0,UseId:0,StaID:0,EstReg:'A',ForPagID:1};
					$scope.registro = {DisID:"",Tot:0,IGV:0,PunTot:0,PunPat:0,ProPacID:0,FecCre:"",UseId:0,ValVen:0};
					$scope.usu = {NomUsu:"",Pas:"",RolID:0,EstReg:'A'};
                    $scope.confirmacionPas ="";
				}
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
	
	$scope.listarDistribuidores = function(){
		recursoCrud.listar("ServicioDistribuidor.php", {accion:1} ).then(
			function(data) {
				$scope.distribuidores = data.data;
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
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
    
    $scope.verDatos = function(ev,d) {
		$mdDialog.show({
		  controller: ['$scope', '$mdDialog','$mdToast','recursoCrud','datos',DialogControllerDistribuidor],
		  templateUrl: 'administracion/usuarios/dialogoDistribuidor.html',
		  parent: angular.element(document.body),
		  targetEvent: ev,
		  clickOutsideToClose:true,
		  locals: { datos: d }
		})
		.then(function(dato) {
			
            recursoCrud.copiar(d,dato);
			
		}, function() {
			//cancelando la funcion
		});
	};
    
    
	function validarDatos(periodo,persona,distribuidor){
		
		if( periodo=="" ){
			return 'no puede solicitar inscripcion, por que no se inicio el Periodo Taured';
		}
		
	
		if(persona.Nom == null || persona.Nom == "" ){
			return 'Ingrese nombre del distribuidor';
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
		if(persona.Tel == null || persona.Tel == "" ){
			return 'Ingrese numero de contacto';
		}
		if(persona.Ema == null || persona.Ema == "" ){
			return 'Ingrese correo electronico';
		}
		if(persona.CiuPro == null || persona.CiuPro == "" ){
			return 'Ingrese ciudad o provincia';
		}
		if(persona.PaiID == 0 ){
			return 'Elija pais de origen';
		}
		/*
		if(persona.DirAct == null || persona.DirAct == "" ){
			return 'Ingrese Direccion actual';
		}*/
		if(persona.dni == null || persona.dni == "" ){
			return 'Ingrese el nuemro dni';
		}
		if( isNaN(persona.dni) || persona.dni.length != 8 ){
			return 'El dni debe ser un numero de 8 digitos';
		}
		if(persona.RUC != null && persona.RUC != "" ){
			if( (isNaN(persona.RUC) || persona.RUC.length != 11) ){
				return 'El RUC debe ser un numero de 11 digitos';
			}
		}
		else
			persona.RUC = undefined;
		
		
		return "";
	};
}]);

function DialogControllerDistribuidor($scope,$mdDialog,$mdToast,recursoCrud,datos) {
	
  $scope.datosSel = JSON.parse(JSON.stringify(datos));
  $scope.cancelar = function() {
    $mdDialog.cancel();
  };
  $scope.guardarCambios = function() {
    
    var p = $scope.datosSel;
    var persona = {Nom:p.Nom,PriApe:p.PriApe,SegApe:p.SegApe,dni:p.dni,RUC:p.RUC,FecNac:p.FecNac,CiuPro:p.CiuPro,DirAct:p.DirAct,Ema:p.Ema,Tel:p.Tel,SexId:p.SexId,EstCivID:p.EstCivID};
    var personaID = {PerID:p.PerID};
    
    recursoCrud.actualizar("ServicioPersona.php", {ID:personaID,dato:persona} ).then(
        function(res) {
            $mdToast.show($mdToast.simple().textContent(res.mensaje).position('top right').hideDelay(2000));
            if(res.estado){
                persona.PerID = p.PerID;
                persona.DisID = p.DisID;
                persona.sta = p.sta;
                $mdDialog.hide(persona);
            }
        }, function(res) {
            $mdToast.show($mdToast.simple().textContent(res).position('top right').hideDelay(6000));
        }, function(res) {
            $mdToast.show($mdToast.simple().textContent(res).position('top right').hideDelay(6000));
        }
    );
    
  };
  $scope.enviarDatos = function() {
      
    var p = $scope.datosSel;
    
    recursoCrud.get("ServicioUsuario.php", {PerID:p.PerID,Nom:p.Nom+" "+ p.PriApe,Ema:p.Ema,accion:5} ).then(
        function(res) {
            $mdToast.show($mdToast.simple().textContent(res.mensaje).position('top right').hideDelay(2000));
        }, function(res) {
            $mdToast.show($mdToast.simple().textContent(res).position('top right').hideDelay(6000));
        }, function(res) {
            $mdToast.show($mdToast.simple().textContent(res).position('top right').hideDelay(6000));
        }
    );
    
  };
  
  
};
