var labelType, useGradients, nativeTextSupport, animate;

(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport 
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();

function initBfsUpdateGraph(){
    var json = {"id": "A",
                "name" : "A",
                "children": [{
                    "id": "B",
                    "name": "B",
                    "children": [{
                        "id": "BA",
                        "name": "BA",
                        "children": []
                        },{
                        "id": "BB",
                        "name": "BB",
                        "children": []
                        },{
                        "id": "BC",
                        "name": "BC",
                        "children": []
                        },{
                        "id": "BD",
                        "name": "BD",
                        "children": []
                        },{
                        "id": "BE",
                        "name": "BE",
                        "children": []
                        }
                    ]},{
                    "id": "C",
                    "name": "C",
                    "children":[{
                        "id": "CA",
                        "name": "CA",
                        "children": []
                        },{
                        "id": "CB",
                        "name": "CB",
                        "children": []
                        },{
                        "id": "CC",
                        "name": "CC",
                        "children": []
                        },{
                        "id": "CD",
                        "name": "CD",
                        "children": []
                        }
                    ]},{
                    "id": "D",
                    "name": "D",
                    "children":[{
                        "id": "DA",
                        "name": "DA",
                        "children": []
                        },{
                        "id": "DB",
                        "name": "DB",
                        "children": []
                        },{
                        "id": "DC",
                        "name": "DC",
                        "children": []
                        }
                    ]},{
                    "id": "E",
                    "name": "E",
                    "children":[{
                        "id": "H",
                        "name": "H",
                        "children": [{
                            "id": "HA",
                            "name": "HA",
                            "children": []
                            },{
                            "id": "HB",
                            "name": "HB",
                            "children": []
                            },{
                            "id": "HC",
                            "name": "HC",
                            "children": []
                            }]
                        },{
                        "id": "I",
                        "name": "I",
                        "children": []
                        }
                    ]}
                ]}
    //end
    //init RGraph
    var rgraph = new $jit.RGraph({
        'injectInto': 'bfs_update_example_graph',
        //Optional: Create a background canvas
        //for painting concentric circles.
        'background': {
          'CanvasStyles': {
            'strokeStyle': '#DDD',
            'shadowBlur': 50,
            'shadowColor': '#CCC',
            'levelDistance': 80
          }
        },
        'levelDistance': 80,

        //Set Edge and Node colors.
        Node: {
            color: '#F99',
            overridable:true
        },

        Edge: {
            overridable:true,
            color: '#CCC',
            lineWidth:1.5
        },
        //Add the node's name into the label
        //This method is called only once, on label creation.
        onCreateLabel: function(domElement, node){
            domElement.innerHTML = node.name;
        },

        //Change the node's style based on its position.
        //This method is called each time a label is rendered/positioned
        //during an animation.
        onPlaceLabel: function(domElement, node){
            var style = domElement.style;
            style.display = '';

            /*if (node._depth <= 1) {
                style.fontSize = "0.8em";
                style.color = "#ccc";
            
            } else if(node._depth == 2){
                style.fontSize = "0.7em";
                style.color = "#494949";
            
            } else {
                style.display = 'none';
            }*/

            var left = parseInt(style.left);
            var w = domElement.offsetWidth;
            style.left = (left - w / 2) + 'px';
        }
    });
    //load JSON data.
    rgraph.loadJSON(json);
    
    rgraph.graph.addAdjacence({'id': 'C'}, {'id': 'BE'}, null);
    rgraph.graph.addAdjacence({'id': 'D'}, {'id': 'BE'}, null);
    rgraph.graph.addAdjacence({'id': 'E'}, {'id': 'D'}, null);
    rgraph.graph.addAdjacence({'id': 'C'}, {'id': 'B'}, null);

    //Compute positions and plot
    rgraph.refresh();
    //end

    /*
    //Global Options
    //Define a function that returns the selected duration
    function getDuration() {
        var sduration = document.getElementById('select-duration');
        var sdindex = sduration.selectedIndex;
        return parseInt(sduration.options[sdindex].text);
    }
    
    //Define a function that returns the selected fps
    function getFPS() {
        var fpstype = document.getElementById('select-fps');
        var fpsindex = fpstype.selectedIndex;
        return parseInt(fpstype.options[fpsindex].text);
    }
    //Define a function that returns whether you have to
    //hide labels during the animation or not.
    function hideLabels() {
        return document.getElementById('hide-labels').checked;
    }
    
    //init handlers
    //Add event handlers to the right column controls.
    
    //Remove Nodes
    var button = $jit.id('remove-nodes');
    button.onclick = function() {
        //get animation type.
        var stype = $jit.id('select-type-remove-nodes');
        var sindex = stype.selectedIndex;
        var type = stype.options[sindex].text;
        //get node ids to be removed.
        var n = rgraph.graph.getNode('236797_5');
        if(!n) return;
        var subnodes = n.getSubnodes(0);
        var map = [];
        for (var i = 0; i < subnodes.length; i++) {
            map.push(subnodes[i].id);
        }
        //perform node-removing animation.
        rgraph.op.removeNode(map.reverse(), {
            type: type,
            duration: getDuration(),
            fps: getFPS(),
            hideLabels:hideLabels()
        });
    };
    */
    //Remove edges
    button = $jit.id('remove-edge-bfs-button');
    button.onclick = function() {
        rgraph.op.removeEdge([['A', "B"]], {
            type: 'fade:seq',
            duration: 1000,
            fps: 30,
            hideLabels: true
        });
    };

    button = $jit.id('add-edge-bfs-button');
    button.onclick = function() {
        rgraph.op.sum([{id:"A", adjacencies:["H"]}], {
            type: 'fade:seq',
            duration: 1000,
            fps: 30,
            hideLabels: true
        });
    };

    /*
    //Add a Graph (Sum)
    button = $jit.id('sum');
    button.onclick = function(){
        //get graph to add.
        var trueGraph = eval('(' + graph + ')');        
        //get animation type.
        var stype = $jit.id('select-type-sum');
        var sindex = stype.selectedIndex;
        var type = stype.options[sindex].text;
        //perform sum animation.
        rgraph.op.sum(trueGraph, {
            type: type,
            fps: getFPS(),
            duration: getDuration(),
            hideLabels: hideLabels(),
            onComplete: function(){
                Log.write("sum complete!");
            }
        });
    };

    //Morph
    button = $jit.id('morph');
    button.onclick = function(){
        //get graph to morph to.
        var trueGraph = eval('(' + graph + ')');        
        //get animation type.
        var stype = $jit.id('select-type-morph');
        var sindex = stype.selectedIndex;
        var type = stype.options[sindex].text;
        //perform morphing animation.
        rgraph.op.morph(trueGraph, {
            type: type,
            fps: getFPS(),
            duration: getDuration(),
            hideLabels: hideLabels(),
            onComplete: function(){
                Log.write("morph complete!");
            }
        });
    };*/
    //end
}
