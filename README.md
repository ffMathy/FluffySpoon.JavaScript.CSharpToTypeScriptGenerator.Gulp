# Installing
```shell
npm install --save-dev @fluffy-spoon/csharp-to-typescript-generator.gulp
```

# Use
```javascript
var gulp = require('gulp');
var poco = require('@fluffy-spoon/csharp-to-typescript-generator.gulp');

gulp.task('poco', function () {
  return gulp
    .src('Models/*.cs')
    .pipe(poco({
      //options go here
    }))
    .pipe(gulp.dest('Scripts'));
});
```

To see what options are available, go here: https://github.com/ffMathy/FluffySpoon.JavaScript.CSharpToTypeScriptGenerator
