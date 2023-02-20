'use strict';

//controlador principal de toda la aplicacion
miApp.controller('periodoCtrl',['$scope','$mdDialog','$mdToast','recursoCrud', function($scope,$mdDialog,$mdToast,recursoCrud) {
	
	$scope.periodo = {FecIni:"",EstReg:'A'};
	$scope.periodoActual ={};
	$scope.estado = false;
	
	buscarPeriodoActual();   
	
	//alert($scope.periodo.sdf);
	
	$scope.iniciarPeriodo= function (ev){
        
        
		if($scope.periodoActual.FecIni){
			$mdToast.show($mdToast.simple().textContent("No se puede iniciar, debe finalizar el periodo anterior").position('top right').hideDelay(2000));
			return;
		}
		
		var confirm = $mdDialog.confirm()
			.title('Mensaje de Confirmacion?')
			.textContent('Esta seguro que iniciara el Periodo Taured el dia de hoy')
			.ariaLabel('Lucky day')
			.targetEvent(ev)
			.ok('Aceptar')
			.cancel('Cancelar');
			  
		$mdDialog.show(confirm).then(function() {
			recursoCrud.insertar("ServicioPeriodo.php", {accion:1, periodo:$scope.periodo} ).then(		
			
				function(data) {
					$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
					if(data.estado){					
						$scope.periodoActual = data.ID;					
						$scope.periodo = {FecIni:"",EstReg:'A'};
						$scope.estado = true;
                        
                        myChart.data.labels.push("Periodo-Actual");
                        myChart.data.datasets[0].data.push(0);
                        myChart.data.datasets[1].data.push(0);
                        myChart.data.datasets[2].data.push(0);
                        myChart.update();
					}
				}, function(data) {
					$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
				}, function(data) {
					$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
				}
			);
		}, function() {	});
	};
	$scope.finalizarPeriodo = function (ev){
        
        //finalizando el periodo
        
		
		var confirm = $mdDialog.confirm()
			.title('Mensaje de Confirmacion?')
			.textContent('Esta seguro que finalizara el Periodo Taured ahora')
			.ariaLabel('Lucky day')
			.targetEvent(ev)
			.ok('Aceptar')
			.cancel('Cancelar');
		$mdDialog.show(confirm).then(function() {
			var periodoActualizar = {PerFin:""};
			var periodoID = {PerTauID:$scope.periodoActual.PerTauID};
			recursoCrud.actualizar("ServicioPeriodo.php", {accion:1,dato:periodoActualizar,ID:periodoID} ).then(
				function(data) {				
					$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
					if(data.estado){
						$scope.periodoActual = {};
						$scope.estado = false;
                        var l = myChart.data.labels.length-1;        
                        myChart.data.labels[l] = "Per-"+l;
                        myChart.update();
					}
				}, function(data) {
					$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
				}, function(data) {
					$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
				}
			);
		}, function() {	});
	};
	function buscarPeriodoActual(){
		recursoCrud.get("ServicioPeriodo.php", {accion:1} ).then(
			function(data) {
				if(data.estado){
					$scope.periodoActual = data.resultado;
					$scope.estado = true;
				}
				else
					$mdToast.show($mdToast.simple().textContent(data.mensaje).position('top right').hideDelay(2000));
                buscarResumenPeriodoAnterior();
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}, function(data) {
				$mdToast.show($mdToast.simple().textContent(data).position('top right').hideDelay(6000));
			}
		);
	};
    function buscarResumenPeriodoAnterior(){
		recursoCrud.get("ServicioPeriodo.php", {accion:2} ).then(
			function(res) {
				if(res.estado){
					$scope.resumen = res.resultado;
                    generarGrafica($scope.resumen,$scope.estado);
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
    
    var myChart = {};
    
    function generarGrafica(resumen,estado){
        
        var data1 = [];
        var data2 = [];
        var data3 = [];
        var labels = [];
        
        data1.push(0);
        data2.push(2);
        data3.push(0);
        labels.push("Inicio");
        
        var l = resumen.length-1;
        
        
        for(var i=0;i<l;i++ ){
            data1.push(resumen[i].Tot);
            data2.push(resumen[i].NumPat);
            data3.push(resumen[i].TotCob);
            labels.push("Per-"+(i+1));            
        }
        
        data1.push(resumen[l].Tot);
        data2.push(resumen[l].NumPat);
        data3.push(resumen[l].TotCob);
        if(estado)
            labels.push("Periodo-Actual");
        else
            labels.push("Per-"+(l+1));
        
        
        var ctx = document.getElementById("myChart");
        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        yAxisID: "y-axis-1",
                        label: 'Total Ventas S/.',
                        fill: false,
                        lineTension: 0.3,
                        borderWidth:2,
                        backgroundColor: "#e91e63",
                        borderColor: "#e91e63",
                        pointBackgroundColor: "#e91e63",
                        pointBorderWidth: 1,
                        pointHoverRadius: 6,
                        pointHoverBorderWidth: 1,
                        pointRadius: 4,
                        pointHitRadius: 10,
                        data: data1
                    },                    
                    {
                        yAxisID: "y-axis-1",
                        label: 'Total Bono S/.',
                        fill: false,
                        lineTension: 0.3,
                        borderWidth:2,
                        backgroundColor : "#ffc107",
                        borderColor: "#ffc107",
                        pointBackgroundColor: "#ffc107",
                        pointBorderWidth: 1,
                        pointHoverRadius: 6,
                        pointHoverBorderWidth: 1,
                        pointRadius: 4,
                        pointHitRadius: 10,
                        data: data3
                    },
                    {
                        yAxisID: "y-axis-2",
                        label: 'N° Patrocinados',
                        fill: false,
                        lineTension: 0.1,
                        borderWidth:2,
                        backgroundColor : "#03a9f4",
                        borderColor: "#03a9f4",
                        pointBackgroundColor: "#03a9f4",
                        pointBorderWidth: 1,
                        pointHoverRadius: 6,
                        pointHoverBorderWidth: 1,
                        pointRadius: 4,
                        pointHitRadius: 10,
                        data: data2
                    },
                ]
            },
            options:{
                scales: {
                    yAxes: [
                         {"id":"y-axis-1", position: "left",ticks: {beginAtZero: true}},
                         {"id":"y-axis-2", position: "right", ticks: {suggestedMax: 600,beginAtZero: true}}
                    ]
                }
            }
        });
        /*
        var data = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "My First dataset",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [65, 59, 80, 81, 56, 55, 40],
                    spanGaps: false,
                }
            ]
        };
        
        var scatterChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                scales: {
                    xAxes: [{
                        type: 'linear',
                        position: 'bottom'
                    }]
                }
            }
        });
        
          
          resumen.forEach(function(item,i){
            data.addRow(["Per-"+(i+1),  item.Tot, item.NumPat]);
          });
          
          console.log(data);

        */
    };
	
}]);
