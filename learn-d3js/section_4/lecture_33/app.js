const data = [
    {date: '07/01/2017', num: 20},
    {date: '07/02/2017', num: 37},
    {date: '07/03/2017', num: 25},
    {date: '07/04/2017', num: 45},
    {date: '07/05/2017', num: 23},
    {date: '07/06/2017', num: 33},
    {date: '07/07/2017', num: 49},
    {date: '07/08/2017', num: 40},
    {date: '07/09/2017', num: 36},
    {date: '07/10/2017', num: 27}
];

const chartWidth = 1000;
const chartHeight = 400;
const padding = 50;

const timeParse = d3.timeParse('%m/%d/%Y');
const timeFormat = d3.timeFormat('%b %e');

data.forEach((e, i) => data[i].date = timeParse(e.date));

const xScale = d3.scaleTime()
    .domain([d3.min(data, d => d.date), d3.max(data, d => d.date)])
    .range([padding, chartWidth - padding * 2]);
// .nice();

const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.num)])
    .range([chartHeight - padding, padding]);
// .rangeRound([chartHeight - padding, padding]);

const aScale = d3.scaleSqrt()
    .domain([0, d3.max(data, d => d.num)])
    .range([0, 25]);
// .clamp(true);

const svg = d3.select('#chart')
    .append('svg')
    .attr('width', chartWidth)
    .attr('height', chartHeight);

svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => xScale(d.date))
    .attr('cy', d => yScale(d.num))
    .attr('r', d => aScale(d.num))
    .attr('fill', '#D1AB0E');

svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(d => timeFormat(d.date))
    .attr('x', d => xScale(d.date))
    .attr('y', d => yScale(d.num));
