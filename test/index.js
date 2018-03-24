const obj={
    name:'objName',
    say(){
        console.log(this.name)
    },
    read:()=>{
        console.log(this.name)
    }
};
obj.say();
obj.read();
console.log(this); // {}
function test() {
    console.log(this);
}
//test(); //global
test();

