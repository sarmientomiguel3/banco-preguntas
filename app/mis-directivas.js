'use strict';

miApp.directive('colEdi', function ($compile,recursoCrud) {
return {
	restrict: 'E',
	scope: {
		celda: '=',
        label: '@',
        id: '=',
        labelId: '@',
		fun: '='			
	},
	template:
		'{{celda}}'
		,
	link: function(scope,elem,attrs){
		
		elem.parent().css({position:"relative",cursor:"pointer"});
		
		elem.parent().bind("dblclick", function() {
			
			var input = $compile('<div class="col-edi"><md-input-container flex style="margin-bottom:0">'+
								'<label></label>'+
								'<input type="text" />'+
							'</md-input-container></div>')(scope);
			
			var inp = input.find('input');
			inp.val(scope.celda);
			
			//input.val(scope.celda);
			elem.css("display", "none");
			elem.parent().append(input);
			//input[0].select();
			inp[0].select();
			inp.bind('keypress',function(e){
				if (e.which == 13  ) {
					
					//si hay un cambio en el campo
					if( scope.celda != inp.val() ){
						
						if( !isNaN( inp.val() ) ){
							scope.$apply(function(){
								scope.celda = inp.val();
							});
						}
						
						//ver si hay una funcion
						if (scope.fun !== undefined && typeof scope.fun=='function') {
							var campoActualizar = {};
							campoActualizar[scope.label] = scope.celda;
							
							var fila = elem.parent().parent();
							
							var idFila = {};
							idFila[scope.labelId] = scope.id;
							
							scope.fun(idFila,campoActualizar);
						}
					}
					
					input.remove();
					elem.css("display", "initial");
				}
			});
			inp.bind('blur',function(e){
				//input.select();
				input.remove();
				elem.css("display", "initial");
			});
			/*
			input.bind('keypress',function(e){
				if (e.which == 13  ) {
					if( !isNaN( input.val() ) ){
						scope.$apply(function(){
							scope.celda = input.val();
						});
					}
					input.remove();
					elem.css("display", "initial");
				}
			});
			input.bind('blur',function(e){
				input.remove();
				elem.css("display", "initial");
			});*/
		});			
	}
};
});

    miApp.directive('menuToggle', [ '$timeout', function($timeout){
      return {
      scope: {
        section: '='
      },      
      template:
      
    '<md-button class="md-button-toggle" ng-click="toggle()" layout="row" style="width:100%" title="{{section.Nom}}">'+
        '<md-icon md-svg-src="../resources/img/menu{{section.Ico}}" style="margin: 0 4px 0 0;"/></md-icon><!---->'+
        '<span hide show-gt-sm>{{section.Nom}}</span>'+
        '<span aria-hidden="true" class="md-toggle-icon" ng-class="{\'toggled\' : isOpen()}">'+
            '<md-icon md-svg-icon="../resources/img/md-toggle-arrow.svg" ></md-icon>'+
        '</span>'+
    '</md-button>'+
    '<ul class="menu-toggle-list" id="ven-{{section.VenID}}" ng-class="{\'toggled\' : !isOpen()}" style="list-style-type: none;width: 100%;min-width: 200px;">'+
        '<li ng-repeat="menu in section.menus">'+
            '<menu-link menu="menu"></menu-link>'+
        '</li>'+
    '</ul>'
      
      ,
      link: function($scope, $element) {
        var controller = $element.parent().scope().$parent;
        $scope.isOpen = function() {
          return controller.isOpen($scope.section);
        };
        $scope.toggle = function() {
          controller.toggleOpen($scope.section);
        };
      }
     };
    }]);
        
    miApp.directive('menuLink', function () {
      return {
        scope: {
            menu: '='
        },
        template:
        '<md-button ng-href="#{{menu.Url}}" ng-click="seleccionarMenu(menu)" ng-class="{\'selected\' : isSelected() }" title="{{menu.Nom}}" style="width: 100%;text-align: start;border-radius: 0">'+
        '<md-icon md-svg-src="../resources/img/menu{{menu.Ico}}" style="margin: 0 4px 0 0;"/></md-icon><!---->'+
        '<span >{{menu.Nom}}</span>'+
        '</md-button>'
        ,
        link: function ($scope, $element) {
            var controller;
            if($scope.menu.VenPadID)
                controller = $element.parent().scope().$parent.$root;
            else
                controller = $element.parent().scope().$parent;
            
            $scope.seleccionarMenu = function(menu) {
              controller.seleccionarMenu(menu);
            };
            $scope.isSelected = function() {
              return $scope.menu.VenID ==controller.menuSelect;
            };
        }
      };
    });
    

