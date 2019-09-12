
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var methodOverride = require('method-override')
var errorhandler = require('errorhandler')
var serveStatic = require('serve-static');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
// app.use(favicon(path.join(__dirname, '/public', 'favicon.ico')));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded());
app.use(methodOverride());
app.use(serveStatic(path.join(__dirname, '/public'), {
  maxAge: '0',
  setHeaders: setCustomCacheControl
}));
app.use(serveStatic(path.join(__dirname, '/tests'), {
  maxAge: '0',
  setHeaders: setCustomCacheControl
}));

// development only
if ('development' == app.get('env')) {
  app.use(errorhandler());
}

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

function setCustomCacheControl (res, path) {
  if (serveStatic.mime.lookup(path) === 'text/html') {
    // Custom Cache-Control for HTML files
    res.setHeader('Cache-Control', 'public, max-age=0')
  }
}
