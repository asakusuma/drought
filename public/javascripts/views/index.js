define(['base/eventable', 'lib/underscore', 'dustjs-linkedin'],function (Eventable, _, dust) {
	var IndexView = new Eventable();
	IndexView = _.extend({},IndexView, {
		init: function(el) {
			this.el = el;
			this.data = {};
			return "numBoards";
		},
		setData: function(query, data) {
			this.data[query] = data;
			dust.render("index", {numBoards: data}, _.bind(this.render,this));
		},
		render: function(err, out) {
			if(err) throw err;
  			this.el.append(out);
			this.trigger('rendered', this.el.html());
			//this.el.html()
		}
	});
	return IndexView;
});