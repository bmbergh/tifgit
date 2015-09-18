console.log("App.js loaded");
angular.module("gifApp", ["ngRoute"])

    .config(function($routeProvider){
        $routeProvider.when("/", {
            "controller": "homeCtrl",
            "templateUrl": "client/views/index.html" 
        }).when("/gifs", {
            "controller": "gifCtrl",
            "templateUrl": "views/gifs.html"
        }).otherwise({
            "redirectTo": "/"
        })
    })


	.controller('gifCtrl', ['$scope', '$http', function ($scope, $http){

	  	$scope.message = "I see gifs";
	  	$scope.gifs = [];

  		$scope.search = function(tag) {

    		$http.get('/gifs/search?tag='+tag).then(function (response) {

    			$scope.gifs = response.data;

   				console.log('Success Whoop: ', response);
  			}, function (response){
  				console.log('Error sad face: ', response);
  			});
		};

		$scope.likeGif = function(id){
			$http.put('/gifs/like').then(function (response){
				console.log('Success on Like ' , response);
			}, function (response){
				console.log('Error on like:', response);
			});
		};

		$scope.dislikeGif = function(id){
			$http.put('/gif/dislike').then(function (response){
				console.log('Success on Dislike ', response);
			}, function (response){
				console.log('Error on dislike', response);
		
			});
		};

	}]);



