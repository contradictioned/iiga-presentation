
$(function() {
	function getRandomColor() {
		var max = 0x111111;
		var rnd = Math.floor(Math.random() * max);
		var rnd = 0x252541 + rnd
		return '#' + rnd.toString(16);
	}

	var sigRoot = document.getElementById('sigma-title');
	var sigInst = sigma.init(sigRoot).drawingProperties({
		defaultLabelColor: getRandomColor(),
		defaultLabelSize: 14,
		defaultLabelBGColor: getRandomColor(),
		defaultLabelHoverColor: getRandomColor(),
		labelThreshold: 6,
		defaultEdgeType: 'curve' 
	}).graphProperties({
		minNodeSize: 0.5,
		maxNodeSize: 5,
		minEdgeSize: 1,
		maxEdgeSize: 1
	}).mouseProperties({
		maxRatio: 32
	});

	sigInst.parseGexf('data.gexf');
	sigInst.iterNodes(function(a) { a.color=getRandomColor(); })

	sigInst.resize();
	sigInst.draw();
	sigInst.startForceAtlas2();
	window.setTimeout(function() {
		sigInst.stopForceAtlas2();
	},10000)

	initBfsUpdateGraph();
})