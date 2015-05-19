/**
 * @author Rafael Violato (http://rviolato.com)
 */
(function(){

	angular.module('pg-ng-dropdown', [])
		.directive('pgNgDropdown', dropdownDirective);

	function dropdownDirective(){

		var template = '<div class="pg-dropdown">' +
							'<div data-ng-click="dropdownCtrl.toggle()" class="current-selected-option">' +
									'<i data-ng-if="image === \'true\'">' +
									'</i>' +
									'<span data-ng-bind="data[currentSelected].text">' +
									'</span>' +
							'</div>' +
							'<ul class="dropdown-content">' +
								'<li data-ng-click="dropdownCtrl.selectOption($index)" data-ng-repeat="option in data">' +
									'<i data-ng-if="image === \'true\'">' +
									'</i>' +
									'<span data-ng-bind="option.text">' +
									'</span>' +
								'</li>' +
							'</ul>' +
					   '</div>';

		var directive = {
			scope: {
				data: '=options',
				image: '@imageOptions',
				currentSelected: '@selected',
				openedClass: '@',
			},
			restrict: 'AEC',
			controller: controller,
			controllerAs: 'dropdownCtrl',
			link: postLink,
			template: template,
		};

		return directive;

		function controller($scope){

			var self = this;
			self.opened = false;

			if(!$scope.currentSelected){

				$scope.currentSelected = 0;

			}

			$scope.data[$scope.currentSelected].selected = true;

			self.selectOption = selectOption;
			self.toggle = toggle;

			function selectOption(_index){

				_index = parseInt(_index);

				$scope.currentSelected = _index;
				$scope.data[_index].selected = true;

				console.log(_index);
			}

			function toggle(){

				if(self.opened){

					self.opened = false;
					$scope.$broadcast('close-dropdown');

				}else{

					self.opened = true;
					$scope.$broadcast('open-dropdown');

				}

			}
			
		}

		function postLink($scope, $element){

			if($scope.openedClass){
				var openedClass = $scope.openedClass;
			}else{
				var openedClass = 'opened';
			}
			
			$scope.$on('open-dropdown', open);
			$scope.$on('close-dropdown', close);

			function open(){
				$element.addClass(openedClass);
			}

			function close(){
				$element.removeClass(openedClass);
			}

		}

	}
	
})();