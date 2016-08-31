/*
 * grunt-include-file
 * https://github.com/Sjeiti/grunt-include-file
 *
 * Copyright (c) 2014 Ron Valstar
 * Licensed under the MIT license.
 * @version: 0.1.1
 */
'use strict';
module.exports = function (grunt) {
	grunt.registerMultiTask('include_file','Include files.',function () {
		var fs = require('fs')
			,sCwd = this.data.cwd||''
			,sDest = this.data.dest
			,iNumFiles = 0
			//
			,rxMatchCommentJsG		= /\/\*!?\s?include(\s\-\w+)?\s+[^\s]*\s?\*\//g
			,rxMatchCommentJs		= /(\/\*!?\s?include(\s\-\w+)?\s+)([^\s]*)\s?\*\//
			,rxMatchCommentHtmlG	= /(<!--\s?include(\s\-\w+)?\s+)([^\s]*)\s?-->/g
			,rxMatchCommentHtml		= /(<!--\s?include(\s\-\w+)?\s+)([^\s]*)\s?-->/
		;
		this.data.src.forEach(function(src){
			grunt.log.writeln(' ',sCwd+src); // log
			grunt.file.write(sDest+src,includeInto(sCwd+src));
		});
		function includeInto(file,depth){
			if (depth===undefined) depth = 0;
			else depth++;
			var sFileContents = fs.readFileSync(file).toString()
				,aMatch = (sFileContents.match(rxMatchCommentJsG)||[]).concat(sFileContents.match(rxMatchCommentHtmlG)||[])
			;
			if (aMatch) {
				aMatch.forEach(function(include){
					var aFile = (include.match(rxMatchCommentJs)||[]).concat(include.match(rxMatchCommentHtml)||[])
						,sFile = aFile[aFile.length-1]
						,aSplit = file.split('/')
						,sPath
						,bEsc = include.indexOf(' -e ')!==-1
						,bBase64 = include.indexOf(' -b ')!==-1
						,bMaintainStrict = include.indexOf(' -ms ')!==-1
						,bFileExists
					;
					aSplit.pop();
					sPath = aSplit.join('/')+'/';
					bFileExists = fs.existsSync(sPath+sFile);
					if (bFileExists) {
						iNumFiles++;
						grunt.log.writeln(' ',new Array(depth+1).join(' │'),'└',sPath+sFile);
						if (bEsc) {
							sFileContents = sFileContents.replace(include,encodeURIComponent(includeInto(sPath+sFile,depth)).replace(/'/gi,'\\\'').replace(/"/gi,'\\\"'));
						} else if (bBase64) {
							sFileContents = sFileContents.replace(include,'background-image:url(data:image/png;base64,'+fs.readFileSync(sPath+sFile).toString('base64')+');');
						} else if (bMaintainStrict) {
							sFileContents = sFileContents.replace(include,includeInto(sPath+sFile,depth));
						} else {
							sFileContents = sFileContents.replace(include,includeInto(sPath+sFile,depth).replace('\'use strict\';',''));
						}
					} else {
						grunt.log.error(new Array(depth+1).join(' │'),'└',sPath+sFile,' - file not found');
						grunt.warn('');
						return;
					}
				});
			}
			return sFileContents;
		}
		grunt.log.writeln(iNumFiles+' files processed.');
	});
};
// todo: write tests
// todo: write documentation
/* include -e asdf/qwer.js */
/*
-e escape quotes
-u encodeURIComponent
-b base64 encoding
-ms maintain use strict

config
cwd .
regex /\/\*\s?include(\s\-\w)?\s+.*\s?\*\//

data:image/jpeg;base64,
data:image/png;base64,
data:image/gif;base64,
*/