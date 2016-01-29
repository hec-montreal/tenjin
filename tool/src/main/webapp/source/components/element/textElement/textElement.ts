import {Component, Input, Inject} from 'angular2/core';


@Component({
    selector: 'text-element',
    templateUrl: 'element/textElement/textElement.html',
    // template: `<div class="element">
    // <div editable-text="element.type" class="titre-element" data-ng-if="element.title"> {{element.title }}</div>
    // <div ng-bind-html="element.description" class="comment"></div> 

    // </div>`,
    // directives: [
    //     ButtonsElementComponent
    // ]
})

export class TextElementComponent {

    @Input() element: any;

    // constructor(variables: variables) {
    constructor( @Inject('variables') variables: variables) {
        // debugger;
        this.variables = variables;
    }

} 

