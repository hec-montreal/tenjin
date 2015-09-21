var opensyllabusApp = angular.module('opensyllabus', [ "ngResource" , "ui.tree" ]);

// resize frame (should be done also whenever we change content)
if (window.frameElement) {
    setMainFrameHeight(window.frameElement.id);
}