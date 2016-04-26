import {Component, Input, Inject} from 'angular2/core';

import {CORE_DIRECTIVES} from 'angular2/common';

import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
  

@Component({
    selector: 'add-element-menu',
    directives: [DROPDOWN_DIRECTIVES, CORE_DIRECTIVES],
    // templateUrl: '../../../../components/element/addElementMenu/addElementMenu.html',
    template: `

      <!-- Single button with keyboard nav -->
      <div [ngClass]="{ 'open' : showMenuAjouter}">
          <div class="btn-group" dropdown keyboardNav="true">
            <button id="simple-btn-keyboard-nav" type="button" class="btn btn-primary" (click)="checkRubricsAlreadyPresent()" dropdownToggle>
              <span class="glyphicon glyphicon-plus-sign"></span>
              <span class="ajouter-libelle">Ajouter</span>
              <span class="caret"></span>
            </button> 
            <ul class="dropdown-menu liste-menu-ajout" role="menu" aria-labelledby="simple-btn-keyboard-nav">
              <li role="menuitem" class="testest" *ngFor="#type of syllabusService.template[element.templateStructureId].elements"> 
                
                <a href="javascript:void(0);" *ngIf="!type.provided" [ngClass]="{ 'link-deactivated': (type.alreadyPresent===true) }" (click)="addElement(type)">{{ type.label }}</a>
              </li>
            </ul>
          </div>
       </div>

    `
    // template: `<div>Coucou</div>`
}) 

export class AddElementComponent {

    lastStockSymbol: string; // 2

    @Input() element: any;
    // @HostBinding() value: string;

    constructor( @Inject('ModalService') modalService: ModalService, 
                @Inject('SyllabusService') syllabusService: SyllabusService, 
                @Inject('TreeService') treeService: TreeService,
                @Inject('AlertService') alertService: AlertService,
                @Inject('config') config: config) {
        
        this.modalService = modalService;
        this.syllabusService = syllabusService;
        this.treeService = treeService;
        this.alertService = alertService;
        this.config = config;
        this.showMenuAjouter = false;
        this.status = { isopen: true };
  
    }


    addElement($type) {

        console.log("type : " + $type.type);
        this.isOpen = false;

        // Si il s'agit d'une rubrique on l'ajoute directement
        if ($type.type === "rubric") {

            // TODO : si le plan de cours est vide on le sauvegarde
            // var syllabus = SyllabusService.getSyllabus();
            // // plan de cours vide
            // if (!syllabus.id) {       
            //     // ajout de l'élément au plan de cours
            //     SyllabusService.addElement($scope.element, $scope.parent);
            //     // sauvegarde du plan de cours + l'élément en cours
            // }
 
            // Création    
            var element = {
                'attributes': {},
                'type': $type.type,
                'parentId': this.element.id, 
                'templateStructureId': $type.id,
                'availability_start_date': Date.now(),
                'title': $type.label,
                'important': false,
                'publicElement': true,
                'common': this.syllabusService.syllabus.common
            };
            this.mode = "creation";

            var data = angular.copy(this.syllabusService.syllabus);
            var selectedItemId = this.treeService.selectedItem.id;
            var emplacement = this.treeService.selectedItem.$emplacement;

            var result = this.syllabusService.addRubricToSyllabus(data, this.element, element);

            if (result > 0) {

                var savePromise = this.syllabusService.save(data);
                this.syllabusService.setWorking(true);

                savePromise.$promise.then( ($data) => {
                    // alert ajout ok
                    // this.alertService.display('success', $translate.instant('ALERT_SUCCESS_ADD_ELEMENT'));
                    // this.alertService.display('success', 'Pensez à migrer angular translate');
                    this.syllabusService.setSyllabus($data);
                    // refresh the reference of the selected item and refresh the right panel
                    // this.treeService.setSelectedItemFromId(selectedItemId);
                    this.treeService.setSelectedItemFromEmplacement(emplacement);

                }, ($error) => {
                    // alert ajout ko
                    this.alertService.display('danger');

                }).finally(() => {
                    this.syllabusService.setWorking(false);
                });

            } else {
                // Rubrique déjà présente
                // this.alertService.display('danger', $translate.instant('ALERT_RUBRIC_EXISTS'));
                this.alertService.display('danger', 'Pensez à migrer angular translate');
            }

        } // Sinon on lance une popup de création de l'élément
        else {

            // hide menu
            this.showMenuAjouter = false;

            // TODO : open edition popup
            var modal = this.modalService.createElement($type, this.element);

            // Traitement du résultat
            modal.result.then(function(createdItem) {
                console.debug('élément ajouté');
            }, function() {
                console.debug('élément non ajouté');
            });
        }

    }

    checkRubricsAlreadyPresent() {
        // if there are elements and the first one is a rubric ( so the others would be rubric aswell )
        if (this.element.elements) {
            // reinit
            for (var k = 0; k < this.syllabusService.template[this.element.templateStructureId].elements.length; k++) {
                this.syllabusService.template[this.element.templateStructureId].elements[k].alreadyPresent = false;
            }
            // mark rubric already present
            for (var i = 0; i < this.element.elements.length; i++) {
                for (var j = 0; j < this.syllabusService.template[this.element.templateStructureId].elements.length; j++) {
                    // check if the rubric is already present
                    var ruleElement = this.syllabusService.template[this.element.templateStructureId].elements[j];
                    if (this.element.elements[i].type === 'rubric' && ruleElement.id === this.element.elements[i].templateStructureId) {
                        this.syllabusService.template[this.element.templateStructureId].elements[j].alreadyPresent = true;
                        break;
                    }
                }

            }
        }
    }


    toggleMenu() {
        this.showMenuAjouter = this.showMenuAjouter === false ? true : false;
    } 

} 
