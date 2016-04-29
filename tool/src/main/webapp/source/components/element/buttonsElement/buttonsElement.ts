import {Component, Input, Inject} from 'angular2/core';

// import {AddElementComponent} from '../components/element/addElementMenu/addElementMenu';  
// We have to reference the compiled javascript file (used by browserify to load the module)
import {AddElementComponent} from '../addElementMenu/addElementMenu';  

@Component({ 
    selector: 'buttons-element',
    template: ` 
    <div class="buttons">

        <!-- Add -->
        <add-element-menu *ngIf="element.type === 'rubric' || element.type === 'composite'" [element]="element"  class="container-menu-ajout-rubric" ></add-element-menu>

        <!-- Edition -->
        <span class="picto-edit" (click)="!disabled && edit(element);" *ngIf="!noedit"></span>   

        <!-- Delete -->
        <span *ngIf="!nodelete" (click)="!disabled && confirmDelete(element);" [ngClass]="{ 'picto-delete' : !nodelete, 'picto-delete-disabled' : nodelete}" ></span>

    </div> 
    `,
    directives: [AddElementComponent] 
})  

export class ButtonsElementComponent {   

    @Input() element: Object;
    @Input() noedit: boolean;
    @Input() nodelete: boolean;
    @Input() nodrag: boolean;
    @Input() disabled: boolean;

    constructor( @Inject('ModalService') modalService: ModalService, @Inject('SyllabusService') syllabusService: SyllabusService) {
        this.modalService = modalService;
        this.syllabusService = syllabusService;
    }

    confirmDelete($element) {

        var parent = this.syllabusService.getParent($element);
        // Creation modal
        var modal = this.modalService.confirmDelete(parent, $element);
        // Processing result
        modal.result.then(function(selectedItem) {
            // console.debug('element modified');
        }, function() {
            // 
        });
    }

    edit($element) {

        var parent = this.syllabusService.getParent($element);
        // Creation modal
        var modal = this.modalService.editElement(parent, $element);

        // Processing result
        modal.result.then(function(selectedItem) {
            // console.debug('element modified');
        }, function() {
            // 
        });
    }

}

