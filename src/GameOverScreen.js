import Screen from './Screen';

export default class GameOverScreen extends Screen {
    constructor(spl, handlers) {
        super(spl, handlers);
        this.space_pressed = false;
        this.on_game_restart = handlers.on_game_restart;
    }

    draw() {
        this.spl.draw('font', 'backdrop', 7, 10, { scale: 2 });
        this.spl.drawText('Game Over', 18, 12, { scale: 2 });
        if(this.curr_frame >= 4) {
            this.spl.drawText('Press space to restart', 12, 15, { scale: 2 });
        }
        this.curr_frame = (this.curr_frame + 1) % 8;
      
        this.keyboard.on_keyup_space = () => {
            this.on_game_restart();
        }

        return this.space_pressed;
    }
}