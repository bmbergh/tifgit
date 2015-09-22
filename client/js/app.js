console.log("App.js loaded");
angular.module("gifApp", ["ngRoute", "ui.bootstrap", "ngAnimate"])

    // .config(function($routeProvider){
    //     $routeProvider.when("/", {
    //         "controller": "homeCtrl",
    //         "templateUrl": "client/views/index.html" 
    //     }).when("/gifs", {
    //         "controller": "gifCtrl",
    //         "templateUrl": "views/gifs.html"
    //     }).otherwise({
    //         "redirectTo": "/"
    //     })
    // })


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
			$http.put('/gifs/'+id+'/like').then(function (response){
				console.log('Success on Like ' , response);
			}, function (response){
				console.log('Error on like:', response);
			});
		};

		$scope.dislikeGif = function(id){
			$http.put('/gifs/'+id+'/dislike').then(function (response){
				console.log('Success on Dislike ', response);
			}, function (response){
				console.log('Error on dislike', response);
		
			});
		};

	}])
	
.controller('ModalCtrl', function ($scope, $modal, $log, $http) {

  $scope.animationsEnabled = true;

  $scope.openShare = function (size, id, url) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'shareModalContent.html',
      controller: 'shareModalInstanceCtrl',
      size: size,
      resolve: {
      	gif: function () {
      		return {
      			id: id,
      			url: url
      		}
      	}
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });

  };

  $scope.openTinder = function(size) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'tinderModalContent.html',
      controller: 'TinderModalInstanceCtrl',
      size: size,
      resolve: {
      	gifs: function () {
      		return $http.get('/gifs/random').then(function (response) {
				console.log('Success Whoop: ', response); 
    			return response.data;
   				
  			}, function (response){
  				console.log('Error sad face: ', response);
  				return response;
  			});	
      	}
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  }

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

})

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

.controller('ShareModalInstanceCtrl', function ($scope, $modalInstance, $http, gif) {

  $scope.gif = gif;

  $scope.share = function(sender, recipient, message){

  	var data = {
  		url: gif.url,
  		sender: sender,
  		recipient: recipient,
  		message: message
  	};

  	console.log('Sharegif: ', sender, recipient, message);

	$http.put('/share', data).then(function (response){
		console.log('Success on share ' , response);
	}, function (response){
		console.log('Error on share', response);
	});
 }

  $scope.ok = function () {
    $modalInstance.close(gif.id);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
})

.controller('TinderModalInstanceCtrl', function ($scope, $modal, $http, gifs) {

	console.log('TinderModalInstance: ', gifs);

	var gifs = gifs;
	var activeIndex = 0;

	$scope.activeGif = gifs[activeIndex];

	$scope.like = function () {
		console.log('Like has been hit', activeIndex, $scope.activeGif);
		$scope.activeGif = gifs[++activeIndex];
		console.log('Like has been hit', activeIndex, $scope.activeGif);
	}

	$scope.dislike = function () {
		console.log('dislike has been hit', activeIndex);
		$scope.activeGif = gifs[--activeIndex];
		console.log('dislike has been hit', activeIndex);
	}
})



