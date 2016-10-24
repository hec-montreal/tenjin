import {Component, Input, Inject} from 'angular2/core';

@Component({
    selector: 'tool-element',
    template: `
    <div class="element tool">

         <div class="titre-element">
            <a data-nodrag [href]="entity.url" target="_blank">
                {{ entity.name }} 
            </a>
            <span class="tool-title">
                [{{ entity.tool }}]
            </span> 
        </div>
     

        <div [innerHTML]="element.description" class="comment"></div>

        <div class="infos">
            <span [ngClass]="{ 'picto-important' : ( element.attributes.toolImportant === 'true') }" title="Important"></span>
            <span [ngClass]="{ 'picto-hec' : ( element.attributes.toolDiffusion === 'hec' ), 'picto-public' : ( element.attributes.toolDiffusion === 'public' ) }" title="Niveau de diffusion"></span> 
            <span [ngClass]="{ 'picto-hidden' : ( element.attributes.toolHidden === 'true') }" title="Visible"></span>     
        </div>

    </div>
    `
})


export class ToolElementComponent implements OnInit {

    @Input() element: Object;

    constructor( @Inject('SakaiToolsService') sakaiToolsService: SakaiToolsService) {
        this.sakaiToolsService = sakaiToolsService;
    }

    ngOnInit() {
        this.entity = this.sakaiToolsService.getEntity(this.element.attributes.sakaiToolId);
    }

}

