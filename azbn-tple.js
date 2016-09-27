/*

*/
var fs = require('fs');
var util = require('util');

module.exports = function(_param) {
	
	var ctrl = this;
	
	ctrl.name = 'AzbnTplEngine';
	
	var log_name = ctrl.name;
	
	var builder = new require('./azbn-tple-builder')(_param);
	
	ctrl.restructObj = function(obj, prefix) {
		
		var _obj = {};
		
		for(var _key in obj) {
			
			var _prefix;
			
			if(prefix == null || typeof prefix == 'undefined') {
				_prefix = _key;
			} else {
				_prefix = [prefix,_key].join('.');
			}
			
			if(typeof obj[_key] != 'Object') {
				_obj[_prefix] = obj[_key];
			} else {
				ctrl.restructObj(obj[_key], _prefix);
				//util.inherits(_obj, ctrl.restructObj(_prefix, obj[_key]));
			}
			
		}
		
		return _obj;
		
	}
	
	ctrl.cache = {};
	
	if(_param.cache.tpls.length) {
		for(var i = 0; i < _param.cache.tpls.length; i++) {
			
			var _f = _param.cache.tpls[i];
			
			fs.readFile(_param.part_path + _f, 'utf8', function(err, text) {
				
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
		
		var _data = ctrl.restructObj(data, null);
		
		console.log(_data);process.exit(0);
		
		var _res = builder.getFromCode(str, _data);
		res_str = _res.html;
		
		cb(err, res_str);
		
	};
	
	ctrl.parseFile = function(file, data, cb) {
		
		if(ctrl.cache[file]) {
			
			ctrl.parseStr(ctrl.cache[file], data, function(_err, res_str) {
				
				cb(_err, res_str);
				
			});
			
		} else {
			
			fs.readFile(_param.part_path + file, 'utf8', function(err, text) {
				
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