var Arrow = function () {

var line;

var vis = d3.select("body").append("svg")
    .on("mousedown", mousedown)
    .on("mouseup", mouseup);

function mousedown() {
    var m = d3.mouse(this);
    line = vis.append("line")
        .attr("x1", m[0])
        .attr("y1", m[1])
        .attr("x2", m[0])
        .attr("y2", m[1]);
    
    vis.on("mousemove", mousemove);
}

function mousemove() {
    var m = d3.mouse(this);
    line.attr("x2", m[0])
        .attr("y2", m[1]);
}

function mouseup() {
    vis.on("mousemove", null);
}

};