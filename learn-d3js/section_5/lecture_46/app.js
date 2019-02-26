const data = [6, 20, 21, 14, 2, 30, 7, 16, 25, 5, 11, 28, 10, 26, 9];

// Create SVG Element
const chartWidth = 800;
const chartHeight = 400;
const barPadding = 5;
const svg = d3.select('#chart')
    .append('svg')
    .attr('width', chartWidth)
    .attr('height', chartHeight);

let xScale = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([0, chartWidth])
    .paddingInner(0.05);

let yScale = d3.scaleLinear()
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
    .attr('fill', '#7ED26D');

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
    .attr('text-anchor', 'middle');

d3.select('.update')
    .on('click', e => {
        // data.reverse();
        data[0] = 50;
        yScale.domain([0, d3.max(data)]);

        svg.selectAll('rect')
            .data(data)
            .transition()
            .delay((d, i) => i / data.length * 1000)
            .duration(1000)
            .ease(d3.easeElasticOut)
            .attr('y', d => chartHeight - yScale(d))
            .attr('height', d => yScale(d));
        svg.selectAll('text')
            .data(data)
            .transition()
            .delay((d, i) => i * 100)
            .duration(1000)
            .text(d => d)
            .attr('x', (d, i) => xScale(i) + xScale.bandwidth() / 2)
            .attr('y', d => chartHeight - yScale(d) + 15);
    });

d3.select('.add')
    .on('click', e => {
        let newNum = Math.floor(Math.random() * d3.max(data));
        data.push(newNum);

        xScale.domain(d3.range(data.length));
        yScale.domain([0, d3.max(data, d => d)]);

        let bars = svg.selectAll('rect')
            .data(data);

        bars.enter()
            .append('rect')
            .attr('x', (d, i) => xScale(i))
            .attr('y', chartHeight)
            .attr('width', xScale.bandwidth())
            .attr('height', 0)
            .attr('fill', '#7ED26D')
            .merge(bars)
            .transition()
            .duration(1000)
            .attr('x', (d, i) => xScale(i))
            .attr('y', d => chartHeight - yScale(d))
            .attr('width', xScale.bandwidth())
            .attr('height', d => yScale(d));

        let labels = svg.selectAll('text')
            .data(data);

        labels.enter()
            .append('text')
            .text(d => d)
            .attr('x', (d, i) => xScale(i) + xScale.bandwidth() / 2)
            .attr('y', chartHeight)
            .attr('font-size', 14)
            .attr('fill', '#fff')
            .attr('text-anchor', 'middle')
            .merge(labels)
            .transition()
            .duration(1000)
            .attr('x', (d, i) => xScale(i) + xScale.bandwidth() / 2)
            .attr('y', d => chartHeight - yScale(d) + 15);
    });

