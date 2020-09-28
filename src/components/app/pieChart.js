import * as d3 from "d3";

function build_pie_chart(svg, data) {
  const margin = 10;
  const chart_width = parseFloat(svg.style("width"));
  const chart_height = parseFloat(svg.style("height"));

  const pie_chart_container = svg
    .append('g')
    .attr('transform', `translate(${ chart_width / 8 }, 0)`)

  const innerRadius = 0;
  const outerRadius = Math.min(chart_width, chart_height) / 2 - margin;

  const pie = d3.pie()
    .value(d => d.value)
    .sort(null);

  const arc = d3.arc()
    .innerRadius(outerRadius)
    .outerRadius(innerRadius);

  const data_ready = pie(d3.entries(data?.alocacao))

  // set the color scale
  const color = d3.scaleOrdinal()
    .domain(data?.alocacao)
    .range(d3.schemeTableau10);

  // Build chart
  const pie_chart = pie_chart_container
    .selectAll('.pie-chart')
    .data(data_ready)
    .enter()
    .append('path')
    .attr(
      'transform',
      `translate(${ chart_width / 4 + margin }, ${ chart_height / 2 }) `
    ).attr('d', arc)
    .attr("stroke", 'rgb(250, 250, 250)')
    .style("stroke-width", "1.5pt")
    .attr('fill', d => color(d.data.key));

  pie_chart.transition()
    .duration(1000)
    .attrTween('d', function (d) {
      const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
      return function (t) {
        return arc(interpolate(t));
      };
    });

  pie_chart_container
    .append('g')
    .attr(
      'transform',
      `translate(${ chart_width / 4 + margin }, ${ chart_height / 2 }) `
    )
    .selectAll('.pie-label')
    .data(data_ready)
    .enter()
    .append('text')
    .text(d => `${ String(
      parseFloat(d.value * 100, 2)
        .toFixed(2))
      .replace('.', ',') }%`
    )
    .attr("transform", d => {
      const [ w, h ] = arc.centroid(d);
      return `translate(${ w + 6 }, ${ h + 5 })`
    })
    .style("text-anchor", "middle")
    .style("font-size", '0.85em')
    .style("font-weight", 'bold')
    .attr("fill", 'rgb(255, 255, 255)');


  const legend = pie_chart_container
    .append('g')
    .attr('class', 'pie-side-label-container')
    .attr('transform', `translate(${ chart_width / 2 + margin * 4 }, ${ chart_height / 3 - 5 })`)
    .selectAll('.pie-side-label')
    .data(data_ready)
    .enter()
    .append('g')
    .attr('transform', (d, i) => `translate(${ margin * 2 }, ${ i * margin * 4 })`)
    .attr('class', 'pie-side-label');

  legend
    .append("text")
    .text(d => d.data.key.split(' ')[0])
    .style("font-size", '0.9em')
    .style("font-weight", 'bold')
    .attr('fill', d => color(d.data.key));

}

export function generate_pie_chart(el) {
  const pie_chart = d3.select(el);

  const svg = pie_chart
    .append("svg")
    .attr("height", parseFloat(pie_chart.style("height")))
    .style("-webkit-tap-highlight-color", "transparent")
    .style("overflow", "visible")
    .attr("preserveAspectRatio", "xMinYMin meet");

  d3.json("/data/analise_do_portfolio.json").then((data) => {
    build_pie_chart(svg, data);
  });
}

