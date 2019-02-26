const data = [6, 20, 21, 14, 2, 30, 7, 16, 25, 5, 11, 28, 10, 26, 9];

// Create SVG Element
const chartWidth = 800;
const chartHeight = 400;

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
    .on('mouseover', function (d) {
        let x = parseFloat(d3.select(this).attr('x')) + xScale.bandwidth() / 2;
        let y = parseFloat(d3.select(this).attr('y')) / 2 + chartHeight / 2;
        d3.select('#tooltip')
            .style('left', x + 'px')
            .style('top', y + 'px')
            .style('display', 'block')
            .text(d);
    })
    .on('mouseout', () => d3.select('#tooltip').style('display', 'none'));
    // .append('title')
    // .text(d => d);