miApp.directive('mathEditor',[ function () {
return {
    // restrict: 'E',
    scope: {
        ma: '=',
        id: '=',
        data: '='
    },
    template:'<div ng-keyup="clickdata()"> <input/> </div>'
    ,
    link: function($scope,$elem,$attrs){

        var id = $scope.id;
        if(id == undefined || id == null) id = "matheditor"+Math.floor(Math.random() * (100000000) );
        
        $elem[0].firstChild.id = id

        setTimeout(function(){ 
            $scope.ma = new MathEditor(id);
            $scope.ma.setLatex($scope.data);
            // console.log($scope.data);
        }, 100);

        
        // $scope.$watch('data',function(){
        //   if($scope.ma)
        //     $scope.ma.setLatex($scope.data);
        // });

        $scope.clickdata = function(){
            $scope.data = $scope.ma.getValue();
        }

    }
    }; 
}]);


/*Componente para subir un archivo*/
miApp.directive('inputFile',[ function () {
return {
    restrict: 'E',
    scope: {
        archivo: '=',
        nombre: '=',
        label: '@',
        url:'@'
    },
    template:
            '<img style="max-height:100%;max-width: 100%;" />'+
            '<div style="margin:0 auto; position:absolute; width:100%; top:calc( 50% - 18px);">'+
                '<input type="file" accept="image/*" style="display:none" onchange="angular.element(this).scope().cambiarMiArchivo(this)"/>'+
                '<md-button class="md-fab md-mini" ng-click="elegirImagen()" title="subir imagen">+</md-button>'+
                '<md-button class="md-fab md-mini" ng-disabled="tiene()" ng-click="cancelarImagen()" title="cancelar">x</md-button>'+
            '</div>'
    ,
    link: function(scope,elem,attrs){
        
        if(!scope.url || scope.url == undefined )
            scope.url = "";
            
        
        if(scope.nombre && scope.nombre!="")
            elem.find('img')[0].setAttribute("src", "../archivos/"+scope.url+scope.nombre);        
        
        
        scope.cambiarMiArchivo = function(elemento){
		
            var files = elemento.files; // Objeto Lista de Archivos
            var f = files[0];
        
            // recorriendo todos files
            //for (var i = 0, f; f = files[i]; i++) {
              // Only process image files.
              if (!f.type.match('image.*')) {return;}

                var reader = new FileReader();
                //implementando la funcion onload
                reader.onload = function(){
                    elem.find('img')[0].setAttribute("src", reader.result);
                };
              reader.readAsDataURL(f);
            //}
          
            scope.$apply(function () {
                scope.archivo = files[0];
                var nombre = scope.archivo.name;
                var n = nombre.lastIndexOf(".");
                
                scope.nombre = scope.label+nombre.substring(n);
            });
          
          /*input.files[0] = {};//reiniciando el archivo*/
        };
        scope.elegirImagen = function (){
            var inputFile = elem.find('input')[0];
            inputFile.click();
        };
        scope.cancelarImagen = function (){
            elem.find('img')[0].setAttribute("src", "");
            //scope.$apply(function () {
                scope.archivo = {};
                scope.nombre="";
            //});            
        };
        scope.tiene = function(){
            return !scope.nombre || scope.nombre=="";
        };
    }
    };
}]);



