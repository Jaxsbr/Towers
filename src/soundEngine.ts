import { Sound } from './sound';

export class SoundEngine {
    private sounds: Array<Sound>;

    constructor() {
        this.sounds = [];
    }

    public addSoundToQueue(soundName: string): void {
        const soundUrl = `assets/sounds/${soundName}.mp3`;
        this.play(soundUrl);
    }

    public play(soundEffectUrl: string): void {
        const inactiveSound = this.getInactiveSound();
        inactiveSound.reset(soundEffectUrl, 1, false);
        inactiveSound.play();
    }

    private getInactiveSound(): Sound {
        const inactiveSounds = this.sounds.filter(s => !s.isActive);
        if (inactiveSounds.length > 0) {
            return inactiveSounds.at(0);
        }

        const newSound = new Sound();
        this.sounds.push(newSound);
        return newSound;
    }
}
