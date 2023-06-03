class Creatures{
    constructor(x,y){


        this.x = x;
        this.y = y;

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




        let found = [];

        for(let h = 0; h < this.directions.length; h++){
            let pos = this.directions[h];
            let myX = pos[0];
            let myY = pos[1];

            //spielgrenzen-Prüfung
            if(myY >= 0 && myY < matrix.length && myX >= 0 && myX < matrix[0].length){
                //in matrix sehen
                let matrixWert = matrix[myY][myX];

                if (matrixWert === objekt){
                    found.push(pos);
                }
            }
        }
        return found;
    }
    move(){
        let grassFields = this.findFields(this.walkingOn); //array mit pos arrays
        if (grassFields.length > 0){

            //wähle zufällige Pos aus
            let randPos = random(grassFields); // x,y
            let newX = randPos[0];
            let newY = randPos[1];

            //matrix updaten
            matrix[newY][newX] = this.color;
            matrix[this.y][this.x] = this.walkingOn;

            //update
            this.y = newY;
            this.x = newX;

        }
    }
}




class Grass extends Creatures{

    constructor(x,y){
        super(x,y);

        this.color = 1;

        this.rounds = 0;
        this.name = "Koala_hoch2";

    }


    mul(){
        this.rounds++;
        console.log(this.rounds);
        if(this.rounds >= 6){

            let emptyFields = this.findFields(0); //array mit pos arrays
            if (emptyFields.length > 0){

                //wähle zufällige Pos aus
                let randPos = random(emptyFields); // x,y
                let newX = randPos[0];
                let newY = randPos[1];

                //matrix updaten
                matrix[newY][newX] = 1;

                //neues grassObj
                let grassObj = new Grass(newX, newY);
                grassArr.push(grassObj);


            }


            this.rounds = 0;
        }
    }
}



class Grazer extends Creatures{
    constructor(x,y){

        super(x,y);
        
        this.color = 2;
        this.walkingOn = 0;
        
        this.rounds1 = 0;
        this.rounds2 = 0;
        
        this.name = "Koala_hoch3";

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
        let grassFields = this.findFields(1);

        if (grassFields.length > 0){

            //wähle zufällige Pos aus
            let randPos = random(grassFields); // x,y
            let newX = randPos[0];
            let newY = randPos[1];

            //matrix updaten
            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;

            //update
            this.y = newY;
            this.x = newX;

            //gras löschen
            for (let i = 0; i < grassArr.length; i++) {
                let grassObj = grassArr[i];
                if (this.x === grassObj.x && this.y === grassObj.y){
                    //löschen
                    grassArr.splice(i,1);
                    break;
                }
                
            }
            this.rounds1 += 1;
            this.rounds2 = 2;

        } else {
            this.move();
            this.rounds2 += 1;
            this.rounds1 = 1;
        }
    }

    mul(){
        if (this.rounds1 === 5){
            let emptyFields = this.findFields(0); //array mit pos arrays
            if (emptyFields.length > 0){
            let randPos = random(emptyFields); // x,y
            let newX = randPos[0];
            let newY = randPos[1];

            let grazerObj = new Grazer(newX,newY);
            matrix[newY][newX] = 2;
            grazerArr.push(grazerObj);
            }
            this.rounds1 = 0;

        }
    }

    die(){
        if (this.rounds2 === 5){
            for (let i = 0; i < grazerArr.length; i++) {
                let grazerObj = grazerArr[i];
                if (this.x === grazerObj.x && this.y === grazerObj.y){
                    //löschen
                    matrix[grazerObj.y][grazerObj.x] = 0;
                    grazerArr.splice(i,1);
                    this.rounds2 = 0;
                    break;
                }
                
            }
        }
    }
}

//Grazerzer(Fleischfresser) laufen über Gras, ohne die Fähigkeiten dieses Grases zu beeinflussen
class Grazerzer extends Creatures{
    constructor(x,y){

        super(x,y)

        this.name = "Koala_hoch4";

        this.color = 3;
        this.walkingOn = 1;

        this.rounds1 = 0;
        this.rounds2 = 0;

        
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
        let grazerFields = this.findFields(2);

        if (grazerFields.length > 0){

            //wähle zufällige Pos aus
            let randPos = random(grazerFields); // x,y
            let newX = randPos[0];
            let newY = randPos[1];

            //matrix updaten
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;

            //update
            this.y = newY;
            this.x = newX;

            //grazers löschen
            for (let i = 0; i < grazerArr.length; i++) {
                let grazerObj = grazerArr[i];
                if (this.x === grazerObj.x && this.y === grazerObj.y){
                    //löschen
                    grazerArr.splice(i,1);
                    break;
                }
                
            }
            this.rounds1 += 1;
            this.rounds2 = 2;

        } else {
            this.move();
            this.rounds2 += 1;
            this.rounds1 = 1;
        }
    }

    mul(){
        if (this.rounds1 === 2){
            let grassFields = this.findFields(1); //array mit pos arrays
            if (grassFields.length > 0){
            let randPos = random(grassFields); // x,y
            let newX = randPos[0];
            let newY = randPos[1];

            let grazerzerObj = new Grazerzer(newX,newY);
            matrix[newY][newX] = 2;
            grazerzerArr.push(grazerzerObj);
            }


        }
    }

    die(){
        if (this.rounds2 === 8){
            for (let i = 0; i < grazerzerArr.length; i++) {
                let grazerzerObj = grazerzerArr[i];
                if (this.x === grazerzerObj.x && this.y === grazerzerObj.y){
                    //löschen
                    matrix[grazerzerObj.y][grazerzerObj.x] = 0;
                    grazerzerArr.splice(i,1);
                    break;
                }
                
            }
        }
    }
}


class Haus{
    constructor(x,y){

        this.name = "Koala_hoch5";

        this.x = x;
        this.y = y;

        this.color = 4;

    }

    
}


class Zerstorer extends Creatures{
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
                    console.log(ZerstorerArr);
                    break;
                }
            }
        }
    }


    teleport(){
        //if (this.teleportCounter === 10){
            
            let newX = Math.floor(random(0, matrix[0].length - 1));
            let newY = Math.floor(random(0, matrix.length - 1));

            console.log(newX,newY);

            matrix[newY][newX] = 5;
            matrix[this.y][this.x] = 1;

            this.y = newY;
            this.x = newX;

            this.teleportCounter = 0;
        //}
    }
}