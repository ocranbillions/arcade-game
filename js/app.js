'use strict';
// Enemies our player must avoid
var Enemy = function(x, y, velocity) {
    
    //this is used to align enemy to the center of the tile
    let verticalAlignCenter = 60;

    //enemy's position
    this.x = x;
    this.y = y + verticalAlignCenter;

    //speed of the enemy
    this.velocity = velocity;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    
    this.tileWidth = 101;
    //Distance at which enemy goes off the game board
    this.offScreen = this.tileWidth * 5;

    //Move enemy forward until it get's off screen
    if(this.x < this.offScreen){
        //move enemy
        this.x += this.velocity * dt;
    }else{
        //walk-in one tile off, from the left
        this.x = -this.tileWidth;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



let playerScores = document.querySelector('.points');
let attempts = document.querySelector('.attempts').firstElementChild;
//Player
class Player {
    constructor(){        
        this.sprite = 'images/char-boy.png';

        //Initial position
        //This places player on 3rd col, 1st row
        let centerVertical = 60;
        this.startX = 202;
        this.startY = 83*4 + centerVertical;//405;


        this.x = this.startX; 
        this.y = this.startY;

        //number of pixels per move
        this.moveRight = 101;   //step one tile to the right
        this.moveLeft = -101    //step one tile to the left
        this.moveUp = -83;      //step one tile upwards
        this.moveDown = 83;     //step one tile downwards

        //Current location on the grid
        this.currentColumnPosition = 3;
        this.currentRowPosition = 1;      

        //This keeps the number of collissions
        this.countCollisions = 0;  
        //This keeps the points earned
        this.countPoints = 0;
    }

    //Render Player sprite
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    //This controles Player's movement
    handleInput(direction) {
        switch(direction) {
            case 'right':
                //Move right if player hasnt passed the 5th column
                if(this.currentColumnPosition != 5) {
                    this.x += this.moveRight; 
                    this.currentColumnPosition++;            
                }
                break;                
            case 'left':      
                //Move left if player hasnt passed the 1st column       
                if(this.currentColumnPosition != 1) {
                    this.x += this.moveLeft;
                    this.currentColumnPosition--;               
                }                
                break;
            case 'up':
                //Move up if player hasn't passed the top row
                if(this.currentRowPosition != 6)  {
                    this.y += this.moveUp;
                    this.currentRowPosition++;
                }
                break;
            case 'down':
                //Move down if player hasn't passed the bottom row
                if(this.currentRowPosition != 1){
                    this.y += this.moveDown;
                    this.currentRowPosition--;
                }
        }
    }

    //Update player's posotion
    update() {        
        for(let enemy of allEnemies){            
            let enemyLeftSide = enemy.x
            let enemyRightSide = enemy.x + 101/2;  
            let enemyLowerBody = enemy.y;

            this.playerLeftSide = this.x;
            this.playerRightSide = this.x + 101/2; 
            this.playerLowerBody = this.y;

            //Check if enemy collides with player
            if((enemyLowerBody === this.playerLowerBody) && (enemyRightSide > this.playerLeftSide) && (enemyLeftSide < this.playerRightSide)){
                this.resetPlayerPosition();
                this.countCollisions++;

                if(this.countCollisions == 1){
                    attempts.innerText = `You have only 1 attempt left`;
                }

                if(this.countCollisions == 2){
                    alert("Game Over \nPress ok to play again.");
                    
                    //Reset player life
                    this.countCollisions = 0;
                    
                    // Reset points earned
                    this.countPoints = 0;
                    playerScores.innerText = this.countPoints; 

                    //Reset text
                    attempts.innerText = 'You have only 2 attempts';
                }
            }
        }

        
        let river = -23;
        //Player reaches the river
        if(this.playerLowerBody === river){
            //Update points
            this.countPoints++;
            playerScores.innerText = this.countPoints;      

            //Set to initial position
            this.resetPlayerPosition();                                   
        }
    }

    resetPlayerPosition(){
        //Restes player's position
        this.x = this.startX;
        this.y = this.startY;

        this.currentColumnPosition = 3;
        this.currentRowPosition = 1;
    }
}


const player = new Player();


//Instantiate each enemy with its own path of speed
const enemy1 = new Enemy(-401, 0, 300);
const enemy2 = new Enemy(-901, 166, 200);
const enemy3 = new Enemy(-101, 83, 450);
const enemy4 = new Enemy(-301, 0, 200);
const enemy5 = new Enemy(-601, 166, 400);
const enemy6 = new Enemy(-201, 83, 250);

let allEnemies = [];

allEnemies.push(enemy1, enemy2, enemy3, enemy4, enemy5, enemy6);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
