const gulp = require("gulp");//引入gulp
const connect = require("gulp-connect");//引入gulp插件，搭建本地服务
const sass = require("gulp-sass");//css预编译 
const concat = require("gulp-concat");//合并文件插件
const uglify = require("gulp-uglify");//压缩js文件
const rename = require("gulp-rename");//改名 rename({suffix: ".min"})当给所有文件改上名字时
const sourcemaps = require("gulp-sourcemaps");//为了方便开发，将sass直接用于调试
const cleanCss = require("gulp-clean-css");//压缩css文件
//gulp.task("任务名"，fn);
gulp.task("hello",function(){
	console.log("hello world");
})
gulp.task("default",function(){
	console.log('default');
})

gulp.task("copyHtml",function(){
	gulp.src("index.html").pipe(gulp.dest("dist")).pipe(connect.reload());
});
gulp.task("sass",function(){
	gulp.src("*.scss")
	.pipe(sourcemaps.init())
	.pipe(sass({outputStyle: 'compressed'}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest("dist/css")).pipe(connect.reload());
})
gulp.task("cleanCss",function(){
	gulp.src("css/*.css")
	.pipe(cleanCss())
	.pipe(gulp.dest("dist/css"))
})
gulp.task("concat",function(){
	gulp.src(["js/a.js","js/b.js"])
	.pipe(concat('c.js'))
	.pipe(gulp.dest("dist/js"))
	.pipe(uglify())
	.pipe(rename("c.min.js"))
	.pipe(gulp.dest("dist/js"))
})
gulp.task("babel",function(){
	gulp.src('js/ES6.js')
	.pipe(babel({"presets":["es2015"]}))
	.pipe(gulp.dest("dist/js"))
})
gulp.task("copyImg",function(){
	gulp.src("img/*.{jpg,png}").pipe(gulp.dest("dist/imgs"))
	
})
gulp.task("copyData",function(){
	gulp.src(["xml/*.xml","json/*.json"]).pipe(gulp.dest("dist/data"));
	
})
gulp.task("watch",function(){
	
	gulp.watch('*.html',['copyHtml']);
	gulp.watch('img/*.{jpg,png}',['copyImg']);
	gulp.watch('["xml/*.xml","json/*.json"]',['copyData']);
	gulp.watch("*.scss",["sass"]);
})
gulp.task("server",function(){
	connect.server({
		root:'dist',
		livereload:true
	});
});
gulp.task("build",["copyHtml","copyImg","copyData","sass"]);
//创建默认任务，在node环境里直接输入gulp即可执行
gulp.task("default",["server","watch"]);

