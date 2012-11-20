define([
	'controllers/index',

	'pages/index',
	'pages/board',
	'pages/boardlist',

	'views/Board'
	],function (
		controllerIndex

		pageIndex,
		pageBoard
		pageBoardList,

		viewBoard
		) {
    return {
    	controller: {
    		index: controllerIndex
    	},
    	model: {

    	},
    	page: {
    		index: pageIndex,
    		board: pageBoard,
    		boardList: pageBoardList
    	},
    	view: {
    		board: viewBoard
    	}
    };
});