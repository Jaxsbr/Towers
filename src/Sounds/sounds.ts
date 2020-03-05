// TODO:
// export class Sound {
//     private Url: string;    
//     private PlaybackRate: number;
//     private Audio: Audio;    
//     Audio.playbackRate = this.PlaybackRate

//     Sound = function(url, playbackRate = 1) {
//         this.Reset(url, playbackRate);    
//         this.Loop = false;
//     };

//     play = function() {
//         this.Audio.loop = this.Loop;
//         this.Audio.play();        
//     }

//     pause = function() {    
//         this.Audio.pause();
//     }

//     public reset(url, playbackRate = 1): void {    
//         this.Url = url;    
//         this.PlaybackRate = playbackRate;
//         this.Audio = new Audio(this.Url);    
//         this.Audio.playbackRate = this.PlaybackRate
//     }
// }