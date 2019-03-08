import { Emitter, EmitOptions } from '@fluffy-spoon/csharp-to-typescript-generator';

var through = require('through2');
var PluginError = require('plugin-error');

var PLUGIN_NAME = '@fluffy-spoon/csharp-to-typescript-generator.gulp';

module.exports = function(options?: EmitOptions, extension?: "d.ts"|"ts") {
    if(!options)
        options = {};
    
    if(!extension)
	    extension = "d.ts";

	var stream = through.obj(function(file, enc, cb) {
		if (file.isStream()) {
			this.emit('error', new PluginError(PLUGIN_NAME, "Streams not supported yet!"));
			return cb();
		}

		if (file.isBuffer()) {
			if (file.contents) {
				console.log("Generating TypeScript for C# file " + file.path);
				
				var csharpCode = file.contents.toString();

                		var emitter = new Emitter(csharpCode);
                		var typescriptCode = emitter.emit(options);
				file.contents = new Buffer(typescriptCode);

				file.path = file.path.substring(0, file.path.length - 2) + extension;
			}
		}

		this.push(file);

		cb();
	});

	return stream;
};
