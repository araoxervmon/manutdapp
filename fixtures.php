<script src="js/angular.min.js"></script>
<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/underscore.js"></script>
<script src="js/fixture.js"></script>
<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
<link href="css/manutd.css" rel="stylesheet" >
<title>ManUtd App</title>
<link rel="shortcut icon" href="img/favicon.ico">
<div ng-app="myApp" >
	<div class="row">
	  <? include('sidebar.php'); ?>
	  <div class="col-md-8">
		<div ng-controller="TableCtrl">
			<div class="container-fluid">
			<div class="input-group">
				<input class="form-control" ng-model="searchText" placeholder="Search" type="search" ng-change="search()" /> <span class="input-group-addon">
					<span class="glyphicon glyphicon-search"></span>
				</span>
			</div>
			<div class="table-responsive">
				<table class="table  table-bordered table-hover data-table myTable">
					<thead>
						<tr>
							<th class="homeTeam"> <a href="#" ng-click="sort('homeTeam',$event)">Home Team
								 <span class="{{Header[0]}}"></span>
								 </a>

							</th>
							<th class="name"> <a ng-click="sort('name')" href="#"> Away Team
								 <span class="{{Header[1]}}"></span></a>
							</th>
							<th class="Email"> <a ng-click="sort('Email')" href="#"> Goals Home Team
							 <span class="{{Header[2]}}"></span></a>
							</th>
							<th class="Email"> <a ng-click="sort('Email')" href="#"> Goals Away Team
							 <span class="{{Header[2]}}"></span></a>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr ng-repeat="item in ItemsByPage[currentPage] | orderBy:columnToOrder:reverse">
							<td>{{item.homeTeam}}</td>
							<td>{{item.awayTeam}}</td>
							<td>{{item.goalsHomeTeam}}</td>
							<td>{{item.goalsAwayTeam}}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<ul class="pagination pagination-sm pull-right">
				<li ng-class="{active:0}"><a href="#" ng-click="firstPage()">First</a>

				</li>
				<li ng-repeat="n in range(ItemsByPage.length)"> <a href="#" ng-click="setPage()" ng-bind="n+1">1</a>

				</li>
				<li><a href="#" ng-click="lastPage()">Last</a>

				</li>
			</ul>
			</div>
		</div>
		</div>
	</div>
</div>