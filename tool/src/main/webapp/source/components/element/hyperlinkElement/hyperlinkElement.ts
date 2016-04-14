import {Component, Input, Inject} from 'angular2/core';

@Component({
    selector: 'hyperlink-element',
    template: `
    <div class="element hyperlink"> 

        <div class="titre-element">
            <a data-nodrag [href]="element.attributes.hyperlinkUrl" target="_blank">
                {{ (element.title ? element.title : element.attributes.hyperlinkUrl) }} 
            </a>
            <span class="link-type">
                [{{ element.attributes.hyperlinkType }}] 
            </span> 
        </div>
        <div class="url-lien">
            ({{ element.attributes.hyperlinkUrl }}) 
        </div>

        <div [innerHTML]="element.description" class="comment"></div>

        <div class="infos">
            <span [ngClass]="{ 'picto-important' : ( element.attributes.hyperlinkImportant === 'true') }" title="Important"></span>
            <span [ngClass]="{ 'picto-hec' : ( element.attributes.hyperlinkDiffusion === 'hec' ), 'picto-public' : ( element.attributes.hyperlinkDiffusion === 'public' ) }" title="Niveau de diffusion"></span> 
            <span [ngClass]="{ 'picto-hidden' : ( element.attributes.hyperlinkHidden === 'true') }" title="Visible"></span>     
        </div>

    </div> 
    `
})


export class HyperlinkElementComponent {

    @Input() element: any;

    constructor() {
    }
}

