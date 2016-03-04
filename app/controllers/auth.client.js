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

.run(function($auth, $rootScope, $http, $location) {
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
  $rootScope.userPage = function(userid) {
    $location.path('/user/' + userid);
  };
  $rootScope.star = function(quote) {
    var user = $auth.getCurrentUser();
    if(user && quote.starred.indexOf(user._id) < 0) {
      quote.starred.push(user._id);
    } else if(user) {
      quote.starred.splice(quote.starred.indexOf(user._id), 1);
    }
    $http.put('api/quotes/' + quote._id, quote);
  }
})