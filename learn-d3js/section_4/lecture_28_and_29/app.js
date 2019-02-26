var data = [];

for (var i = 0; i < 20; i++) {
    data.push(Math.floor(Math.random() * 50));
}

var chartWidth = 800;
var chartHeight = 400;
var barPadding = 5;

var svg = d3.select('#chart')
    .append('svg')
    .attr('width', chartWidth)
    .attr('height', chartHeight);

svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', function (d, i) {
        return i * (chartWidth / data.length);
    })
    .attr('y', function (d) {
        return chartHeight - d * 5;
    })
    .attr('width', chartWidth / data.length - barPadding)
    .attr('height', function (d) {
        return d * 5;
    })
    .attr('fill', '#7ED26D');

svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(function (d) {
        return d;
    })
    .attr('x', function (d, i) {
        return i * (chartWidth / data.length) + (chartWidth / data.length - barPadding) / 2;
    })
    .attr('y', function (d) {
        return chartHeight - d * 5 + 15;
    })
    .attr('font-size', '14')
    .attr('fill', '#fff')
    .attr('text-anchor', 'middle');
