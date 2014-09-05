var WORLD_BLOCK_STANDART = { code: 1, color: 0x000000};
var Map = {levels:[]};
var World = function (BlockSize) {
	this.BlockSize = BlockSize || {width: 10, height: 10};
	this.Size      = {width: 0, height: 0};
	this.Level     = {Number:0, Map: [], Name:'None', Rects: []}
	this.Speed     = 1;
	this.Filters   = [];
	this.Offset    = 0;

	return this;
}
World.prototype.setLevel = function(n) {
	if (Map.levels.length > n) {
		this.Level.Number = n;
		this.Level.Map    = Map.levels[n].Map;
		this.Level.Name   = Map.levels[n].Name;
		this.Size.width = this.Level.Map[0].length;
		this.Size.height = this.Level.Map.length;
	} else {
		throw "There is no level #" + n;
	}
	return this;
}

World.prototype.Move = function (stage) {
	this.Offset += this.Speed;
	for (var i = 0; i < this.Level.Rects.length; i++) {
		this.Level.Rects[i].position.x -= this.Speed;

	}
	// Останавливаемся при достижении конца
	if (this.Offset > this.Size.width) {
		this.Speed = 0;
	}
	return this;
}

World.prototype.generateRects = function (stage) {
	this.Level.Rects = [];
	for (var y = 0; y < this.Level.Map.length; y++) {
		for (var x = 0; x < this.Level.Map[y].length; x++) {
			// Обычные блоки
			if (this.Level.Map[y][x] == WORLD_BLOCK_STANDART.code)  {
				var block = new PIXI.Graphics();
				block.beginFill(WORLD_BLOCK_STANDART.color, 1);
				block.drawRect(x * this.BlockSize.width, y * this.BlockSize.height, this.BlockSize.width, this.BlockSize.height);
				this.Level.Rects.push(block);
				stage.addChild(block);
			}

		}
	}
	return this;
}

World.prototype.Draw = function (stage) {
	
}