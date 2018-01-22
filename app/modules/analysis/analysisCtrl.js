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
		.controller('AnalysisCtrl', Analysis);

		Analysis.$inject =  ['socketio', '$scope', '$window'];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		function Analysis(socketio, $scope, $window) {
			/*jshint validthis: true */
			var vm = this;

			vm.activated = false;

			vm.repository = {
				selected : null,
			}

			vm.changeStat= function(state){
				vm.activated = state;
			};

			socketio.on('getAllData',(data) => {
				try{
					
					console.log(data);
					vm.changeStat(!data.completed);
				}catch(err){

				}
			});

			vm.click = function(){
				if(vm.repository.selected != null){
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
			}

		}

})();
