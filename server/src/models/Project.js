import NamedObject from './NamedObject.js';
import Fund from './Fund.js';

export default class Project extends NamedObject{
    constructor(id, name, funds = []) {
        super(id, name);

        this.funds = funds;
    }

    static fromDb({id, name, funds}) {
        return new Project(id, name, funds.map(Fund.fromDb));
    }
}
