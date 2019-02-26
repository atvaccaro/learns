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
const chartWidth = 800;
const chartHeight = 400;
const padding = 50;

const svg = d3.select('#chart')
    .append('svg')
    .attr('width', chartWidth)
    .attr('height', chartHeight);

const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d[0])])
    .range([padding, chartWidth - padding * 2]);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d[1])])
    .range([chartHeight - padding, padding]);

svg.append('clipPath')
    .attr('id', 'plot-area-clip-path')
    .append('rect')
    .attr('x', padding)
    .attr('y', padding)
    .attr('width', chartWidth - padding * 3)
    .attr('height', chartHeight - padding * 2);

const xAxis = d3.axisBottom(xScale);

svg.append('g')
    .attr('class', 'x-axis')
    .attr(
        'transform',
        'translate(0,' + (chartHeight - padding) + ')'
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

svg.append('g')
    .attr('id', 'plot-area')
    .attr('clip-path', 'url(#plot-area-clip-path)')
    .selectAll('circle')
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
            // .on('start', function () {
            //     d3.select(this)
            //         .attr('fill', '#F26D2D');
            // })
            .attr('cx', d => xScale(d[0]))
            .attr('cy', d => yScale(d[1]))
            .on('end', function () {
                let colors = ['#F26D6D', '#1E6190', '#7559D9', '#D1AB0E'];
                let colorIndex = Math.floor(Math.random() * colors.length);

                d3.select(this)
                    .transition()
                    .attr('fill', colors[colorIndex]);
            });
        // could also just put .transition().attr('fill', ....) here instead of using end callback

        svg.select('.x-axis')
            .transition()
            .duration(1000)
            .call(xAxis);

        svg.select('.y-axis')
            .transition()
            .duration(1000)
            .call(yAxis);
    });