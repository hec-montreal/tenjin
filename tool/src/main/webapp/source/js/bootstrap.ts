import {UpgradeAdapter} from 'angular2/upgrade';
// import {TextElementComponent} from './hero-detail.component';

var adapter = new UpgradeAdapter();

// downgrade text element directive to angular 1 context
opensyllabusApp.directive('textElement', adapter.downgradeNg2Component(TextElementComponent));

// downgrade buttons element directive to angular 1 context
// opensyllabusApp.directive('buttonsElement', adapter.downgradeNg2Component(ButtonsElementComponent));


// const ButtonsElement = adapter.upgradeNg1Component('buttonsElement');

// upgrade to angular 2 variables provider
adapter.upgradeNg1Provider('variables');

// upgrade to angular 2 SyllabusService provider
adapter.upgradeNg1Provider('SyllabusService');

// upgrade to angular 2 SyllabusService provider
adapter.upgradeNg1Provider('ModalService');

// downgrade text element directive to angular 1 context
// opensyllabusApp.directive('buttonsElements', adapter.upgradeNg1Component(TextElementComponent));


adapter.bootstrap(document.body, ['opensyllabus'], 'SyllabusService');

