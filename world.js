var WORLD_BLOCK_STANDART = 1;
var Map = {levels:[]};
var World = function (BlockSize) {
	this.BlockSize = BlockSize || {width: 10, height: 10};
	this.Size = {width: 0, height: 0};
	this.level = {Number:0, Map: [], Name:'None'}
	return this;
}
World.prototype.setLevel = function(n) {
	if (Map.levels.length > n) {
		this.level.Number = n;
		this.level.Map    = Map.levels[n].Map;
		this.level.Name   = Map.levels[n].Name;
	} else {
		throw "There is no level #" + n;
	}
	return this;
}