export default class Keyboard {
    constructor() {
        this.setup_keymap();
        document.addEventListener('keydown', this.on_keydown.bind(this), false);
        document.addEventListener('keyup', this.on_keyup.bind(this), false);
    }

    setup_keymap() {
        this.key = {
            39: 'right',
            37: 'left',
            38: 'up',
            40: 'down',
            70: 'f',
            32: 'space'
        }
    }

    on_keydown(e) {
        var key = this.key[e.keyCode];
        if(!key) return;
        this[key + '_pressed'] = true;
        this['on_keydown_'+key] && this['on_keydown_'+key]();
    }

    on_keyup(e) {
        var key = this.key[e.keyCode];
        if(!key) return;
        this[key + '_pressed'] = false;
        this['on_keyup_'+key] && this['on_keyup_'+key]();
    }
}