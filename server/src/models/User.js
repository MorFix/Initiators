import NamedObject from './NamedObject.js';

export default class User extends NamedObject {
    constructor(id, name, coins) {
        super(id, name);

        this.coins = coins;

        if (this.name === process.env.MANAGER_NAME) {
            this.isManager = true;
        }
    }

    static fromDb({id, name, coins}) {
        return new User(id, name, coins);
    }
}
