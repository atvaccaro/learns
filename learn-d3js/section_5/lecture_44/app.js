let data = [
    [400, 200],
    [210, 140],
    [722, 300],
    [70, 160],
    [250, 50],
    [110, 280],
    [699, 225],
    [90, 220]
];
const chart_width = 800;
const chart_height = 400;
const padding = 50;

const svg = d3.select('#chart')
    .append('svg')
    .attr('width', chart_width)
    .attr('height', chart_height);

const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d[0])])
    .range([padding, chart_width - padding * 2]);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d[1])])
    .range([chart_height - padding, padding]);

const xAxis = d3.axisBottom(xScale);

svg.append('g')
    .attr('class', 'x-axis')
    .attr(
        'transform',
        'translate(0,' + (chart_height - padding) + ')'
    )
    .call(xAxis);

const yAxis = d3.axisLeft(yScale)
    .ticks(5);

svg.append('g')
    .attr('class', 'y-axis')
    .attr(
        'transform',
        'translate( ' + padding + ', 0 )'
    )
    .call(yAxis);

svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr("cx", function (d) {
        return xScale(d[0]);
    })
    .attr("cy", function (d) {
        return yScale(d[1]);
    })
    .attr('r', 15)
    .attr('fill', '#D1AB0E');

d3.select('button')
    .on('click', () => {
        data = [];
        let maxNum = Math.random() * 1000;

        for (let i = 0; i < 8; i++) {
            let newX = Math.floor(Math.random() * maxNum);
            let newY = Math.floor(Math.random() * maxNum);
            data.push([newX, newY]);
        }


        xScale.domain([0, d3.max(data, d => d[0])]);
        yScale.domain([0, d3.max(data, d => d[1])]);

        svg.selectAll('circle')
            .data(data)
            .transition()
            .duration(1000)
            .attr('cx', d => xScale(d[0]))
            .attr('cy', d => yScale(d[1]));

        svg.select('.x-axis')
            .transition()
            .duration(1000)
            .call(xAxis);

        svg.select('.y-axis')
            .transition()
            .duration(1000)
            .call(yAxis);
    });