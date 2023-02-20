'use strict';

//controlador principal de toda la aplicacion
miApp.controller('perfilCtrl',['$mdDialog','$mdToast','recursoCrud','upload', function($mdDialog,$mdToast,recursoCrud,upload) {
    
    var vm = this;
	
    vm.paises = [{PaiID:1,Nom:"peru"},{PaiID:2,Nom:"argentina"},{PaiID:3,Nom:"bolivia"},{PaiID:4,Nom:"brasil"},{PaiID:5,Nom:"chile"},{PaiID:6,Nom:"colombia"},{PaiID:7,Nom:"ecuador"}];
    
    vm.pasAnterior = "";
    vm.pasNuevo = "";
    vm.NomUsu = "";
    vm.imagen = {};

    vm.cambiarContrasena = function(ev) {
      
        if( vm.pasAnterior=="" ){
            $mdToast.show($mdToast.simple().textContent("Ingrese Password Anterior").position('top right').hideDelay(2000));
            return;
        }
        if( vm.pasNuevo=="" ){
            $mdToast.show($mdToast.simple().textContent("Ingrese el Nuevo Password").position('top right').hideDelay(2000));
            return;
        }
        
        if( vm.confirmacionPas !== vm.pasNuevo ){
			$mdToast.show($mdToast.simple().textContent("la contraseña ingresada no coincide, ingrese de nuevo").position('top right').hideDelay(1000));
            vm.confirmacionPas ="";
			return;
		}
        var confirm = $mdDialog.confirm()
            .title('Mensaje de Confirmacion?')
            .textContent('Esta seguro que desea cambiar su contraseña')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Aceptar')
            .cancel('Cancelar');
              
        $mdDialog.show(confirm).then(function() {
            var u = {PasAnt:vm.pasAnterior,Pas:vm.pasNuevo,NomUsu:vm.NomUsu};
            
            recursoCrud.actualizar("ServicioUsuario.php", {accion:1,usuario:u} ).then(
                function(data) {				
                    $mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
                    if(data.estado){
                        vm.pasNuevo ="";
                        vm.pasAnterior ="";
                        vm.confirmacionPas ="";
                    }
                        //$scope.usuario.Pas = usuActualizar.Pas;
                }, function(data) {
                    $mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
                }, function(data) {
                    $mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
                }
            );        
        }, function() {		  
        });

    };    
    vm.copiarDatos = function(u){        
    
        vm.usuario = {};
        vm.usuario.CiuPro = u.CiuPro;
        vm.usuario.dni = u.dni;
        vm.usuario.DirAct = u.DirAct;
        vm.usuario.Ema = u.Ema;
        vm.usuario.EstCivID = u.EstCivID;
        vm.usuario.FecNac = new Date(u.FecNac);
        vm.usuario.Nom = u.Nom;
        vm.usuario.PaiID = u.PaiID;
        vm.usuario.PriApe = u.PriApe;
        vm.usuario.RUC = u.RUC;
        vm.usuario.SegApe = u.SegApe;
        vm.usuario.SexId = u.SexId;
        vm.usuario.Tel = u.Tel;
        vm.usuario.Img = u.Img;
        
        vm.NomUsu = u.NomUsu;
    };
    vm.actualizarDatos = function(u){
        u.CiuPro = vm.usuario.CiuPro;
        u.dni = vm.usuario.dni;
        u.DirAct = vm.usuario.DirAct;
        u.Ema = vm.usuario.Ema;
        u.EstCivID = vm.usuario.EstCivID;
        u.FecNac = vm.usuario.FecNac;
        u.Nom = vm.usuario.Nom;
        u.PaiID = vm.usuario.PaiID;
        u.PriApe = vm.usuario.PriApe;
        u.RUC = vm.usuario.RUC;
        u.SegApe = vm.usuario.SegApe;
        u.SexId = vm.usuario.SexId;
        u.Tel = vm.usuario.Tel;
        u.Img = vm.usuario.Img;
        localStorage.setItem("usuario", JSON.stringify(u));
    };
    
    vm.guardarCambios = function(ev,u){
        var confirm = $mdDialog.confirm()
            .title('Mensaje de Confirmacion?')
            .textContent('Esta seguro que desea actualizar sus datos personales')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Aceptar')
            .cancel('Cancelar');
        $mdDialog.show(confirm).then(function() {
            
            var personaID = {PerID:u.UseId};
            
            recursoCrud.actualizar("ServicioPersona.php", {ID:personaID,dato:vm.usuario} ).then(
                function(res) {                    
                    if(res.estado){
                        
                        if(vm.imagen.name){
                            upload.enviarArchivo2(vm.imagen,"archivos/usuarios/",vm.usuario.Img,true).then(function(res2){
                                vm.imagen = {};
                                vm.actualizarDatos(u);
                                $mdToast.show($mdToast.simple().textContent(res.mensaje).position('top right').hideDelay(2000));
                                
                            });
                        }
                        else{
                            vm.actualizarDatos(u);
                            $mdToast.show($mdToast.simple().textContent(res.mensaje).position('top right').hideDelay(2000));
                        }
                        
                    }
                }, function(res) {
                    $mdToast.show($mdToast.simple().textContent(res).position('top right').hideDelay(6000));
                }, function(res) {
                    $mdToast.show($mdToast.simple().textContent(res).position('top right').hideDelay(6000));
                }
            );        
        }, function() {		  
        });
    };
    
}]);

