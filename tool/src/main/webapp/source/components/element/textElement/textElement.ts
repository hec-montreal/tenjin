import {Component, Input, Inject} from 'angular2/core';

// let template = require('./../../../../components/element/textElement/textElement.html');

@Component({
    selector: 'text-element',
    // templateUrl: '../../../../components/element/textElement/textElement.html',
    // templateUrl: 'tutu.html',
    template: `
    <div class="element">

    <div editable-text="element.type" class="titre-element" *ngIf="element.title"> {{element.title }}</div>
    <div *ngIf="element.description" [innerHtml]="element.description" class="comment"></div>

    </div> 
    `
})


export class TextElementComponent {

    @Input() element: any; 

    constructor( @Inject('variables') variables: variables) { 
        this.variables = variables;
    }

} 

