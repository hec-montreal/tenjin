// import {UpgradeAdapter} from '../../node_modules/angular2/upgrade';
import {UpgradeAdapter} from 'angular2/upgrade';

import {TextElementComponent} from './element/textElement/textElement';
import {HyperlinkElementComponent} from './element/hyperlinkElement/hyperlinkElement';
import {AddElementComponent} from './element/addElementMenu/addElementMenu';  
import {ImageElementComponent} from './element/imageElement/imageElement';
import {DocumentElementComponent} from './element/documentElement/documentElement';
import {ButtonsElementComponent} from './element/buttonsElement/buttonsElement';
import {ClusterElementComponent} from './element/clusterElement/clusterElement';
import {RubricElementComponent} from './element/rubricElement/rubricElement';

var adapter = new UpgradeAdapter();

// downgrade directive to angular 1 context
opensyllabusApp.directive('textElement', adapter.downgradeNg2Component(TextElementComponent));

// downgrade directive to angular 1 context
opensyllabusApp.directive('hyperlinkElement', adapter.downgradeNg2Component(HyperlinkElementComponent));

// downgrade directive to angular 1 context
opensyllabusApp.directive('addElementMenu', adapter.downgradeNg2Component(AddElementComponent));

// downgrade directive to angular 1 context
opensyllabusApp.directive('imageElement', adapter.downgradeNg2Component(ImageElementComponent));


// downgrade directive to angular 1 context
opensyllabusApp.directive('documentElement', adapter.downgradeNg2Component(DocumentElementComponent)); 

// downgrade directive to angular 1 context
opensyllabusApp.directive('buttonsElement', adapter.downgradeNg2Component(ButtonsElementComponent));

// downgrade directive to angular 1 context
opensyllabusApp.directive('clusterElement', adapter.downgradeNg2Component(ClusterElementComponent));

// downgrade directive to angular 1 context
opensyllabusApp.directive('rubricElement', adapter.downgradeNg2Component(RubricElementComponent));


// downgrade buttons element directive to angular 1 context
// opensyllabusApp.directive('buttonsElement', adapter.downgradeNg2Component(ButtonsElementComponent));

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

// upgrade to angular 2 config 
adapter.upgradeNg1Provider('config');

// downgrade text element directive to angular 1 context
// opensyllabusApp.directive('buttonsElements', adapter.upgradeNg1Component(TextElementComponent));


adapter.bootstrap(document.body, ['opensyllabus']);

