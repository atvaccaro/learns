var dataset = [10, 20, 30, 40, 50];

var el = d3.select('body')
    .selectAll('p')
    .data(dataset)
    .enter()
    .append('p')
    .text(function (d) {
        return 'Number: ' + d;
    })
    .attr('class', function (d) {
        if (d > 25) {
            return 'foo';
        } else {
            return null;
        }
    })
    .classed('bar', function (d) {
        return d < 25;
    })
    .style('color', function (d) {
        if (d > 25) {
            return 'red';
        } else {
            return 'blue';
        }
    });