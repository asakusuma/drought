
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , requirejs = require('requirejs')
  , dust = require('dustjs-linkedin')
  , dustfs = require('dustfs')
  , compiler = require('./app/duster.js');

  var loading = dustfs.dirs('templates', function(err) {
    if(err) console.log('Errors: ' + err);
    else console.log('Loading done!');
  });

requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require,
    baseUrl: "public/javascripts/",
    paths: {
      "app": "/app"
    }
});

requirejs(['views/userlist', 'app/routing'],
function(userListView) {
  var app = express();

  app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.session());
    app.use(app.router);
    app.use(require('less-middleware')({ src: __dirname + '/public' }));
    app.use(express.static(path.join(__dirname, 'public')));
  });

  app.configure('development', function(){
    app.use(express.errorHandler());
  });

  var loading = dustfs.dirs('templates', function(err) {
    if(err) console.log('Errors: ' + err);
    else console.log('Loading done!');
});

  app.get('/', routes.index);
  app.get('/users', user.list);

  http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
    userListView.run();
  });
});