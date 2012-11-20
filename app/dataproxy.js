


define('dataproxy', ['base/eventable','base/promise'], function (Eventable, Promise) {
	var DataProxy = new Eventable();
	DataProxy = _.extend(DataProxy, {
		getNumBoards: function() {
			var promise = new Promise();
			promise.resolve(2)
			return promise;
		},
		query: function(query) {
			if(query === "numBoards") {
				var promise = new Promise();
				promise.resolve(2);
				return promise;
			}
		}
	});
	return DataProxy;
});