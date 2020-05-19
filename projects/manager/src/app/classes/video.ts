import Player from '@vimeo/player';
import YouTubePlayer from 'youtube-player';

export class Video {
    // Url
    private _url: string;
    public get url(): string {
        return this._url;
    }
    public set url(url: string) {
        this._url = url;

        // If this url is from youtube
        if (url.match(/youtube/)) {
            // We need to append this to the url for playing to work
            url += '?enablejsapi=1';
            this.player = YouTubePlayer(this.iframe);
            this.iframe.src = url;

            // Url is from vimeo
        } else {
            this.iframe.src = url;
            this.player = new Player(this.iframe);
        }
    }


    public thumbnail: string;
    private player: any;
    public playing: boolean;

    constructor(private iframe: HTMLIFrameElement) { }

    play() {
        // If this video does not have a url, return
        if (!this.url) return;

        // If this video is youtube
        if (this.player.playVideo) {
            if (!this.playing) {
                this.playing = true;
                this.player.playVideo();
            } else {
                this.playing = false;
                this.player.pauseVideo();
            }

            // This video is vimeo
        } else {
            if (!this.playing) {
                this.player.play();
                this.playing = true;
            } else {
                this.player.pause();
                this.playing = false;
            }
        }
    }
}