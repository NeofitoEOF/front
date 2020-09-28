
import * as d3 from "d3";

function tooltip_formatValue(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function build_bar_chart(svg, data) {
  const margin = { left: 50, right: 20, top: 30, bottom: 30 };

  const svg_barchart_width = parseFloat(svg.style("width"));
  const svg_barchart_height = parseFloat(svg.style("height"));
  const formatDate = d3.timeFormat("%m/%Y");
  const valor_ticks_parse = d3.format(".3s");

  const years = [];
  data.forEach((d) => {
    const fullYear = d.date.getFullYear();

    if (!years.includes(fullYear)) {
      years.push(fullYear);
    }
  });

  const color = d3
    .scaleOrdinal()
    .domain(years)
    .range(["rgba(255, 190, 0, 0.75)", "rgba(255, 165, 0, 0.85)"]);

  // definindo eixo x
  const x = d3
    .scaleBand()
    .domain(data.map((d) => d.date))
    .rangeRound([margin.left, svg_barchart_width - margin.right])
    .paddingInner(0.1);

  const xAxis = (g) =>
    g
      .attr("transform", `translate(0,${svg_barchart_height - margin.bottom})`)
      .call(
        d3
          .axisBottom(x)
          .tickSizeOuter(0)
          .tickFormat((data) => {
            return formatDate(data);
          })
      )
      .call((g) => g.select(".domain").remove());

  // definindo eixo y
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value)])
    .nice()
    .rangeRound([svg_barchart_height - margin.bottom, margin.top]);

  // gridlines in y axis function
  function make_y_gridlines(y) {
    return d3.axisLeft(y).ticks(5);
  }

  svg
    .append("g")
    .attr("class", "grid")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(
      make_y_gridlines(y)
        .tickSize(-(svg_barchart_width - margin.left - margin.right))
        .ticks(svg_barchart_height / 50)
        .tickFormat((valor) => {
          return valor_ticks_parse(valor);
        })
    );

  svg.append("g").call(xAxis);

  const tooltip = svg
    .append("g")
    .attr("transform", "translate(-30, 0)")
    .append("text")
    .style("fill", "rgba(102, 169, 146, 1)")
    .style("font-weight", "bold")
    .style("font-size", "0.85rem")
    .style("opacity", 0)
    .classed("barchart-tooltip", true);

  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .classed('bar-rect', true)
    .attr("x", (d) => x(d.date))
    .attr("y", (d) => y(d.value))
    .attr("width", x.bandwidth())
    .attr("height", (d) => svg_barchart_height - margin.bottom - y(d.value))
    .attr("fill", (d) => color(d.date.getFullYear()))
    .on("mouseover", (d) => {
      tooltip
        .transition()
        .duration(200)
        .style("opacity", 1)
        .attr("transform", `translate(${x(d.date)},${margin.top / 1.5})`)
        .text(`${tooltip_formatValue(d.value)}`);
    });
}

export function generate_evolution_bar_chart(el) {
  const bar_chart = d3.select(el);

  const svg = bar_chart
    .append("svg")
    .attr("height", parseFloat(bar_chart.style("height")))
    .style("-webkit-tap-highlight-color", "transparent")
    .style("overflow", "visible");

  d3.json("/data/patrimonio_liquido.json").then((data) => {
    const patrimonio_liquido = [];
    for (const date_key in data.patrimonio_liquido) {
      patrimonio_liquido.push({
        date: d3.timeParse("%s")(Number(date_key) / 1000),
        value: data.patrimonio_liquido[date_key],
      });
    }

    build_bar_chart(svg, patrimonio_liquido.slice(-12));
  });
 
}


