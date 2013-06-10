var labelType, useGradients, nativeTextSupport, animate;

/* the rgraph instance for the update example*/
var update_example_graph;

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
    /*var json = {"id": "A",
                "name" : "A",
                "adjacencies": [{
                    "nodeTo": "B",
                    "data": {
                        "$color": "red"
                    }
                }
                ],
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
                ]}*/

    var json = [{
        "id": "A",  
        "name": "A",  
        "adjacencies": [{  
            "nodeTo": "B",
            "data" : { "$color" : "#ccc" }
        }, {  
            "nodeTo": "C"
        }, {  
            "nodeTo": "D"
        }, {  
            "nodeTo": "E"
        }, {  
            "nodeTo": "F"
        }]  
    }, {
        "id": "C",
        "name": "C",  
        "adjacencies": [{  
            "nodeTo": "C1",
        }, {  
            "nodeTo": "C2"
        }, {  
            "nodeTo": "C3"
        }, {  
            "nodeTo": "C4"
        }, {  
            "nodeTo": "C5"
        }]  
    }, {
        "id": "D",
        "name": "D",  
        "adjacencies": [{  
            "nodeTo": "D1",
        }, {  
            "nodeTo": "D2"
        }, {  
            "nodeTo": "D3"
        }, {  
            "nodeTo": "D4"
        }, {  
            "nodeTo": "D5"
        }, {  
            "nodeTo": "B5"
        }]  
    }, {
        "id": "E",
        "name": "E",  
        "adjacencies": [{
            "nodeTo": "E1",
        }, {  
            "nodeTo": "E2"
        }, {  
            "nodeTo": "E3"
        }, {  
            "nodeTo": "E4"
        }, {  
            "nodeTo": "E5"
        }]  
    }, {
        "id": "B",
        "name": "B",  
        "adjacencies": [{  
            "nodeTo": "B1",
        }, {  
            "nodeTo": "B2"
        }, {  
            "nodeTo": "B3"
        }, {
            "nodeTo": "B4"
        }, {  
            "nodeTo": "B5"
        }]  
    }];

    //end
    //init RGraph
    update_example_graph = new $jit.RGraph({
        'injectInto': 'bfs_update_example_graph',
        //Optional: Create a background canvas
        //for painting concentric circles.
        'background': {
          'CanvasStyles': {
            'strokeStyle': '#DDD',
            'shadowBlur': 50,
            'shadowColor': '#CCC',
            'levelDistance': 70
          }
        },
        'levelDistance': 70,

        //Set Edge and Node colors.
        Node: {
            color: '#F99',
            overridable: true
        },

        Edge: {
            overridable: true,
            color: '#CCC',
            lineWidth: 1.5
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
    update_example_graph.loadJSON(json);
    
    update_example_graph.graph.addAdjacence({'id': 'C'}, {'id': 'D1'}, null);
    update_example_graph.graph.addAdjacence({'id': 'D'}, {'id': 'D1'}, null);
    update_example_graph.graph.addAdjacence({'id': 'E'}, {'id': 'D'}, null);
    update_example_graph.graph.addAdjacence({'id': 'C'}, {'id': 'B'}, null);
    update_example_graph.graph.addAdjacence({'id': 'F'}, {'id': 'B'}, null);

    //Compute positions and plot
    update_example_graph.refresh();
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
    
}

$(function() {
    $("#bfs_update_question").bind('deck.becameCurrent', function(ev, direction) {
      if(direction == "forward"){
        // highlight edge (A,B)
        edge = update_example_graph.graph.getAdjacence("A", "B").data.$color = "red"
        update_example_graph.refresh()
      }
    });
    $("#bfs_update_question").bind('deck.lostCurrent', function(ev, direction) {
      if(direction == "reverse"){
        // remove highlight of edge (A,B)
        edge = update_example_graph.graph.getAdjacence("A", "B").data.$color = "#ccc"
        update_example_graph.refresh()
      }
    });

    $("#bfs_update_action").bind('deck.becameCurrent', function(ev, direction) {
      if(direction == "forward"){
        // mark all affected nodes red
        var affectedNodes = ["B", "B1", "B2", "B3", "B4", "B5"];
        for(var key in affectedNodes) {
            var n = affectedNodes[key];
            var node = update_example_graph.graph.getNode(n);
            node.data.$color = "blue";
        }

        update_example_graph.op.removeEdge([['A', "B"]], {
            type: 'fade:seq',
            duration: 1000,
            fps: 30,
            hideLabels: true
        });
      }
    });
    $("#bfs_update_action").bind('deck.lostCurrent', function(ev, direction) {
      if(direction == "reverse"){
        var affectedNodes = ["B", "B1", "B2", "B3", "B4", "B5"];
        for(var key in affectedNodes) {
            var n = affectedNodes[key];
            var node = update_example_graph.graph.getNode(n);
            node.data.$color = "#F99";
        }

        // remove highlight of edge (A,B)
        var theEdge = [
            {"id": "A",
            "name": "A",
            "adjacencies": [{
                "nodeTo": "B",
                "data": {"$color": "red"}
                }]
            }]
        update_example_graph.op.sum(theEdge, {
            type: 'fade:seq',
            duration: 1000,
            fps: 30,
            hideLabels: true
        });
      }
    });
})