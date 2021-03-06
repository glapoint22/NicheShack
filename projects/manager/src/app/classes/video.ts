import Player from '@vimeo/player';
import YouTubePlayer from 'youtube-player';
import { VideoData } from '../../../../../classes/video-data';
import { Media } from './media';

export class Video implements Media {
    public id: number;
    public name: string;
    private youTubePlayerSet: boolean;
    private isCurrentPlayerYouTube: boolean;

    // Url
    private _url: string;
    public get url(): string {
        return this._url;
    }
    public set url(url: string) {


        // If this url is from youtube
        if (url.match(/youtube/)) {
            // We need to append this to the url for playing to work
            url += '?enablejsapi=1';

            // If the youTube player is not set yet
            if (!this.youTubePlayerSet) {
                this.player = YouTubePlayer(this.iframe);
                this.youTubePlayerSet = true;
            }

            this._url = this.iframe.src = url;
            this.isCurrentPlayerYouTube = true;

            // Url is from vimeo
        } else {
            this._url = this.iframe.src = url;
            this.vimeoPlayer = new Player(this.iframe);
            this.isCurrentPlayerYouTube = false;
        }
    }


    public thumbnail: string;
    private player: any;
    private vimeoPlayer: any;
    public playing: boolean;

    constructor(private iframe: HTMLIFrameElement) { }

    play() {
        // If this video does not have a url, return
        if (!this.url) return;

        // If this video is youtube
        if (this.isCurrentPlayerYouTube) {
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
                this.vimeoPlayer.play();
                this.playing = true;
            } else {
                this.vimeoPlayer.pause();
                this.playing = false;
            }
        }
    }




    stop() {
        // If this video does not have a url, return
        if (!this.url) return;

        // If this video is youtube
        if (this.isCurrentPlayerYouTube) {

            this.playing = false;
            this.player.pauseVideo();


            // This video is vimeo
        } else {

            this.vimeoPlayer.pause();
            this.playing = false;

        }
    }



    setData(videoData: VideoData) {
        if (videoData && videoData.url) {
            this.id = videoData.id;
            this.url = videoData.url;
            this.thumbnail = videoData.thumbnail;
        }
    }



    getData(): VideoData {
        if (!this.id) return null;

        return {
            id: this.id,
            url: null,
            thumbnail: null
        }
    }
}