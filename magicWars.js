var game = function() {

	var Q = window.Q = Quintus({audioSupported: [ 'mp3' ]})
	.include("Sprites, Scenes, Input, 2D, Anim, Touch, UI, TMX, Audio")
	.setup({width: 800,height:  600})
	.controls()
	.touch()
	.enableSound();

	/*************************LOAD_GUI&RESOURCES*************************/

	Q.loadTMX("level1.tmx", function(){
		Q.load(['greenTile2.png', 'magic.png', 'cauldron2.png', 'cauldron.png',

			'Heroic_Demise.mp3','Lively_Meadow.mp3','The_Dark_Amulet.mp3','the_kings_crowning.mp3','evil.mp3',

			"black_knight.png", "black_knight_anim.png", "black_knight_anim.json",
			'bronze_knight.png', 'bronze_knight_anim.png', 'bronze_knight_anim.json',
			'silver_knight.png', 'silver_knight_anim.png', 'silver_knight_anim.json',

			'wizard.png', 'wizard_anim.png', 'wizard_anim.json',
			'wizard_fire.png', 'wizard_fire_anim.png', 'wizard_fire_anim.json',
			'wizard_ice.png', 'wizard_ice_anim.png', 'wizard_ice_anim.json',

			'purpleBall.png', 'fireBall.png', 'iceBall.png',

			'orc1_anim.png', 'orc1_anim.json',"orc2_anim.png", "orc2_anim.json",
			"orc3_anim.png", "orc3_anim.json",

			'troll1_anim.png', 'troll1_anim.json',"troll2_anim.png", "troll2_anim.json",
			"troll3_anim.png", "troll3_anim.json",

			'towertall.png','optionsOff.png',

			'ops.png', 'quit.png', 'pause.png', 'pauseOff.png',

			'welcome.png',

			'level1desc.png','level2desc.png','level3desc.png','level4desc.png','level5desc.png','level6desc.png',
			'level7desc.png','level8desc.png','level9desc.png','level10desc.png',

			'main2.png', 'store.png', 'options.png', 'help.png', 'credits.png',
			'levelFailed.png', 'levelCleared1.png','levelCleared2.png','levelCleared3.png',
			
			'0.png','1.png','2.png','3.png', '0upgrade.png','1upgrade.png','2upgrade.png','3upgrade.png', '4upgrade.png','5upgrade.png',

			'level1.png', 'level2.png', 'level3.png', 'level4.png', 'level5.png', 'level6.png', 
			'level7.png', 'level8.png', 'level9.png', 'level10.png', 'level11.png'
			],function(){


			Q.compileSheets("black_knight_anim.png", "black_knight_anim.json");
			Q.compileSheets("bronze_knight_anim.png", "bronze_knight_anim.json");
			Q.compileSheets("silver_knight_anim.png", "silver_knight_anim.json");

			Q.compileSheets("wizard_anim.png", "wizard_anim.json");
			Q.compileSheets("wizard_fire_anim.png", "wizard_fire_anim.json");
			Q.compileSheets("wizard_ice_anim.png", "wizard_ice_anim.json");

			Q.compileSheets("orc1_anim.png", "orc1_anim.json");
			Q.compileSheets("orc2_anim.png", "orc2_anim.json");
			Q.compileSheets("orc3_anim.png", "orc3_anim.json");

			Q.compileSheets("troll1_anim.png", "troll1_anim.json");
			Q.compileSheets("troll2_anim.png", "troll2_anim.json");
			Q.compileSheets("troll3_anim.png", "troll3_anim.json");

			Q.stageScene("startGame");

			Q.animations("brownMonster_anim", {
				fly: { frames: [0,1,2,3,4,5,6,7], rate: 1/3, loop:true, flip:"x"}
			});


			var KnightAnim = {
				dead: { frames: [0,1,2,3,4,5], rate: 1/2, loop:false},
				walk: { frames: [6,7,8,9], rate: 1/3, loop:true},
				attack: { frames: [10,11,12,13], rate: 1/3, loop:true}				
			};


			Q.animations("bronze_knight_anim", KnightAnim);
		    Q.animations("black_knight_anim", KnightAnim);
		    Q.animations("silver_knight_anim", KnightAnim);

		    var WizardAnim = {
		    	dead: { frames: [0,1,2,3], rate: 1/2, loop:false},
		    	walk: { frames: [4,5,6,7], rate: 1/1.75, loop:true},
		    	attack: { frames: [8,9,10], rate: 1/3, loop:false}		    	
		    };
		    Q.animations("wizard_anim", WizardAnim);
		    Q.animations("wizard_fire_anim", WizardAnim);
		    Q.animations("wizard_ice_anim", WizardAnim);


		    var EnemyAnim = {
		    	dead: { frames: [0,1,2,3,4,5,6], rate: 1/2, loop:false,flip:"x"},
		    	walk: { frames: [7,8,9,10,11,12,13], rate: 1/3, loop:true,flip:"x"},
		    	attack: { frames: [14,15,16,17,18,19,20], rate: 1/3, loop:true,flip:"x"}
		    };

		    Q.animations("orc1_anim", EnemyAnim);
		    Q.animations("orc2_anim", EnemyAnim);
		    Q.animations("orc3_anim", EnemyAnim);
		    Q.animations("troll1_anim", EnemyAnim);
		    Q.animations("troll2_anim", EnemyAnim);
		    Q.animations("troll3_anim", EnemyAnim);

		});

	});

	/*************************STAGES*************************/

	Q.scene('startGame',function(stage) {

		if(Q.state.get('firstTime')==undefined){
			Q.state.reset({level:1, currentLevel:1,firstTime:false, stars:0,
				magic: 0, selectedPlayerCost:0, cauldronSelected:false, 
				killedEnemies:0, numberOfEnemies:10, starsAchieved:0, score:0,
				lvl1stars:'0',lvl2stars:'0',lvl3stars:'0',lvl4stars:'0',lvl5stars:'0',
				lvl6stars:'0',lvl7stars:'0',lvl8stars:'0',lvl9stars:'0',lvl10stars:'0',
				enemiesRow0: 0, enemiesRow1: 0, enemiesRow2: 0, enemiesRow3: 0,
				shield: 0, potionRate:0, slowerEnemies:0, audio:true,  survival:false,
				currentPotions:0, targetPotions:0, currentDefenders:0, maxDefenders:0});
				Q.stageScene('welcome',2);
		}
		var container = stage.insert(new Q.UI.Container({
			x: 0, y: 0, fill: "rgba(0,0,0,0.5)"
		}));
		
		if(Q.state.get('audio')){
			Q.audio.stop();
			Q.audio.play('the_kings_crowning.mp3',{loop:true});
		}
	
		stage.insert(new Q.Repeater({ asset: "main2.png", speedX: 0, speedY: 0, type: 0 }));
		//container.insert(new Q.UI.Button({ x: Q.width/2, y: Q.height/2, fill: "#CCCCCC", asset: "main2.png"}));
		

		var levels = container.insert(new Q.UI.Button({ x: 400, y: 250, fill: "#CCCCCC", label: "         Levels          " }));
		var endless = container.insert(new Q.UI.Button({ x: 400, y: 365, fill: "#CCCCCC", label: "         Endless          " }));
		var options = container.insert(new Q.UI.Button({ x: 764, y: 37, fill: "#CCCCCC", label: "OP" }));

		levels.on("click" ,function() {
			Q.clearStages();
			Q.stageScene('levels',1);
		});

		endless.on("click" ,function() {
			Q.clearStages();
			Q.stageScene('level11',1);
			Q.state.set('currentLevel',11);
			Q.stageScene('hud', 2);
		});

		options.on("click" ,function() {
			Q.clearStages();
			Q.stageScene('options',1);
		});

	});

Q.Sprite.extend("StarsLevel",{
	init: function(p) {
		this._super(p, {
		});
	},
	insertCanvas: function(level){
		switch(level){
			case 1:
			this.p.container.insert(new Q.UI.Button({ x: 184, y: 277, asset: Q.state.get('lvl1stars').concat(".png")}));
			break;
			case 2:
			this.p.container.insert(new Q.UI.Button({ x: 294, y: 277, asset: Q.state.get('lvl2stars').concat(".png")}));
			break;
			case 3:
			this.p.container.insert(new Q.UI.Button({ x: 404, y: 277, asset: Q.state.get('lvl3stars').concat(".png")}));
			break;
			case 4:
			this.p.container.insert(new Q.UI.Button({ x: 514, y: 277, asset: Q.state.get('lvl4stars').concat(".png")}));
			break;
			case 5:
			this.p.container.insert(new Q.UI.Button({ x: 624, y: 277, asset: Q.state.get('lvl5stars').concat(".png")}));
			break;
			case 6:
			this.p.container.insert(new Q.UI.Button({ x: 184, y: 396, asset: Q.state.get('lvl6stars').concat(".png")}));
			break;
			case 7:
			this.p.container.insert(new Q.UI.Button({ x: 294, y: 396, asset: Q.state.get('lvl7stars').concat(".png")}));
			break;
			case 8:
			this.p.container.insert(new Q.UI.Button({ x: 402, y: 396, asset: Q.state.get('lvl8stars').concat(".png")}));
			break;
			case 9:
			this.p.container.insert(new Q.UI.Button({ x: 514, y: 396, asset: Q.state.get('lvl9stars').concat(".png")}));
			break;
			case 10:
			this.p.container.insert(new Q.UI.Button({ x: 624, y: 395, asset: Q.state.get('lvl10stars').concat(".png")}));
			break;
		}
	}
});

Q.scene('levels',function(stage) {
		var container = stage.insert(new Q.UI.Container({
			x: 0, y: 0, fill: "rgba(0,0,0,0.5)"
		}));
		
		var options = container.insert(new Q.UI.Button({ x: 755, y: 37, fill: "#CCCCCC", label: "OP" }));
		var store = container.insert(new Q.UI.Button({ x: 555, y: 490, fill: "#CCCCCC", label: "OP" }));
		var back = container.insert(new Q.UI.Button({ x: 255, y: 490, fill: "#CCCCCC", label: "OP" }));
		
		var level1 = container.insert(new Q.UI.Button({ x: 183, y: 255, fill: "#CCCCCC", label: "Leve" }));
		var level2 = container.insert(new Q.UI.Button({ x: 293, y: 255, fill: "#CCCCCC", label: "Leve" }));
		var level3 = container.insert(new Q.UI.Button({ x: 403, y: 255, fill: "#CCCCCC", label: "Leve" }));
		var level4 = container.insert(new Q.UI.Button({ x: 513, y: 255, fill: "#CCCCCC", label: "Leve" }));
		var level5 = container.insert(new Q.UI.Button({ x: 623, y: 255, fill: "#CCCCCC", label: "Leve" }));
		var level6 = container.insert(new Q.UI.Button({ x: 183, y: 375, fill: "#CCCCCC", label: "Leve" }));
		var level7 = container.insert(new Q.UI.Button({ x: 293, y: 375, fill: "#CCCCCC", label: "Leve" }));
		var level8 = container.insert(new Q.UI.Button({ x: 403, y: 375, fill: "#CCCCCC", label: "Leve" }));
		var level9 = container.insert(new Q.UI.Button({ x: 513, y: 375, fill: "#CCCCCC", label: "Leve" }));
		var level10 = container.insert(new Q.UI.Button({ x: 623, y: 375, fill: "#CCCCCC", label: "Leve" }));

		//stage.insert(new Q.Repeater({ asset: l.concat(Q.state.get('level')).concat('.png'), speedX: 0, speedY: 0, type: 0 }));
		container.insert(new Q.UI.Button({ x: Q.width/2, y: Q.height/2, fill: "#CCCCCC", asset: 'level'.concat(Q.state.get('level')).concat('.png')}));
		var positioner = new Q.StarsLevel({container:container});
		
		for(var levelpos=1;levelpos<=Q.state.get('level');levelpos++){
			positioner.insertCanvas(levelpos)
		}

		options.on("click" ,function() {
			Q.clearStages();
			Q.stageScene('options',1);
		});
		store.on("click" ,function() {
			Q.clearStages();
			Q.stageScene('storeBackground',0);
			Q.stageScene('store',1);
		});
		back.on("click" ,function() {
			Q.clearStages();
			Q.stageScene('startGame',1);
		});
		level1.on("click" ,function() {
			Q.clearStages();
			Q.stageScene('level1',1);
			Q.state.set('currentLevel',1);
			Q.stageScene('hud', 2);
			Q.stageScene('levelDescription', 3);
			Q.stage(1).pause();
		});
		level2.on("click" ,function() {
			if(Q.state.get('level')>1)
			{
				Q.clearStages();
				Q.stageScene('level2',1);
				Q.state.set('currentLevel',2);
				Q.stageScene('hud', 2);
				Q.stageScene('levelDescription', 3);
				Q.stage(1).pause();
			}
		});
		level3.on("click" ,function() {
			if(Q.state.get('level')>2)
			{
				Q.clearStages();
				Q.stageScene('level3',1);
				Q.state.set('currentLevel',3);
				Q.stageScene('hud', 2);
				Q.stageScene('levelDescription', 3);
				Q.stage(1).pause();
			}
		});
		level4.on("click" ,function() {
			if(Q.state.get('level')>3)
			{
				Q.clearStages();
				Q.stageScene('level4',1);
				Q.state.set('currentLevel',4);
				Q.stageScene('hud', 2);
				Q.stageScene('levelDescription', 3);
				Q.stage(1).pause();
			}
		});
		level5.on("click" ,function() {
			if(Q.state.get('level')>4)
			{
				Q.clearStages();
				Q.stageScene('level5',1);
				Q.state.set('currentLevel',5);
				Q.stageScene('hud', 2);
				Q.stageScene('levelDescription', 3);
				Q.stage(1).pause();
			}
		});
		level6.on("click" ,function() {
			if(Q.state.get('level')>5)
			{
				Q.clearStages();
				Q.stageScene('level6',1);
				Q.state.set('currentLevel',6);
				Q.stageScene('hud', 2);
				Q.stageScene('levelDescription', 3);
				Q.stage(1).pause();
			}
		});
		level7.on("click" ,function() {
			if(Q.state.get('level')>6)
			{
				Q.clearStages();
				Q.stageScene('level7',1);
				Q.state.set('currentLevel',7);
				Q.stageScene('hud', 2);
				Q.stageScene('levelDescription', 3);
				Q.stage(1).pause();
			}
		});
		level8.on("click" ,function() {
			if(Q.state.get('level')>7)
			{
				Q.clearStages();
				Q.stageScene('level8',1);
				Q.state.set('currentLevel',8);
				Q.stageScene('hud', 2);
				Q.stageScene('levelDescription', 3);
				Q.stage(1).pause();
			}
		});
		level9.on("click" ,function() {
			if(Q.state.get('level')>8)
			{
				Q.clearStages();
				Q.stageScene('level9',1);
				Q.state.set('currentLevel',9);
				Q.stageScene('hud', 2);
				Q.stageScene('levelDescription', 3);
				Q.stage(1).pause();
			}
		});
		level10.on("click" ,function() {
			if(Q.state.get('level')>9)
			{
				Q.clearStages();
				Q.stageScene('level10',1);
				Q.state.set('currentLevel',10);
				Q.stageScene('hud', 2);
				Q.stageScene('levelDescription', 3);
				Q.stage(1).pause();
			}
		});
		var starsView = new Q.Stars();
		starsView.stars(Q.state.get('stars'));
		stage.insert(starsView);
	});

Q.scene('options',function(stage) {
		var container = stage.insert(new Q.UI.Container({
			x: 0, y: 0, fill: "rgba(0,0,0,0.5)"
		}));
		//container.insert(new Q.UI.Button({ x: Q.width/2, y: Q.height/2, fill: "#CCCCCC", asset: "options.png"}));
		if(Q.state.get('audio')){
				stage.insert(new Q.Repeater({ asset: "options.png", speedX: 0, speedY: 0, type: 0 }));
			}
			else{
				stage.insert(new Q.Repeater({ asset: "optionsOff.png", speedX: 0, speedY: 0, type: 0 }));
			}
		var help = container.insert(new Q.UI.Button({ x: 290, y: 253, fill: "#CCCCCC", label: "OP" }));
		var credits = container.insert(new Q.UI.Button({ x: 392, y: 253, fill: "#CCCCCC", label: "OP" }));
		var music = container.insert(new Q.UI.Button({ x: 500, y: 253, fill: "#CCCCCC", label: "OP" }));
		var back = container.insert(new Q.UI.Button({ x: 212, y: 320, fill: "#CCCCCC", label: "OP" }));
		
		help.on("click" ,function() {
			Q.clearStages();
			Q.stageScene('help',1);
		});
		credits.on("click" ,function() {
			Q.clearStages();
			Q.stageScene('credits',1);
		});
		music.on("click" ,function() {
			Q.state.set('audio',!Q.state.get('audio'));
			if(Q.state.get('audio')){
				stage.insert(new Q.Repeater({ asset: "options.png", speedX: 0, speedY: 0, type: 0 }));
			}
			else{
				Q.audio.stop();
				stage.insert(new Q.Repeater({ asset: "optionsOff.png", speedX: 0, speedY: 0, type: 0 }));
			}
				
		});
		back.on("click" ,function() {
			Q.clearStages();
			Q.stageScene('startGame',1);
		});

	});

Q.scene('help',function(stage) {
		var container = stage.insert(new Q.UI.Container({
			x: 0, y: 0, fill: "rgba(0,0,0,0.5)"
		}));
		//container.insert(new Q.UI.Button({ x: Q.width/2, y: Q.height/2, fill: "#CCCCCC", asset: "help.png"}));
		stage.insert(new Q.Repeater({ asset: "help.png", speedX: 0, speedY: 0, type: 0 }));
		var back = container.insert(new Q.UI.Button({ x: 310, y: 565, fill: "#CCCCCC", label: "OP" }));
		back.on("click" ,function() {
			Q.clearStages();
			Q.stageScene('options',1);
		});
	});

Q.scene('credits',function(stage) {
		var container = stage.insert(new Q.UI.Container({
			x: 0, y: 0, fill: "rgba(0,0,0,0.5)"
		}));
		//container.insert(new Q.UI.Button({ x: Q.width/2, y: Q.height/2, fill: "#CCCCCC", asset: "credits.png"}));
		stage.insert(new Q.Repeater({ asset: "credits.png", speedX: 0, speedY: 0, type: 0 }));
		var back = container.insert(new Q.UI.Button({ x: 310, y: 565, fill: "#CCCCCC", label: "OP" }));
		back.on("click" ,function() {
			Q.clearStages();
			Q.stageScene('options',1);
		});
	});

Q.scene('storeBackground',function(stage) {
		var container = stage.insert(new Q.UI.Container({
			x: 0, y: 0, fill: "rgba(0,0,0,0.5)"
		}));
		//container.insert(new Q.UI.Button({ x: Q.width/2, y: Q.height/2, asset: "store.png"}));
		stage.insert(new Q.Repeater({ asset: "store.png", speedX: 0, speedY: 0, type: 0 }));
		var back = container.insert(new Q.UI.Button({ x: 335, y: 508, fill: "#CCCCCC", label: "P" }));
		back.on("click" ,function() {
			Q.clearStages();
			Q.stageScene('levels',1);
		});
	});

Q.scene('store',function(stage) {
		var container = stage.insert(new Q.UI.Container({
			x: 0, y: 0, fill: "rgba(0,0,0,0.5)"
		}));
		
		//shield
		container.insert(new Q.UI.Button({ x:377, y: 287, scale:0.65, asset: Q.state.get('shield').toString().concat('upgrade.png')}));
		var shieldButton = container.insert(new Q.UI.Button({ x:495, y: 279, scale:0.65, label:'       '.concat(parseInt(Q.state.get('shield'))+1).concat('   ')}));
		shieldButton.on("click" ,function() {
			if(Q.state.get('stars')>=parseInt(Q.state.get('shield'))+1){
				Q.state.set('shield', (parseInt(Q.state.get('shield'))+1).toString());
				Q.state.dec('stars',parseInt(Q.state.get('shield')));
				container.insert(new Q.UI.Button({ x:377, y: 287, scale:0.65, asset: Q.state.get('shield').toString().concat('upgrade.png')}));
				shieldButton.p.label = '       '.concat(parseInt(Q.state.get('shield'))+1).concat('   ');
			}
		});
		//potionRate
		container.insert(new Q.UI.Button({ x:377, y: 370, scale:0.65, asset: Q.state.get('potionRate').toString().concat('upgrade.png')}));
		var potionRateButton = container.insert(new Q.UI.Button({ x:495, y: 363, scale:0.65, label: '       '.concat(parseInt(Q.state.get('potionRate'))+1).toString().concat('   ')}));
		potionRateButton.on("click" ,function() {
			if(Q.state.get('stars')>=parseInt(Q.state.get('potionRate'))+1){
				Q.state.set('potionRate', (parseInt(Q.state.get('potionRate'))+1).toString());
				Q.state.dec('stars',parseInt(Q.state.get('potionRate')));
				container.insert(new Q.UI.Button({ x:377, y: 370, scale:0.65, asset: Q.state.get('potionRate').toString().concat('upgrade.png')}));
				potionRateButton.p.label = '       '.concat(parseInt(Q.state.get('potionRate'))+1).concat('   ');
			}
		});
		//slowerEnemies
		container.insert(new Q.UI.Button({ x:377, y: 453, scale:0.65, asset: Q.state.get('slowerEnemies').toString().concat('upgrade.png')}));
		var slowerEnemiesButton = container.insert(new Q.UI.Button({ x:495, y: 446, scale:0.65, label: '       '.concat(parseInt(Q.state.get('slowerEnemies'))+1).toString().concat('   ')}));
		slowerEnemiesButton.on("click" ,function() {
			if(Q.state.get('stars')>=parseInt(Q.state.get('slowerEnemies'))+1){
				Q.state.set('slowerEnemies', (parseInt(Q.state.get('slowerEnemies'))+1).toString());
				Q.state.dec('stars',parseInt(Q.state.get('slowerEnemies')));
				container.insert(new Q.UI.Button({ x:377, y: 453, scale:0.65, asset: Q.state.get('slowerEnemies').toString().concat('upgrade.png')}));
				slowerEnemiesButton.p.label = '       '.concat(parseInt(Q.state.get('slowerEnemies'))+1).toString().concat('   ');
			}
		});
		
		var miniStar = new Q.MiniStars()
		miniStar.stars(Q.state.get('stars'));
		stage.insert(miniStar);
	});

	Q.scene('pause',function(stage) {
		
		var back = stage.insert(new Q.UI.Button({opacity:0,x: 340, y: 215, fill: "#CCCCCC", label: "o" }));
		back.on("click" ,function() {
			Q.clearStages();
			if(Q.state.get('audio')){
				Q.audio.stop();
				Q.audio.play('the_kings_crowning.mp3',{loop:true});
			}
			if(Q.state.get('survival')){
				Q.stageScene('startGame',1);
			}
			else{
				Q.stageScene('levels',1);
			}
			
		});
		var resume = stage.insert(new Q.UI.Button({ opacity:0,x: 400, y: 215, fill: "#CCCCCC", label: "o" }));
		resume.on("click" ,function() {
			Q.stage(1).unpause();
			Q.clearStage(3);
		});
		var restart = stage.insert(new Q.UI.Button({ opacity:0,x: 462, y: 215, fill: "#CCCCCC", label: "o" }));
		restart.on("click" ,function() {
			Q.state.set('audio',!Q.state.get('audio'));
			if(Q.state.get('audio')){
				if(Q.state.get('currentLevel')%2==0){
					Q.audio.play('The_Dark_Amulet.mp3',{loop:true});
				}
				else{
					Q.audio.play('Heroic_Demise.mp3',{loop:true});
				}
				stage.insert(new Q.UI.Button({ x:400, y: 200, scale:0.6, asset: 'pause.png'}));
			}
			else{
				Q.audio.stop();
				stage.insert(new Q.UI.Button({ x:400, y: 200, scale:0.6, asset: 'pauseOff.png'}));
			}
		});
		if(Q.state.get('audio')){
				stage.insert(new Q.UI.Button({ x:400, y: 200, scale:0.6, asset: 'pause.png'}));
			}
			else{
				stage.insert(new Q.UI.Button({ x:400, y: 200, scale:0.6, asset: 'pauseOff.png'}));
			}
		
	});

	Q.scene('hud',function(stage) {
		stage.insert(new Q.Magic());
		var opsButton = stage.insert(new Q.UI.Button({ x:775, y: 25, scale:0.6, asset: 'ops.png'}));
		opsButton.on("click" ,function() {
			Q.stage(1).pause();
			Q.stageScene('pause', 3);
		});

		if(Q.state.get('survival')){
			var scoreV = new Q.Score();
			scoreV.score(Q.state.get('score'));
			stage.insert(scoreV);
		}

		var PlayerButton = stage.insert(new Q.CauldronButton({x:50,y:550}));
		var PlayerButton = stage.insert(new Q.PlayerButton({asset:'bronze_knight.png', x:140,y:528, cost:50,player:'bronze_knight_anim',playerType:'BronzeKnight'}));
		if(Q.state.get('currentLevel') > 1){
			var PlayerButton = stage.insert(new Q.PlayerButton({asset:'wizard.png', x:240,y:539, cost:125,player:'wizard_anim',playerType:'BasicWizard'}));
			if(Q.state.get('currentLevel') > 2){
				var PlayerButton = stage.insert(new Q.PlayerButton({asset:'silver_knight.png', x:330,y:535, cost:75,player:'silver_knight_anim',playerType:'SilverKnight'}));
				if(Q.state.get('currentLevel') > 3){
					var PlayerButton = stage.insert(new Q.PlayerButton({asset:'black_knight.png', x:430,y:528, cost:100,player:'black_knight_anim',playerType:'BlackKnight'}));
					if(Q.state.get('currentLevel') > 4){
						var PlayerButton = stage.insert(new Q.PlayerButton({asset:'wizard_fire.png', x:520,y:533, cost:150,player:'wizard_fire_anim',playerType:'FireWizard'}));
							if(Q.state.get('currentLevel') > 6){
								var PlayerButton = stage.insert(new Q.PlayerButton({asset:'wizard_ice.png', x:610,y:533, cost:100,player:'wizard_ice_anim',playerType:'IceWizard'}));
							}
					}
				}
			}
		}
	});

	Q.scene('levelCleared',function(stage) {
		var container = stage.insert(new Q.UI.Container({
			x: 0, y: 0, fill: "rgba(0,0,0,0.5)"
		}));
		//container.insert(new Q.UI.Button({ x: Q.width/2, y: Q.height/2, fill: "#CCCCCC", asset: "levelCleared.png"}));
		switch(Q.state.get('starsAchieved')){
			case 1:
			stage.insert(new Q.Repeater({ asset: "levelCleared1.png", speedX: 0, speedY: 0, type: 0 }));
			break;
			case 2:
			stage.insert(new Q.Repeater({ asset: "levelCleared2.png", speedX: 0, speedY: 0, type: 0 }));
			break;
			case 3:
			stage.insert(new Q.Repeater({ asset: "levelCleared3.png", speedX: 0, speedY: 0, type: 0 }));
			break;
			default:
			stage.insert(new Q.Repeater({ asset: "levelCleared3.png", speedX: 0, speedY: 0, type: 0 }));
			break;
		}
		//PROBAR
		var bestNumStars = parseInt(Q.state.get('lvl'.concat(Q.state.get('currentLevel').toString()).concat('stars')));
		var difStars = Q.state.get('starsAchieved') - bestNumStars;
		if(difStars>0){
			Q.state.inc('stars',difStars);
			Q.state.set('lvl'.concat(Q.state.get('currentLevel').toString()).concat('stars'),Q.state.get('starsAchieved').toString());
		}

		if(Q.state.get('audio')){
			Q.audio.stop();
			Q.audio.play('Lively_Meadow.mp3',{loop:false});
		}
		
		stage.insert(new Q.Repeater({ asset: "levelCleared.png", speedX: 0, speedY: 0, type: 0 }));
		var back = container.insert(new Q.UI.Button({ x: 297, y: 432, fill: "#CCCCCC", label: "PL" }));
		back.on("click" ,function() {
			if(Q.state.get('audio')){
				Q.audio.stop();
				Q.audio.play('the_kings_crowning.mp3',{loop:true});
			}
			Q.clearStages();
			Q.state.inc('level',1);
			Q.stageScene('levels',1);
		});
		var retry = container.insert(new Q.UI.Button({ x: 402, y: 432, fill: "#CCCCCC", label: "PL" }));
		retry.on("click" ,function() {
			Q.audio.stop();
			Q.clearStages();
			Q.state.inc('level',1);
			Q.stageScene('level'.concat(Q.state.get('currentLevel')),1);
			Q.stageScene('hud', 2);
		});
		var next = container.insert(new Q.UI.Button({ x: 505, y: 432, fill: "#CCCCCC", label: "PL" }));
		next.on("click" ,function() {
			Q.audio.stop();
			if(Q.state.get('currentLevel')==10){
				Q.clearStages();
				Q.state.inc('level',1);
				Q.stageScene('levels',1);
				
			}
			else{
				Q.state.inc('currentLevel',1);
				if(Q.state.get('currentLevel')>Q.state.get('level')){
					Q.state.set('level',Q.state.get('currentLevel'));
				}
				Q.clearStages();
				Q.stageScene('level'.concat(Q.state.get('currentLevel')),1);
				Q.stageScene('hud', 2);
				Q.stageScene('levelDescription', 3);
				Q.stage(1).pause();
			}
		});
	});

	Q.scene('levelFailed',function(stage) {
		var container = stage.insert(new Q.UI.Container({
			x: 0, y: 0, fill: "rgba(0,0,0,0.5)"
		}));

		if(Q.state.get('audio')){
			Q.audio.stop();
			Q.audio.play('evil.mp3',{loop:false});
		}
		
		//container.insert(new Q.UI.Button({ x: Q.width/2, y: Q.height/2, fill: "#CCCCCC", asset: "levelFailed.png"}));
		stage.insert(new Q.Repeater({ asset: "levelFailed.png", speedX: 0, speedY: 0, type: 0 }));
		var back = container.insert(new Q.UI.Button({ x: 297, y: 432, fill: "#CCCCCC", label: "PL" }));
		back.on("click" ,function() {
			if(Q.state.get('audio')){
				Q.audio.stop();
				Q.audio.play('the_kings_crowning.mp3',{loop:true});
			}
			Q.clearStages();
			Q.stageScene('levels',1);
			
		});
		var retry = container.insert(new Q.UI.Button({ x: 402, y: 432, fill: "#CCCCCC", label: "PL" }));
		retry.on("click" ,function() {
			Q.audio.stop();
			Q.clearStages();
			Q.stageScene('level'.concat(Q.state.get('currentLevel')),1);
			Q.stageScene('hud', 2);

		});
		var store = container.insert(new Q.UI.Button({ x: 505, y: 432, fill: "#CCCCCC", label: "PL" }));
		store.on("click" ,function() {
			if(Q.state.get('audio')){
				Q.audio.stop();
				Q.audio.play('the_kings_crowning.mp3',{loop:true});
			}
			Q.clearStages();
			Q.stageScene('storeBackground',0);
			Q.stageScene('store',1);
		});
	});

	Q.scene('levelDescription',function(stage) {
		var container = stage.insert(new Q.UI.Container({
			x: 0, y: 0, fill: "rgba(0,0,0,0.5)"
		}));

		if(Q.state.get('currentLevel')%2==0){
			if(Q.state.get('audio')){
				Q.audio.stop();
				Q.audio.play('The_Dark_Amulet.mp3',{loop:true});
			}
		}
		else{
			if(Q.state.get('audio')){
				Q.audio.stop();
				Q.audio.play('Heroic_Demise.mp3',{loop:true});
			}
		}
		
		var okay = container.insert(new Q.UI.Button({ x: 400, y: 542, fill: "#CCCCCC", label: "PL" }));
		okay.on("click" ,function() {
			Q.clearStage(3);
			Q.stage(1).unpause();
			

		});

		container.insert(new Q.UI.Button({ x: Q.width/2, y: Q.height/2, asset: 'level'.concat(Q.state.get('currentLevel')).concat('desc.png')}));
		
	});

	Q.scene('welcome',function(stage) {
		var container = stage.insert(new Q.UI.Container({
			x: 0, y: 0, fill: "rgba(0,0,0,0.5)"
		}));
		
		var back = container.insert(new Q.UI.Button({ x: 400, y: 522, fill: "#CCCCCC", label: "PL" }));
		back.on("click" ,function() {
			Q.clearStage(2);
		});

		container.insert(new Q.UI.Button({ x: Q.width/2, y: 280, asset: 'welcome.png'}));
		
	});

/*************************GUI_COMPONENTS*************************/

	Q.UI.Text.extend("Stars",{
		init: function() {
			this._super({
				label: "     0",
				x: 150,
				y: 30,
				color: "orange"
			});
			Q.state.on("change.stars",this,"stars");
		},
		stars: function(stars) {
			this.p.label = "     " + stars;
		}
	});

	Q.UI.Text.extend("MiniStars",{
		init: function() {
			this._super({
				label: "     0",
				x: 520,
				y: 110,
				size:18,
				color: "orange"
			});
			Q.state.on("change.stars",this,"stars");
		},
		stars: function(stars) {
			this.p.label = "     " + stars;
		}
	});

	Q.UI.Text.extend("Score",{
		init: function() {
			this._super({
				label: "Score: 0",
				x: 720,
				y: 500,
				color: "white"
			});
			Q.state.on("change.score",this,"score");
		},
		score: function(score) {
			this.p.label = "Score: " + score;
		}
	});

	Q.UI.Text.extend("Magic",{
		init: function() {
			this._super({
				label: "Magic: 0",
				x: 720,
				y: 540,
				color: "white"
			});
			Q.state.on("change.magic",this,"magic");
		},
		magic: function(magic) {
			this.p.label = "Magic: " + magic;
		}
	});

	Q.UI.Button.extend("PlayerButton", {
		init: function(p) {
			this._super(Q._defaults(p, {
	//asset: 'knight.png',
		//x:
		//y:
		scale: 0.2
		//player:
		//cost:
	}),                     
			function() {
				Q.state.set("selectedPlayer", this.p.player);
				Q.state.set("PlayerType", this.p.playerType);
				Q.state.set("selectedPlayerCost", this.p.cost);
				Q.state.set("cauldronSelected", false);
			}
			);
		}
	});

	Q.UI.Button.extend("CauldronButton", {
		init: function(p) {
			this._super(Q._defaults(p, {
				asset: 'cauldron2.png',
				player:'cauldron',
				cost: '50',
				scale: 0.7
			}),
			function() {
				Q.state.set("selectedPlayer", false);
				Q.state.set("cauldronSelected", true);
				Q.state.set("selectedPlayerCost", this.p.cost);
			}
			);
		}
	});

/*************************COLLISIONMASK*************************/

	Q.SPRITE_COLLECTABLE = 2;
	Q.SPRITE_ENEMY = 5;
	Q.SPRITE_PLAYER = 10;
	Q.SPRITE_BALL = 8;

/*************************LEVELS*************************/

Q.scene("level1",function(stage) {	

		for(var i=0;i<8;i++){
			for(var j=0;j<4;j++){
				var tile = new Q.GridTile({x:i*100,y:j*100});
				stage.insert(tile);
			}
		}
		var tile = new Q.GridTile({x:0,y:400});
		stage.insert(tile);

		Q.el.addEventListener("mousemove",function(e) {
			var x = e.offsetX || e.layerX,
			y = e.offsetY || e.layerY;
			var stageX = Q.canvasToStageX(x, stage),
			stageY = Q.canvasToStageY(y, stage);
			var locX = Math.floor(stageX/100);
			var locY = Math.floor(stageY/100);
			Q.playerX = locX*100 + 100/2;
			Q.playerY = locY*100 + 100/2;
		});

		Q.state.set("numberOfEnemies", 7);
		Q.state.set("killedEnemies", 0);

		Q.state.set("selectedPlayerCost", 0);
		Q.state.set("cauldronSelected",false); 
		Q.state.set("playerSelected",false); 
		Q.state.set("magic", 0);
		Q.state.set("enemiesRow0", 0);
		Q.state.set("enemiesRow1", 0);
		Q.state.set("enemiesRow2", 0);
		Q.state.set("enemiesRow3", 0);

		Q.state.set("starsAchieved", 0);
		Q.state.set("currentPotions", 0);
		Q.state.set("targetPotions", 20);
		Q.state.set("currentDefenders", 0);
		Q.state.set("maxDefenders", 10);
		Q.state.set("survival", false);

		Q.stageTMX("level1.tmx",stage);

		stage.insert(new Q.TowerTall({x:40,y:190, scale:1.1}));
		stage.add("viewport");
		stage.insert(new Q.PotionGenerator());
		stage.insert(new Q.EnemySpawner({row:0, nEnemies:3, tStart:25, delay:20, enemyP:"Orc"}));
		stage.insert(new Q.EnemySpawner({row:1, nEnemies:1, tStart:35, delay:0, enemyP:"Orc"}));
		stage.insert(new Q.EnemySpawner({row:2, nEnemies:1, tStart:45, delay:0, enemyP:"Orc"}));
		stage.insert(new Q.EnemySpawner({row:3, nEnemies:2, tStart:17, delay:10, enemyP:"Orc"}));
});

Q.scene("level2",function(stage) {	

		for(var i=0;i<8;i++){
			for(var j=0;j<4;j++){
				var tile = new Q.GridTile({x:i*100,y:j*100});
				stage.insert(tile);
			}
		}
		var tile = new Q.GridTile({x:0,y:300});
		stage.insert(tile);

		Q.el.addEventListener("mousemove",function(e) {
			var x = e.offsetX || e.layerX,
			y = e.offsetY || e.layerY;
			var stageX = Q.canvasToStageX(x, stage),
			stageY = Q.canvasToStageY(y, stage);
			var locX = Math.floor(stageX/100);
			var locY = Math.floor(stageY/100);
			Q.playerX = locX*100 + 100/2;
			Q.playerY = locY*100 + 100/2;
		});

		Q.state.set("survival", false);
		Q.state.set("numberOfEnemies", 10);
		Q.state.set("killedEnemies", 0);

		Q.state.set("selectedPlayerCost", 0);
		Q.state.set("cauldronSelected",false); 
		Q.state.set("playerSelected",false); 
		Q.state.set("magic", 0);
		Q.state.set("enemiesRow0", 0);
		Q.state.set("enemiesRow1", 0);
		Q.state.set("enemiesRow2", 0);
		Q.state.set("enemiesRow3", 0);

		Q.state.set("starsAchieved", 0);
		Q.state.set("currentPotions", 0);
		Q.state.set("targetPotions", 30);
		Q.state.set("currentDefenders", 0);
		Q.state.set("maxDefenders", 15);

		Q.stageTMX("level1.tmx",stage);

		stage.insert(new Q.TowerTall({x:40,y:190, scale:1.1}));
		stage.add("viewport");
		stage.insert(new Q.PotionGenerator());
		stage.insert(new Q.EnemySpawner({row:0, nEnemies:2, tStart:25, delay:40, enemyP:"SwordOrc"}));
		stage.insert(new Q.EnemySpawner({row:0, nEnemies:1, tStart:50, delay:33, enemyP:"Orc"}));
		stage.insert(new Q.EnemySpawner({row:1, nEnemies:1, tStart:35, delay:0, enemyP:"Orc"}));
		stage.insert(new Q.EnemySpawner({row:2, nEnemies:2, tStart:75, delay:15, enemyP:"SwordOrc"}));
		stage.insert(new Q.EnemySpawner({row:3, nEnemies:2, tStart:17, delay:25, enemyP:"Orc"}));
		stage.insert(new Q.EnemySpawner({row:3, nEnemies:2, tStart:65, delay:20, enemyP:"SwordOrc"}));
});

Q.scene("level3",function(stage) {	

		for(var i=0;i<8;i++){
			for(var j=0;j<4;j++){
				var tile = new Q.GridTile({x:i*100,y:j*100});
				stage.insert(tile);
			}
		}
		var tile = new Q.GridTile({x:0,y:300});
		stage.insert(tile);

		Q.el.addEventListener("mousemove",function(e) {
			var x = e.offsetX || e.layerX,
			y = e.offsetY || e.layerY;
			var stageX = Q.canvasToStageX(x, stage),
			stageY = Q.canvasToStageY(y, stage);
			var locX = Math.floor(stageX/100);
			var locY = Math.floor(stageY/100);
			Q.playerX = locX*100 + 100/2;
			Q.playerY = locY*100 + 100/2;
		});

		Q.state.set("survival", false);
		Q.state.set("numberOfEnemies", 9);
		Q.state.set("killedEnemies", 0);

		Q.state.set("selectedPlayerCost", 0);
		Q.state.set("cauldronSelected",false); 
		Q.state.set("playerSelected",false); 
		Q.state.set("magic", 0);
		Q.state.set("enemiesRow0", 0);
		Q.state.set("enemiesRow1", 0);
		Q.state.set("enemiesRow2", 0);
		Q.state.set("enemiesRow3", 0);

		Q.state.set("starsAchieved", 0);
		Q.state.set("currentPotions", 0);
		Q.state.set("targetPotions", 60);
		Q.state.set("currentDefenders", 0);
		Q.state.set("maxDefenders", 20);

		Q.stageTMX("level1.tmx",stage);

		stage.insert(new Q.TowerTall({x:40,y:190, scale:1.1}));
		stage.add("viewport");
		stage.insert(new Q.PotionGenerator());
		stage.insert(new Q.EnemySpawner({row:0, nEnemies:1, tStart:50, delay:0, enemyP:"SwordOrc"}));
		stage.insert(new Q.EnemySpawner({row:1, nEnemies:1, tStart:70, delay:0, enemyP:"Troll"}));
		stage.insert(new Q.EnemySpawner({row:1, nEnemies:1, tStart:35, delay:0, enemyP:"Orc"}));
		stage.insert(new Q.EnemySpawner({row:2, nEnemies:2, tStart:75, delay:15, enemyP:"SwordOrc"}));
		stage.insert(new Q.EnemySpawner({row:2, nEnemies:1, tStart:75, delay:0, enemyP:"Troll"}));
		stage.insert(new Q.EnemySpawner({row:3, nEnemies:2, tStart:17, delay:25, enemyP:"Orc"}));
		stage.insert(new Q.EnemySpawner({row:3, nEnemies:1, tStart:65, delay:20, enemyP:"SwordOrc"}));
});

Q.scene("level4",function(stage) {	

		for(var i=0;i<8;i++){
			for(var j=0;j<4;j++){
				var tile = new Q.GridTile({x:i*100,y:j*100});
				stage.insert(tile);
			}
		}
		var tile = new Q.GridTile({x:0,y:300});
		stage.insert(tile);

		Q.el.addEventListener("mousemove",function(e) {
			var x = e.offsetX || e.layerX,
			y = e.offsetY || e.layerY;
			var stageX = Q.canvasToStageX(x, stage),
			stageY = Q.canvasToStageY(y, stage);
			var locX = Math.floor(stageX/100);
			var locY = Math.floor(stageY/100);
			Q.playerX = locX*100 + 100/2;
			Q.playerY = locY*100 + 100/2;
		});

		Q.state.set("survival", false);
		Q.state.set("numberOfEnemies", 13);
		Q.state.set("killedEnemies", 0);

		Q.state.set("selectedPlayerCost", 0);
		Q.state.set("cauldronSelected",false); 
		Q.state.set("playerSelected",false); 
		Q.state.set("magic", 0);
		Q.state.set("enemiesRow0", 0);
		Q.state.set("enemiesRow1", 0);
		Q.state.set("enemiesRow2", 0);
		Q.state.set("enemiesRow3", 0);

		Q.state.set("starsAchieved", 0);
		Q.state.set("currentPotions", 0);
		Q.state.set("targetPotions", 80);
		Q.state.set("currentDefenders", 0);
		Q.state.set("maxDefenders", 30);

		Q.stageTMX("level1.tmx",stage);

		stage.insert(new Q.TowerTall({x:40,y:190, scale:1.1}));
		stage.add("viewport");
		stage.insert(new Q.PotionGenerator());
		stage.insert(new Q.EnemySpawner({row:0, nEnemies:2, tStart:35, delay:40, enemyP:"AxeOrc"}));
		stage.insert(new Q.EnemySpawner({row:0, nEnemies:1, tStart:50, delay:0, enemyP:"SwordOrc"}));
		stage.insert(new Q.EnemySpawner({row:1, nEnemies:1, tStart:70, delay:0, enemyP:"Troll"}));
		stage.insert(new Q.EnemySpawner({row:1, nEnemies:1, tStart:25, delay:0, enemyP:"Orc"}));
		stage.insert(new Q.EnemySpawner({row:2, nEnemies:2, tStart:30, delay:15, enemyP:"SwordOrc"}));
		stage.insert(new Q.EnemySpawner({row:2, nEnemies:1, tStart:85, delay:40, enemyP:"SwordOrc"}));
		stage.insert(new Q.EnemySpawner({row:2, nEnemies:1, tStart:95, delay:0, enemyP:"Troll"}));
		stage.insert(new Q.EnemySpawner({row:3, nEnemies:2, tStart:17, delay:25, enemyP:"Orc"}));
		stage.insert(new Q.EnemySpawner({row:3, nEnemies:2, tStart:65, delay:20, enemyP:"AxeOrc"}));
});

Q.scene("level5",function(stage) {	

		for(var i=0;i<8;i++){
			for(var j=0;j<4;j++){
				var tile = new Q.GridTile({x:i*100,y:j*100});
				stage.insert(tile);
			}
		}
		var tile = new Q.GridTile({x:0,y:300});
		stage.insert(tile);

		Q.el.addEventListener("mousemove",function(e) {
			var x = e.offsetX || e.layerX,
			y = e.offsetY || e.layerY;
			var stageX = Q.canvasToStageX(x, stage),
			stageY = Q.canvasToStageY(y, stage);
			var locX = Math.floor(stageX/100);
			var locY = Math.floor(stageY/100);
			Q.playerX = locX*100 + 100/2;
			Q.playerY = locY*100 + 100/2;
		});

		Q.state.set("survival", false);
		Q.state.set("numberOfEnemies", 7);
		Q.state.set("killedEnemies", 0);

		Q.state.set("selectedPlayerCost", 0);
		Q.state.set("cauldronSelected",false); 
		Q.state.set("playerSelected",false); 
		Q.state.set("magic", 0);
		Q.state.set("enemiesRow0", 0);
		Q.state.set("enemiesRow1", 0);
		Q.state.set("enemiesRow2", 0);
		Q.state.set("enemiesRow3", 0);

		Q.state.set("starsAchieved", 0);
		Q.state.set("currentPotions", 0);
		Q.state.set("targetPotions", 100);
		Q.state.set("currentDefenders", 0);
		Q.state.set("maxDefenders", 40);

		Q.stageTMX("level1.tmx",stage);
		stage.insert(new Q.TowerTall({x:40,y:190, scale:1.1}));
		stage.add("viewport");
		stage.insert(new Q.PotionGenerator());
		stage.insert(new Q.EnemySpawner({row:0, nEnemies:2, tStart:35, delay:45, enemyP:"AxeOrc"}));
		stage.insert(new Q.EnemySpawner({row:0, nEnemies:1, tStart:50, delay:0, enemyP:"SwordOrc"}));
		stage.insert(new Q.EnemySpawner({row:1, nEnemies:1, tStart:70, delay:0, enemyP:"Troll"}));
		stage.insert(new Q.EnemySpawner({row:1, nEnemies:1, tStart:25, delay:0, enemyP:"Orc"}));
		stage.insert(new Q.EnemySpawner({row:2, nEnemies:1, tStart:95, delay:0, enemyP:"Troll"}));
		stage.insert(new Q.EnemySpawner({row:3, nEnemies:1, tStart:65, delay:25, enemyP:"AxeOrc"}));
});

Q.scene("level6",function(stage) {	

		for(var i=0;i<8;i++){
			for(var j=0;j<4;j++){
				var tile = new Q.GridTile({x:i*100,y:j*100});
				stage.insert(tile);
			}
		}
		var tile = new Q.GridTile({x:0,y:300});
		stage.insert(tile);

		Q.el.addEventListener("mousemove",function(e) {
			var x = e.offsetX || e.layerX,
			y = e.offsetY || e.layerY;
			var stageX = Q.canvasToStageX(x, stage),
			stageY = Q.canvasToStageY(y, stage);
			var locX = Math.floor(stageX/100);
			var locY = Math.floor(stageY/100);
			Q.playerX = locX*100 + 100/2;
			Q.playerY = locY*100 + 100/2;
		});

		Q.state.set("survival", false);
		Q.state.set("numberOfEnemies", 18);
		Q.state.set("killedEnemies", 0);

		Q.state.set("selectedPlayerCost", 0);
		Q.state.set("cauldronSelected",false); 
		Q.state.set("playerSelected",false); 
		Q.state.set("magic", 0);
		Q.state.set("enemiesRow0", 0);
		Q.state.set("enemiesRow1", 0);
		Q.state.set("enemiesRow2", 0);
		Q.state.set("enemiesRow3", 0);

		Q.state.set("starsAchieved", 0);
		Q.state.set("currentPotions", 0);
		Q.state.set("targetPotions", 120);
		Q.state.set("currentDefenders", 0);
		Q.state.set("maxDefenders", 45);

		Q.stageTMX("level1.tmx",stage);
		stage.insert(new Q.TowerTall({x:40,y:190, scale:1.1}));
		stage.add("viewport");
		stage.insert(new Q.PotionGenerator());
		stage.insert(new Q.EnemySpawner({row:0, nEnemies:2, tStart:35, delay:45, enemyP:"AxeOrc"}));
		stage.insert(new Q.EnemySpawner({row:0, nEnemies:1, tStart:50, delay:0, enemyP:"SwordOrc"}));
		stage.insert(new Q.EnemySpawner({row:0, nEnemies:1, tStart:90, delay:0, enemyP:"GreyTroll"}));
		stage.insert(new Q.EnemySpawner({row:1, nEnemies:1, tStart:70, delay:0, enemyP:"Troll"}));
		stage.insert(new Q.EnemySpawner({row:1, nEnemies:2, tStart:25, delay:70, enemyP:"Orc"}));
		stage.insert(new Q.EnemySpawner({row:1, nEnemies:1, tStart:120, delay:0, enemyP:"AxeOrc"}));
		stage.insert(new Q.EnemySpawner({row:2, nEnemies:2, tStart:30, delay:20, enemyP:"Orc"}));
		stage.insert(new Q.EnemySpawner({row:2, nEnemies:1, tStart:60, delay:0, enemyP:"SwordOrc"}));
		stage.insert(new Q.EnemySpawner({row:2, nEnemies:2, tStart:85, delay:20, enemyP:"SwordOrc"}));
		stage.insert(new Q.EnemySpawner({row:2, nEnemies:1, tStart:95, delay:0, enemyP:"GreyTroll"}));
		stage.insert(new Q.EnemySpawner({row:3, nEnemies:2, tStart:17, delay:20, enemyP:"Orc"}));
		stage.insert(new Q.EnemySpawner({row:3, nEnemies:2, tStart:65, delay:25, enemyP:"AxeOrc"}));
});

Q.scene("level7",function(stage) {	

		for(var i=0;i<8;i++){
			for(var j=0;j<4;j++){
				var tile = new Q.GridTile({x:i*100,y:j*100});
				stage.insert(tile);
			}
		}
		var tile = new Q.GridTile({x:0,y:300});
		stage.insert(tile);

		Q.el.addEventListener("mousemove",function(e) {
			var x = e.offsetX || e.layerX,
			y = e.offsetY || e.layerY;
			var stageX = Q.canvasToStageX(x, stage),
			stageY = Q.canvasToStageY(y, stage);
			var locX = Math.floor(stageX/100);
			var locY = Math.floor(stageY/100);
			Q.playerX = locX*100 + 100/2;
			Q.playerY = locY*100 + 100/2;
		});

		Q.state.set("survival", false);
		Q.state.set("numberOfEnemies", 20);
		Q.state.set("killedEnemies", 0);

		Q.state.set("selectedPlayerCost", 0);
		Q.state.set("cauldronSelected",false); 
		Q.state.set("playerSelected",false); 
		Q.state.set("magic", 0);
		Q.state.set("enemiesRow0", 0);
		Q.state.set("enemiesRow1", 0);
		Q.state.set("enemiesRow2", 0);
		Q.state.set("enemiesRow3", 0);

		Q.state.set("starsAchieved", 0);
		Q.state.set("currentPotions", 0);
		Q.state.set("targetPotions", 150);
		Q.state.set("currentDefenders", 0);
		Q.state.set("maxDefenders", 60);

		Q.stageTMX("level1.tmx",stage);
		stage.insert(new Q.TowerTall({x:40,y:190, scale:1.1}));
		stage.add("viewport");
		stage.insert(new Q.PotionGenerator());
		stage.insert(new Q.EnemySpawner({row:0, nEnemies:2, tStart:35, delay:45, enemyP:"AxeOrc"}));
		stage.insert(new Q.EnemySpawner({row:0, nEnemies:1, tStart:50, delay:0, enemyP:"SwordOrc"}));
		stage.insert(new Q.EnemySpawner({row:0, nEnemies:1, tStart:90, delay:0, enemyP:"GreyTroll"}));
		stage.insert(new Q.EnemySpawner({row:1, nEnemies:1, tStart:70, delay:0, enemyP:"Troll"}));
		stage.insert(new Q.EnemySpawner({row:1, nEnemies:2, tStart:25, delay:70, enemyP:"Orc"}));
		stage.insert(new Q.EnemySpawner({row:1, nEnemies:1, tStart:120, delay:0, enemyP:"AxeOrc"}));
		stage.insert(new Q.EnemySpawner({row:2, nEnemies:2, tStart:30, delay:20, enemyP:"Orc"}));
		stage.insert(new Q.EnemySpawner({row:2, nEnemies:1, tStart:60, delay:0, enemyP:"SwordOrc"}));
		stage.insert(new Q.EnemySpawner({row:2, nEnemies:2, tStart:85, delay:20, enemyP:"SwordOrc"}));
		stage.insert(new Q.EnemySpawner({row:2, nEnemies:1, tStart:95, delay:0, enemyP:"GreyTroll"}));
		stage.insert(new Q.EnemySpawner({row:3, nEnemies:2, tStart:17, delay:20, enemyP:"Orc"}));
		stage.insert(new Q.EnemySpawner({row:3, nEnemies:2, tStart:65, delay:25, enemyP:"AxeOrc"}));
		stage.insert(new Q.EnemySpawner({row:1, nEnemies:1, tStart:80, delay:30, enemyP:"SwordOrc"}));
});

Q.scene("level8",function(stage) {	

		for(var i=0;i<8;i++){
			for(var j=0;j<4;j++){
				var tile = new Q.GridTile({x:i*100,y:j*100});
				stage.insert(tile);
			}
		}
		var tile = new Q.GridTile({x:0,y:300});
		stage.insert(tile);

		Q.el.addEventListener("mousemove",function(e) {
			var x = e.offsetX || e.layerX,
			y = e.offsetY || e.layerY;
			var stageX = Q.canvasToStageX(x, stage),
			stageY = Q.canvasToStageY(y, stage);
			var locX = Math.floor(stageX/100);
			var locY = Math.floor(stageY/100);
			Q.playerX = locX*100 + 100/2;
			Q.playerY = locY*100 + 100/2;
		});

		Q.state.set("survival", false);
		Q.state.set("numberOfEnemies", 22);
		Q.state.set("killedEnemies", 0);

		Q.state.set("selectedPlayerCost", 0);
		Q.state.set("cauldronSelected",false); 
		Q.state.set("playerSelected",false); 
		Q.state.set("magic", 0);
		Q.state.set("enemiesRow0", 0);
		Q.state.set("enemiesRow1", 0);
		Q.state.set("enemiesRow2", 0);
		Q.state.set("enemiesRow3", 0);

		Q.state.set("starsAchieved", 0);
		Q.state.set("currentPotions", 0);
		Q.state.set("targetPotions", 250);
		Q.state.set("currentDefenders", 0);
		Q.state.set("maxDefenders", 105);

		Q.stageTMX("level1.tmx",stage);
		stage.insert(new Q.TowerTall({x:40,y:190, scale:1.1}));
		stage.add("viewport");
		stage.insert(new Q.PotionGenerator());
		stage.insert(new Q.EnemySpawner({row:0, nEnemies:1, tStart:165, delay:0, enemyP:"SwordOrc"}));
		stage.insert(new Q.EnemySpawner({row:0, nEnemies:1, tStart:70, delay:0, enemyP:"Orc"}));
		stage.insert(new Q.EnemySpawner({row:0, nEnemies:2, tStart:85, delay:45, enemyP:"AxeOrc"}));
		stage.insert(new Q.EnemySpawner({row:0, nEnemies:1, tStart:150, delay:0, enemyP:"GreyTroll"}));
		stage.insert(new Q.EnemySpawner({row:1, nEnemies:2, tStart:25, delay:30, enemyP:"SwordOrc"}));
		stage.insert(new Q.EnemySpawner({row:1, nEnemies:1, tStart:170, delay:0, enemyP:"Orc"}));
		stage.insert(new Q.EnemySpawner({row:1, nEnemies:1, tStart:70, delay:0, enemyP:"Troll"}));
		stage.insert(new Q.EnemySpawner({row:1, nEnemies:2, tStart:25, delay:70, enemyP:"Orc"}));
		stage.insert(new Q.EnemySpawner({row:1, nEnemies:1, tStart:185, delay:0, enemyP:"AxeOrc"}));
		stage.insert(new Q.EnemySpawner({row:2, nEnemies:2, tStart:30, delay:20, enemyP:"Orc"}));
		stage.insert(new Q.EnemySpawner({row:2, nEnemies:1, tStart:60, delay:0, enemyP:"AxedOrc"}));
		stage.insert(new Q.EnemySpawner({row:2, nEnemies:2, tStart:85, delay:20, enemyP:"SwordOrc"}));
		stage.insert(new Q.EnemySpawner({row:2, nEnemies:1, tStart:100, delay:0, enemyP:"RedTroll"}));
		stage.insert(new Q.EnemySpawner({row:3, nEnemies:2, tStart:40, delay:20, enemyP:"Orc"}));
		stage.insert(new Q.EnemySpawner({row:3, nEnemies:2, tStart:20, delay:25, enemyP:"AxeOrc"}));
});


Q.scene("level9",function(stage) {	

		for(var i=0;i<8;i++){
			for(var j=0;j<4;j++){
				var tile = new Q.GridTile({x:i*100,y:j*100});
				stage.insert(tile);
			}
		}
		var tile = new Q.GridTile({x:0,y:300});
		stage.insert(tile);

		Q.el.addEventListener("mousemove",function(e) {
			var x = e.offsetX || e.layerX,
			y = e.offsetY || e.layerY;
			var stageX = Q.canvasToStageX(x, stage),
			stageY = Q.canvasToStageY(y, stage);
			var locX = Math.floor(stageX/100);
			var locY = Math.floor(stageY/100);
			Q.playerX = locX*100 + 100/2;
			Q.playerY = locY*100 + 100/2;
		});

		Q.state.set("survival", false);
		Q.state.set("numberOfEnemies", 19);
		Q.state.set("killedEnemies", 0);

		Q.state.set("selectedPlayerCost", 0);
		Q.state.set("cauldronSelected",false); 
		Q.state.set("playerSelected",false); 
		Q.state.set("magic", 0);
		Q.state.set("enemiesRow0", 0);
		Q.state.set("enemiesRow1", 0);
		Q.state.set("enemiesRow2", 0);
		Q.state.set("enemiesRow3", 0);

		Q.state.set("starsAchieved", 0);
		Q.state.set("currentPotions", 0);
		Q.state.set("targetPotions", 220);
		Q.state.set("currentDefenders", 0);
		Q.state.set("maxDefenders", 45);

		Q.stageTMX("level1.tmx",stage);
		stage.insert(new Q.TowerTall({x:40,y:190, scale:1.1}));
		stage.add("viewport");
		stage.insert(new Q.PotionGenerator());
		stage.insert(new Q.EnemySpawner({row:0, nEnemies:2, tStart:40, delay:40, enemyP:"SwordOrc"}));
		stage.insert(new Q.EnemySpawner({row:0, nEnemies:2, tStart:160, delay:50, enemyP:"GreyTroll"}));
		stage.insert(new Q.EnemySpawner({row:1, nEnemies:1, tStart:120, delay:0, enemyP:"Troll"}));
		stage.insert(new Q.EnemySpawner({row:1, nEnemies:1, tStart:50, delay:0, enemyP:"AxeOrc"}));
		stage.insert(new Q.EnemySpawner({row:2, nEnemies:1, tStart:70, delay:0, enemyP:"AxeOrc"}));
		stage.insert(new Q.EnemySpawner({row:2, nEnemies:2, tStart:95, delay:30, enemyP:"SwordOrc"}));
		stage.insert(new Q.EnemySpawner({row:2, nEnemies:1, tStart:180, delay:0, enemyP:"RedTroll"}));
		stage.insert(new Q.EnemySpawner({row:3, nEnemies:1, tStart:190, delay:0, enemyP:"Troll"}));
		stage.insert(new Q.EnemySpawner({row:3, nEnemies:4, tStart:20, delay:40, enemyP:"Orc"}));
		stage.insert(new Q.EnemySpawner({row:3, nEnemies:4, tStart:130, delay:50, enemyP:"AxeOrc"}));
});

Q.scene("level10",function(stage) {	

		for(var i=0;i<8;i++){
			for(var j=0;j<4;j++){
				var tile = new Q.GridTile({x:i*100,y:j*100});
				stage.insert(tile);
			}
		}
		var tile = new Q.GridTile({x:0,y:300});
		stage.insert(tile);

		Q.el.addEventListener("mousemove",function(e) {
			var x = e.offsetX || e.layerX,
			y = e.offsetY || e.layerY;
			var stageX = Q.canvasToStageX(x, stage),
			stageY = Q.canvasToStageY(y, stage);
			var locX = Math.floor(stageX/100);
			var locY = Math.floor(stageY/100);
			Q.playerX = locX*100 + 100/2;
			Q.playerY = locY*100 + 100/2;
		});

		Q.state.set("survival", false);
		Q.state.set("numberOfEnemies", 43);
		Q.state.set("killedEnemies", 0);

		Q.state.set("selectedPlayerCost", 0);
		Q.state.set("cauldronSelected",false); 
		Q.state.set("playerSelected",false); 
		Q.state.set("magic", 0);
		Q.state.set("enemiesRow0", 0);
		Q.state.set("enemiesRow1", 0);
		Q.state.set("enemiesRow2", 0);
		Q.state.set("enemiesRow3", 0);

		Q.state.set("starsAchieved", 0);
		Q.state.set("currentPotions", 0);
		Q.state.set("targetPotions", 300);
		Q.state.set("currentDefenders", 0);
		Q.state.set("maxDefenders", 70);

		Q.stageTMX("level1.tmx",stage);
		stage.insert(new Q.TowerTall({x:40,y:190, scale:1.1}));
		stage.add("viewport");
		stage.insert(new Q.PotionGenerator());
		stage.insert(new Q.EnemySpawner({row:0, nEnemies:2, tStart:45, delay:30, enemyP:"SwordOrc"}));
		stage.insert(new Q.EnemySpawner({row:1, nEnemies:2, tStart:35, delay:30, enemyP:"Orc"}));
		stage.insert(new Q.EnemySpawner({row:2, nEnemies:2, tStart:30, delay:30, enemyP:"SwordOrc"}));
		stage.insert(new Q.EnemySpawner({row:3, nEnemies:2, tStart:25, delay:30, enemyP:"Orc"}));

		stage.insert(new Q.EnemySpawner({row:1, nEnemies:1, tStart:75, delay:0, enemyP:"RedTroll"}));
		stage.insert(new Q.EnemySpawner({row:3, nEnemies:1, tStart:70, delay:0, enemyP:"Troll"}));

		stage.insert(new Q.EnemySpawner({row:0, nEnemies:2, tStart:80, delay:30, enemyP:"Orc"}));
		stage.insert(new Q.EnemySpawner({row:1, nEnemies:2, tStart:85, delay:30, enemyP:"AxeOrc"}));
		stage.insert(new Q.EnemySpawner({row:2, nEnemies:2, tStart:80, delay:30, enemyP:"Orc"}));
		stage.insert(new Q.EnemySpawner({row:3, nEnemies:2, tStart:85, delay:30, enemyP:"AxeOrc"}));

		stage.insert(new Q.EnemySpawner({row:0, nEnemies:2, tStart:110, delay:20, enemyP:"SwordOrc"}));
		stage.insert(new Q.EnemySpawner({row:2, nEnemies:1, tStart:120, delay:0, enemyP:"GreyTroll"}));
		stage.insert(new Q.EnemySpawner({row:1, nEnemies:1, tStart:115, delay:0, enemyP:"Troll"}));
		stage.insert(new Q.EnemySpawner({row:3, nEnemies:2, tStart:110, delay:20, enemyP:"SwordOrc"}));

		stage.insert(new Q.EnemySpawner({row:3, nEnemies:1, tStart:140, delay:0, enemyP:"Troll"}));
		stage.insert(new Q.EnemySpawner({row:0, nEnemies:1, tStart:140, delay:0, enemyP:"RedTroll"}));

		stage.insert(new Q.EnemySpawner({row:2, nEnemies:2, tStart:150, delay:20, enemyP:"Orc"}));
		stage.insert(new Q.EnemySpawner({row:2, nEnemies:2, tStart:150, delay:20, enemyP:"AxeOrc"}));

		stage.insert(new Q.EnemySpawner({row:3, nEnemies:2, tStart:160, delay:20, enemyP:"SwordOrc"}));
		stage.insert(new Q.EnemySpawner({row:3, nEnemies:2, tStart:160, delay:20, enemyP:"AxeOrc"}));

		stage.insert(new Q.EnemySpawner({row:2, nEnemies:2, tStart:170, delay:20, enemyP:"Orc"}));
		stage.insert(new Q.EnemySpawner({row:1, nEnemies:1, tStart:170, delay:0, enemyP:"Troll"}));
		stage.insert(new Q.EnemySpawner({row:2, nEnemies:2, tStart:190, delay:20, enemyP:"SwordOrc"}));
		stage.insert(new Q.EnemySpawner({row:1, nEnemies:2, tStart:190, delay:20, enemyP:"AxeOrc"}));
		stage.insert(new Q.EnemySpawner({row:0, nEnemies:1, tStart:180, delay:0, enemyP:"GreyTroll"}));
		stage.insert(new Q.EnemySpawner({row:3, nEnemies:1, tStart:180, delay:0, enemyP:"RedTroll"}));
});


Q.scene("level11",function(stage) {	


		if(Q.state.get('audio')){
			Q.audio.stop();
			Q.audio.play('The_Dark_Amulet.mp3',{loop:true});
		}
		for(var i=0;i<8;i++){
			for(var j=0;j<4;j++){
				var tile = new Q.GridTile({x:i*100,y:j*100});
				stage.insert(tile);
			}
		}
		var tile = new Q.GridTile({x:0,y:300});
		stage.insert(tile);

		Q.el.addEventListener("mousemove",function(e) {
			var x = e.offsetX || e.layerX,
			y = e.offsetY || e.layerY;
			var stageX = Q.canvasToStageX(x, stage),
			stageY = Q.canvasToStageY(y, stage);
			var locX = Math.floor(stageX/100);
			var locY = Math.floor(stageY/100);
			Q.playerX = locX*100 + 100/2;
			Q.playerY = locY*100 + 100/2;
		});

		Q.state.set("numberOfEnemies", 0);
		Q.state.set("killedEnemies", 0);

		Q.state.set("selectedPlayerCost", 0);
		Q.state.set("cauldronSelected",false); 
		Q.state.set("playerSelected",false); 
		Q.state.set("magic", 0);
		Q.state.set("enemiesRow0", 0);
		Q.state.set("enemiesRow1", 0);
		Q.state.set("enemiesRow2", 0);
		Q.state.set("enemiesRow3", 0);

		Q.state.set("survival", true);
		Q.state.set("difficulty", 5);
		Q.state.set("endSurvival",false);
		Q.state.set("score",0); 

		Q.stageTMX("level1.tmx",stage);
		stage.insert(new Q.TowerTall({x:40,y:190, scale:1.1}));
		stage.add("viewport");
		stage.insert(new Q.PotionGenerator());

		stage.insert(new Q.SurvivalSpawner({row:0, tStart:25, delay:50}));
		stage.insert(new Q.SurvivalSpawner({row:1, tStart:30, delay:70}));
		stage.insert(new Q.SurvivalSpawner({row:2, tStart:35, delay:90}));
		stage.insert(new Q.SurvivalSpawner({row:3, tStart:40, delay:110}));
	});

Q.Sprite.extend("SurvivalSpawner",{
	init: function(p) {
		this._super(p, {
			time:0,
			start:false,
			enemiesOnBoard:0,
			enemyPosition:[],
			currentDifficulty:0
		});
		this.p.enemyPosition[0] = new Q.ObjectPosition({x:850, y:62});
		this.p.enemyPosition[1] = new Q.ObjectPosition({x:850, y:162});
		this.p.enemyPosition[2] = new Q.ObjectPosition({x:850, y:262});
		this.p.enemyPosition[3] = new Q.ObjectPosition({x:850, y:362});
	},
	step: function(dt){
		this.p.time+=dt;
		if(this.p.currentDifficulty != Q.state.get("difficulty")){
			this.p.currentDifficulty++;
			this.p.delay = this.p.delay - 3;
		}
		if(this.p.time > this.p.tStart && !this.p.start){
			this.p.start=true;
			this.p.time = this.p.delay+1;//para que salga el primero
		}
		if(this.p.start){
			if(this.p.time > this.p.delay){			
				var enemy = this.enemyFactory(Math.floor((Math.random() * 5)));//aumentan los posibles enemigos 
				enemy.p.x = this.p.enemyPosition[this.p.row].getX();
				enemy.p.y = this.p.enemyPosition[this.p.row].getY();
				enemy.p.row = this.p.row;
				enemy.add("defaultEnemy");
				Q.stage().insert(enemy);
				this.p.enemiesOnBoard++;
				Q.state.inc('enemiesRow'.concat(this.p.row), 1);
				this.p.time = 0;
			}
		}
	},
	enemyFactory: function(enemy){
		switch(enemy) {
			case 0:
				return new Q.Orc();
				break;
			case 1:
				return new Q.AxeOrc();
				break;
			case 2:
				return new Q.RedTroll();
				break;
			case 3:
				return new Q.Troll();
				break;
			case 4:
				return new Q.SwordOrc();
				break;
			case 5:
				return new Q.GreyTroll();
				break;
			default:
			return new Q.Orc();
		}
	}
});

/*************************GRIDTILE*************************/

Q.Sprite.extend("GridTile",{
	init: function(p) {
		this._super(p, {
			w:100,
			h:100,
			occupied: false,
			type: Q.SPRITE_UI,
		});
		this.add('animation');
		this.on('touch');
	},
	touch: function(touch) {
		if(Q.state.get('selectedPlayer')) {
			if(!this.p.occupied && Q.state.get('magic') >= Q.state.get('selectedPlayerCost') && Q.playerX > 50 ){
				Q.state.dec('magic', Q.state.get('selectedPlayerCost'));
				var player = new Q.Player({x: Q.playerX, y: Q.playerY, row:(Q.playerY-50)/100, sprite:Q.state.get('selectedPlayer'), sheet:Q.state.get('selectedPlayer'), gridTile:this});
				player.add(Q.state.get('PlayerType'));
				this.stage.insert(player);
				Q.state.set("selectedPlayer", false);
				Q.state.set("cauldronSelected", false);
				this.p.occupied = true;
				Q.state.inc('currentDefenders', 1);
			}
		}
		else if(Q.state.get('cauldronSelected')){
			if(!this.p.occupied && Q.state.get('magic') >= Q.state.get('selectedPlayerCost') && Q.playerX > 50){
				Q.state.dec('magic', Q.state.get('selectedPlayerCost'));
				this.stage.insert(new Q.Cauldron({x: Q.playerX, y: Q.playerY, gridTile:this}));
				Q.state.set("selectedPlayer", false);
				Q.state.set('cauldronSelected',false)
				this.p.occupied = true;
			}
		}
	}
	//step -> mire si hay algun sprite dentro de sus coordenadas y updatee su estado de ocupado
});

/*************************WALL*************************/

Q.Sprite.extend("TowerTall",{
 init: function(p) {
  this._super(p, {
   gravity:0,
   asset:'towertall.png',
   type: Q.SPRITE_NONE
  });
 }
});


/*************************PLAYER*************************/

Q.Sprite.extend("Player",{
	init: function(p) {
		this._super(p, {
			gravity:0,
			scale: 0.16,
			type: Q.SPRITE_PLAYER,
			//cx:180,
			deadTimer:0,
			dead:false,
			attackTimer:0,
			attacking:false
		});
		
		this.add('animation,2d');
		this.play('walk');
	},

	step: function(dt){
		this.die(dt);
		this.attack(dt);
	},

	die: function(dt) {
		if(this.p.dead) {
			this.p.deadTimer++;
			if (this.p.deadTimer > 62) {
				this.p.gridTile.p.occupied = false;
				this.destroy();
			}
			return;
		}
	},
	attack: function(dt){
		if(this.p.attacking) {
			this.p.attackTimer++;
		}
		if (this.p.attackTimer > 62) {
			this.play('walk');
			this.p.attackTimer=0;
			this.p.attacking=false;
		}
	}
});

/********KNIGHTS*********/

Q.component("SilverKnight", {
	added: function(){
		this.entity.p.hp = 100 + 100/4 * parseInt(Q.state.get('shield'));// cada upgrade mejora un 25% la vida
		//this.entity.p.hp = 500;
		this.entity.p.damage = 35;
	}
});

Q.component("BronzeKnight", {
	added: function(){
		this.entity.p.hp = 95 + 95/4 * parseInt(Q.state.get('shield'));
		this.entity.p.damage = 25;
	}
});

Q.component("BlackKnight", {
	added: function(){
		this.entity.p.hp = 170 + 170/4 * parseInt(Q.state.get('shield'));
		this.entity.p.damage = 25;
	}
});

/********WIZARD*********/

Q.component("BasicWizard", {
	added: function(){
		this.entity.p.hp = 70 + 70/4 * parseInt(Q.state.get('shield'));
		this.entity.p.damage = 5;
		this.entity.p.attackTimer=0;
	},
	extend: {
		attack: function(dt){
 			if(Q.state.get('enemiesRow'.concat(this.p.row)) > 0){
				if(this.p.attackTimer == 0){
					this.play("attack");
					this.stage.insert(new Q.MagicBall({asset:'purpleBall.png', x:this.p.x + 50, y:this.p.y-2, damage:10}));
				}
				this.p.attackTimer++;
				if(this.p.attackTimer > 60){
					this.play("walk");
				}
				if(this.p.attackTimer > 120){
					this.p.attackTimer=0;
				}
			}else{
				this.play("walk");
			}
		}

	}
	
});

Q.component("FireWizard", {
	added: function(){
		this.entity.p.hp = 65 + 65/4 * parseInt(Q.state.get('shield'));
		this.entity.p.damage = 5;
		this.entity.p.attackTimer=0;
	},
	extend: {
		attack: function(dt){
 			if(Q.state.get('enemiesRow'.concat(this.p.row)) > 0){
				if(this.p.attackTimer == 0){
					this.play("attack");
					this.stage.insert(new Q.MagicBall({asset:'fireBall.png', x:this.p.x + 50, y:this.p.y-2, damage:20}));
				}
				this.p.attackTimer++;
				if(this.p.attackTimer > 60){
					this.play("walk");
				}
				if(this.p.attackTimer > 120){
					this.p.attackTimer=0;
				}
			}else{
				this.play("walk");
			}
		}
	}
	
});


Q.component("IceWizard", {
	added: function(){
		this.entity.p.hp = 75 + 75/4 * parseInt(Q.state.get('shield'));
		this.entity.p.damage = 5;
		this.entity.p.attackTimer = 0;
	},
	extend: {
		attack: function(dt){
 			if(Q.state.get('enemiesRow'.concat(this.p.row)) > 0){
				if(this.p.attackTimer == 0){
					this.play("attack");
					this.stage.insert(new Q.MagicBall({asset:'iceBall.png', x:this.p.x + 50, y:this.p.y-2, damage:7}));
				}
				this.p.attackTimer++;
				if(this.p.attackTimer > 60){
					this.play("walk");
				}
				if(this.p.attackTimer > 120){
					this.p.attackTimer=0;
				}
			}else{
				this.play("walk");
			}
		}
	}
	
});

Q.Sprite.extend("MagicBall", {
	init: function(p) {
		this._super(p, {
			type: Q.SPRITE_BALL,
			gravity:0,
			scale: 0.2,
			cx:180,
			vx:60
		});
		this.add('2d');
	},
	step: function(dt){
		if(this.x>600){
			this.destroy();
		}
	}
});

/*************************ENEMIES*************************/
Q.component("defaultEnemy", {
	added: function() {
		this.entity.on("bump.left,bump.right,bump.bottom,bump.top", this.entity.hit);
		this.entity.p.frame = 0;
		this.entity.p.gravity = 0;
		this.entity.p.type = Q.SPRITE_ENEMY;
		this.entity.p.dead = false;
		this.entity.p.deadTimer = 0;
		this.entity.p.waitingTimer = 0;
		this.entity.p.attackTimer = 0;
		this.entity.p.attackFlag = false;
		this.entity.p.defender = null;
		this.entity.p.slow = false;
		this.entity.p.slowTimer = 0;
		this.entity.p.oldv_x = this.entity.p.vx;
	},
	extend: {
		hit: function(collision, dt){
			if(collision.obj.p.type==Q.SPRITE_PLAYER){//cauldron and players
				this.p.attackFlag=true;
				this.p.defender = collision.obj;
			}
			else if (collision.obj.isA("MagicBall")){
			  	this.p.hp -= collision.obj.p.damage;
			  	if(collision.obj.p.asset == 'iceBall.png'){
			  		this.p.slow = true;
			  	}
			  	else if(collision.obj.p.asset == 'purpleBall.png'){
			  		 Q.state.inc('magic', 10);	  		 
			  	}
			  	if(this.p.hp <= 0){
			  		this.play('dead');
			  		this.p.dead=true;
			  		this.del('2d');
			  	}
			  	else{
			  		this.play('walk');
					this.p.vx = this.p.oldv_x;
			  	}
				collision.obj.destroy();
			}			
		},
		attack: function(dt){
			if(this.p.attackFlag){
				if(this.p.defender != undefined){
					if(this.p.defender.p.hp > 0 && this.p.hp > 0){
						this.play("attack");
						if(this.p.defender.isA("Player")) {
							this.p.defender.play("attack");
						}
						this.p.attackTimer++;
						if(this.p.attackTimer > 65 && !this.p.defender.p.dead){
							this.p.hp = this.p.hp - this.p.defender.p.damage;
							this.p.defender.p.hp = this.p.defender.p.hp - this.p.damage;
							this.p.attackTimer=0;
						}
					}
					if(this.p.hp <= 0){
						this.p.attackFlag=false;
						this.p.dead = true;
						this.play('dead');
						this.p.deadTimer = 0;
						this.del('2d');
						if(this.p.defender.p.hp>0){	
							this.p.defender.play('walk');
						}

					}
					if(this.p.defender.p.hp<=0 && !this.p.defender.p.dead){
						this.p.attackTimer=0;
						this.p.defender.p.dead = true;
						this.p.defender.del('2d');
						if(!this.p.defender.isA("Cauldron")) {
							this.p.defender.play('dead');
						}
					}
					if(this.p.defender.p.dead && this.p.hp>0){
						this.p.waitingTimer++;
						if(this.p.waitingTimer > 62){
							if(this.p.defender.isA("Cauldron")) {
								this.p.defender.p.gridTile.p.occupied = false; //liberamos el gridtile que ocupa
								this.p.defender.destroy();
							}
							this.p.defender = null;
							this.p.waitingTimer=0;
						}	
					}
				}
				else{
					this.p.attackFlag=false;
					this.play('walk');
					this.p.vx = this.p.oldv_x;
				}
					
			}
			
		},	
		die: function(dt){
			if(this.p.dead) {
				this.p.deadTimer++;
			}
			if (this.p.deadTimer > 60) {
				Q.state.dec('enemiesRow'.concat(this.p.row), 1);
				this.destroy();
				Q.state.inc('killedEnemies', 1);

				if(Q.state.get('survival')){
					if(Q.state.get('difficulty') < 5){	
						if(Q.state.get('killedEnemies') >  6 + 6* Q.state.get('difficulty')){
							Q.state.inc('difficulty', 1);
						}
					}
					Q.state.inc('score', 10 + Q.state.get('difficulty'));
				}
				else if(Q.state.get('killedEnemies')==Q.state.get('numberOfEnemies')){
					Q.clearStages();

					Q.state.inc('starsAchieved', 1);

					if(Q.state.get('currentPotions') >= Q.state.get('targetPotions')){
						Q.state.inc('starsAchieved', 1);
					}
					if(Q.state.get('currentDefenders') <= Q.state.get('maxDefenders')){
						Q.state.inc('starsAchieved', 1);
					}

					Q.stageScene("levelCleared",1); 
				}
			}
		},
		slow: function(dt){
			if(this.p.slow){
				this.p.slowTimer++;
				this.p.x -= this.p.vx/2 * dt;
				if(this.p.slowTimer >= 120){
					this.p.slow = false;
					this.p.slowTimer = 0;
				}
			}
		},
		step: function(dt){
			if(this.p.x<120){

				Q.clearStages();
				if(Q.state.get('survival')){
					//Q.state.get("endSurvival", true);
					Q.stageScene("levelFailed",1);
					//cambiar por algo con la score
				}
				else{
					Q.stageScene("levelFailed",1);
				}
			}else{
				this.slow(dt);
				this.attack(dt);
				this.die(dt);
			}

		}
	}
});


Q.Sprite.extend("Orc",{
	init: function(p) {
		this._super(p, {
			sprite: "orc1_anim",	
			sheet: "orc1_anim",
			scale: 0.2,
			cx:-120,
			vx: -45 + 45/8 * parseInt(Q.state.get('slowerEnemies')),
			hp: 70,
			damage: 30,
			that:this
		});
		
		this.add('2d, animation');
		this.play('walk');
	}
});

Q.Sprite.extend("SwordOrc",{
	init: function(p) {
		this._super(p, {
			sprite: "orc2_anim",	
			sheet: "orc2_anim",
			scale: 0.17,
			cx:-120,
			vx: -30 + 30/8 * parseInt(Q.state.get('slowerEnemies')),
			hp: 80,
			damage: 45,
			that:this
		});
		
		this.add('2d, animation');
		this.play('walk');
	}

});

Q.Sprite.extend("AxeOrc",{
	init: function(p) {
		this._super(p, {
			sprite: "orc3_anim",	
			sheet: "orc3_anim",
			scale: 0.17,
			cx:-120,
			vx: -30 + 30/8 * parseInt(Q.state.get('slowerEnemies')),
			hp: 70,
			damage: 40,
			that:this
		});
		
		this.add('2d, animation');
		this.play('walk');
	}

});


Q.Sprite.extend("Troll",{
	init: function(p) {
		this._super(p, {
			sprite: "troll1_anim",	
			sheet: "troll1_anim",
			scale: 0.2,
			cx:-120,
			vx: -15 + 15/8 * parseInt(Q.state.get('slowerEnemies')),
			hp: 150,
			damage: 50,
			that:this
		});
		
		this.add('2d, animation');
		this.play('walk');
	}
});

Q.Sprite.extend("GreyTroll",{
	init: function(p) {
		this._super(p, {
			sprite: "troll2_anim",	
			sheet: "troll2_anim",
			scale: 0.2,
			cx:-120,
			vx: -10 + 10/8 * parseInt(Q.state.get('slowerEnemies')),
			hp: 160,
			damage: 60,
			that:this
		});
		
		this.add('2d, animation');
		this.play('walk');
	}
});


Q.Sprite.extend("RedTroll",{
	init: function(p) {
		this._super(p, {
			sprite: "troll3_anim",	
			sheet: "troll3_anim",
			scale: 0.2,
			cx:-120,
			vx: -20 + 20/8 * parseInt(Q.state.get('slowerEnemies')),
			hp: 200,
			damage: 25,
			that:this
		});
		
		this.add('2d, animation');
		this.play('walk');
	}
});

//Receives stage, row, nEnemies, tStart, delay, enemyP, v_x
Q.Sprite.extend("EnemySpawner",{
	init: function(p) {
		this._super(p, {
			time:0,
			start:false,
			enemiesOnBoard:0,
			enemyPosition:[]
		});
		this.p.enemyPosition[0] = new Q.ObjectPosition({x:850, y:62});
		this.p.enemyPosition[1] = new Q.ObjectPosition({x:850, y:162});
		this.p.enemyPosition[2] = new Q.ObjectPosition({x:850, y:262});
		this.p.enemyPosition[3] = new Q.ObjectPosition({x:850, y:362});
	},
	step: function(dt){
		this.p.time+=dt;
		if(this.p.time > this.p.tStart && !this.p.start){
			this.p.start=true;
			this.p.time = this.p.delay+1;//para que salga el primero
		}
		if(this.p.start){
			if(this.p.time > this.p.delay){
				if(this.p.enemiesOnBoard < this.p.nEnemies){
					var enemy = this.enemyFactory(this.p.enemyP);
					enemy.p.x = this.p.enemyPosition[this.p.row].getX();
					enemy.p.y = this.p.enemyPosition[this.p.row].getY();
					enemy.p.row = this.p.row;
					//enemy.p.vx = this.p.v_x;
					enemy.add("defaultEnemy");
					Q.stage().insert(enemy);
					this.p.enemiesOnBoard++;
					Q.state.inc('enemiesRow'.concat(this.p.row), 1);
				}
				this.p.time = 0;
			}
		}
	},
	enemyFactory: function(enemy){
		switch(enemy) {
			case "Orc":
				return new Q.Orc();
				break;
			case "SwordOrc":
				return new Q.SwordOrc();
				break;
			case "AxeOrc":
				return new Q.AxeOrc();
				break;
			case "Troll":
				return new Q.Troll();
				break;
			case "GreyTroll":
				return new Q.GreyTroll();
				break;
			case "RedTroll":
				return new Q.RedTroll();
				break;
			default:
			return new Q.Orc();
		}
	}
});

Q.Sprite.extend("ObjectPosition",{
	init: function(p) {
		this._super(p, {
		});
	},
	getX: function(){
		return this.p.x;
	},
	getY: function(){
		return this.p.y;
	}
});

/*************************POTION&CAULDRON*************************/
Q.Sprite.extend("PotionGenerator",{
	init: function(p) {
		this._super(p, {
			frequency:6 - 6/8 * parseInt(Q.state.get('potionRate')),
			currentTime:0,
			modifyX:false,
		});
	},
	step: function(dt) {
		this.p.currentTime -= dt;
		if(this.p.currentTime <= 0) {
			if(this.p.modifyX){
				Q.stage().insert(new Q.Potion({x:this.p.px, y:this.p.py}));
			}
			else{
				Q.stage().insert(new Q.Potion());
			}
			this.p.currentTime = this.p.frequency;
		}
	},    
});


Q.Sprite.extend("Potion",{
	init: function(p) {
		this._super(p, {
			type: Q.SPRITE_UI,
			asset: 'magic.png',
			x:Math.floor(Math.random() * 730) + 50,
			y: 440,
			gravity:0,
			vx: 0,
			vy:0,
			expiryTime:4,
			scale: 0.7,
	        //z:100
	    });
		this.on('touch');
	},
	step: function(dt) {
		this.p.expiryTime -= dt;
		if(this.p.expiryTime <= 0) {
			this.destroy();
		}
	},    
	touch: function(touch) {
	 	Q.state.inc('currentPotions', 1);
		Q.state.inc('magic', 25);  
	      //Q.audio.play('');
	      this.destroy();
	  }
	});

Q.Sprite.extend("Cauldron",{
	init: function(p) {
		this._super(p, {
			gravity:0,
			scale: 0.6,
			asset:'cauldron.png',
			type: Q.SPRITE_PLAYER,
			hasGenerated:false,
			hp:60,
			damage:0,
			dead:false
		});
		this.add('2d');
	},
	step: function(dt){
		if(!this.p.hasGenerated){
				this.stage.insert(new Q.PotionGenerator({frequency:10}));
				this.p.hasGenerated = true;
			}
		}
	});

};