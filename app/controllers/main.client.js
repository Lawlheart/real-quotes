angular.module('quotesApp', ['ui.router'])

.config(function($urlRouterProvider, $locationProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/');
  
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'public/views/quotes-feed.html',
    controller: 'MainController'
  }).state('newquote', {
    url: '/newquote',
    templateUrl: 'public/views/new-quote.html',
    controller: 'NewQuoteController'
  }).state('myquotes', {
    url: '/myquotes',
    templateUrl: 'public/views/quotes-feed.html',
    controller: 'MyQuotesController'
  }).state('login', {
    url: '/login',
    templateUrl: 'public/views/login.html',
    controller: 'LoginController'
  }).state('user', {
    url: '/user/:userid',
    templateUrl: 'public/views/quotes-feed.html',
    controller: 'UserQuotesController'
  });
  $locationProvider.html5Mode(true);
})


.controller('MainController', function($scope, $http, $timeout, $auth) {
  $scope.editEnabled = false;
  $scope.pageType = 'stream';
  $http.get('api/quotes').success(function(data) {
    $scope.quotes = data;
    $timeout(function() {
      $('.grid').masonry({
        itemSelector: '.grid-item',
        percentPosition: true,
        columnWidth: 100
      });
    }, 1000);
  });
})

.controller('UserQuotesController', function($scope, $http, $stateParams, $timeout) {
  $scope.pageType = 'user';
  $http.get('api/' + $stateParams.userid + '/quotes').success(function(data) {
    $scope.quotes = data;
    if(data) {
      $scope.username = data[0].user;
    }
    $timeout(function() {
      $('.grid').masonry({
        itemSelector: '.grid-item',
        percentPosition: true,
        columnWidth: 100
      });
    }, 1000);
  });
})

.controller('MyQuotesController', function($scope, $http, $timeout, $auth, $location) {
  $scope.pageType = 'edit';
  $scope.user = $auth.getCurrentUser();
  $scope.myPage = true;
  if(!$scope.user) {
    $location.path('/login');
  }
  $scope.editEnabled = true;
  $http.get('api/' + $scope.user._id + '/quotes').success(function(data) {
    $scope.quotes = data;
    $timeout(function() {
      $('.grid').masonry({
        itemSelector: '.grid-item',
        percentPosition: true,
        columnWidth: 100
      });
    }, 1000);
  });
  $scope.update = function(id, update) {
    $http.put('api/quotes/' + id, update).success(function(data) {
      console.log(data);
    });
  };
  $scope.delete = function(id) {
    $http.delete('api/quotes/' + id).success(function(data) {
      console.log(data)
      $scope.quotes = $scope.quotes.filter(function(quote) {
        return quote._id !== id;
      });
    });
  }; 

})

.controller('NewQuoteController', function($scope, $http, $location, $auth) {
  $scope.user = $auth.getCurrentUser();
  if(!$scope.user) {
    $location.path('/login');
  }
  $scope.newQuote = {};
  $scope.createQuote = function() {
    if(!$scope.newQuote.img || !$scope.newQuote.quote || !$scope.newQuote.source ) {
      return false;
    }
    var quote = {
      img: $scope.newQuote.img,
      quote: $scope.newQuote.quote,
      source: $scope.newQuote.source,
      user: $scope.user.username,
      userId: $scope.user._id,
      userImg: $scope.user.image,
      starred: []
    };
    console.log(quote)
    $http.post('api/quotes', quote).success(function(data) {
      console.log(data);
      $location.path('/myquotes')
    }).error(function(err) {
      console.log(err);
    });
  }
})

.controller('LoginController', function($scope, $auth, $window) {
  $scope.loginOauth = function(provider) {
    $window.location.href = '/auth/' + provider;
  };
})

.directive('errSrc', function() {
  return {
    link: function($scope, $element, $attrs) {
      $element.bind('error', function() {
        if($attrs.src != $attrs.errSrc) {
          $attrs.$set('src', $attrs.errSrc);
        }
      });
    }
  }
})

.filter('reverse', function() {
  return function(items) {
    if(!items) {
      return items;
    } else {
      return items.slice().reverse();
    }
  };
})