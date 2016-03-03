angular.module('quotesApp')


.factory('$auth', function($http, $rootScope, $window, $location) {
  var currentUser;

  var setUser = function(user) {
    currentUser = user;
  }

  var getCurrentUser = function() {
    return currentUser;
  }

  var isLoggedIn = function() {
    return currentUser ? currentUser : false;
  }

  var logout = function() {
    $window.location.href = '/logout';
  }

  return {
    getCurrentUser: getCurrentUser,
    isLoggedIn: isLoggedIn,
    setUser: setUser,
    logout: logout
  }
})

.run(function($auth, $rootScope, $http) {
  $rootScope.logout = $auth.logout;
  if(!$auth.isLoggedIn()) {
    $http.get('api/me').success(function(data) {
      $auth.setUser(data);
      $rootScope.user = data;
    }).error(function(err) {
      console.error(err);
    })
  } else {
    $rootScope.user = $auth.getCurrentUser();
  }
  $rootScope.$watch($auth.isLoggedIn, function (value, oldValue) {
    if(!value && oldValue) {
      console.log("Disconnect");
      $location.path('/login');
    }
    if(value) {
      console.log("Connect");
      //Do something when the user is connected
    }
  }, true);
})