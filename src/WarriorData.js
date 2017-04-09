
export default class WarriorData  {
    constructor(spl, warrior) {
      this.spl = spl;
      this.warrior = warrior;
    }

    draw() {
        this.spl.draw('objects', 'warrior_data_base', 1, 1, { scale: 2 });
        this.spl.draw('objects', 'warrior_data_mana', 3, 5, { scale: 2 });
        
        for(let i = 1, heart_pos = 5; i <= this.warrior.lives; i++, heart_pos+=2) {
            let element;
            if(i === this.warrior.lives) {
                element = 'hp_heart_' + this.warrior.hp;
            } else {
                element = 'hp_heart_100';
            }
            this.spl.draw('objects', element, heart_pos, 2, { scale: 2 });
        }
    }
}