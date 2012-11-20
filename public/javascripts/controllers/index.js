define(['base/eventable', 'views/index'],function (Eventable, View) {
	var IndexController = new Eventable();
	IndexController = _.extend(IndexController, {
		init: function(el) {
			this.el = el;
			this.view = new View(this.el);
		}
	});
	return IndexController;
});