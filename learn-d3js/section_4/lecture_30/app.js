var data = [
    [400, 200],
    [210, 140],
    [722, 300],
    [70, 160],
    [250, 50],
    [110, 280],
    [699, 225],
    [90, 220]
];

var chartWidth = 800;
var chartHeight = 400;

var svg = d3.select('#chart')
    .append('svg')
    .attr('width', chartWidth)
    .attr('height', chartHeight);

svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', function (d) {
        return d[0];
    })
    .attr('cy', function (d) {
        return d[1];
    })
    .attr('r', function (d) {
        return d[1] / 10;
    })
    .attr('fill', '#D1AB0E');

svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(function (d) {
        return d.join(',');
    })
    .attr('x', function (d) {
        return d[0];
    })
    .attr('y', function (d) {
        return d[1];
    });