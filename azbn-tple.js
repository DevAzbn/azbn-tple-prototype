/*

*/
var fs = require('fs');

var param = {
	
};

var pb = {
	
};

pb.regexp = {
	base : new RegExp(/\[\[azbntple+\s+tpl="([^"=]+)"+([^\]]+)+\]\]/ig),
	by_param : new RegExp(/([^"=\s]+="[^"]+")/ig),
	by_value : new RegExp(/([^"]+)([^"=]+)/ig),//new RegExp(/([^"=\s]+)([^"=]+)/ig),
};

pb.getFileName = function(file) {
	return param.part_path + file;
};
	
pb.getFromCode = function(_code, prm) {
	var code = {
		html : '',
		less : [],
		js : [],
	};
	
	/*
	prm.map(function(v, k, arr){
		_code = _code.replace(new RegExp("{{" + k + "}}", "ig"), v);
		return el;
	});
	*/
	
	code.html = _code.replace(pb.regexp.base, pb.basereplacer);
	
	for(var k in prm) {
		
		var v = prm[k];
		
		code.html = code.html.replace(new RegExp("{{" + k + "}}", "ig"), v);
		
	}
	
	return code;
};
	
pb.getSnippetCode = function(file, prm_str) {
	var code = {
		html : '',
		less : [],
		js : [],
	};
	
	prm_str = prm_str || '';
	
	if(fs.existsSync(pb.getFileName(file))) {
		
		var file_handle = fs.openSync(pb.getFileName(file), 'r', 0644);
		code.html = fs.readSync(file_handle, 104857600, null, 'utf8')[0];
		fs.close(file_handle);
		
		code.html = code.html.replace(pb.regexp.base, pb.basereplacer);
		
	}
	
	return code;
};
	
pb.basereplacer = function(str, p1, p2, offset, s) {
	var code = pb.getSnippetCode((p1));
	var prm_str = p2.match(pb.regexp.by_param);
	
	for(var i in prm_str) {
		
		var s = prm_str[i];
		var prm = s.match(pb.regexp.by_value);
		
		if(typeof prm[1] == 'undefined') {
			code.html = code.html.replace(new RegExp("{{" + prm[0] + "}}", "ig"), ' ');
		} else {
			code.html = code.html.replace(new RegExp("{{" + prm[0] + "}}", "ig"), prm[1]);
		}
		
	}
	
	return code.html;
};

module.exports = function(_param) {
	
	var ctrl = this;
	
	ctrl.name = 'AzbnTplEngine';
	
	var log_name = ctrl.name;
	
	param = _param;
	
	ctrl.cache = {};
	if(param.cache.tpls.length) {
		for(var i = 0; i < param.cache.tpls.length; i++) {
			
			var _f = param.cache.tpls[i];
			
			fs.readFile(param.part_path + _f, 'utf8', function(err, text) {
				
				if(err) {
					
					console.log('Error: ' + err);
					
				} else {
					
					if(text && text != '') {
						
						ctrl.cache[_f] = text;
						
					}
				}
			});
			
		}
	};
	
	ctrl.parseStr = function(str, data, cb) {
		
		var err = null;
		var res_str = '';
		
		var _res = pb.getFromCode(str, data);
		res_str = _res.html;
		
		cb(err, res_str);
		
	};
	
	ctrl.parseFile = function(file, data, cb) {
		
		if(ctrl.cache[file]) {
			
			ctrl.parseStr(ctrl.cache[file], data, function(_err, res_str) {
				
				cb(_err, res_str);
				
				//console.log(file);
				
			});
			
		} else {
			
			fs.readFile(param.part_path + file, 'utf8', function(err, text) {
				
				if(err) {
					
					console.log('Error: ' + err);
					
				} else {
					
					if(text && text != '') {
						
						ctrl.parseStr(text, data, function(_err, res_str) {
							
							cb(_err, res_str);
							
						});
						
					}
				}
			});
			
		}
		
	};
	
	return ctrl;
}