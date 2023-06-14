const Creatures = require("./creatures");

module.exports = class Grass extends Creatures{

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