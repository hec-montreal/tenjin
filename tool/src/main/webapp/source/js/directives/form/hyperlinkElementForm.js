﻿
opensyllabusApp.directive('hyperlinkElementForm', function (){
    'use strict';

    return {
        scope: {
            element: '=hyperlinkElementForm'
        },
        restrict: 'A',
        templateUrl: 'form/hyperlinkElementForm.html',
        controller: function ($scope) {

        },
        link: function ($scope, $element) {
        }

    };

});
