//var PSD = require('../../coffee/psd.coffee');
var PSD = require('../psd');
var psd = PSD.fromFile('./mobile_demo.psd');
psd.parse();


console.log(psd.tree().export().children[1].children[0].text.font);
//console.log(psd.tree().export());
//console.log(psd.tree().childrenAtPath('A/B/C')[0].export());

// You can also use promises syntax for opening and parsing
/*PSD.open('./mobile_demo.psd').then(function (psd) {
	//return psd.image.saveAsPng('./output.png');
	console.log(psd);
}).then(function () {
	console.log('Finished!');
});*/