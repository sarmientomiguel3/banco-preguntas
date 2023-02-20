'use strict';
/**
 * @name Servicio para usuario
 */
//funciones de autenticacion y autorizacion de usuarios
function RecursoCrud($http, $q,$rootScope,$location,$route, urlBase) {


	this.validarToken= function(){
		var cabecera = this.hayToken();
        
		if(!cabecera){
			localStorage.clear();
            location.replace( "/BancoUnsa/" );
		   return;
		}

		$http({
			 method: 'GET',
			 url: "/BancoUnsa/servidor/ServicioLogin.php",
			 headers: cabecera
		}).success( function(){
			 console.log("BIENVENIDO BANCO UNSA");
		}).error( function(data, status, headers, config){
			 console.log("ERROR "+status);
			 if(status === 401 || status === 403 || status === 400){
				 localStorage.clear();
				 location.replace('/BancoUnsa/');
			 }
		});
    };
	this.actualizar = function(url, miDato) {
        $rootScope.cargar=1;
        var defered = $q.defer();
        var promise = defered.promise;

		var cabecera = this.hayToken();
		if(!cabecera){
            $rootScope.cargar = 0;
			setTimeout(function(){ defered.notify("No se cuenta con un token de autorizacion"); }, 500);
			return promise;
		}
        if(!miDato.accion)
            miDato.accion = 0;
        $http({
            method: 'PUT',
            url: urlBase + url,
            data: miDato,
			headers:cabecera
        }).success(function(data, status, headers, config) {
            $rootScope.cargar = 0;
            defered.resolve(data);
        }).error(function(data, status, headers, config) {
            $rootScope.cargar = 0;

            if (status === 401)
                reiniciar();

			defered.notify("Error " + status + " : "+ data);
        });
        return promise;
    };
	this.listar = function(url,parametros) {
        var defered = $q.defer();
        var promise = defered.promise;

		var cabecera = this.hayToken();
		if(!cabecera){
			setTimeout(function(){ defered.notify("No se cuenta con un token de autorizacion"); }, 500);
			return promise;
		}
        if(!parametros.accion)
            parametros.accion = 0;
        $http({
            method: 'GET',
            url: urlBase + url,
			params: parametros,
			headers:cabecera
        }).success(function(data, status, headers, config) {
            defered.resolve(data);
        }).error(function(data, status, headers, config) {
			if (status === 401)
                reiniciar();

			defered.notify("Error " + status + " : "+ data);
        });
        return promise;
    };
    
    this.get = function(url,parametros) {
        var defered = $q.defer();
        var promise = defered.promise;

		var cabecera = this.hayToken();
		if(!cabecera){
			setTimeout(function(){ defered.notify("No se cuenta con un token de autorizacion"); }, 500);
			return promise;
		}
        if(!parametros.accion)
            parametros.accion = 0;
        $http({
            method: 'GET',
            url: urlBase + url,
			params: parametros,
			headers:cabecera
        }).success(function(data, status, headers, config) {
            defered.resolve(data);
        }).error(function(data, status, headers, config) {
            if (status === 401)
                reiniciar();

			defered.notify("Error " + status + " : "+ data);
        });

        return promise;
    };
    this.insertar = function(url,miDato) {
        $rootScope.cargar=1;
        var defered = $q.defer();
        var promise = defered.promise;

		var cabecera = this.hayToken();
		if(!cabecera){
            $rootScope.cargar = 0;
			setTimeout(function(){ defered.notify("No se cuenta con un token de autorizacion"); }, 500);
			return promise;
		}
        $http({
            method: 'POST',
            url: urlBase + url,
            data: miDato,
			headers:cabecera
        }).success(function(data, status, headers, config) {
            $rootScope.cargar = 0;
            defered.resolve(data);
        }).error(function(data, status, headers, config) {
            $rootScope.cargar = 0;
            if (status === 401)
                reiniciar();

			defered.notify("Error " + status + " : "+ data);
        });

        return promise;
    };
    this.eliminar = function(url,miDato) {
        $rootScope.cargar = 1;
        var defered = $q.defer();
        var promise = defered.promise;

		var cabecera = this.hayToken();
		if(!cabecera){
            $rootScope.cargar = 0;
			setTimeout(function(){ defered.notify("No se cuenta con un token de autorizacion"); }, 500);
			return promise;
		}
        $http({
            method: 'DELETE',
            url: urlBase + url,
            data: miDato,
			headers:cabecera
        }).success(function(data, status, headers, config) {
            $rootScope.cargar = 0;
            defered.resolve(data);
        }).error(function(data, status, headers, config) {
            $rootScope.cargar = 0;
            if (status === 401)
                reiniciar();

			defered.notify("Error " + status + " : "+ data);
        });

        return promise;
    };
	this.cualquiera = function(url,miDato,cabecera) {
        var defered = $q.defer();
        var promise = defered.promise;


        $http({
            method: 'POST',
            url: url,
            data: miDato,
			headers:cabecera
        }).success(function(data, status, headers, config) {
            defered.resolve(data);
        }).error(function(data, status, headers, config) {

            if (status === 400)
                defered.reject("Error 400 : " +data);
			else
				defered.notify("Error " + status + " : "+ data);
        });

        return promise;
    };
	this.hayToken = function(){
		var jwt = localStorage.getItem('jwt');
		if ( jwt )
			return {'autorizacion':jwt};

		return null;
	};
	this.copiar = function(obj1,obj2) {
        for ( var key in obj2 )
			obj1[ key ] = obj2[ key ];
    };
    function reiniciar(){
        localStorage.clear();
        $rootScope.usuario = {nombreUsuario: "",rol:""};
        location.replace('/BancoUnsa/');
        $route.reload();
    };

    this.cerrarSession= function(funcionExito,funcionError){
        $http({
            method: 'DELETE',
            url: "/BancoUnsa/servidor/ServicioLogin.php",
            headers: this.hayToken()
        }).success( funcionExito ).error( funcionError);
    };
};

