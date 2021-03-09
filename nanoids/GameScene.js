import { transactionsArray } from '/nanoids/vendor/nano_websocket.js'
import { tools } from 'nanocurrency-web'

var nanoCount;
var nanoTSXCount;
var seconds = 0;
var lastSecondNanoCount = 0;
var currentSecondNanoCount = 0;

export class GameScene extends Phaser.Scene {

    

    constructor ()
    {
        super('gameScene');
    }

    preload () 
    {
        
    }

    create () 
    {

        //  The world is 3200 x 600 in size
        this.matter.world.setBounds(0, 0, 3200, 600);
        this.cameras.main.setBounds(0, 0, 3200, 600).setName('main');

        //  The miniCam is 400px wide, so can display the whole world at a zoom of 0.2
        this.minimap = this.cameras.add(this.game.config.width/2 - 200, 10, 400, 120).setZoom(0.2).setName('mini');
        this.minimap.setBackgroundColor(0x000019);
        this.minimap.scrollX = 1600;
        this.minimap.scrollY = 300;

        this.createStarfield();
        this.addBackgroundElements();
        this.createAliens();
        this.nanoTransaction();

        //  Add a player ship and camera follow
        this.player = this.matter.add.sprite(1600, 200, 'shipStandby')
            .setFixedRotation()
            .setFrictionAir(0.05)
            .setMass(30);
        this.cameras.main.startFollow(this.player, false, 0.2, 0.2);
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update () 
    {
        if (this.cursors.left.isDown)
        {
            this.player.thrustBack(0.1);
            this.player.flipX = true;
            this.player.setTexture('shipMoving');
        }
        else if (this.cursors.right.isDown)
        {
            this.player.thrust(0.1);
            this.player.flipX = false;
            this.player.setTexture('shipMoving');
        }
        if (this.cursors.up.isDown)
        {
            this.player.thrustLeft(0.1);
            this.player.setTexture('shipMoving');
        }
        else if (this.cursors.down.isDown)
        {
            this.player.thrustRight(0.1);
            this.player.setTexture('shipMoving');
        }

        else if(!this.cursors.left.isDown && !this.cursors.right.isDown && !this.cursors.up.isDown && !this.cursors.down.isDown) {
            this.player.setTexture('shipStandby');
        }
        //  And this camera is 400px wide, so -200
        this.minimap.scrollX = Phaser.Math.Clamp(this.player.x - 200, 800, 2000);

        nanoCount.setText("Confirmed Transactions: " + transactionsArray.length);

    }

    addBackgroundElements() {

        var planetOne = this.add.image(this.game.config.width/2, this.game.config.height/4, 'planetOne');
        planetOne.setScrollFactor(.2);

        var planetTwo = this.add.image(this.game.config.width + 300, 150, 'planetTwo');
        planetTwo.setScrollFactor(.2);

        var floatingLandscapeOne = this.add.image(300, 300, 'floatingLandscapeOne');
        floatingLandscapeOne.setScrollFactor(.7);

        var floatingLandscapeTwo = this.add.image(2400, 300, 'floatingLandscapeTwo');
        floatingLandscapeTwo.setScrollFactor(.7);

        var frontScenery = this.add.image(-200, 150, 'frontScenery').setOrigin(0, 0);
        frontScenery.setScrollFactor(.9);

    }

    createStarfield ()
    {
        //  Starfield background

        //  Note the scrollFactor values which give them their 'parallax' effect

        var group = this.add.group({ key: 'star', frameQuantity: 256 });

        group.createMultiple({ key: 'bigStar', frameQuantity: 32 });

        var rect = new Phaser.Geom.Rectangle(0, 0, 3200, 550);

        Phaser.Actions.RandomRectangle(group.getChildren(), rect);

        group.children.iterate(function (child, index) {

            var sf = Math.max(0.3, Math.random());

            if (child.texture.key === 'bigStar')
            {
                sf = 0.2;
            }

            child.setScrollFactor(sf);

            this.minimap.ignore(child);

        }, this);
    }

    createAliens ()
    {
        //  Create some random aliens
        const config = {
            key: 'metaleyes',
            frames: this.anims.generateFrameNumbers('face', { start: 0, end: 3 }),
            frameRate: 20,
            repeat: -1
        };

        this.anims.create(config);
        for (let i = 0; i < 32; i++)
        {
            let x = Phaser.Math.Between(100, 3100);
            let y = Phaser.Math.Between(100, 300);

            const face = this.matter.add.sprite(x, y, 'face').play('metaleyes');
            face
                .setFrictionAir(0)
                .setMass(1)
                .setScale(0.5);

            const direction = (Math.random() > 0.5) ? -1 : 1;
            face.setVelocity(Phaser.Math.Between(1, 5) * direction, Phaser.Math.Between(1, 5) * direction);
        }
    }

    nanoTransaction() {

        nanoCount = this.add.text(25, this.game.config.height - 60, 'Confirmed: 0', { font: "16px Arial", fill: "#ffffff", align: "left" }).setScrollFactor(0);
        nanoTSXCount = this.add.text(600, this.game.config.height - 60, 'Confirmed TPS: 0', { font: "16px Arial", fill: "#ffffff", align: "left" }).setScrollFactor(0);

        var countTSX = setInterval(this.countPerSecond, 1000);

        

    }

    countPerSecond() {

        lastSecondNanoCount = currentSecondNanoCount;
        currentSecondNanoCount = transactionsArray.length;
        
        var difference = currentSecondNanoCount - lastSecondNanoCount;

        nanoTSXCount.setText("Confirmed TPS: " + difference);

        seconds += 1;
      
    }

}

