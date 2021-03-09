// Game Loading Placeholder.


export class PreLoader extends Phaser.Scene {

    constructor() {

        super('preLoader');

    }

    preload () {   

        this.load.image('star', '/nanoids/assets/star2.png');
        this.load.image('bigStar', '/nanoids/assets/star3.png');
        this.load.image('shipStandby', '/nanoids/assets/sprites/ship-standby.png');
        this.load.image('shipMoving', '/nanoids/assets/sprites/ship-moving.png');

        this.load.image('planetOne', '/nanoids/assets/planet-one.png');
        this.load.image('planetTwo', '/nanoids/assets/planet-two.png');
        this.load.image('frontScenery', '/nanoids/assets/front-scenery.png');

        this.load.image('floatingLandscapeOne', '/nanoids/assets/floating-landscape-one.png');
        this.load.image('floatingLandscapeTwo', '/nanoids/assets/floating-landscape-two.png');

        this.load.image('frontScenery', '/nanoids/assets/front-scenery.png');
        this.load.spritesheet('face', '/nanoids/assets/sprites/metalface78x92.png', { frameWidth: 78, frameHeight: 92 });

    }

    create () { 

        this.scene.start('gameScene');
     
    }

}

