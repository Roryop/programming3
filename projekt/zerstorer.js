const Creatures = require("./creatures");
const random = require("./utils");

module.exports = class Zerstorer extends Creatures{
    constructor(x,y){

        super(x,y);

        this.name = "Koala_hoch6";

        this.color = 5;
        this.walkingOn = 1;

        this.teleportCounter = 0;

    }

    updateDirections(){
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x    , this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]

        ];
    }


    findFields(objekt){

        this.updateDirections();

        return super.findFields(objekt);
    }


    eat(){
        let hausFields = this.findFields(4);

        if (hausFields.length > 0){

            //wähle zufällige Pos aus
            let randPos = random(hausFields); // x,y
            let newX = randPos[0];
            let newY = randPos[1];

            //matrix updaten
            matrix[newY][newX] = 5;
            matrix[this.y][this.x] = 0;

            //update
            this.y = newY;
            this.x = newX;

            //haus löschen
            for (let i = 0; i < hausArr.length; i++) {
                let hausObj = hausArr[i];
                if (this.x === hausObj.x && this.y === hausObj.y){
                    //löschen
                    hausArr.splice(i,1);
                    break;
                }
                
            }
        
            this.teleportCounter ++;
        } else {
            this.move();

            this.teleportCounter ++;
        }
    }


    die(){
        let grassFields = this.findFields(1);
        if (grassFields.length <= 4){
            this.teleport();
        }
        if (grassFields.length === 0){
            for (let i = 0; i < ZerstorerArr.length; i++) {
                let ZerstorerObj = ZerstorerArr[i];
                if (this.x === ZerstorerObj.x && this.y === ZerstorerObj.y){
                    //löschen
                    matrix[ZerstorerObj.y][ZerstorerObj.x] = 0;
                    ZerstorerArr.splice(i,1);
                    //console.log(ZerstorerArr);
                    break;
                }
            }
        }
    }


    teleport(){
            let newX = Math.floor(random(0, matrix[0].length - 1));
            let newY = Math.floor(random(0, matrix.length - 1));

            //console.log(newX,newY);

            matrix[newY][newX] = 5;
            matrix[this.y][this.x] = 1;

            this.y = newY;
            this.x = newX;

            this.teleportCounter = 0;
    }
}