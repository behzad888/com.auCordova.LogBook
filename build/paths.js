/**
 * Created by ben on 8/25/15.
 */
var appRoot = 'client/';
var outRoot = 'www/';

module.exports = {
    root: appRoot,
    lib : appRoot + 'scripts/**/*.js',
    scripts: appRoot + 'js/*.js',
    vvm: appRoot + 'js/**/*.js',
    html: appRoot + 'js/**/*.html',
    index: appRoot + 'index.html',
    css: appRoot + 'js/styles/**/*.css',
    sass: appRoot + 'js/styles/**/*.scss',
    jspm: appRoot + 'jspm_packages/**/*',
    config: appRoot + 'config.js',
    test: 'test/**/*.js',
    output: outRoot,
    doc: '/.doc',
    img:appRoot + 'js/img/**/*',
    imgOut: outRoot + 'js/img',
    jspmOut: outRoot + 'jspm_packages',
    vvmOut: outRoot + 'js',
    styleOut: outRoot + 'js/styles',
    scriptsOut: outRoot + 'js',
    libOut : outRoot + 'js/scripts'
};