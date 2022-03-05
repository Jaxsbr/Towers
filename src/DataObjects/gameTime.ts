export class GameTime {
    public delta = 0;

    private previousLoopTime: number = Date.now();

    public update(): void {
        const currentTime = Date.now();
        const delta = currentTime - this.previousLoopTime;
        this.delta = delta / 1000;
        this.previousLoopTime = currentTime;
    }
}
