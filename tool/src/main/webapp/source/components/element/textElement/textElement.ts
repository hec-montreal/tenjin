import {Component, Input, Inject} from 'angular2/core';

@Component({
    selector: 'text-element',
    template: `
    <div class="element">

    <div editable-text="element.type" class="titre-element" *ngIf="element.title"> {{element.title }}</div>
    <div *ngIf="element.description" [innerHtml]="element.description" class="comment"></div>

    </div> 
    `
})


export class TextElementComponent {

    @Input() element: any; 

    // Dependency injection example
    // constructor( @Inject('variables') variables: variables) { 
    //     this.variables = variables;
    // }

    constructor() {
    }
} 

