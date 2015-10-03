angular.module('venshurApp', [
  'ngRoute',
  'venshurServices',
  'Header',
  'Map',
  'Trips',
  'ui.bootstrap',
  'PhotoView'
])
.run(['Auth','Fetcher','$http', function(Auth,Fetcher,$http){
  Auth.checkAuth();
}])
.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {

  $routeProvider
    .when('/', {
      templateUrl: "index.html"
    })
    .when('/auth/instagram', {
      templateUrl: "index.html",
      redirect: false
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
