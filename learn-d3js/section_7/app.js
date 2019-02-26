const chartWidth = 800;
const chartHeight = 600;

const color = d3.scaleQuantize().range([
    'rgb(255, 245, 240)',
    'rgb(254, 224, 210)',
    'rgb(252, 187, 161)',
    'rgb(252, 146, 114)',
    'rgb(251, 106, 74)',
    'rgb(239, 59, 44)',
    'rgb(203, 24, 29)',
    'rgb(165, 15, 21)',
    'rgb(103, 0, 13)',
]);

const projection = d3.geoAlbersUsa()
    .translate([0, 0]);

const path = d3.geoPath(projection);

const svg = d3.select("#chart")
    .append("svg")
    .attr("width", chartWidth)
    .attr("height", chartHeight);

const zoomMap = d3.zoom()
    .scaleExtent([0.5, 3.0])
    .translateExtent(
        [-1000, -500],
        [1000, 500]
    )
    .on('zoom', function () {
        let offset = [d3.event.transform.x, d3.event.transform.y];
        let scale = d3.event.transform.k * 2000;

        projection.translate(offset)
            .scale(scale);

        svg.selectAll('path')
            .transition()
            .attr('d', path);

        svg.selectAll('circle')
            .transition()
            .attr('cx', d => projection([d.lon, d.lat])[0])
            .attr('cy', d => projection([d.lon, d.lat])[1]);
    });


const map = svg.append('g')
    .attr('id', 'map')
    .call(zoomMap)
    .call(
        zoomMap.transform,
        d3.zoomIdentity
            .translate(chartWidth / 2, chartHeight / 2)
            .scale(1)
    );

// allows dragging where states aren't drawn
map.append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', chartWidth)
    .attr('height', chartHeight)
    .attr('opacity', 0);

d3.json('zombie-attacks.json', zombieData => {
    color.domain([
        d3.min(zombieData, d => d.num),
        d3.max(zombieData, d => d.num)
    ]);

    d3.json('us.json', usData => {
        usData.features.forEach((e, i) => {
            zombieData.forEach((ze, zi) => {
                if (e.properties.name === ze.state) {
                    usData.features[i].properties.num = parseFloat(ze.num);
                }
            });
        });

        map.selectAll('path')
            .data(usData.features)
            .enter()
            .append('path')
            .attr('d', path)
            .attr('fill', d => d.properties.num ? color(d.properties.num) : '#ddd')
            .attr('stroke', '#fff')
            .attr('stroke-width', 1);

        d3.json('us-cities.json', data => {
            map.selectAll('circle')
                .data(data)
                .enter()
                .append('circle')
                .style('fill', '#9D497A')
                .style('opacity', 0.8)
                .attr('cx', d => projection([d.lon, d.lat])[0])
                .attr('cy', d => projection([d.lon, d.lat])[1])
                .attr('r', d => Math.sqrt(parseInt(d.population) * 0.00005))
                .append('title')
                .text(d => d.city);
        });
    });
});

d3.selectAll('#buttons button.panning').on('click', function () {
    let x = 0;
    let y = 0;
    const distance = 100;
    const direction = d3.select(this).attr('class').replace('panning ', '');

    if (direction === 'up') {
        y += distance;
    } else if (direction === 'down') {
        y -= distance;
    } else if (direction === 'right') {
        x -= distance;
    } else if (direction === 'left') {
        x += distance;
    }

    map.transition()
        .call(zoomMap.translateBy, x, y);
});

d3.selectAll('#buttons button.zooming').on('click', function () {
    let scale = 1;
    const direction = d3.select(this).attr('class').replace('zooming ', '');

    if (direction === 'in') {
        scale = 1.25;
    } else if (direction === 'out') {
        scale = 0.75;
    }

    map.transition()
        .call(zoomMap.scaleBy, scale);
});