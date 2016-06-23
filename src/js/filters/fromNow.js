'use strict';

/* Filters */
// need load the moment.js to use this filter. 
angular.module('app')
  .filter('fromNow', function() {
    return function(date) {
  	console.log(date)
      return moment(date).fromNow();
    }
  });