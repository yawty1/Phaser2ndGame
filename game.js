var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    playerSpeed:1000,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },

    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var worldwidth = config.width*6

function preload() {
    //assets load
    this.load.image('tree', 'assets/tree.png')
    this.load.image('tile', 'assets/tile.png')
    this.load.image('fon+', 'assets/fon+.jpg')
    this.load.image('sky', 'assets/sky.png')
    this.load.image('ground', 'assets/platform.png')
    this.load.image('star', 'assets/star.png')
    this.load.image('bomb', 'assets/bomb.png')
    this.load.spritesheet('dude',
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

function create() {
    

    this.add.tileSprite(0, 0, worldwidth, 1080, "fon+").setOrigin(0, 0);

    //створення здоровой платформи внизу
    platforms = this.physics.add.staticGroup();
    for (var x = 0; x < worldwidth; x = x + 128) {
        //  console.log(x)
        platforms.create(x, 1080 - 128, 'tile')
        platforms.create(x,0, )

    }



    //додав платформи
    //platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    // platforms.create(600, 400, 'ground');
    // platforms.create(50, 250, 'ground');
    // platforms.create(750, 220, 'ground');
    //додав фізику
    //platforms = this.physics.add.staticGroup();

    //додав спрайт гравця, фізику стрибка, керування за допомогою стрілочок
    player = this.physics.add.sprite(500, 450, 'dude');
    player
        .setBounce(0.2)
        .setCollideWorldBounds(true)
        .setScale(2)
        .setDepth(5)

    cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(player, platforms)


    //camera settings
    this.cameras.main.setBounds(0,0, worldwidth,1080)
    this.physics.world.setBounds(0,0, worldwidth,1080) 
    this.cameras.main.startFollow(player)
    // this.add.image(400, 300, 'star'

    tree = this.physics.add.staticGroup()
    for (var x = 0; x < worldwidth; x = x + Phaser.math.FloatBetween(300,500)){

        tree
            .create(x,1080-128,'tree')
            .setOrigin(0,1)
            .setScale(Phaser.Math. FloatBetween(1,4))
            .setDepth(Phaser.Math. Between(1,10))
    }



    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

     this.anims.create({
         key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
         frameRate: 20
     });

     this.anims.create({
         key: 'right',
         frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
         frameRate: 10,
         repeat: -1
     });
}


function update() {
    // var gameOver = true;
    // if (gameOver) {
    //     return;
    // }

    if (cursors.left.isDown) {
        console.log('left')
        player.setVelocityX(-config.playerSpeed);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(config.playerSpeed);

        player.anims.play('right', true);
    }
    else {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }
}

