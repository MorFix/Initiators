import NamedObject from './NamedObject.js';

export default class User extends NamedObject{
    constructor(id, name, coins) {
        super(id, name);

        this.coins = coins;
    }

    static fromDb({id, name, coins}) {
        return new User(id, name, coins);
    }
}
