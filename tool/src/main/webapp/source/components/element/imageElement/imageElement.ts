import {Component, Input, Inject} from 'angular2/core';

@Component({
    selector: 'image-element',
    template: `
    <div class="element image"> 

        <div class="titre-element">
            <!-- <a [href]="element.attributes.imageUrl" target="_blank"> -->
                {{ element.title || resource.name }}
            <!-- </a> -->
        </div>
        <div class="row"> 
            <a [href]="resource.url " target="_blank" class="col-sm-3 col-xs-12 link-image">
                <img [src]="resource.url" [alt]="element.title" [title]="element.title" />
            </a> 

            <span [innerHTML]="element.description" class="col-sm-9 col-xs-12 comment"></span>
        </div>

        
        <div class="infos">
            <span [ngClass]="{ 'picto-important' : ( element.attributes.imageImportant === 'true') }" title="Important"></span>
            <span [ngClass]="{ 'picto-hec' : ( element.attributes.imageDiffusion === 'hec' ), 'picto-public' : ( element.attributes.imageDiffusion === 'public' ) }" title="Niveau de diffusion"></span> 
            <span [ngClass]="{ 'picto-hidden' : ( element.attributes.imageHidden === 'true') }" title="Visible"></span>     
        </div> 

    </div>
    `
})


export class ImageElementComponent implements OnInit {

    @Input() element: any;


    constructor( @Inject('ResourcesService') resourcesService: ResourcesService) {
        this.resourcesService = resourcesService;
    }

    ngOnInit() {
        this.loadResource();
    }

    loadResource() {
        // Get ressources informations
        if (!this.resource && this.resourcesService.resources) {
            if (this.element.attributes.resourceId) {
                console.time('loadResource');
                this.resource = this.resourcesService.getResource(this.element.attributes.resourceId);
                console.timeEnd('loadResource');
            }
        }
    };
}

