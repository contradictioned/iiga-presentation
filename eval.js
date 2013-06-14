lolol = function(){
  var nov = [36, 36, 24, 18];
  var dez = [35, 21, 36, 22];
  var ticks = ['Full<br />Recomputation', 'Overwrite<br />(just update)', 'Overwrite<br />(with delete)', 'Overwrite<br />(after it. 7)']
  plot3 = $.jqplot('bfs_runtimes', [nov, dez], {
    // Tell the plot to stack the bars.
    stackSeries: true,
    captureRightClick: true,
    seriesDefaults:{
      renderer:$.jqplot.BarRenderer,
      rendererOptions: {
          // Put a 30 pixel margin between bars.
          barMargin: 30,
          // Highlight bars when mouse button pressed.
          // Disables default highlighting on mouse over.
          highlightMouseDown: true   
      },
      pointLabels: {show: true}
    },
    axes: {
      xaxis: {
          renderer: $.jqplot.CategoryAxisRenderer,
          ticks: ticks
      },
      yaxis: {
        // Don't pad out the bottom of the data range.  By default,
        // axes scaled as if data extended 10% above and below the
        // actual range to prevent data points right on grid boundaries.
        // Don't want to do that here.
        renderer: $.jqplot.LinearAxisRenderer,
        show: false
      }
    }
  });

}