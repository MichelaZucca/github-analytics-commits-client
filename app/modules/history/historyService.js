(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.service:historyService
	 * @description
	 * # historyService
	 * Service of the app
	 */

  	angular
		.module('history')
		.factory('HistoryService', History);
		// Inject your dependencies as .$inject = ['$http', 'someSevide'];
		// function Name ($http, someSevide) {...}

		History.$inject = ['$http'];

		function History ($http) {

		}

})();
