import Keyboard from './Keyboard';


export default class Screen {
    constructor(spl, handlers) {
        this.spl = spl;
        this.keyboard = new Keyboard();
        this.curr_frame = 0;
    }

    draw() {
    }
}