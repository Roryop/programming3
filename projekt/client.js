let fr = 5;
let p = 40;
let matrix = [];


function main(){
    const socket = io();


    function openMatrix(matrixData){
        //matrix, die hergeschickt wurde, zeichnen
        matrix = matrixData;
    }
    socket.on("send matrix", openMatrix)
}

main();

//main();


function setup(){
    frameRate(fr);

    //createCanvas(matrix[0].length * p + 1, matrix.length * p + 1);
    createCanvas(500,500);
    background(255,255,210);
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