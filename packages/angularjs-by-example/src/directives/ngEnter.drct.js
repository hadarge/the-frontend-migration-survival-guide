angular
    .module('app.core')
    .directive('ngEnter', ngEnter);

angular
    .module('app.core')
   .directive('onInit', ngInit);


function ngInit() {
    return function(scope, element, attrs) {
        scope.$apply(function(){
           // debugger;
            scope[attrs.onInit](element[0]);
           // console.log('alo', scope, element, attrs);
           // scope.test(element[0]);
          //  scope.$eval(attrs.onInit, { $el: element });
        });
    };
}

function ngEnter() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
}