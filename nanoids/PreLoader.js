// Game Loading Placeholder.


export class PreLoader extends Phaser.Scene {

    constructor() {

        super('preLoader');

    }

    preload () {   

        this.load.image('star', '/nanoids/assets/star2.png');
        this.load.image('bigStar', '/nanoids/assets/star3.png');
        this.load.image('ship', '/nanoids/assets/sprites/shmup-ship2.png');
        this.load.spritesheet('face', '/nanoids/assets/sprites/metalface78x92.png', { frameWidth: 78, frameHeight: 92 });

    }

    create () { 

        this.scene.start('gameScene');
     
    }

}

