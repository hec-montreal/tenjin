import {Component, Input, Inject} from 'angular2/core';

@Component({
    selector: 'cluster-element', 
    template: `
    <div class="composite">    
 
        <div class="titre-element element-page item-panel-composite">
 
 
            <a data-nodrag (click)="treeService.setSelectedItem(element)">{{element.title}}</a>

            <div *ngIf="!element.description" >
                <a data-nodrag class="link-description" >Ajouter une description</a>
            </div>  

            <div *ngIf="element.description" [innerHTML]="element.description" class="comment"></div> 
     
        </div> 
 
    </div> 
    `
})


export class ClusterElementComponent {

    @Input() element: Object;

    constructor( @Inject('TreeService') treeService: TreeService, @Inject('SyllabusService') syllabusService: SyllabusService) {
        this.treeService = treeService;
        this.syllabusService = syllabusService;
    }

}