function RecursoCrudProvider() {
    var _urlBase;
    this.setUrlBase = function(urlBase) {
        _urlBase = urlBase;
    };
    this.$get = ['$http', '$q','$rootScope','$location','$route', function($http, $q, $rootScope,$location,$route) {
		return new RecursoCrud($http, $q,$rootScope,$location,$route, _urlBase);
	}];
};

miApp.constant("urlBase", "/BancoUnsa/servidor/servicios/");
miApp.provider("recursoCrud", RecursoCrudProvider);
miApp.config(['urlBase', 'recursoCrudProvider',
    function(urlBase, recursoCrudProvider) {
        recursoCrudProvider.setUrlBase(urlBase);
    }
]);

miApp.service('upload', ["$http", "$q","$rootScope", function ($http, $q, $rootScope){
    this.enviarArchivoPregunta = function(imagen){
		var deferred = $q.defer();
        var formData = new FormData();
        var dir = "resources/img/bancoPreguntaUnsa/";
		formData.append("file", imagen);
		return $http.post("/BancoUnsa/subirImagen.php", formData, {
			headers: {"Content-type": undefined,"direccion":dir},
			transformRequest: angular.identity
		})
		.success(function(res){
			deferred.resolve(res);
		})
		.error(function(msg, code){
            debugger;
			deferred.reject("");
		});
	};
	this.enviarArchivo = function(imagen,dir){
		var deferred = $q.defer();
		var formData = new FormData();
		formData.append("file", imagen);
		return $http.post("/BancoUnsa/subirImagen.php", formData, {
			headers: {"Content-type": undefined,"direccion":dir},
			transformRequest: angular.identity
		})
		.success(function(res){
			deferred.resolve(res);
		})
		.error(function(msg, code){
			deferred.reject(msg);
		});
	};
	this.enviarArchivo2 = function(imagen,dir,nombre,mini){
        $rootScope.cargar++;

		var deferred = $q.defer();
		var formData = new FormData();
		formData.append("file", imagen);

		//nombre += imagen.name.substring( imagen.name.lastIndexOf(".") );

		return $http.post("/BancoUnsa/subirImagen.php", formData, {
			headers: {"Content-type": undefined,"direccion":dir,"nombre":nombre,"mini":mini},
			transformRequest: angular.identity
		})
		.success(function(res){
            $rootScope.cargar--;
			deferred.resolve(res);
		})
		.error(function(msg, code){
            $rootScope.cargar--;
			deferred.reject(msg);
		});
	};
	this.subirArchivoTemporal = function(id,elemento){

		var files = elemento.files; // Objeto Lista de Archivos

		// recorriendo todos files
		for (var i = 0, f; f = files[i]; i++) {
		  // Only process image files.
		  if (!f.type.match('image.*')) {continue;}

            var reader = new FileReader();
            //implementando la funcion onload
            reader.onload = function(){
                var span = ['<img style="max-height:250px" src="', reader.result,'" />'].join('');
                document.getElementById(id).innerHTML = span;
            };
		  reader.readAsDataURL(f);
		}
		return files[0];
    };
    
    this.subirArchivoTemporal2 = function(id,elemento){

		var files = elemento.files; // Objeto Lista de Archivos

		// recorriendo todos files
		for (var i = 0, f; f = files[i]; i++) {
		  // Only process image files.
		  if (!f.type.match('image.*')) {continue;}

            var reader = new FileReader();
            //implementando la funcion onload
            reader.onload = function(){
                document.getElementById(id).setAttribute("src", reader.result);
            };
		  reader.readAsDataURL(f);
		}
		return files[0];
    };
    this.subirArchivoTemporalLocal = function(id,f){
        var reader = new FileReader();
        //implementando la funcion onload
        reader.onload = function(){
            var span = ['<img style="max-height:250px" src="', reader.result,'" />'].join('');
            document.getElementById(id).innerHTML = span;
        };
        reader.readAsDataURL(f);
	};
}]);

