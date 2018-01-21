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
		.module('analysis')
		.controller('AnalysisCtrl', Analysis);

		Analysis.$inject = [];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		function Analysis() {
			/*jshint validthis: true */
			var vm = this;

		}

})();
