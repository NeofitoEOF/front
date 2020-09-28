import * as d3 from "d3";

const graph_ids = [];

function build_scatter_plot_chart(svg, data) {
  let graph_id = `scatter-plot-char-${ Math.floor(Math.random() * 999999) }`;

  while (graph_ids.includes(graph_id)) {
    graph_id = Math.floor(Math.random() * 999999);
  }

  graph_ids.push(graph_id);

  const margin = { left: 50, right: 30, top: 20, bottom: 40 };

  const svg_linechart_width = parseFloat(svg.style("width"));
  const svg_linechart_height = parseFloat(svg.style("height"));

  const x = d3
    .scaleLinear()
    .domain(d3.extent(data.value, (d) => d.volatilidade))
    .nice()
    .range([ margin.left, svg_linechart_width - margin.right ]);

  const xAxis = (g) =>
    g
      .attr(
        "transform",
        `translate(0, ${ svg_linechart_height - margin.bottom })`
      )
      .call(
        d3
          .axisBottom(x)
          .ticks(svg_linechart_width / 100)
          .tickSizeOuter(0)
          .tickFormat((d) => {
            return d;
          })
      );

  const y = d3
    .scaleLinear()
    .domain(d3.extent(data.value, (d) => d.retorno))
    .nice()
    .range([ svg_linechart_height - margin.bottom, margin.top ]);

  const yAxis = (g) =>
    g
      .attr("transform", `translate(${ margin.left }, 0)`)
      .call(
        d3.axisLeft(y)
          .ticks(svg_linechart_height / 40)
          .tickFormat((d) => {
            return d;
          })
      )
      .call((g) => g.select(".domain"))
      .call((g) =>
        g
          .select(".tick:last-of-type text")
          .clone()
          .attr("x", 3)
          .attr("text-anchor", "start")
          .attr("front-weight", "bold")
      );

  svg.append("g").call(yAxis);
  svg.append("g").call(xAxis);

  const sizeMin = 2.5 * (svg_linechart_width / svg_linechart_height);
  const sizeMax = 7.5 * (svg_linechart_width / svg_linechart_height);

  const sizeScale = d3
    .scaleSqrt()
    .range([ sizeMin, sizeMax ]);

  const color = d3.scaleOrdinal()
    .domain(data.value.map(d => d.ativo_id))
    .range(d3.schemePastel1);

  const tooltip = svg
    .append("g")
    .attr("transform", "translate(-30, 0)")
    .append("text")
    .style("fill", "rgba(102, 169, 146, 1)")
    .style("font-weight", "bold")
    .style("font-size", "0.85rem")
    .style("opacity", 0)
    .classed("tooltip", true);

  svg
    .append('g')
    .selectAll('circle')
    .data(data.value)
    .enter()
    .append('circle')
    .attr('r', d => sizeScale(d.volatilidade))
    .attr('cx', d => x(d.volatilidade))
    .attr('cy', d => y(d.retorno))
    .style('fill', d => color(d.ativo_id))
    .on("mouseover", (d) => {
      tooltip
        .transition()
        .duration(200)
        .style("opacity", 1)
        .attr("transform", `translate(${ x(d.volatilidade) },${ y(d.retorno) - 10 })`)
        .text(`
          R: ${ Number(d.volatilidade.toFixed(2)) } x  
          V: ${ Number(d.retorno.toFixed(2)) }
        `
          .replace('.', ',')
          .replace('.', ','));
    });

  return color;
}


function build_legend(el_data, el, color_func) {
  for (const i in el_data) {
    const div = el
      .append('div')
      .style('display', 'flex')
      .style('flex-direction', 'row')
      .style('height', 'auto')
      .style('margin-top', '10px')
      .classed('legend-risco', true);

    div
      .append('div')
      .style('display', 'block')
      .style('height', '15px')
      .style('width', '15px')
      .style('margin-right', '10px')
      .style('background-color', color_func(el_data[i].id));

    div
      .append('div')
      .text(el_data[i].name)
      .style('color', '#2b2b2b')
      .style('flex', '23')
      .style('font-size', '0.75em');
  }
}

export function generate_scatter_plot_chart(el) {
  const line_chart = d3.select(`${ el } div#_chart_04`);

  const svg = line_chart
    .append("svg")
    .style("-webkit-tap-highlight-color", "transparent")
    .style("overflow", "visible")
    .attr("preserveAspectRatio", "xMinYMin meet");

  d3.json("/data/risco_retorno.json").then((data) => {
    let chart_data = {};

    for (const date in data) {
      chart_data = {
        date,
        value: data[date]
      }
    }

    const legend_data = chart_data.value.map(d => ({
      id: d.ativo_id,
      name: d.descricao
    }))

    const el_legend = d3.select(`${ el } div#_chart_04_legend`);
    el_legend
      .style('align-items', 'flex-start')
      .style('overflow', 'scroll')
      .style('margin', '10px')
      .style('width', 'auto')
      .style('padding', '20px 0')

    build_legend(
      legend_data,
      el_legend,
      build_scatter_plot_chart(svg, chart_data)
    )
  });
}
