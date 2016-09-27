/*
подключение к БД MySQL
*/

var tple = new require('./azbn-tple')({
		part_path : './',
	}),
	fs = require('fs')
;

var data = {
	recipient : 'devazbn@yandex.ru',
	html : 'текст!',
	item_id : '16516846',
};

tple.parseFile('tpl.html', data, function(_err, res_str) {
	
	if(_err) {
		
		console.log('Error: ' + _err);
		
	} else {
		
		console.log(res_str);
		
	}
	
});