'use strict';

/**
 * @ngdoc function
 * @name app.route:analysisRoute
 * @description
 * # analysisRoute
 * Route of the app
 */

angular.module('analysis')
	.config(['$stateProvider', function ($stateProvider) {
		
		$stateProvider
			.state('home.analysis', {
				url:'/analysis',
				templateUrl: 'app/modules/analysis/analysis.html',
				controller: 'AnalysisCtrl',
				controllerAs: 'vm'
			});

		
	}]);
