import 'phaser';

import { PreLoader } from '/nanoids/PreLoader';

let gameWidth;
let gameHeight;
let gameContainer;
window.muted = false;
export let gameOrientation;

var config;

if (window.matchMedia('(max-width: 1020px) and (orientation: portrait)').matches){
    console.log("Match");
    gameWidth = 600;
    gameHeight = 800;
    gameOrientation = "portrait";
} else {
    console.log("Match");
    gameWidth = 960;
    gameHeight = 540;
    gameOrientation = "landscape";
}

config = {
    backgroundColor: 0xffffff,
    transparent: true,
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        },
    },

    scale: {
        parent: 'game-container',
        mode: Phaser.Scale.SCALE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: gameWidth * 2 /* * window.devicePixelRatio */, // set game width by multiplying window width with devicePixelRatio
        height: gameHeight * 2 /* * window.devicePixelRatio */, // set game height by multiplying window height with devicePixelRatio
        zoom: 1 /*/ window.devicePixelRatio */ // Set the zoom to the inverse of the devicePixelRatio
    },
    plugins: {

        scene: [{
            key: 'rexUI',
            plugin: RexUIPlugin,
            mapping: 'rexUI'
        },],

        global: [{
            key: 'rexBBCodeTextPlugin',
            plugin: BBCodeTextPlugin,
            start: true
        },]
        
    },
    dom: {
        createContainer: true
    },
    scene: [PreLoader]
  
};

let game = new Phaser.Game(config);

export function audioController() {

    if(window.muted == false) {
        
        game.sound.mute = true;
        window.muted = true;
        return true;

    } else if(window.muted == true) {

        game.sound.mute = false;
        window.muted = false;
        return false;

    }

}

// Fullscreen Functionality
window.addEventListener('load', function() {

    document.getElementById("fullscreen-button").onclick = function() {

        gameContainer = document.getElementById('game-container');
        fullscreen();

    };
    
})

document.addEventListener("keydown", function(event) {
    if(event.key === 'Escape'){
      
        fullscreen();
   }
});

// Fullscreen Functionality
window.addEventListener('load', function() {

    document.getElementById("minimise-button").onclick = function() {

        gameContainer = document.getElementById('game-container');
        fullscreen();

    };

})

// Fullscreen Handler
function fullscreen() {
    
    gameContainer = document.getElementById('game-container');
    var body = document.body;

    if (gameContainer.classList) {
        body.classList.toggle("stop-game-scroll");
        gameContainer.classList.toggle("fullscreen-game");
        gameContainer.classList.toggle("not-fullscreen-game");
    }

}

var doit;

window.addEventListener("orientationchange", function() {

    doit = setTimeout(resizedw, 500);

}, false);

window.onresize = function(){

    if (window.matchMedia('(max-device-width: 1366px)').matches){

    } else {
        clearTimeout(doit);
        doit = setTimeout(resizedw, 500);
    }

};


function resizedw(){
    
    game.destroy(true, false)

    if (window.matchMedia('(max-width: 1020px)').matches){
        console.log("Match");
        gameWidth = 600;
        gameHeight = 800;
        gameOrientation = "portrait";
    } else {
        console.log("Match");
        gameWidth = 960;
        gameHeight = 540;
        gameOrientation = "landscape";
    }

    config = {
        backgroundColor: 0xffffff,
        transparent: true,
        type: Phaser.AUTO,
        physics: {
            default: 'arcade',
            arcade: {
                debug: false,
            },
        },
    
        scale: {
            parent: 'game-container',
            mode: Phaser.Scale.SCALE,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: gameWidth * 2 /* * window.devicePixelRatio */, // set game width by multiplying window width with devicePixelRatio
            height: gameHeight * 2 /* * window.devicePixelRatio */, // set game height by multiplying window height with devicePixelRatio
            zoom: 1 /*/ window.devicePixelRatio */ // Set the zoom to the inverse of the devicePixelRatio
        },
        plugins: {
    
            scene: [{
                key: 'rexUI',
                plugin: RexUIPlugin,
                mapping: 'rexUI'
            },],
    
            global: [{
                key: 'rexBBCodeTextPlugin',
                plugin: BBCodeTextPlugin,
                start: true
            },]
            
        },
        dom: {
            createContainer: true
        },
        scene: [PreLoader]
    
    };

    game = new Phaser.Game(config);

}