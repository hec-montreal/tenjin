import {Component, Input, Inject} from 'angular2/core';


@Component({
    selector: 'text-element',
    templateUrl: 'textElement.html',
})

export class TextElementComponent {

    @Input() element: any;

constructor( @Inject('variables') variables: variables) {
    this.variables = variables;
    }

} 

