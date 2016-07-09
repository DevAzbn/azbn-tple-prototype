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

/*
fs.readFile('./tpl.html', 'utf8', function(err, text) {
	
	if(err) {
		
		console.log('Error: ' + err);
		
	} else {
		
		if(text && text != '') {
			
			//var _text = text.replace(new RegExp('({{html}})', 'ig'), item.html);
			//_text = _text.replace(new RegExp('({{recipient}})', 'ig'), item.email);
			//_text = _text.replace(new RegExp('({{item_id}})', 'ig'), item.id);
			
			//console.log(tple.parseStr);
			
			
			tple.parseStr(text, data, function(_err, res_str) {
				
				if(_err) {
					
					console.log('Error: ' + _err);
					
				} else {
					
					console.log(res_str);
					
				}
				
			});
			
		}
	}
});
*/

tple.parseFile('tpl.html', data, function(_err, res_str) {
	
	if(_err) {
		
		console.log('Error: ' + _err);
		
	} else {
		
		console.log(res_str);
		
	}
	
});