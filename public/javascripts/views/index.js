define(['base/eventable', 'lib/underscore'],function (Eventable) {
	var IndexView = new Eventable();
	IndexView = _.extend(IndexView, {
		init: function(el) {
			this.el = el;
			return this.queries;
		}
	});
	return IndexView;
});