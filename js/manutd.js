var myApp = angular.module('myApp', []);

myApp.service('filteredListService', function () {

    this.searched = function (valLists, toSearch) {
        return _.filter(valLists,

        function (i) {
            /* Search Text in all 3 fields */
            return searchUtil(i, toSearch);
        });
    };

    this.paged = function (valLists, pageSize) {
        retVal = [];
        for (var i = 0; i < valLists.length; i++) {
            if (i % pageSize === 0) {
                retVal[Math.floor(i / pageSize)] = [valLists[i]];
            } else {
                retVal[Math.floor(i / pageSize)].push(valLists[i]);
            }
        }
        return retVal;
    };

});
var TableCtrl = myApp.controller('TableCtrl', function ($scope, $filter, filteredListService) {

    $scope.pageSize = 11;
    $scope.allItems = getPlayerData();
    $scope.reverse = false;

    $scope.resetAll = function () {
        $scope.filteredList = $scope.allItems;
        $scope.searchText = '';
        $scope.currentPage = 0;
        $scope.Header = ['', '', ''];
    }


    $scope.search = function () {
        $scope.filteredList = filteredListService.searched($scope.allItems, $scope.searchText);

        if ($scope.searchText == '') {
            $scope.filteredList = $scope.allItems;
        }
        $scope.pagination();
    }


    // Calculate Total Number of Pages based on Search Result
    $scope.pagination = function () {
        $scope.ItemsByPage = filteredListService.paged($scope.filteredList, $scope.pageSize);
    };

    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

    $scope.firstPage = function () {
        $scope.currentPage = 0;
    };

    $scope.lastPage = function () {
        $scope.currentPage = $scope.ItemsByPage.length - 1;
    };

    $scope.range = function (input, total) {
        var ret = [];
        if (!total) {
            total = input;
            input = 0;
        }
        for (var i = input; i < total; i++) {
            if (i != 0 && i != total - 1) {
                ret.push(i);
            }
        }
        return ret;
    };

    $scope.sort = function (sortBy) {
        $scope.resetAll();

        $scope.columnToOrder = sortBy;

        //$Filter - Standard Service
        $scope.filteredList = $filter('orderBy')($scope.filteredList, $scope.columnToOrder, $scope.reverse);

        if ($scope.reverse) iconName = 'glyphicon glyphicon-chevron-up';
        else iconName = 'glyphicon glyphicon-chevron-down';

        if (sortBy === 'playerName') {
            $scope.Header[0] = iconName;
        } else if (sortBy === 'name') {
            $scope.Header[1] = iconName;
        } else {
            $scope.Header[2] = iconName;
        }

        $scope.reverse = !$scope.reverse;

        $scope.pagination();
    };
    $scope.sort('name');

});

function searchUtil(item, toSearch) {
    /* Search Text in all 3 fields */
    return (item.name.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 || item.nationality.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 || item.position.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 ) ? true : false;
}
/*Get Player Data*/
function getPlayerData() {
	 var jqxhr = $.ajax({
		headers: { 'X-Auth-Token': 'f4e617dd900643c8a1a1c20585708274' },
		url: 'http://api.football-data.org/alpha/teams/66/players',
		dataType: 'json',
		type: 'GET',
		async:false,
  }).done(function(data1) {
	jqxhr += 	data1;
  });
  return jqxhr.responseJSON.players;
}

//redirect
var ExampleController = myApp.controller('ExampleController', ['$scope', '$location',function($scope, $location){ 
	$scope.goAboutus = function (hash) { 
		window.location = './aboutus.php';
	}
	$scope.fixtures = function (hash) { 
		window.location = './fixtures.php';
	}
	$scope.current = function (hash) { 
		window.location = './current.php';
	}
	
}]);

