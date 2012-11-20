define(['base/eventable', 'views/board', 'jquery', 'dataproxy'],function (Eventable, View, $, DataFactory) {
	var BoardController = new Eventable();
	BoardController = _.extend({},BoardController, {
		init: function(params, callback) {
			console.log("Board Controller Init");
			this.el = $('<div></div>');
			this.view = View;
			this.view.on('rendered', callback);
			var query = this.view.init(this.el);
			if(params.id) {
				query.id = params.id;
				DataFactory.query(query).then(function(num) {
					this.view.setData(query, num);
				}, function() {

				}, this);
			}
		}
	});
	return BoardController;
});