miApp.directive('miOrderBy',[ function () {
return {
    restrict: 'A',
    scope: {
        label:'@',
        val:'@',
        sort:'='
    },
    template:
    '<md-button style="width: 100%;">'+
        '<md-icon md-svg-icon="../resources/img/icons/md-arrow.svg" class="mi-order-by" ng-class="{\'mi-sort\' : sort.val==val && !sort.reverse }"" ></md-icon> {{label}}'+
    '</md-button>'
    ,
    link: function(scope,elem,attrs){
        elem.bind('click',function(e){
            
            scope.$apply(function(){
                scope.sort.reverse = (scope.sort.val === scope.val) ? !scope.sort.reverse : false;
                scope.sort.val = scope.val;
            });
        });
        scope.miSort = function(){
            return ;
        };
    }
  };
}]);

miApp.directive('miPaginacion',[ function () {
return {
    restrict: 'E',
    scope: {
        numFilas:'=',
        paginaActual:'=',
        filaPagina:'@'
    },
    template:
    '<section layout="row" layout-xs="column" layout-align="center center">'+
      '<div style="padding: 5px 0 0;s">'+
      '<span style="margin:0 12px"><b>pag: </b>{{paginaActual}} <b>de: </b>{{paginas()}}</span>'+
      '<span style="margin:0 12px"><b>elementos: </b>{{numFilas}}</span>'+
      '</div><div>'+
          '<md-button aria-label="left" ng-click="paginaActual=1" style="min-width: 60px;">'+
            '<md-icon md-svg-src="../resources/img/icons/first_page.svg"></md-icon>'+
          '</md-button>'+
          '<md-button aria-label="left" ng-click="paginaActual==1?1:paginaActual=paginaActual-1" style="min-width: 60px;">'+
            '<md-icon md-svg-src="../resources/img/icons/left.svg"></md-icon>'+
          '</md-button>'+
          '<md-button aria-label="right" ng-click="numPaginas==paginaActual?numPaginas:paginaActual=paginaActual+1" style="min-width: 60px;">'+
            '<md-icon md-svg-src="../resources/img/icons/right.svg"></md-icon>'+
          '</md-button>'+
          '<md-button aria-label="right" ng-click="paginaActual = numPaginas" style="min-width: 60px;">'+
            '<md-icon md-svg-src="../resources/img/icons/last_page.svg"></md-icon>'+
          '</md-button>'+
      '</div>'+
    '</section>'
    ,
    link: function(scope,elem,attrs){
        scope.paginas = function(){
            scope.numPaginas = Math.ceil(scope.numFilas/scope.filaPagina);
            return scope.numPaginas;
        };
    }
  };
}]);

miApp.filter('codetovalue', function(){
  return function(x,clave,valor,list) {
    if( x == null){
      return "";
    }
    var found = list.find(function(element) {
      return element[clave] == x;
    });
    return found[valor];
    // return x;
  };
})

miApp.directive('contenteditable', function() {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function(scope, elm, attr, ngModel) {
        scope.MQ = MathQuill.getInterface(2);

        function updateViewValue() {
          ngModel.$setViewValue(this.innerHTML);
        }
        //Binding it to keyup, lly bind it to any other events of interest 
        //like change etc..
        elm.on('keyup', updateViewValue);

        scope.$on('$destroy', function() {
          elm.off('keyup', updateViewValue);
        });

        ngModel.$render = function(){
            var conten_ = ngModel.$viewValue;
            elm.html(conten_);
            var problemSpan = elm[0];
            // var problemSpan = document.getElementById('temp1');
            scope.MQ.StaticMath(problemSpan);
        }

      }
  }
});