function buscarObjeto(lista,lavel,valor){
    if(!lista)
        null;
    for(var i =0;i < lista.length;i++){
        if(lista[i][lavel] == valor)
            return lista[i];
    }
    return null;
};
function buscarObjetos(lista,lavel,valor){
    var nuevaLista = [];
    if(!lista)
        null;
    for(var i =0;i < lista.length;i++){
        if(lista[i][lavel] == valor)
            nuevaLista.push( lista[i] );
    }
    return nuevaLista;
};

function kmp(texto, padrao, aux){
	var idx_texto = 0, idx_padrao = 0;

	while(idx_texto < texto.length){
		if(padrao[idx_padrao] == texto[idx_texto]){
			idx_padrao++;
			idx_texto++;
		}

		if(idx_padrao == padrao.length){
			console.log("Padron encontrado en: " + (idx_texto - idx_padrao) );
			idx_padrao = aux[idx_padrao - 1];
		}

		if(idx_texto < texto.length && padrao[idx_padrao] != texto[idx_texto]){
			if(idx_padrao)
				idx_padrao = aux[idx_padrao - 1];
			else
				idx_texto++;
		}
	}
};
function prefix(padrao, aux){
	aux[0] = 0;
	var j = 0, i = 1;

	while(i < padrao.length){
		if(padrao[i] == padrao[j]){
			j++;
			aux[i] = j;
			i++;
		}
		else{
			if(j)
				j = aux[j - 1];
			else{
				aux[i] = 0;
				i++;
			}
		}
	}
};
function miBusqueda(texto, padrao){
	console.log("texto: "+texto);
	console.log("palabra: "+padrao);

	var aux = [];

	prefix(padrao, aux);
    console.log("vector: "+aux);
	kmp(texto, padrao, aux);
};
/*Funcion que busca dentro de un array*/
function buscarContenido(lista, labelClave, labelContenido, idBuscado){
    console.log(lista);
    for(var i=0;i<lista.length;i++ ){
        if(lista[i][labelClave] === idBuscado)
            return lista[i][labelContenido];
    }
};
function buscarObjeto(lista, labelClave,idBuscado){
    if(!lista)
        return null;
    for(var i=0;i<lista.length;i++ ){
        if(lista[i][labelClave] === idBuscado)
            return lista[i];
    }
};
function iniciarPosiciones(miArray){
    miArray.forEach(function(item,index){
        item.i = index;
    });
};
function reiniciarImg(id){
    var ima = document.getElementById(id).getElementsByTagName("img");
    for(var i=0;i<ima.length;i++)
        ima[i].setAttribute("src", "");

};
function reiniciarFile(id){
    var ima = document.getElementById(id);
    console.log(ima.files);
    ima.value = "";
    console.log(ima.files);
};
function nuevoNombreFile(id,ext){
    return id+'-'+uuid.v4()+'.'+ext;
}
function getExtencionFileType(type){
    var arr = type.split('/');
    var rev = arr.reverse();
    return rev[0];
}