const data = [];
for (let i = 0; i < 5; i++) {
    data.push(Math.floor(Math.random() * 50));
}

const chartWidth = 800;
const chartHeight = 400;
const barPadding = 5;

const svg = d3.select('#chart')
    .append('svg')
    .attr('viewBox', '0 0 800 400')
    .attr('preserveAspectRatio', 'xMidYMid');

svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (d, i) => i * ( chartWidth / data.length ))
    .attr('y', d => chartHeight - d * 5)
    .attr('width', chartWidth / data.length - barPadding)
    .attr('height', d => d * 5)
    .attr('fill', '#7ED26D');

svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(d => d)
    .attr('x', (d, i) => i * (chartWidth / data.length) + (chartWidth / data.length - barPadding) / 2)
    .attr('y', d => chartHeight - (d * 5) + 15)
    .attr('font-size', '14px')
    .attr('fill', '#fff')
    .attr('text-anchor', 'middle');