miApp.directive('miTabla',['$compile', function ($compile) {
    
var toolHeader = '<div layout="row" style="margin-top: 8px;">';
    
var filtro =
            '<md-input-container flex class="no-mensaje" style="margin-top:8px;width:100%">'+
              '<md-icon md-svg-src="../resources/img/icons/search.svg" ></md-icon>'+
              '<input ng-model="ctrlTabla.miFiltro" type="text" placeholder="Buscar" ng-change="ctrlTabla.pagina=1">'+
            '</md-input-container>';
    
var tabla = '<md-content style="max-height:{{ctrlTabla.height}}" >'+
            '<table style="width:100%" class="table table-hover">'+
                '<thead></thead>'+
                '<tbody></tbody>'+
            '</table>'+
            '</md-content>';
            
var paginacion = '<mi-paginacion num-filas="ctrlTabla.lista.length" pagina-actual="ctrlTabla.pagina" fila-pagina="{{ctrlTabla.filaPagina}}"></mi-paginacion>';

var fila = '<tr ng-repeat="o in  ctrlTabla.lista = ( ctrlTabla.miLista | filter:ctrlTabla.miFiltro | orderBy:ctrlTabla.ordenar.val:ctrlTabla.ordenar.reverse ) | limitTo:ctrlTabla.filaPagina:ctrlTabla.filaPagina*(ctrlTabla.pagina-1)">';
var fila2 = '<tr ng-repeat="o in  ctrlTabla.lista = ( ctrlTabla.miLista | filter:ctrlTabla.miFiltro | orderBy:ctrlTabla.ordenar.val:ctrlTabla.ordenar.reverse ) ">';
            
return {
    
    restrict: 'E',
    controllerAs: 'ctrlTabla',
    bindToController: {      
      miLista: '=miLista',      
      height:'@height',
      filtrar:'@filtrar',
      filaPagina:'@filaPagina'
    },
    scope:true,
    compile: function(elem) {
        
        var tool = "";
        var aTool = elem.find('mi-tool');
        for (var i = 0; i < aTool.length; i++) {
            tool += aTool[i].innerHTML;
        }
        
        var head = "";
        var aHead = elem.find('mi-head');
        for (var i = 0; i < aHead.length; i++) {
            head += aHead[i].outerHTML.replace(/mi-head/g, "th").replace('mi-order','mi-order-by sort="ctrlTabla.ordenar"');
        }
        var body = "";
        var abody = elem.find('mi-body');
        for (var i = 0; i < abody.length; i++) {
            body += abody[i].outerHTML.replace(/mi-body/g, "td");
        }
        elem.html('');
        
        return function(scope, elem,attrs, ctrlTabla) {
            
            ctrlTabla.ordenar = {};
            ctrlTabla.pagina = 1;
            
            var nuevaTabla = tabla;
            var nuevaFila = fila;
            
            if(!ctrlTabla.height)
                ctrlTabla.height = '600px';
            
            
            if(ctrlTabla.filtrar)
                nuevaTabla = toolHeader+ filtro+tool+'</div>'+tabla;
            else if(tool!="")
                nuevaTabla = toolHeader+'<span flex></span>' + tool+'</div>'+tabla;
            
            if( ctrlTabla.filaPagina)
                nuevaTabla = nuevaTabla + paginacion;
            else                
                nuevaFila = fila2;
            
            var tpl = angular.element(nuevaTabla);
            
            
            tpl.find('thead').append( '<tr>'+head+'</tr>' );
            tpl.find('tbody').append( nuevaFila+body+'</tr>' );

            $compile(tpl)(scope);

            elem.append(tpl);
        };
    },
    controller: function($element, $transclude) {
        
    }
  };
}]);




/*


miApp.directive('columnaEditable', function () {
	return {
		restrict: 'E',
		scope: {
			celda: '='
		},
		template:
			'<span>{{celda}}</span>'
			,
		link: function(scope,elem,attrs){
			
			var $ = angular.element;
			var input = $('<input style="width: 100%" type="text"/>');
			
			elem.bind("dblclick", function() {	
				input.val(elem.text());
				elem.children().css("display", "none");
				elem.append(input);
				input[0].focus();
				input.bind('keypress',function(e){
					if (e.which == 13  ) {
						
						scope.$apply(function(){
							scope.celda = input.val();
						});
						input.remove();
						elem.children().css("display", "initial");
					}
				});
				input.bind('blur',function(e){
					input.remove();
					elem.children().css("display", "initial");
				});
			});			
		}
	};
});
*/