import { Emitter, EmitOptions } from '@fluffy-spoon/javascript.csharp-to-typescript-generator';

var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

var PLUGIN_NAME = '@fluffy-spoon/javascript.csharp-to-typescript-generator.gulp';

module.exports = function(options?: EmitOptions) {
    if(!options)
        options = {};

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

                		var suffix = "d.ts";
				file.path = file.path.substring(0, file.path.length - 2) + suffix;
			}
		}

		this.push(file);

		cb();
	});

	return stream;
};
