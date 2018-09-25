export class TaisOne{
    _fullname: string;
constructor(
    private mystr:string){
        this._fullname=this.mystr;
    }
    get name(): string{
        return this._fullname;
    }
print(){
    console.log(this.mystr)
}
}

const obj:TaisOne = new TaisOne('123');
obj.print();