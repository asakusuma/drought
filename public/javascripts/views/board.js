define(['base/eventable', 'lib/underscore', 'dustjs-linkedin'],function (Eventable, _, dust) {
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
			this.data[query] = JSON.stringify(data);
			dust.render("index", {numBoards: JSON.stringify(data)}, _.bind(this.render,this));
		},
		render: function(err, out) {
			if(err) throw err;
  			this.el.append(out);
			this.trigger('rendered', this.el.html());
		}
	});
	return BoardView;
});