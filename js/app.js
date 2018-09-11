// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    let verticalAlignCenter = -10;
    this.x = x;
    this.y = verticalAlignCenter + y;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';


};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //Size of each tile
    this.tileWidth = 101;

    //Distance at which enemy walks off the game board
    this.offScreen = this.tileWidth * 5;

    if(this.x < this.offScreen){
        //move enemy
        this.x += 200 * dt;
    }else{
        //walk in from the left
        //if enemy crosses the end of the board
        this.x = -this.tileWidth;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Hero {
    constructor(){        
        this.sprite = 'images/char-boy.png';

        //Initial position
        this.x = 202; 
        this.y = 405; 

        //number of pixels per move
        this.moveHorizontal = 101; 
        this.moveVertical = 83;

        
        this.currentX = 3;
        this.currentY = 1;
        
    }

    //Render hero sprite
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    //handle input
    handleInput(direction) {
        switch(direction) {
            case 'right':
                if(this.currentX != 5) {
                    this.x += this.moveHorizontal; 
                    this.currentX++;            
                }
                break;                
            case 'left':                
                if(this.currentX != 1) {
                    this.x -= this.moveHorizontal;
                    this.currentX--;               
                }                
                break;
            case 'up':
                if(this.currentY != 6)  {
                    this.y -= this.moveVertical;
                    this.currentY++;
                }
                break;
            case 'down':
                if(this.currentY != 1){
                    this.y += this.moveVertical;
                    this.currentY--;
                }
                break;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Hero();
const enemy1 = new Enemy(-401, 83);
const enemy2 = new Enemy(-101, 166);
const enemy3 = new Enemy(-101, 249);
const enemy4 = new Enemy(-245, 249);

let allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3, enemy4);


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
