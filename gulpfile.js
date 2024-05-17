require('dotenv').config();

const gulp = require('gulp');
const connect = require('gulp-connect');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint-new');
const replace = require('gulp-string-replace');
const chalk = require('chalk');

const libJS = [];
const appCSS = [];
const lintFiles = [];
const envFile = ['assets/js/envs.js'];
const appJS = ['assets/js/app.js'];
const files = getFileNames();

function getFileNames() {
	const fileName = {
		app: 'app.js',
		libs: 'libs.js',
		css: 'app.css'
	};

	return fileName;
}

//Angular
libJS.push('assets/libs/angular/angular.min.js');
libJS.push('assets/libs/angular/angular-ui-router.min.js');

// Angular locale
libJS.push('assets/libs/angular-locale/angular-locale.js');

// JQuery
libJS.push('assets/libs/jquery/jquery-3.6.3.min.js');

//Angular Bootstrap
libJS.push('assets/libs/angular-bootstrap/ui-bootstrap-tpls-0.14.3.min.js');

//HighCharts
libJS.push('node_modules/highcharts/highcharts.js');

// File Upload
libJS.push('assets/libs/file-upload/file-upload.min.js');

//Currency
libJS.push('node_modules/currency.js/dist/currency.min.js');

// DayJS
libJS.push('node_modules/dayjs/dayjs.min.js');

// Lodash
libJS.push('node_modules/lodash/lodash.min.js');

// DayJS
libJS.push('node_modules/dayjs/dayjs.min.js');
libJS.push('node_modules/dayjs/plugin/customParseFormat.js');

libJS.push('assets/libs/bootstrap/bootstrap.js');

// Bootstrap
appCSS.push('assets/libs/bootstrap/bootstrap.min.css');

// Input Masks
libJS.push('assets/libs/angular-input-masks/angular-input-masks.js');

appJS.push('assets/js/app.js');
appJS.push('assets/js/directives/*.js');
appJS.push('assets/js/modules/*/*.js');
appJS.push('assets/js/modules/*/components/*/*.js');
appJS.push('assets/js/modules/*/shared/*.js');
appJS.push('assets/js/components/*/*.js');
appJS.push('assets/js/controllers/*.js');
appJS.push('assets/js/directives/*.js');
appJS.push('assets/js/services/*.js');
appJS.push('assets/js/utils/*.js');
appJS.push('assets/icons/*/*.js');

// Application
lintFiles.push('assets/js/app.js');
lintFiles.push('assets/js/directives/*.js');
lintFiles.push('assets/js/modules/*/*.js');
lintFiles.push('assets/js/modules/*/components/*/*.js');
lintFiles.push('assets/js/modules/*/shared/*.js');
lintFiles.push('assets/js/components/*/*.js');
lintFiles.push('assets/js/controllers/*.js');
lintFiles.push('assets/js/directives/*.js');
lintFiles.push('assets/js/services/*.js');
lintFiles.push('assets/js/utils/*.js');
lintFiles.push('assets/icons/*/*.js');

// CSS - Libs
appCSS.push('node_modules/@tabler/core/dist/css/tabler.min.css');

// CSS - Application
appCSS.push('assets/css/alert.css');
appCSS.push('assets/css/root.css');
appCSS.push('assets/css/custom.css');
appCSS.push('assets/css/event-gallery.css');
appCSS.push('assets/css/design-system.css');
appCSS.push('assets/js/modules/*/*.css');
appCSS.push('assets/js/components/*/*.css');

const watcherLinter = gulp.watch(lintFiles);
const watcherAppJs = gulp.watch(appJS);
const watcherAppCss = gulp.watch(appCSS);

watcherLinter.on('change', watchTask);

function watchTask(path) {
	let hour = new Date();
	let prefix = '';

	hour = hour.toISOString();
	hour = hour.split('T')[1];
	hour = hour.split('.')[0];
	prefix = '[' + hour + ' - ' + path;

	gulp.src([path]).pipe(eslint()).pipe(eslint.results((results) => {
		if (!results.errorCount && !results.warningCount) {
			// eslint-disable-next-line no-console
			console.log(chalk.gray(prefix + '] - ') + chalk.green('Perfect format!'));
			return;
		}

		if (!results || !results[0] || !results[0].messages || !results[0].messages.length) {
			return;
		}

		results[0].messages.forEach((message) => {
			// eslint-disable-next-line no-console
			console.log(chalk.gray(prefix) + chalk.gray(':' + message.line + ' [Column: ' + message.column + ']') + ' - ' + message.message);
		});

		// eslint-disable-next-line no-console
		console.log(chalk.gray(prefix + '] - ') + chalk.red('Errors: ' + (results.errorCount + results.warningCount)));
	}));
}

function envs() {
	return gulp.src(envFile)
        .pipe(replace('EVENT_KEY', process.env.EVENT_KEY))
		.pipe(replace('ENVENPIC_API_BASE_URL', process.env.ENVENPIC_API_BASE_URL))
		.pipe(concat('envs.js'))
		.pipe(gulp.dest('build'));
}

function appsTask() {
	return gulp.src(appJS)
		.pipe(concat(files.app))
		.pipe(gulp.dest('build'));
}

function cssTask() {
	return gulp.src(appCSS)
		.pipe(concat(files.css))
		.pipe(gulp.dest('build'));
}

function libsTask() {
	return gulp.src(libJS)
		.pipe(concat(files.libs))
		.pipe(gulp.dest('build'));
}

function serve() {
	var opts = {
		port: 9090,
        host: 'localhost',
		livereload: true,
		fallback: 'index.html'
	};

	connect.server(opts);
}

watcherAppJs.on('change', () => {
	return gulp.src(appJS).pipe(concat('app.js')).pipe(gulp.dest('build')).pipe(connect.reload());
});

watcherAppCss.on('change', () => {
	return gulp.src(appCSS).pipe(concat('app.css')).pipe(gulp.dest('build')).pipe(connect.reload());
});

function buildHtmlTask() {
	gulp.src(['views/app.html'])
		.pipe(gulp.dest('./views'));

	return gulp.src(['index.html'])
		.pipe(gulp.dest('.'));
}

function processExit(done) {
	done();
	process.exit(0);
}


exports.build = gulp.series(gulp.parallel(appsTask, libsTask, cssTask, buildHtmlTask), envs, processExit);

exports.default = gulp.series(envs, libsTask, appsTask, cssTask, serve);
