define(['base/eventable', 'lib/underscore', 'dustjs-linkedin', 'async'],function (Eventable, _, dust, async) {
	var BoardView = function() {};
	BoardView.prototype = new Eventable();
	_.extend(BoardView.prototype, {
		init: function(el) {
			this.el = el;
			this.data = {};
			return {
				entityKey: "boards"
			};
		},
		setData: function(query, data) {
			this.data = data;
			dust.render("board", data.attributes, _.bind(this.renderCards,this));
		},
		setDataError: function(query) {
			this.el.html("<h1>Fatal Data Error</h1>");
			this.trigger('rendered', this.el.html());
		},
		renderCards: function(err, out) {
			if(err) throw err;
			var cards = this.data.get('cards'),
				row = 0,
				col = 0;
  			this.el.append(out);
  			for(var i = 0; i < cards.length; i++) {
  				cards[i].set('row',row);
  				cards[i].set('col',col);
  				row = (row+1)%3;
  				if(row === 3) col++;
  			}
  			async.map(cards, function(item, callback) {
  				dust.render("board-card", item.attributes, function(err, out) {
  					if(err) throw err;
  					callback(null, out);
  				});
  			}, _.bind(function(error, results) {
  				var html = "";
  				for(var i = 0; i < results.length; i++) {
  					html += results[i];
  				}
  				this.el.find('ul').append(html);
  				this.render();
  			},this));
		},
		render: function() {
			this.trigger('rendered', this.el.html());
		}
	});
	return BoardView;
});