const data = [
    [400, 200],
    [210, 140],
    [722, 300],
    [70, 160],
    [250, 50],
    [110, 280],
    [699, 225],
    [90, 220]
];

const chartWidth = 800;
const chartHeight = 400;
const padding = 50;

const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d[0])])
    .range([padding, chartWidth - padding * 2]);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d[1])])
    .range([chartHeight - padding, padding]);

const aScale = d3.scaleSqrt()
    .domain([0, d3.max(data, d => d[1])])
    .range([0, 25]);


const svg = d3.select('#chart')
    .append('svg')
    .attr('width', chartWidth)
    .attr('height', chartHeight);

const xAxis = d3.axisBottom(xScale)
    .ticks(20);
// .ticks([0, 150, 250, 600, 700]);

svg.append('g')
    .attr('class', 'x-axis')
    .attr('transform', 'translate(0,' + (chartHeight - padding) + ')')
    .call(xAxis);

const yAxis = d3.axisLeft(yScale)
    .ticks(5)
    .tickFormat(d => d + '%');

svg.append('g')
    .attr('class', 'y-axis')
    .attr('transform', 'translate(' + padding + ',0)')
    .call(yAxis);

svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => xScale(d[0]))
    .attr('cy', d => yScale(d[1]))
    .attr('r', d => aScale(d[1]))
    .attr('fill', '#D1AB0E');

// need group to not interfere with the axis
svg.append('g')
    .selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(d => d.join(','))
    .attr('x', d => xScale(d[0]))
    .attr('y', d => yScale(d[1]));
