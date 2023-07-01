let fr = 2;
let p = 40;
let matrix = [];


function main(){
    const socket = io();


    function openMatrix(matrixData){
        //matrix, die hergeschickt wurde, zeichnen
        matrix = matrixData;
    }
    function initMatrix(matrixData){
        //matrix, die hergeschickt wurde, zeichnen
        matrix = matrixData;
        resizeCanvas(matrix[0].length * p + 1, matrix.length * p + 1);
    }
    socket.on("init matrix", openMatrix)
    socket.on("send matrix", initMatrix)

    //Click-Events:

    const killGrassBTN = document.getElementById("killGrass");

    function killGrass(){
        //send message to server
        socket.emit("kill Grass",1)
        console.log("kill Grass");
    }

    const killGrazerBTN = document.getElementById("killGrazer");

    function killGrazer(){
        //send message to server
        socket.emit("kill Grazer",2)
        console.log("kill Grazer");
    }

    const killGrazerzerBTN = document.getElementById("killGrazerzer");

    function killGrazerzer(){
        //send message to server
        socket.emit("kill Grazerzer",3)
        console.log("kill Grazerzer");
    }


    killGrassBTN.addEventListener("click", killGrass)
    killGrazerBTN.addEventListener("click", killGrazer)
    killGrazerzerBTN.addEventListener("click", killGrazerzer)
}

main();

//main();


function setup(){

    //createCanvas(matrix[0].length * p + 1, matrix.length * p + 1);
    createCanvas(500,500);
    background(255,255,210);
    frameRate(fr);
}

function draw(){
    for(let i = 0; i < matrix.length; i++){
        for(let x = 0; x < matrix[i].length; x++){
            if (matrix[i][x] == 0){
                fill("white");
            } else if (matrix[i][x] == 1){
                fill("green");
            } else if (matrix[i][x] == 2){
                fill("yellow");
            } else if (matrix[i][x] == 3){
                fill("red");
            } else if (matrix[i][x] == 4){
                fill("black");
            } else if (matrix[i][x] == 5){
                fill("blue");
            }
            rect(x * p, i * p, p, p);
        }
    }
}

