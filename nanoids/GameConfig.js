import 'phaser';

import { PreLoader } from '/nanoids/PreLoader';
import { GameScene } from '/nanoids/GameScene';

let gameWidth;
let gameHeight;
let gameContainer;
window.muted = false;

var config;

config = {
    backgroundColor: 0x000034,
    type: Phaser.WEBGL,
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                x: 0,
                y: 0
            },
            enableSleeping: true
        }
    },

    scale: {
        parent: 'game-container',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth * 2,
	    height: window.innerHeight * 2,
        zoom: 1 /*/ window.devicePixelRatio */ // Set the zoom to the inverse of the devicePixelRatio
    },
    dom: {
        createContainer: true
    },
    scene: [PreLoader, GameScene]
  
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
