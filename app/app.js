(function() {
	'use strict';

	/**
	 * @ngdoc index
	 * @name app
	 * @description
	 * # app
	 *
	 * Main modules of the application.
	 */

	angular.module('github-analytics', [
		'ngResource',
		'ngAria',
		'ui.bootstrap',
		'ngMaterial',
		'ngMdIcons',
		'ngCookies',
		'ngAnimate',
		'ngMessages',
		'ngTouch',
		'ngSanitize',
		'ui.router',
		'home',
		'analysis',
		'history',
	]).run(setupSocketIO);

	function setupSocketIO(socketio, $rootScope) {
		console.log("setup socket io factory");
		console.log(socketio);
		socketio.init();
	}

})();
