let clickCount = 0;
function clickHandler(evt){
   clickCount++;
   console.log(evt);
   let str = "Thanks for clicking " + clickCount;
   let std = "Click on me " + clickCount;
   if(clickCount % 2 != 0){
    this.innerText = str;
   } else {
    this.innerText = std;
   }
}


const firstEventDoc = document.getElementById("pElement");
firstEventDoc.addEventListener("click",clickHandler);

function alerta(){
    this.innerText = "ALERT";
    alert("hi");
    firstEventDoc.innerText = "I did";
}

const secondEventDoc = document.getElementById("button");
secondEventDoc.addEventListener("click",alerta);



function bodyClick(evt){
    console.log("h");
    pos = [];
    pos.push(evt.pageX);
    pos.push(evt.pageY);

    console.log(pos);
}
window.onclick = bodyClick;

function loadCallback(){
    alert("SITE LOADED");
}

window.onload = loadCallback;

function keyCallback(evt){
    alert(evt.key + " was pressed!");
}
window.onkeydown = keyCallback;

/*function setup(){

    createCanvas(500, 500);
    background('red');
    
}*/

function mouseClicked() {
    console.log(mouseX, mouseY);
}