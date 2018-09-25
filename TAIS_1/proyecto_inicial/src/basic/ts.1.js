"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TaisOne {
    constructor(mystr) {
        this.mystr = mystr;
        this._fullname = this.mystr;
    }
    get name() {
        return this._fullname;
    }
    print() {
        console.log(this.mystr);
    }
}
exports.TaisOne = TaisOne;
const obj = new TaisOne('123');
obj.print();
//# sourceMappingURL=ts.1.js.map