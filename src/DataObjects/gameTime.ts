export class GameTime {
    public delta: number = 0;
    private previousLoopTime: number = Date.now();

    public update() {
        const currentTime = Date.now();
        let delta = currentTime - this.previousLoopTime;
        this.delta = delta / 1000;
        this.previousLoopTime = currentTime;
    }
}