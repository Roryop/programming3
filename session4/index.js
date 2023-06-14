
const fs = require("fs");

var obj = {
    "first_name": "Vardan",
    "last_name": "Hovsepyan",
    "age": 13,
    "tumo_student": true
}

function main(){
    

    let file = "hello.txt";
    fs.appendFileSync(file, "Hello World\n");

    let jsonFile = "obj.json";
    fs.writeFileSync(jsonFile, JSON.stringify(obj));

}
main();
