import DayCycle from 'objects/DayCycle';
import Weather from 'objects/Weather';

class Main extends Phaser.State {

	create() {

		//Enable Arcade Physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		//Set the games background colour
		this.game.stage.backgroundColor = '#000';

		//Init DayCycle
    this.dayCycle = new DayCycle(this.game, 5000);

		//Init Weather
		this.weather = new Weather(this.game);
		this.weather.addRain();
		// this.weather.removeRain();
		// this.weather.addFog();
		// this.weather.removeFog();

		//Init bg shade
		let bgBitMap = this.game.add.bitmapData(this.game.width, this.game.height);
    bgBitMap.ctx.rect(0, 0, this.game.width, this.game.height);
    bgBitMap.ctx.fillStyle = '#b2ddc8';
    bgBitMap.ctx.fill();
    this.backgroundSprite = this.game.add.sprite(0, 0, bgBitMap);

		//Init Sun & Moon
    this.sunSprite = this.game.add.sprite(50, -250, 'sun');
    this.moonSprite = this.game.add.sprite(this.game.width - (this.game.width / 4), this.game.height + 500, 'moon');

		//Init parallax bgs
		this.mountainsBack = this.game.add.tileSprite(0,
        this.game.height - this.game.cache.getImage('mountains-back').height,
        this.game.width,
        this.game.cache.getImage('mountains-back').height,
        'mountains-back'
    );

    this.mountainsMid1 = this.game.add.tileSprite(0,
        this.game.height - this.game.cache.getImage('mountains-mid1').height,
        this.game.width,
        this.game.cache.getImage('mountains-mid1').height,
        'mountains-mid1'
    );

    this.mountainsMid2 = this.game.add.tileSprite(0,
        this.game.height - this.game.cache.getImage('mountains-mid2').height,
        this.game.width,
        this.game.cache.getImage('mountains-mid2').height,
        'mountains-mid2'
    );

		// Init shadings Cycle
		let backgroundSprites = [
			{sprite: this.backgroundSprite, from: 0x1f2a27, to: 0xB2DDC8},
			{sprite: this.mountainsBack, from: 0x2f403b, to: 0x96CCBB},
			{sprite: this.mountainsMid1, from: 0x283632, to: 0x8BBCAC},
			{sprite: this.mountainsMid2, from: 0x202b28, to: 0x82AD9D}
		];

		// Start shading & Sun & Moon Cycles
		this.dayCycle.initShading(backgroundSprites);
    this.dayCycle.initSun(this.sunSprite);
    this.dayCycle.initMoon(this.moonSprite);
	}

	update() {
		this.mountainsBack.tilePosition.x -= 0.05;
    this.mountainsMid1.tilePosition.x -= 0.3;
    this.mountainsMid2.tilePosition.x -= 0.75;
	}

}

export default Main;
