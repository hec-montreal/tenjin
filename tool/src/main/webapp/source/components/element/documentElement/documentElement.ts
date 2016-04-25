import {Component, Input, Inject} from 'angular2/core';

@Component({
    selector: 'document-element',
    template: `
   <div class="element document">

       <div class="titre-element">
            <a [href]="resource.url" target="_blank">
                {{ element.title || resource.name }} 
            </a> <span class="resource-type">[{{ documentType }}]</span> 
        </div>
        <div class="titre-fichier">
            ({{ resource.name }})
        </div>

        <div [innerHTML]="element.description" class="comment"></div>

        <div class="infos">
            <span [ngClass]="{ 'picto-important' : ( element.attributes.docImportant === 'true') }" title="Important"></span>
            <span [ngClass]="{ 'picto-hec' : ( element.attributes.docDiffusion === 'hec' ), 'picto-public' : ( element.attributes.docDiffusion === 'public' ) }" title="Niveau de diffusion"></span> 
            <span [ngClass]="{ 'picto-hidden' : ( element.attributes.docHidden === 'true') }" title="Visible"></span>     
        </div>

    </div>
    `
}) 


export class DocumentElementComponent implements OnInit {

    @Input() element: any;


    constructor( @Inject('ResourcesService') resourcesService: ResourcesService, @Inject('config') config: config) {
        this.resourcesService = resourcesService;
        this.config = config;
    }

    ngOnInit() {
        this.loadResource();

        // si le type du document est retrouvé alors on cherche le libellé associé
        if (this.element.attributes.docType) {
            for (var i = 0; i < this.config.documentTypes.length; i++) {
                if (parseInt(this.element.attributes.docType) === this.config.documentTypes[i].id) {
                    this.documentType = $translate.instant(this.config.documentTypes[i].name);
                    break;
                }
            }
        }
    }

    loadResource() {
        // Get ressources informations
        if (!this.resource && this.resourcesService.resources) {
            if (this.element.attributes.resourceId) {
                this.resource = this.resourcesService.getResource(this.element.attributes.resourceId);
            }
        }
    };
}

