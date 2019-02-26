const data = [
    {key: 0, num: 6},
    {key: 1, num: 20},
    {key: 2, num: 21},
    {key: 3, num: 14},
    {key: 4, num: 2},
    {key: 5, num: 30},
    {key: 6, num: 7},
    {key: 7, num: 16},
    {key: 8, num: 25},
    {key: 9, num: 5},
    {key: 10, num: 11},
    {key: 11, num: 28},
    {key: 12, num: 10},
    {key: 13, num: 26},
    {key: 14, num: 9}
];

let key = function (d) {
    return d.key;
};

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
    .domain([0, d3.max(data, d => d.num)])
    .range([0, chartHeight]);

// Bind Data and create bars
svg.selectAll('rect')
    .data(data, key)
    .enter()
    .append('rect')
    .attr('x', (d, i) => xScale(i))
    .attr('y', d => chartHeight - yScale(d.num))
    .attr('width', xScale.bandwidth())
    .attr('height', d => yScale(d.num))
    .attr('fill', '#7ED26D');

// Create Labels
svg.selectAll('text')
    .data(data, key)
    .enter()
    .append('text')
    .text(d => d.num)
    .attr('x', (d, i) => xScale(i) + xScale.bandwidth() / 2)
    .attr('y', d => chartHeight - yScale(d.num) + 15)
    .attr('font-size', 14)
    .attr('fill', '#fff')
    .attr('text-anchor', 'middle');

d3.select('.update')
    .on('click', e => {
        // data.reverse();
        data[0] = 50;
        yScale.domain([0, d3.max(data, d => d.num)]);

        svg.selectAll('rect')
            .data(data, key)
            .transition()
            .delay((d, i) => i / data.length * 1000)
            .duration(1000)
            .ease(d3.easeElasticOut)
            .attr('y', d => chartHeight - yScale(d.num))
            .attr('height', d => yScale(d.num));
        svg.selectAll('text')
            .data(data, key)
            .transition()
            .delay((d, i) => i * 100)
            .duration(1000)
            .text(d => d.num)
            .attr('x', (d, i) => xScale(i) + xScale.bandwidth() / 2)
            .attr('y', d => chartHeight - yScale(d.num) + 15);
    });

d3.select('.add')
    .on('click', e => {
        let newNum = Math.floor(Math.random() * d3.max(data, d => d.num));
        data.push({
            key: data[data.length-1].key + 1,
            num: newNum
        });

        xScale.domain(d3.range(data.length));
        yScale.domain([0, d3.max(data, d => d.num)]);

        let bars = svg.selectAll('rect').data(data, key);

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
            .attr('y', d => chartHeight - yScale(d.num))
            .attr('width', xScale.bandwidth())
            .attr('height', d => yScale(d.num));

        let labels = svg.selectAll('text').data(data, key);

        labels.enter()
            .append('text')
            .text(d => d.num)
            .attr('x', (d, i) => xScale(i) + xScale.bandwidth() / 2)
            .attr('y', chartHeight)
            .attr('font-size', 14)
            .attr('fill', '#fff')
            .attr('text-anchor', 'middle')
            .merge(labels)
            .transition()
            .duration(1000)
            .attr('x', (d, i) => xScale(i) + xScale.bandwidth() / 2)
            .attr('y', d => chartHeight - yScale(d.num) + 15);
    });

d3.select('.remove')
    .on('click', e => {
        data.shift();

        xScale.domain(d3.range(data.length));
        yScale.domain([0, d3.max(data, d => d.num)]);

        let bars = svg.selectAll('rect').data(data, key); // must bind data for our selection to not include the unbound rect

        bars.transition()
            .duration(500)
            .attr('x', (d, i) => xScale(i))
            .attr('y', d => chartHeight - yScale(d.num))
            .attr('width', xScale.bandwidth())
            .attr('height', d => yScale(d.num));

        bars.exit()
            .transition()
            .attr('x', -xScale.bandwidth())
            .remove();

        let labels = d3.selectAll('text').data(data, key);

        labels.transition()
            .duration(500)
            .attr('text-anchor', 'start')
            .attr('x', (d, i) => xScale(i) + xScale.bandwidth() / 2)
            .attr('y', d => chartHeight - yScale(d.num) + 15);

        labels.exit()
            .transition()
            .attr('x', -xScale.bandwidth())
            .remove();
    });