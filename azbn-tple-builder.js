/*

*/
var fs = require('fs');

var builder = function(param) {
	
	var ctrl = this;
	
	ctrl.regexp = {
		base : new RegExp(/\[\[azbntple+\s+tpl="([^"=]+)"+([^\]]+)+\]\]/ig),
		by_param : new RegExp(/([^"=\s]+="[^"]+")/ig),
		by_value : new RegExp(/([^"]+)([^"=]+)/ig),
	};
	
	ctrl.getFileName = function(file) {
		return param.part_path + file;
	};
	
	ctrl.getFromCode = function(_code, prm) {
		var code = {
			html : '',
		};
		
		code.html = _code.replace(ctrl.regexp.base, ctrl.basereplacer);
		
		for(var k in prm) {
			
			var v = prm[k];
			
			code.html = code.html.replace(new RegExp("{{" + k + "}}", "ig"), v);
			
		}
		
		return code;
	};
	
	ctrl.getSnippetCode = function(file, prm_str) {
		var code = {
			html : '',
		};
		
		prm_str = prm_str || '';
		
		if(fs.existsSync(ctrl.getFileName(file))) {
			
			code.html = fs.readFileSync(ctrl.getFileName(file), {
				encoding : 'utf8',
			});
			
			code.html = code.html.replace(ctrl.regexp.base, ctrl.basereplacer);
			
		}
		
		return code;
	};
		
	ctrl.basereplacer = function(str, p1, p2, offset, s) {
		var code = ctrl.getSnippetCode((p1));
		var prm_str = p2.match(ctrl.regexp.by_param);
		
		for(var i in prm_str) {
			
			var s = prm_str[i];
			var prm = s.match(ctrl.regexp.by_value);
			
			if(typeof prm[1] == 'undefined') {
				code.html = code.html.replace(new RegExp("{{" + prm[0] + "}}", "ig"), ' ');
			} else {
				code.html = code.html.replace(new RegExp("{{" + prm[0] + "}}", "ig"), prm[1]);
			}
			
		}
		
		return code.html;
	};
	
	return ctrl;
}

module.exports = builder;