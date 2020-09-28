import * as d3 from "d3";

function build_bar_chart(svg, data) {
  const margin = { top: 40, right: 150, bottom: 10, left: 150 };

  const svg_barchart_width = parseFloat(svg.style("width"));
  const svg_barchart_height = parseFloat(svg.style("height"));

  const keys = Object.keys(data[0]).slice(1);
  const color = d3.scaleOrdinal().range([ "orange", "gray" ]);
  const formatDate = d3.timeFormat("%m/%Y");

  // definindo eixo x
  const x0 = d3
    .scaleBand()
    .domain(data.map((d) => d.date))
    .rangeRound([ margin.left, svg_barchart_width - margin.right ])
    .paddingInner(0.1);

  const x1 = d3
    .scaleBand()
    .domain(keys)
    .rangeRound([ 0, x0.bandwidth() ])
    .padding(0.05);

  // definindo eixo y
  const y = d3
    .scaleLinear()
    .domain([ 0, d3.max(data, (d) => d3.max(keys, (key) => d[key])) ])
    .nice()
    .rangeRound([ svg_barchart_height - margin.bottom, margin.top ]);

  //colocar labels
  const rotulo = (svg) => {
    svg
      // .append("g")
      .selectAll("g")
      .data(data)
      .join("g")
      .attr("transform", (d) => `translate(${ x0(d.date) },0)`)
      .selectAll("text")
      .data((d) => keys.map((key) => ({ key, value: d[key] })))
      .join("text")
      .text((d) => d3.format(".2f")(d.value))
      .attr("font-size", 14)
      .attr("text-anchor", "middle")
      .attr("fill", "#000")
      .attr("x", (d) => x1(d.key) + x1.bandwidth() / 2)
      .attr("y", (d) => y(d.value) + 25)
      .attr("width", x1.bandwidth())
      .attr("height", (d) => y(0) - y(d.value));
  };

  //construindo a legenda
  const legend = (svg) => {
    const g = svg
      .attr("transform", `translate(${ svg_barchart_width },0)`)
      .attr("text-anchor", "end")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .selectAll("g")
      .data([ "Rentabilidade", "Meta" ])
      .join("g")
      .attr("transform", (d, i) => `translate(-50, ${ 20 + i * 14 })`);

    g.append("rect")
      .attr("x", -19)
      .attr("width", 19)
      .attr("height", 10)
      .attr("fill", color);

    g.append("text")
      .attr("x", -24)
      .attr("y", 5)
      .attr("dy", "0.35em")
      .text((keys) => keys);
  };

  svg.append("g").call(legend);
  svg.append("g").call(rotulo);

  svg
    .append("g")
    .selectAll("g")
    .data(data)
    .join("g")
    .attr("transform", (d) => `translate(${ x0(d.date) },0)`)
    .selectAll("rect")
    .data((d) => keys.map((key) => ({ key, value: d[key] })))
    .join("rect")
    .classed('bar-rect', true)
    .attr("x", (d) => x1(d.key))
    .attr("y", (d) => y(d.value) + 30)
    .attr("width", x1.bandwidth())
    .attr("height", (d) => y(0) - y(d.value) - 30)
    .attr("fill", (d) => color(d.key));
}

export function generate_bar_y_chart(el) {
  const bar_chart = d3.select(el);

  const svg = bar_chart
    .append("svg")
    // .attr("width", svg_barchart_width)
    .attr("height", parseFloat(bar_chart.style("height")))
    .style("-webkit-tap-highlight-color", "transparent")
    .style("overflow", "visible");

  d3.json("/data/rentabilidade_ano.json").then((data) => {
    const rentabilidade_ano = [];
    for (const date_key in data.rentabilidade_ano) {
      rentabilidade_ano.push({
        date: d3.timeParse("%s")(Number(date_key) / 1000),
        rent_carteira: data.rentabilidade_ano[date_key],
        meta_atuarial: data.meta_ano[date_key],
      });
    }

    build_bar_chart(svg, rentabilidade_ano.slice(-1));
  });
}
