

var PNG = require('png-js');
var fs = require("fs");

function classificate (x) {

// Standart block
	if (x[0] == 0 && x[1] == 0 && x[2] == 0) {
		return 1;
	}

// VOID	
	else {
		return 0;
	}
}


function getFiles(dir,files_){
    files_ = files_ || [];
    if (typeof files_ === 'undefined') files_=[];
    var files = fs.readdirSync(dir);
    for(var i in files){
        if (!files.hasOwnProperty(i)) continue;
        var name = dir+'/'+files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name,files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}
var files = getFiles('images');
var images = [];
var imgReady = 0;
for (var i = 0; i < files.length; i++) {
	if (files[i].indexOf('.png') != -1)
		images.push(files[i]);
}
if (images.length == 0) {
	console.warn('No images found! Expext .png images in /images/ directory.');
} else {
	fs.writeFile("codes/levels.js", '');
		var fStream = fs.createWriteStream("codes/levels.js", {
			flags: "a",
			encoding: "utf-8"
		});
	var levels = {};
	console.log('Found images: ', images);
	for (var i = 0; i < images.length; i ++){
		console.log('decoding "' + images[i] + '"');
		var myimage = new PNG.load(images[i]);
		var w = myimage.width;
		var h = myimage.height;
		levels[images[i].split('/')[1]] = "none";

		function decode(img, i) {
		img.decode(function(i) { return function(pixels) {
			var lvl = [];
			for (var y = 0; y < h; y++) {
				var str = [];
				for (var x = 0; x < w; x++) {
					var idx = (w * y + x) << 2;
					var pix = [];
					pix.push(pixels[idx]);
					pix.push(pixels[idx+1]);
					pix.push(pixels[idx+2]);
					str.push(classificate(pix));
				}
				lvl.push(str);
			}

			var lvlStr = JSON.stringify(lvl).replace(/],/g, "],\n");
			fStream.write("Map.levels.push({Name: '" + images[i].split('.png')[0] + "', Map:" + lvlStr + "});\n");
			console.log("Level '" + images[i] + "' writed");
			
		}}(i));
	}
	decode(myimage, i);
	}

	

}