const Grass = require("./grass");
const Grazer = require("./grazer");
const Grazerzer = require("./grazerzer");
const Haus = require("./haus");
const Zerstorer = require("./zerstorer");






let matrix = [
    [0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 0, 2, 0],
    [1, 1, 0, 0, 0]


];


let grassArr = [];
let grazerArr = [];
let grazerzerArr = [];
let hausArr = [];
let ZerstorerArr = [];






function randomMatrix(h,b){
    let matrix = [];

    for(let i = 0; i < h; i++){
        matrix.push([]);
        for(let l = 0; l < b; l++){
            let b = random(-100,20);
            if (b <= -50){
                matrix[i].push(0);
            } else if (b <= 20){
                matrix[i].push(1);
            }
        }
    }
    for (let i = 0; i < matrix.length / 5; i++){
        matrix[Math.floor(random(0, matrix.length - 1))][Math.floor(random(0, matrix[0].length - 1))] = 2;
    }

    for (let i = 0; i < matrix.length / 5; i++){
        matrix[Math.floor(random(0, matrix.length - 1))][Math.floor(random(0, matrix[0].length - 1))] = 3;
    }

    for (let i = 0; i < matrix.length * 1.25; i++){
        matrix[Math.floor(random(0, matrix.length - 1))][Math.floor(random(0, matrix[0].length - 1))] = 4;
    }
    for (let i = 0; i < matrix.length * 1.25; i++){
        matrix[Math.floor(random(0, matrix.length - 1))][Math.floor(random(0, matrix[0].length - 1))] = 5;
    }


    console.log(matrix);

    return matrix;
}



function initGame(){

    //matrix = randomMatrix(50,50);

    for(let y = 0; y < matrix.length; y++){
        for(let x = 0; x < matrix[y].length; x++){
            if (matrix[y][x] === 1){
                let GrassObj = new Grass(x,y);
                console.log(GrassObj);
                grassArr.push(GrassObj);
            } else if (matrix[y][x] === 2){
                let grazerObj = new Grazer(x,y);
                console.log(grazerObj);
                grazerArr.push(grazerObj);
            } else if (matrix[y][x] === 3){
                let grazerzerObj = new Grazerzer(x,y);
                console.log(grazerzerObj);
                grazerzerArr.push(grazerzerObj);
            } else if (matrix[y][x] === 4){
                let hausObj = new Haus(x,y);
                console.log(hausObj);
                hausArr.push(hausObj);
            } else if (matrix[y][x] === 5){
                let ZerstorerObj = new Zerstorer(x,y);
                console.log(ZerstorerObj);
                ZerstorerArr.push(ZerstorerObj);
            }
        }
    }
}

function updateGame(){

    console.log(matrix);



    for (let i = 0; i < grassArr.length; i++) {
        let grassObj = grassArr[i];
        grassObj.mul();
        
    }

    for (let i = 0; i < grazerArr.length; i++) {
        let grazerObj = grazerArr[i];
        grazerObj.eat();
        grazerObj.mul();
        console.log(grazerArr[0]);
        grazerObj.die();
        
    }

    for (let i = 0; i < grazerzerArr.length; i++) {
        let grazerzerObj = grazerzerArr[i];
        grazerzerObj.eat();
        grazerzerObj.mul();
        grazerzerObj.die();
        
    }

    for (let i = 0; i < ZerstorerArr.length; i++) {
        let ZerstorerObj = ZerstorerArr[i];
        //ZerstorerObj.teleport();
        ZerstorerObj.eat();
        ZerstorerObj.die();

        
    }
}

initGame();

/*setInterval(function(){
    updateGame(); //ehemals die draw();
}, 1000)*/


const express = require("express");
const { request } = require("http");
const { userInfo } = require("os");
const app = express();

app.get("/", function(req,res){

    res.redirect("index.html");
    res.send("Hello User");

})

app.get("/*", function(req,res){

    res.send(404);

})

app.listen( 3000, function(){

    console.log("hat funktioniert ! Port ist 3000!");

});
