function AppCtrl ($scope, $http){
	console.log("Hello Wolrd");

$http.get('/gifs').success(function (response){
	console.log('I got the data I requested');
	$scope.gifs = response;
});
$scope.onSubmit = function(){
	$http.post('/gifs', $scope.item);
};
	
}