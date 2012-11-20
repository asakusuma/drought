var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , requirejs = require('requirejs')
  , dust = require('dustjs-linkedin')
  , dustfs = require('dustfs')
  , compiler = require('./app/duster.js')
  , $ = require('jquery')
  , _ = require('underscore')
  , cons = require('consolidate')
  , templates = require('./app/templates.js');

requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require,
    baseUrl: "public/javascripts/",
    paths: {
      "app": "../../app",
      "dataproxy": "../../app/dataproxy"
    }
});

templates.register(dust);

requirejs(['components', 'routes'],
function(components, routes) {

  var app = express(),
    page,
    route;

  app.engine('dust', cons.dust);

  app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'dust');
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


  //Setup routes that hit pages
  for(route in routes) {
    page = components.page[routes[route]];
    if(page) {
      page.route = route;
      app.get(route, (function(page) {
        return function(req, res) {
          page.controller.init(function(event, html) {
            res.render('global', {
              title: page.title,
              markup: html
            });
          });
        };
      })(page));
    }
  }

  app.get('/', routes.index);

  http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
    
  });
});