export default class Fund {
    constructor(userId, amount) {
        this.userId = userId;
        this.amount = amount;
    }

    static fromDb({userId, amount}) {
        return new Fund(userId, amount);
    }
}
