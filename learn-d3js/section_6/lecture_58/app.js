const data = {
    nodes: [
        {name: 'Jack'}, {name: 'Bob'},
        {name: 'Bill'}, {name: 'Jan'},
        {name: 'Edward'}, {name: 'Sara'},
        {name: 'Nikki'}, {name: 'Ronald'},
        {name: 'Jerry'}, {name: 'Zac'}
    ],
    links: [
        {source: 0, target: 1}, {source: 0, target: 2},
        {source: 0, target: 3}, {source: 0, target: 4},
        {source: 1, target: 5}, {source: 2, target: 5},
        {source: 2, target: 5}, {source: 3, target: 4},
        {source: 5, target: 8}, {source: 5, target: 9},
        {source: 6, target: 7}, {source: 7, target: 8},
        {source: 8, target: 9}
    ]
};

const chartWidth = 600;
const chartHeight = 600;
const colors = d3.scaleOrdinal(d3.schemeCategory10);

const force = d3.forceSimulation(data.nodes)
    .force('charge', d3.forceManyBody().strength(-200))
    .force('link', d3.forceLink(data.links))
    .force('center', d3.forceCenter()
        .x(chartWidth / 2)
        .y(chartHeight / 2));

const svg = d3.select('#chart')
    .append('svg')
    .attr('width', chartWidth)
    .attr('height', chartHeight);

const lines = svg.selectAll('line')
    .data(data.links)
    .enter()
    .append('line')
    .style('stroke', '#24292e')
    .style('stroke-width', 2);

const nodes = svg.selectAll('circle')
    .data(data.nodes)
    .enter()
    .append('circle')
    .attr('r', 20)
    .style('fill', (d, i) => colors(i));

nodes.append('title')
    .text(d => d.name);

force.on('tick', () => {
    lines.attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

    nodes.attr('cx', d => d.x)
        .attr('cy', d => d.y);
});