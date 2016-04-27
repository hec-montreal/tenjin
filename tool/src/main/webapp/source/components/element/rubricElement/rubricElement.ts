import {Component, Input, Inject} from 'angular2/core';

@Component({
    selector: 'rubric-element',
    template: `
    <div class="composite">

        <div class="titre-element element-page item-panel-composite"> 
            {{element.title}}
        </div>  

    </div>
    `

})


export class RubricElementComponent {

    @Input() element: Object;


    constructor() {
    }

}

