(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:analysisCtrl
	* @description
	* # analysisCtrl
	* Controller of the app
	*/

  	angular
		.module('github-analytics')
		.controller('AnalysisCtrl', Analysis)
		.config(['ChartJsProvider', function (ChartJsProvider) {
			'use strict';
			ChartJsProvider.setOptions({
			  tooltips: { enabled: false }
			});
		}]);

		Analysis.$inject =  ['socketio', '$scope', '$window'];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		function Analysis(socketio, $scope, $window) {
			/*jshint validthis: true */
			var vm = this;

			vm.results = {
				commits : [],
				numberOfCommits : 0,
				name : '',		
				description : '',
			}

			vm.activated = false;
			vm.resultIsActivated = false;
			vm.isError = false;
			vm.error = '';

			vm.repository = {
				selected : null,
			}

			// datas used in graphs
			vm.dataBubble =[ [{x:40,y:10,r:20},{x:20,y:30,r:10}]];
			vm.seriresBubble = ['lala', 'lili'];


			vm.changeState = function(state){
				vm.activated = state;
			};

			vm.updateResults = function(data){
				vm.results.commits = data.commits;
				vm.results.name = data.name;
				vm.results.description = data.description;
				vm.results.numberOfCommits = data.totalCommits;

				const dataBubbleAdd = data.map.commitsAdd;
				const dataBubbleDel = data.map.commitsDel;

		  	const datas = data.commits;
				console.log('datas');
				console.log(datas);

				let bubleAdd = [];
				let bubleDel = [];
				let addseriesAuthors = [];
				dataBubbleAdd.forEach((element)=> {
					let avg = element[1].numberOfLines / element[1].numberOfCommits;
					let rayon = 0;
					if(avg < 100){
							rayon = 2.0;
					}else if(avg < 500){
							rayon = 4.0;
					}else if(avg < 1000){
						rayon = 6.0;
					}else if(avg < 5000){
						rayon = 8.0;
					}else if(avg < 10000){
						rayon = 10.0;
					}else if(avg < 20000){
						rayon = 12.0;
					}else if(avg < 30000){
						rayon = 14.0;
					}else if(avg < 40000){
						rayon = 16.0;
					}else if(avg < 50000){
						rayon = 18.0;
					}else{
						rayon = 20.0;
					}
					bubleAdd.push(
						[{
							x: vm.randomScalingFactor(),
							y: vm.randomScalingFactor(),
							r: rayon*2,
						}]
					);
					addseriesAuthors.push(element[0] + ' aerage lines : '+ avg);
				});
				dataBubbleDel.forEach((element) =>{
					bubleDel.push(
						[{
							x: vm.randomScalingFactor(),
							y: vm.randomScalingFactor(),
							r: element[1].numberOfLines / element[1].numberOfCommits,
						}]
					);
				});
				console.log('buble add');
				console.log(bubleAdd);
				console.log('buble serie');
				console.log(addseriesAuthors);

				return { addAuthors: bubleAdd, seriesAuthors: addseriesAuthors, delAuthors: bubleDel};
			};

			socketio.on('getAllData',(data) => {
				try{
					console.log(data);
					if(!data.error){
						vm.changeState(!data.completed);
						if(!vm.resultIsActivated){
							vm.resultIsActivated = true;
						}

						const bubbles = vm.updateResults(data);
						vm.dataBubble = bubbles.addAuthors;
						vm.seriresBubble = bubbles.seriesAuthors;
					}
					else{
						vm.error = "Sorry this repository doesn't exists";
						vm.isError = true;
						vm.changeState(false);
					}
				}catch(err){
					console.log(err);
				}
			});

			vm.click = function(){
				if(vm.repository.selected != null){
					vm.error = '';
					vm.isError = false;
					console.log('you choose : '+ vm.repository.selected );
					const repoGithub = vm.repository.selected .replace('https', 'http').replace('http://github.com/', '');
					const infos = repoGithub.split('/');
			
					const ownerSelected = infos[0];
					const repoSelected = infos[1];
					const data = {
						owner: ownerSelected,
						name: repoSelected,
						numberFetch : 100,
					  }
					console.log('Data:');
					console.log(data);
				    socketio.emit('getAllData', data);
				}
			};

		
			vm.randomScalingFactor = function () {
				return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 50);
			};

			 vm.dynamicColors = function() {
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
						var b = Math.floor(Math.random() * 255);
						var a = 0.9;
            return "rgb(" + r + "," + g + "," + b + ',' + a + ")";
			 };

			vm.deletionData = [[1, 2, 0, 4, 10, 20, 8],[5,5,5,5,5,5,5]];
			vm.deletionSeries = ['Number of deletions','Average'];//['number of deletion : '];
			vm.additionnData = [[1, 2, 0, 4, 10, 20, 8],[1, 10, 0, 20, 10, 20, 8]];
			vm.additionSeries = ['Number of addition : ', 'Average'];
			vm.additionnDataBar = [[1, 2, 0, 4, 10, 20, 8]];
			vm.dataSet = {
				labels : vm.labels,
				data : vm.additionnData
			}

			vm.lineChart = {
				series: ['commit no '],
				labels: ['1','2','3','4','5','6','7'],
				datasetOverride : [
					{ yAxisID: 'y-axis-1' }, 
				],
				options: {
					responsive: true,
					//maintainAspectRatio: true,
					scales: {
						yAxes: [
						  {
							id: 'y-axis-1',
							type: 'linear',
							display: true,
							position: 'left'
						  },
						  
						]
					  },
				},				
				colors: [
				{
					backgroundColor: 'rgba(159,204,0, 0.2)',
					pointBackgroundColor: 'rgba(159,204,0, 1)',
					pointHoverBackgroundColor: 'rgba(159,204,0, 0.8)',
					borderColor: 'rgba(159,204,0, 1)',
					pointBorderColor: '#fff',
					pointHoverBorderColor: 'rgba(159,204,0, 1)',
				},
				],
				onClick(points, evt) {
				console.log(points, evt);
				},
			};
		
			vm.BarChart = {
				labels:  ['1','2','3','4','5','6','7'],
				options: {
				  responsive: true,
				  maintainAspectRatio: true,
				  layout: {
					padding: {
					  left: 10,
					  right: 0,
					  top: 0,
					  bottom: 0,
					},
				  },
				  scales: {
					xAxes: [
					  {
						barPercentage: 0.8,
						categoryPercentage: 1,
					  },
					],
					yAxes: [{
					  ticks: {
						beginAtZero: true,	
					  },
					}],
				  },
				},
				};
				
			  vm.bubblesChart = {
					onClick(points, evt) {
						console.log(points, evt);
						},
					options : {
						tooltips: {
							enabled: true,
							mode: 'single',
							callbacks: {
									label: function (tooltipItems, data) {
										//console.log(data);
											return data.labels[tooltipItems.datasetIndex] ;
									}
							}
					},
						scales: {
							xAxes: [{
								display: false,
								ticks: {
									max: 125,
									min: -125,
									stepSize: 10
								}
							}],
							yAxes: [{
								display: false,
								ticks: {
									max: 125,
									min: -125,
									stepSize: 10
								}
							}]
						}
					}
			};
		}
})();
