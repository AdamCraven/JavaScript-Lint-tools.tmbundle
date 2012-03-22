/*jshint*/
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
    var jslintPath = "../lib/fulljslint.js";
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
    
    function runLint() {
        
        function lintFile(err, fileContents) {
            if (err) { return utils.puts(err); }

            var lint;

            if(lintVersion === "jshint") {
                lint = require(jshintPath).JSHINT;
            } else {
                lint = require(jslintPath).JSLINT;
            }

            lint(fileContents);

            return showOuput(lint);
        }
        
        fs.readFile(filePath, 'utf8', lintFile); // Opens file
    }
    
    
    function getLintVersion() {
        
        function checkFirstLine(chunk) {  
            // Matches '/*jslint' or '/*jshint' on firstline
            var firstLine = chunk.match(/^\/\*(js(l|h)int)/);

            if (firstLine && typeof firstLine[1] !== "undefined") {
                lintVersion = firstLine[1];  
                process.stdin.pause();
                
                return runLint();
            } else {
                return process.exit(1);
            }  
        }
        
        process.stdin.resume();
        process.stdin.setEncoding('utf8');
        process.stdin.on('data', checkFirstLine);
    }
    
    if (lintVersion) {
        runLint();
    } else {
        getLintVersion();
    }

}());
