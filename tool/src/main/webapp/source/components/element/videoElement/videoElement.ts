import {Component, Input, Inject} from 'angular2/core';

@Component({
    selector: 'video-element',
    template: `
    <div class="element video">
            
        <div class="video">
            <div class="row embed">
                <iframe height="220" [src]="videoUrl" frameborder="0" allowfullscreen *ngIf="isIframe" class="col-sm-3 col-xs-12"></iframe>  
                <span [innerHTML]="videoUrl" *ngIf="!isIframe"></span>

                <span [innerHTML]="element.description" class="col-sm-9 col-xs-12 comment"></span>
            </div>

        </div> 

        <div class="infos">
            <span [ngClass]="{ 'picto-important' : ( element.attributes.videoImportant === 'true') }" title="Important"></span>
            <span [ngClass]="{ 'picto-hec' : ( element.attributes.videoDiffusion === 'hec' ), 'picto-public' : ( element.attributes.videoDiffusion === 'public' ) }" title="Niveau de diffusion"></span> 
            <span [ngClass]="{ 'picto-hidden' : ( element.attributes.videoHidden === 'true') }" title="Visible"></span>     
        </div> 

    </div>
    `
})


export class VideoElementComponent implements OnInit {

    @Input() element: Object;

    constructor() {
    }

    ngOnInit() {
        this.isIframe = true;

        // Vérification sur l'url obligatoire avant insertion dans le src de l'iframe
        if (this.element.attributes.videoUrl) {
            var videoEmbedUrl;

            // look for the source (youtube, vimeo, dailymotion)
            // Embed ou iframe 
            if (this.element.attributes.videoUrl.indexOf('<object') > -1 || this.element.attributes.videoUrl.indexOf('<iframe') > -1) {
                this.isIframe = false;

                // Set default height and width to 300*220
                var res = this.element.attributes.videoUrl.replace(/height="[0-9]*"/g, "height=220");
                // replace pixel width by classes containing width percentages
                var res2 = res.replace(/width=(")*[0-9]*(")*/g, "class='col-sm-3 col-xs-12'");

                videoEmbedUrl = res2;
            }
            // YOUTUBE
            else if (this.element.attributes.videoUrl.indexOf('youtube') > -1 || this.element.attributes.videoUrl.indexOf('youtu.be') > -1) {
                var res = this.element.attributes.videoUrl.replace("watch?v=", "embed/");
                videoEmbedUrl = res.replace("&feature=youtu.be", "");
            } // VIMEO 
            else if (this.element.attributes.videoUrl.indexOf('vimeo') > -1) {
                // le lien n'est pas embed
                if (this.element.attributes.videoUrl.indexOf('player') === -1) {
                    var tabV = this.element.attributes.videoUrl.split('/');
                    videoEmbedUrl = 'https://player.vimeo.com/video/' + tabV[tabV.length - 1];
                } else {
                    videoEmbedUrl = this.element.attributes.videoUrl;
                }
            } // DAILYMOTION 
            else if (this.element.attributes.videoUrl.indexOf('dailymotion') > -1) {

                // le lien n'est pas embed
                if (this.element.attributes.videoUrl.indexOf('http') !== -1) {
                    var tabD1 = this.element.attributes.videoUrl.split('/');
                    var finchaine = tabD1[tabD1.length - 1];
                    var tabD2 = finchaine.split("_");
                    videoEmbedUrl = '//www.dailymotion.com/embed/video/' + tabD2[0];
                } else {
                    videoEmbedUrl = this.element.attributes.videoUrl;
                }
            }

            // this.videoUrl = $sce.trustAsResourceUrl(videoEmbedUrl);
            this.videoUrl = videoEmbedUrl;
        }
    }

}

