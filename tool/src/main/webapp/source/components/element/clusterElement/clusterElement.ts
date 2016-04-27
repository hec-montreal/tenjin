import {Component, Input, Inject} from 'angular2/core';

// import {ButtonsElementComponent} from '../buttonsElement/buttonsElement';


@Component({
    selector: 'cluster-element', 
    template: `
    <div class="composite">    
 
        <div class="titre-element element-page item-panel-composite">
 
 
            <a href="" (click)="treeService.setSelectedItem(element)">{{element.title}}</a>

            <div *ngIf="!element.description" >
                <a href="" class="link-description" >Ajouter une description</a>
            </div>  

            <div *ngIf="element.description" [innerHTML]="element.description" class="comment"></div> 
     
        </div> 
 
    </div> 
    `
    // directives: [ButtonsElementComponent]
})


export class ClusterElementComponent {

    @Input() element: Object;

    // Dependency injection example
    // constructor( @Inject('variables') variables: variables) { 
    //     this.variables = variables;
    // }

    constructor( @Inject('TreeService') treeService: TreeService, @Inject('SyllabusService') syllabusService: SyllabusService) {
        this.treeService = treeService;
        this.syllabusService = syllabusService;
    }

}

