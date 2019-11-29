let range = prompt("Enter a range(number): ", 500) || 500,
  speed = prompt("Enter speed(milliseconds): ", 500) || 500,
  flag = false,
  limit = Math.sqrt(range);

function start(range) {
  var margin = 50;
  var width = window.screen.availWidth - margin,
    height = window.screen.availHeight - margin;

  var n = range,
    size = 35,
    columns = Math.floor(width / size) - margin / 2;

  var svg = d3
    .select("#main")
    .append("svg")
    .attr("viewBox", `-${margin / 2} -${margin / 2} ${width} ${height}`)
    .attr("width", width)
    .attr("height", height)
    .append("g");

  var data = d3.range(2, n + 1);

  var rect = svg
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("transform", function(d, i) {
      let temp = size + 5;
      return (
        "translate(" +
        (i % columns) * temp +
        "," +
        Math.floor(i / columns) * temp +
        ")"
      );
    });

  rect
    .append("circle")
    .classed("unclassed", true)
    .attr("r", size / 2)
    .style("fill", "#66bd63")
    .style("stroke", "white");

  rect
    .append("text")
    .attr("x", 0)
    .attr("y", size / 5)
    .style("text-anchor", "middle")
    .style("fill", "white")
    .text(function(d) {
      return d;
    });

  var list = d3.range(2, n);
  var crossedList = {};

  var transition = d3
    .transition()
    .duration(speed)
    .delay(500)
    .each("start", function start() {
      var p = list[0];
      var ind = 0;

      while (p * ind < n) {
        ind += 1;
        if (list.indexOf(p * ind) > -1) list.splice(list.indexOf(p * ind), 1);
      }

      rect
        .selectAll(".unclassed")
        .filter(function(d, i) {
          crossedList[p] ? crossedList[p]++ : (crossedList[p] = 1);
          let crossedStr = "";
          for (let crossedNum of Object.keys(crossedList)) {
            crossedStr += "<span class ='primes'>    " + crossedNum + "<span>";
          }
          d3.select("#nums").html(crossedStr);
          return d === p;
        })
        .classed("unclassed", false);

      rect
        .selectAll(".unclassed")
        .filter(function(d, i) {
          return list.indexOf(d) === -1;
        })
        .classed("unclassed", false)
        .transition()
        .duration(250)
        .style("fill", "#fc5753")
        .transition()
        .duration(250)
        .style("opacity", 0.1);

      if (list.length > 0)
        transition = transition.transition().each("start", start);
    });

  d3.select(self.frameElement).style("height", height + "px");
}

start(parseInt(range));
