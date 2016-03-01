angular.module('quotesApp', ['ui.router'])

.config(function($urlRouterProvider, $locationProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/');

  // routing
    // user pages

    // login
    // logout

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
    controller: 'UserQuotesController'
  })

  $locationProvider.html5Mode(true);
})

.controller('MainController', function($scope, $http, $timeout) {
  $scope.test = 'Hello World';
  $scope.editEnabled = false;
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

.controller('UserQuotesController', function($scope, $http, $timeout) {
  $scope.userId = '1337';
  $scope.editEnabled = true;
  $http.get('api/' + $scope.userId + '/quotes').success(function(data) {
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

.controller('NewQuoteController', function($scope, $http, $location) {
  $scope.test = 'New Quote';
  $scope.user = 'LawlietBlack';
  $scope.userId = '1337';
  $scope.newQuote = {};
  $scope.createQuote = function() {
    if(!$scope.newQuote.img || !$scope.newQuote.quote || !$scope.newQuote.source ) {
      return false;
    }
    $http.post('api/quotes', {
      img: $scope.newQuote.img,
      quote: $scope.newQuote.quote,
      source: $scope.newQuote.source,
      user: $scope.user,
      userId: $scope.userId,
      starred: []
    }).success(function(data) {
      console.log(data);
      $location.path('/myquotes')
    }).error(function(err) {
      console.log(err);
    });
  }
    
})