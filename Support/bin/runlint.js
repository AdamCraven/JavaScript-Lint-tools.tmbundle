/*jslint*/
(function() {
    /**
     * Lints the javascript file
     *
     * @params  {string}    process.argv[2]     filePath file to lint
     * @params  {string}    [process.argv[3]]   version of lint to use, if none specified will use version specified in file.
     * 
     * e.g. 'node path/to/this/file/runjslint.js file/to/lint.js [lintversion]'
     */
    
    var fs = require('fs'),
        utils = require('util'),
        filePath = process.argv[2],
        lintVersion = process.argv[3] || null,
        firstLine;

    if(!lintVersion) {
        // If no version was specified check the firstline of the file passed
        process.stdin.resume();
        process.stdin.setEncoding('utf8');
        process.stdin.on('data', function(chunk){
            
            firstLine = chunk.match(/^\/\*(js(l|h)int)/); // Matches '/*jslint' or '/*jshint' on firstline

            if(firstLine && typeof firstLine[1] !== "undefined") {
                lintVersion = firstLine[1];  
                process.stdin.pause();    
            } else {
                process.exit(1); // No matches, don't lint the file
            }
        });
    }

                
    function lintFile(err, fileContents) {
        if(err) {return utils.puts(err);}
        
        var result, lint, lintErrs, i;
            
        if(lintVersion === "jshint") {
            lint = require("../lib/jshint_export.js").JSHINT;
        } else {
            lint = require("../lib/jsllint_export.js").JSLINT;
        }

        lint(fileContents);

        if(lint.errors.length) {
            lintErrs = lint.errors;
            for (i=0, len = lintErrs.length; i < len; i++) {
                if(lintErrs[i]) {
                    utils.puts('Line ' + lintErrs[i].line + ' col ' + lintErrs[i].character + ': ' + lintErrs[i].reason);
                }
            }
            return;
        }
        
        return utils.puts('ok');
    }
    
    fs.readFile(filePath, 'utf8', lintFile); // Opens file

}());
