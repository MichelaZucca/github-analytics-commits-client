(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:historyCtrl
	* @description
	* # historyCtrl
	* Controller of the app
	*/

  	angular
		.module('history')
		.controller('HistoryCtrl', History);

		History.$inject = [];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		function History() {
			/*jshint validthis: true */
			var vm = this;

		}

})();
