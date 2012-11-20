define(['base/eventable', 'views/index', 'jquery', 'dataproxy'],function (Eventable, View, $, DataFactory) {
	var IndexController = new Eventable();
	IndexController = _.extend({},IndexController, {
		init: function(callback) {
			this.el = $('<div></div>');
			this.view = View;
			this.view.on('rendered', callback);
			var query = this.view.init(this.el);
			DataFactory.query(query).then(function(num) {
				this.view.setData(query, num);
			}, function() {

			}, this);
		}
	});
	return IndexController;
});