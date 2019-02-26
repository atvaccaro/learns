const data = [6, 20, 21, 14, 2, 30, 7, 16, 25, 5, 11, 28, 10, 26, 9];

// Create SVG Element
const chartWidth = 800;
const chartHeight = 400;
let sortFlag = false;

const svg = d3.select('#chart')
    .append('svg')
    .attr('width', chartWidth)
    .attr('height', chartHeight);

// Create Scales
const xScale = d3.scaleBand()
    .domain(d3.range(data.length))
    .rangeRound([0, chartWidth])
    .paddingInner(0.05);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, chartHeight]);

// Bind Data and create bars
svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (d, i) => xScale(i))
    .attr('y', d => chartHeight - yScale(d))
    .attr('width', xScale.bandwidth())
    .attr('height', d => yScale(d))
    .attr('fill', '#7ED26D')
    .on('mouseover', function () {
        d3.select(this)
            .transition()
            .attr('fill', '#0C9CDF');
    })
    .on('mouseout', function () {
        d3.select(this)
            .transition('changeColorBack')
            .attr('fill', '#7ED26D');
    })
    .on('click', function () {
        svg.selectAll('rect')
            .sort((a, b) => sortFlag ? d3.descending(a, b) : d3.ascending(a, b))
            .transition('sort')
            .duration(1000)
            .attr('x', (d, i) => xScale(i));

        svg.selectAll('text')
            .sort((a, b) => sortFlag ? d3.descending(a, b) : d3.ascending(a, b))
            .transition()
            .duration(1000)
            .attr('x', (d, i) => xScale(i) + xScale.bandwidth() / 2);

        sortFlag = !sortFlag;
    });

// Create Labels
svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(d => d)
    .attr('x', (d, i) => xScale(i) + xScale.bandwidth() / 2)
    .attr('y', d => chartHeight - yScale(d) + 15)
    .attr('font-size', 14)
    .attr('fill', '#fff')
    .attr('text-anchor', 'middle')
    .attr('pointer-events', 'none');