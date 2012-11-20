define('dataproxy', ['base/eventable','base/promise', 'cradle', 'async'], function (Eventable, Promise, Cradle, Async) {
	var DataProxy = new Eventable();
	DataProxy = _.extend(DataProxy, {
		init: function(cradle, async) {
			var dbName = 'app',
			    host,
			    port;

			// Cradle setup
			cradle.setup({
			  cache: true,
			  raw: false,
			  host: host || '127.0.0.1',
			  port: port || 5984
			});

			this.db = new cradle.Connection().database(dbName);
		},
		getNumBoards: function(success, error, context) {
			var promise = new Promise();
			promise.resolve(2);
			return promise;
		},
		//query can't call this method
		_somePrivateMethod: function() {

		},
		query: function(query) {
			var promise = new Promise();
			if(query.id) {
				this.db.get(id, function(err, doc) {
	    			if(err) {
	      				promise.reject(err);
	    			} else {
	      				promise.resolve(doc);
	    			}
	  			});
			} else if(query.entityKey) {
				this.db.view(query.entityKey+'/all', {}, function(err, doc) {
					promise.resolve(doc);
				 });
				return promise;
			} else {
				if(query.predefined && this[query.predefined] && query.predefined[0] !== '_') {
					return this[query.predefined]();
				}
			}
			promise.reject('Unknown query');
			return promise;
		}
	});
	DataProxy.init(Cradle, Async);
	return DataProxy;
});


/*
exports.listBoards = function(req, res) {
  db.view('boards/all', {}, function(err, doc) {
    res.send(doc.map(function(item) {
      return item;
    }));
  });
}

exports.listCards = function(req, res) {
  db.view('cards/all', {}, function(err, doc) {
    res.send(doc.map(function(item) {
      return item;
    }));
  });
}

exports.board = function(req, res){
  var id = req.params.id, value;
  db.view('boards/all', { key: id }, function(err, doc) {
    if(err) {
      res.statusCode = 404;
      res.send(err);
    } else {
      value = doc[0].value;
      async.map(value.cards, function(cardId, cb) {
        db.view('cards/all', { key: cardId }, function(err, doc) {
          cb(err, doc[0].value);
        });
      }, function(err, results) {
        value.cards = results;
        res.send(value);
      });
    }
  });
};

exports.card = function(req, res){
  var id = req.params.id;
  db.view('cards/all', { key: id }, function(err, doc) {
    if(err) {
      res.statusCode = 404;
      res.send(err);
    } else {
      res.send(doc);
    }
  });
};

exports.fieldOfStudy = function(req, res){
  var id = req.params.id;
  db.get(id, function(err, doc) {
    if(err) {
      res.statusCode = 404;
      res.send(err);
    } else {
      res.send(doc);
    }
  });
};

exports.school = function(req, res){
  var id = req.params.id;
  db.get(id, function(err, doc) {
    if(err) {
      res.statusCode = 404;
      res.send(err);
    } else {
      res.send(doc);
    }
  });
};

*/