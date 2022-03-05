import { RenderEngine } from '../internal';

export class Animation {
    private renderEngine: RenderEngine;

    private image: HTMLImageElement;

    private frames: number[] = [];

    private frameWidth: number;

    private frameHeight: number;

    private row: number;

    private speed: number;

    private loop: boolean;

    private frameIndex: number;

    private playing: boolean;

    private playedOnce: boolean;

    private elapsed = 0;

    constructor(
        renderEngine: RenderEngine,
        image: HTMLImageElement,
        frames: number[],
        frameWidth: number,
        frameHeight: number,
        row: number,
        speed: number,
        loop: boolean
    ) {
        this.renderEngine = renderEngine;
        this.image = image;
        this.frames = frames;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.frameIndex = this.frames[0];
        this.row = row;
        this.speed = speed;
        this.playing = false;
        this.loop = loop;
        this.playedOnce = false;
    }

    public play(): void {
        this.playing = true;
        this.frameIndex = this.frames[0];
        this.elapsed = 0;
        this.playedOnce = false;
    }
}

// $.Animation.prototype.Update = function () {
//     if (!this.Playing)
//         return;

//     this.Ellapsed += 0.1;
//     if (this.Ellapsed >= this.Speed) {
//         this.Ellapsed = 0;

//         this.FrameIndex += 1;
//         if (this.FrameIndex > this.Frames[this.Frames.length - 1]) {
//             this.PlayedOnce = true;

//             if (this.Loop) { this.FrameIndex = this.Frames[0]; }
//             else { this.FrameIndex = this.Frames[this.Frames.length - 1] }
//         }
//     }
// };

// $.Animation.prototype.Draw = function (x, y, width, height, context) {
//     if (!this.Playing)
//         return;

//     //if (!this.Loop && this.PlayedOnce) { return; }

//     context.drawImage(
// 		this.Image,
// 		this.FrameIndex * this.FrameWidth, // Source x
// 		this.Row * this.FrameHeight, // Source y
// 		this.FrameWidth, // Source width
// 		this.FrameHeight, // Source height
// 		x, // Destination x
// 		y, // Destination y
// 		width, // Destination width
// 		height); // Destination height
// };
