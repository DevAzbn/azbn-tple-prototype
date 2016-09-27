/*
подключение к БД MySQL
*/

var tple = new require('./../azbn-tple')({
		part_path : './',
		cache : {
			tpls : [
				'tpl.html',
			],
		},
	})
;

var data = {
	recipient : 'devazbn@yandex.ru',
	html : 'текст!1!!!!!!!!!!11!11',
	item_id : 16516846,
	test : {
		left : 'left',
		right : 'right',
	}
};
//console.log(tple.cache['tpl.html']);

setTimeout(function(){
	tple.parseFile('tpl.html', data, function(_err, res_str) {
		
		if(_err) {
			
			console.log('Error: ' + _err);
			
		} else {
			
			console.log(res_str);
			
		}
		
	});
},5000);