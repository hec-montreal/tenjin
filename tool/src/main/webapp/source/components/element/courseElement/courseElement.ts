import {Component, Input, Inject} from 'angular2/core';

@Component({
    selector: 'course-element',
    template: `
    <div class="element">
        <div class="titre-element element-page">
            
            <a data-nodrag (click)="treeService.setSelectedItem(element);">{{element.$numero}} - {{element.title}}</a>

        </div>

    </div>
    `
})


export class CourseElementComponent {

    @Input() element: Object;

    constructor( @Inject('TreeService') treeService: TreeService) {
        this.treeService = treeService;
    }

}

