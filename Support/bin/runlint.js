/*jslint*/
(function () {
    /**
     * Lints a JavaScript file
     *
     * @params  {string}    process.argv[2]     filePath of file to lint
     * @params  {string}    [process.argv[3]]   version of lint to use (jshint|jslint), if none specified will use version specified in file.
     * 
     * @example Called from textmate with command; 
     *      'node path/to/this/file/runjslint.js file/to/dolint.js [lintversion]'
     */
    var fs = require('fs');
    var utils = require('util');
    var filePath = process.argv[2];
    var lintVersion = process.argv[3] || null;
    var jslintPath = "../lib/fulljslint-2010-12-14.js";
    var jshintPath = "../lib/jshint.js";
    
    function showOuput(lintResults) {
        if (lintResults.errors.length) {
            var lintErrs = lintResults.errors;
            
            for (var i = 0, len = lintErrs.length; i < len; i++) {
                if (lintErrs[i]) {
                    utils.puts('Line ' + lintErrs[i].line + ' col ' + lintErrs[i].character + ': ' + lintErrs[i].reason);
                }
            }
            
            return;
        }
        
        return utils.puts('ok');
    }
                
    function lintFile(err, fileContents) {
        if (err) {
            return utils.puts(err);
        }
        
        var lint;
        
        if(lintVersion === "jshint") {
            lint = require(jshintPath).JSHINT;
        } else {
            lint = require(jslintPath).JSLINT;
        }
        
        lint(fileContents);
        
        return showOuput(lint);
    }
    
    function onData(chunk) {  
        var firstLine = chunk.match(/^\/\*(js(l|h)int)/); // Matches '/*jslint' or '/*jshint' on firstline

        if (firstLine && typeof firstLine[1] !== "undefined") {
            lintVersion = firstLine[1];  
            process.stdin.pause();    
        } else {
            process.exit(1); // No matches, don't lint the file
        }
    }
    
    function runLint() {
        if (!lintVersion) {
            // If no version was specified check the firstline of the file
            process.stdin.resume();
            process.stdin.setEncoding('utf8');
            process.stdin.on('data', onData);
        }
    
        fs.readFile(filePath, 'utf8', lintFile); // Opens file
    }
    
    runLint();

}());
