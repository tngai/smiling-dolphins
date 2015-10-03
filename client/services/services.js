angular.module('venshurServices', [])
  .factory('Fetcher', Fetcher)
  .factory('Auth', ['$rootScope', '$q', '$http', '$location', Auth])
  .factory('mapService', mapservice)

var trips = [];
var currentTrip = {};

function Fetcher ($http,mapService) {

  var setCurrentTrip = function(trip){
    for(var key in trip){
      currentTrip[key] = trip[key];
    }
    mapService.trip = currentTrip;
    return currentTrip;
  }

  var getTrips = function(){
    return $http({
      method: 'GET',
      url: '/api/trips'
    })
    .then(function (response) {
      response.data.data.forEach(function(item, index){
        trips[index] = item;
      });
    })
    .catch(function(err){
      console.log('err from getTrips Fetcher: ', err);
    });
  };

  var getTrip = function(tripId){
    return $http({
      method: 'GET',
      url: '/api/trips/' + tripId
    })
    .then(function (response) {
      return response.data;
    });
  };

  return {
    trips: trips,
    currentTrip: currentTrip,
    setCurrentTrip: setCurrentTrip,
    getTrips: getTrips,
    getTrip: getTrip
  }
}

function Auth ($rootScope, $q, $http, $location){
  function getAuth() {
    var userProfile = $rootScope.user.getItem('userProfile');
  }
  function checkAuth(){
    return $http({method: 'GET', url: '/api/auth'})
    .then(function(response){
      console.log('success response: ', response);
      // var userProfile = $rootScope.user.getItem('userProfile') || {};
      // response.data.forEach(function(val, key){
      //   userProfile[key] = val;
      // });
      // $rootScope.user.setItem('userProfile', userProfile);
      // $rootScope.user.authenticated = userProfile.authenticated;
    }, function(response){
      console.log('error response: ', response.status, response.data);
    });
  }

  return {
    getAuth: getAuth,
    checkAuth: checkAuth
  }
}

function mapservice(){
  var mark,modalInstance,trip;

  return {
    trip:trip,
    mark:mark,
    modalInstance:modalInstance,
  };
}