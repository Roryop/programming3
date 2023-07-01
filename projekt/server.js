const Grass = require("./grass");
const Grazer = require("./grazer");
const Grazerzer = require("./grazerzer");
const Haus = require("./haus");
const Zerstorer = require("./zerstorer");

const random = require("./utils");

const express = require("express");
const { ALL } = require("dns");
const app = express();
let server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(express.static("./"));
app.get("/", function(req, res){
    res.redirect("client.html");
})




matrix = [
    [0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 0, 2, 0],
    [1, 1, 0, 0, 0]


];


grassArr = [];
grazerArr = [];
grazerzerArr = [];
hausArr = [];
ZerstorerArr = [];






function randomMatrix(h,b){
    let matrix = [];

    for(let i = 0; i < h; i++){
        matrix.push([]);
        for(let l = 0; l < b; l++){
            let c = Math.floor(Math.random()* 50);
            if (c <= 30){
                matrix[i].push(0);
            } else if (c <= 50){
                matrix[i].push(1);
            }
        }
    }
    for (let i = 0; i < matrix.length / 5; i++){
        matrix[Math.floor(Math.random() * (matrix.length - 1))][Math.floor(Math.random() * (matrix[0].length - 1))] = 2;
    }
    for (let i = 0; i < matrix.length / 5; i++){
        matrix[Math.floor(Math.random() * (matrix.length - 1))][Math.floor(Math.random() * (matrix[0].length - 1))] = 3;
    }
    for (let i = 0; i < matrix.length * 1.25; i++){
        matrix[Math.floor(Math.random() * (matrix.length - 1))][Math.floor(Math.random() * (matrix[0].length - 1))] = 4;
    }
    for (let i = 0; i < matrix.length * 1.25; i++){
        matrix[Math.floor(Math.random() * (matrix.length - 1))][Math.floor(Math.random() * (matrix[0].length - 1))] = 5;
    }


    console.log(matrix);

    return matrix;
}



function initGame(){

    matrix = randomMatrix(10,10);

    for(let y = 0; y < matrix.length; y++){
        for(let x = 0; x < matrix[y].length; x++){
            if (matrix[y][x] === 1){
                let GrassObj = new Grass(x,y);
                grassArr.push(GrassObj);
            } else if (matrix[y][x] === 2){
                let grazerObj = new Grazer(x,y);
                grazerArr.push(grazerObj);
            } else if (matrix[y][x] === 3){
                let grazerzerObj = new Grazerzer(x,y);
                grazerzerArr.push(grazerzerObj);
            } else if (matrix[y][x] === 4){
                let hausObj = new Haus(x,y);
                hausArr.push(hausObj);
            } else if (matrix[y][x] === 5){
                let ZerstorerObj = new Zerstorer(x,y);
                ZerstorerArr.push(ZerstorerObj);
            }
        }
    }
}

function updateGame(){

    matrix = matrix;



    for (let i = 0; i < grassArr.length; i++) {
        let grassObj = grassArr[i];
        grassObj.mul();
        
    }

    for (let i = 0; i < grazerArr.length; i++) {
        let grazerObj = grazerArr[i];
        grazerObj.eat();
        grazerObj.mul();
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
        ZerstorerObj.eat();
        ZerstorerObj.die();

        
    }
}



server.listen(3000, function(){
    console.log("Server gestartet! Port 3000!");

})

io.on('connection', function(socket){
    console.log("ws connection established", io.engine.clientsCount);


    if(io.engine.clientsCount == 1){
        initGame();
        socket.emit("init matrix", matrix);
        setInterval(function(){
            updateGame(); 
            io.sockets.emit("send matrix", matrix);
        }, 1000)
    } else {
        socket.emit("init matrix", matrix);
    }

    //callbacks for client messages
    function killGrass(data){
        console.log("Data received, kill ", + data);
        //kill Grass
        for(i = grassArr.length - 1; i >= 0; i--){
            let x = grassArr[i].x;
            let y = grassArr[i].y;
            matrix[y][x] = 0;
            grassArr.pop();
        }
    }
    function killGrazer(data){
        console.log("Data received, kill ", + data);
        //kill Grass
        for(i = grazerArr.length - 1; i >= 0; i--){
            let x = grazerArr[i].x;
            let y = grazerArr[i].y;
            matrix[y][x] = 0;
            grazerArr.pop();
        }
    }
    function killGrazerzer(data){
        console.log("Data received, kill ", + data);
        //kill Grass
        for(i = grazerzerArr.length - 1; i >= 0; i--){
            let x = grazerzerArr[i].x;
            let y = grazerzerArr[i].y;
            matrix[y][x] = 0;
            grazerzerArr.pop();
        }
    }

    socket.on("kill Grass", killGrass)
    socket.on("kill Grazer", killGrazer)
    socket.on("kill Grazerzer", killGrazerzer)

})