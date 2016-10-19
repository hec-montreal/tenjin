// import {UpgradeAdapter} from '../../node_modules/angular2/upgrade';
import {UpgradeAdapter} from 'angular2/upgrade';

import {TextElementComponent} from './element/textElement/textElement';
import {HyperlinkElementComponent} from './element/hyperlinkElement/hyperlinkElement';
import {AddElementComponent} from './element/addElementMenu/addElementMenu';  
import {ImageElementComponent} from './element/imageElement/imageElement';
import {ButtonsElementComponent} from './element/buttonsElement/buttonsElement';
import {ClusterElementComponent} from './element/clusterElement/clusterElement';
import {RubricElementComponent} from './element/rubricElement/rubricElement';
import {ToolElementComponent} from './element/toolElement/toolElement';
import {VideoElementComponent} from './element/videoElement/videoElement';
import {CourseElementComponent} from './element/courseElement/courseElement';

var adapter = new UpgradeAdapter();

// downgrade directives to angular 1 context
tenjinApp.directive('textElement', adapter.downgradeNg2Component(TextElementComponent));
tenjinApp.directive('hyperlinkElement', adapter.downgradeNg2Component(HyperlinkElementComponent));
tenjinApp.directive('addElementMenu', adapter.downgradeNg2Component(AddElementComponent));
tenjinApp.directive('imageElement', adapter.downgradeNg2Component(ImageElementComponent));
tenjinApp.directive('buttonsElement', adapter.downgradeNg2Component(ButtonsElementComponent));
tenjinApp.directive('clusterElement', adapter.downgradeNg2Component(ClusterElementComponent));
tenjinApp.directive('rubricElement', adapter.downgradeNg2Component(RubricElementComponent));
tenjinApp.directive('toolElement', adapter.downgradeNg2Component(ToolElementComponent));
tenjinApp.directive('videoElement', adapter.downgradeNg2Component(VideoElementComponent));
tenjinApp.directive('courseElement', adapter.downgradeNg2Component(CourseElementComponent));


// downgrade buttons element directive to angular 1 context
// tenjinApp.directive('buttonsElement', adapter.downgradeNg2Component(ButtonsElementComponent));

// const ButtonsElement = adapter.upgradeNg1Component('buttonsElement');

// upgrade to angular 2 variables 
adapter.upgradeNg1Provider('variables'); 

// upgrade to angular 2 SyllabusService 
adapter.upgradeNg1Provider('SyllabusService');

// upgrade to angular 2 Modal 
adapter.upgradeNg1Provider('ModalService');

// upgrade to angular 2 TreeService 
adapter.upgradeNg1Provider('TreeService');

// upgrade to angular 2 AlertService 
adapter.upgradeNg1Provider('AlertService');

// upgrade to angular 2 ResourcesService 
adapter.upgradeNg1Provider('ResourcesService');

// upgrade to angular 2 SakaiToolsService 
adapter.upgradeNg1Provider('SakaiToolsService');

// upgrade to angular 2 config 
adapter.upgradeNg1Provider('config');

// downgrade text element directive to angular 1 context
// tenjinApp.directive('buttonsElements', adapter.upgradeNg1Component(TextElementComponent));


adapter.bootstrap(document.body, ['tenjin']);

