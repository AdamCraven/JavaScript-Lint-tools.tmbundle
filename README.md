# JavaScript-Lint-tools.tmbundle - Fast Node linting for textmate

Supports [jshint][jshint] and [jslint][jslint]

## Philosophy
Easy configuration, fast (multi-thousand line files in less than 100ms) and lint on every save.

## Requirements
* **[node.js] [nodejs]** Version 0.4.1 or higher. May work with previous versions.

## Installation

1. Download compressed file from this page.
2. Uncompress file and rename folder from  'AdmCrvn-JavaScript-Lint-tools.tmbundle-xxxxxxx' to 'JavaScript-Lint-tools.tmbundle'.
3. Double click to install.

Or with git via the command line.

	cd ~/Library/Application\ Support/TextMate/Bundles/
	git clone https://github.com/AdmCrvn/JavaScript-Lint-tools.tmbundle JavaScript-Lint-tools.tmbundle
	osascript -e 'tell app "TextMate" to reload bundles'

## Usage
To lint a file you **must** add to the **firstline** /\*jslint\*/ or /\*jshint*/, depending on which lint you wish to use.

An example of a reasonable and basic setup would be;

	/*jslint evil: false, bitwise:false, strict: false, undef: true, white: false, browser:true, plusplus:false */
	/*global $:true, window: true */
	
Once setup, it's a matter of pressing;

	cmd + s 
for the results to be shown in a tooltip.

### Validate with jslint or jshint

To run either, without saving, press;

	ctrl + shift + v 
And select from the menu which lint you wish to run.

## Troubleshooting
If you get an error similar to on running;

	/bin/bash/: node: command not found

Check that node is installed properly by accessing it from the command line. If that works, it means textmate can't find node. It has trouble using the $PATH defined in .bash_profile.

To get around this you can create a symlink to node;

	ln -s /path/to/your/node /usr/bin
	
Or create a shell variable in the advanced textmate options;

	TM_NODE	/path/to/your/node

If nothing is happening when saving, check you've put the /\*jshint\*/ line at the firstline (with no spaces) and JavaScript is selected as the language in textmate.

[jslint]: http://www.jslint.com/
[jshint]: http://jshint.org/
[nodejs]: http://nodejs.org
[nodejsInstall]: https://github.com/joyent/node/wiki/Installation