(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.module:analysisModule
	 * @description
	 * # analysisModule
	 * Module of the app
	 */

  	angular.module('analysis', []).config(function($mdThemingProvider) {

		// Configure a dark theme with primary foreground yellow
	
		$mdThemingProvider.theme('docs-dark', 'default')
		  .primaryPalette('yellow')
		  .dark();
	  });

})();
