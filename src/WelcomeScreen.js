import Keyboard from './Keyboard';

export default class WelcomeScreen {
    constructor(spl, handlers) {
        this.spl = spl;
        this.keyboard = new Keyboard();
        this.curr_frame = 0;
        this.space_pressed = false;
        this.on_gamestart = handlers.on_gamestart;
    }

    draw() {
        this.spl.draw('font', 'backdrop', 7, 10, { scale: 2 });
        this.spl.drawText('Welcome to the best game', 10, 12, { scale: 2 });
        if(this.curr_frame >= 4) {
            this.spl.drawText('Press space to start', 12, 15, { scale: 2 });
        }
        this.curr_frame = (this.curr_frame + 1) % 8;

        this.keyboard.on_keyup_space = () => {
            const player_name = prompt('Enter your name');
            this.on_gamestart(player_name);
        }

        return this.space_pressed;
    }
}