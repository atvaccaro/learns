let data = [35, 9, 19, 23];

let chartWidth = 600;
let chartHeight = 600;

let color = d3.scaleOrdinal(d3.schemeCategory10);

let pie = d3.pie();

let outerRadius = chartWidth / 2;
let innerRadius = 200;

let arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

let svg = d3.select('#chart')
    .append('svg')
    .attr('width', chartWidth)
    .attr('height', chartHeight);

let arcs = svg.selectAll('g.arc')
    .data(pie(data))
    .enter()
    .append('g')
    .attr('class', 'arc')
    .attr('transform', 'translate(' + outerRadius + ',' + chartHeight / 2 + ')');

arcs.append('path')
    .attr('fill', (d, i) => color(i))
    .attr('d', arc);

arcs.append('text')
    .attr('transform', (d, i) => 'translate(' + arc.centroid(d) + ')')
    .attr('text-anchor', 'text-middle')
    .text(d => d.value); // must have d.value because d is the new arc object thing
