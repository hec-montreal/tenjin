// import {UpgradeAdapter} from '../../node_modules/angular2/upgrade';
import {UpgradeAdapter} from 'angular2/upgrade';

import {TextElementComponent} from './element/textElement/textElement';
import {AddElementComponent} from './element/addElementMenu/addElementMenu';  
import {ButtonsElementComponent} from './element/buttonsElement/buttonsElement';
import {ClusterElementComponent} from './element/clusterElement/clusterElement';
import {ToolElementComponent} from './element/toolElement/toolElement';

var adapter = new UpgradeAdapter();

// downgrade directives to angular 1 context
tenjinApp.directive('addElementMenu', adapter.downgradeNg2Component(AddElementComponent));
tenjinApp.directive('buttonsElement', adapter.downgradeNg2Component(ButtonsElementComponent));
tenjinApp.directive('clusterElement', adapter.downgradeNg2Component(ClusterElementComponent));
tenjinApp.directive('toolElement', adapter.downgradeNg2Component(ToolElementComponent));

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

