define(['base/eventable', 'controllers/index'],function (Eventable, Controller) {
	var IndexController = new Eventable();
	IndexController = _.extend(IndexController, {
		init: function(el) {
			this.el = el;
			
		}
	});
	return IndexController;
});