
import * as d3 from "d3";

function tooltip_format_date(date) {
  return date.toLocaleString("pt-BR", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function tooltip_formatValue(value) {
  return `${ value.toString().replace(',', '').replace('.', ',') }`;
}

function bisect(x, data) {
  const bisect = d3.bisector((d) => d.date).left;

  return (mx) => {
    const date = x.invert(mx);
    const index = bisect(data, date, 1);
    const a = data[index - 1];
    const b = data[index];

    return date - a?.date > b?.date - date ? b : a;
  };
}

function callout(g, value) {
  if (!value) return g.style("display", "none");

  g.style("display", null)
    .style("pointer-events", "none")
    .style("font", "10px sans-serif");

  const path = g
    .selectAll("path")
    .data([ null ])
    .join("path")
    .attr("fill", "white")
    .attr("stroke", "black");

  const text = g
    .selectAll("text")
    .data([ null ])
    .join("text")
    .call((text) =>
      text
        .selectAll("tspan")
        .data((value + "").split(/\n/))
        .join("tspan")
        .attr("x", 0)
        .attr("y", (d, i) => `${ i * 1.1 }em`)
        .style("font-weight", (_, i) => (i ? null : "bold"))
        .text((d) => d)
    );

  const { y, width: w, height: h } = text.node().getBBox();

  text.attr("transform", `translate(${ -w / 2 },${ 15 - y })`);
  path.attr(
    "d",
    `M${ -w / 2 - 10 },5H-5l5,-5l5,5H${ w / 2 + 10 }v${ h + 20 }h-${ w + 20 }z`
  );
}

function prepareData(obj) {
  let parsedObj = [];

  for (let key in obj) {
    const date = d3.timeParse("%s")(Number(key) / 1000);

    parsedObj.push({
      date,
      value: obj[key],
    });
  }

  return parsedObj;
}

// gridlines in x axis function
function make_x_gridlines(x) {
  return d3.axisBottom(x).ticks(5);
}

// gridlines in y axis function
function make_y_gridlines(y) {
  return d3.axisLeft(y).ticks(5);
}

const graph_ids = [];

function build_line_chart(svg, data) {
  let graph_id = Math.floor(Math.random() * 999999);

  while (graph_ids.includes(graph_id)) {
    graph_id = Math.floor(Math.random() * 999999);
  }

  graph_ids.push(graph_id);

  const margin = { left: 50, right: 30, top: 20, bottom: 40 };

  const svg_linechart_width = parseFloat(svg.style("width"));
  const svg_linechart_height = parseFloat(svg.style("height"));


  //definindo eixo X
  const formatDate = d3.timeFormat("%m/%Y");
  const valor_ticks_parse = d3.format(".3f");
  const evolucaoCotaDatum = prepareData(data);

  const x = d3
    .scaleTime()
    .domain(d3.extent(evolucaoCotaDatum, (d) => d.date))
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
          .tickFormat((data) => {
            return formatDate(data);
          })
      );

  //definindo eixo y
  const y = d3
    .scaleLinear()
    .domain(d3.extent(evolucaoCotaDatum, (d) => d.value))
    .nice()
    .range([ svg_linechart_height - margin.bottom, margin.top ]);

  const yAxis = (g) =>
    g
      .attr("transform", `translate(${ margin.left }, 0)`)
      .call(
        d3.axisLeft(y)
          .ticks(svg_linechart_height / 40)
          .tickFormat((valor) => {
            return valor_ticks_parse(valor);
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

  const line = d3
    .line()
    .defined((d) => !isNaN(d.value))
    .x((d) => x(d.date))
    .y((d) => y(d.value));

  const xAxisInitial = svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);

  // add the X gridlines
  svg
    .append("g")
    .attr("class", "grid")
    .attr(
      "transform",
      ` translate(0, ${ svg_linechart_height - margin.bottom })`
    )
    .call(
      make_x_gridlines(x)
        .ticks(svg_linechart_width / 60)
        .tickSize(-(svg_linechart_height - margin.bottom - margin.top))
        .tickFormat("")
    );

  // add the Y gridlines
  svg
    .append("g")
    .attr("class", "grid")
    .attr("transform", "translate(" + margin.left + ",0)")
    .call(
      make_y_gridlines(y)
        .ticks(svg_linechart_height / 80)
        .tickSize(-(svg_linechart_width - margin.left - margin.right))
        .tickFormat("")
    );

  // Add a clipPath: everything out of this area won't be drawn.
  // const clip = svg.append("defs").append("svg:clipPath")
  //   .attr("id", `clip-${ graph_id }`)
  //   .append("svg:rect")
  //   .attr("width", svg_linechart_width - margin.left - margin.right)
  //   .attr("height", svg_linechart_height - margin.top - margin.bottom)
  //   .attr("x", margin.left)
  //   .attr("y", margin.top);

  svg
    .append("g")
    .attr("clip-path", `url(#clip-${ graph_id })`)
    .append("path")
    .datum(evolucaoCotaDatum)
    .attr("class", "line-chart")
    .attr("fill", "none")
    .attr("stroke", "orange")
    .attr("stroke-width", 1.5)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("d", line);

  const tooltip = svg.append("g");

  svg.on("touchmove mousemove", function () {
    const { date, value } = bisect(x, evolucaoCotaDatum)(d3.mouse(this)[0]);

    tooltip
      .attr("transform", `translate(${ x(date) },${ y(value) })`)
      .call(
        callout,
        `${ tooltip_formatValue(value) }\n\n${ tooltip_format_date(date) }`
      );
  });

  svg.on("touchend mouseleave", () => tooltip.call(callout, null));

  // Add brushing
  const brushX = d3.brushX()
    .extent([
      [ margin.left, margin.top ],
      [ svg_linechart_width - margin.right, svg_linechart_height - margin.bottom ]
    ]).on("end", updateChart);

  svg.append("g")
    .attr("class", "brush")
    .call(brushX)

  // A function that set idleTimeOut to null
  let idleTimeout

  function idled() {
    idleTimeout = null;
  }

  // A function that update the chart for given boundaries
  function updateChart() {

    // What are the selected boundaries?
    const extent = d3.event.selection

    // If no selection, back to initial coordinate. Otherwise, update X axis domain
    if (!extent) {
      if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
      x.domain(d3.extent(evolucaoCotaDatum, (d) => d.date))
    } else {
      x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
      // This remove the grey brush area as soon as the selection has been done
      svg.select(".brush").call(brushX.move, null)
    }

    // Update axis and line position
    xAxisInitial.transition().duration(50).call(d3.axisBottom(x))
    svg
      .select('.line-chart')
      .transition()
      .duration(50)
      .attr("d", d3.line()
        .x(function (d) {
          return x(d.date)
        })
        .y(function (d) {
          return y(d.value)
        })
      )
  }

  // If user double click, reinitialize the chart
  svg.on("dblclick", function () {
    x.domain(d3.extent(evolucaoCotaDatum, (d) => d.date))
    xAxisInitial.transition().duration(50).call(xAxis)
    svg
      .select('.line-chart')
      .transition()
      .duration(50)
      .attr("d", line)
  });
}

export function generate_line_chart(el) {
  const line_chart = d3.select(el);

  const svg = line_chart
    .append("svg")
    .style("-webkit-tap-highlight-color", "transparent")
    .style("overflow", "visible")
    .attr("preserveAspectRatio", "xMinYMin meet");

  d3.json("/data/retornos_diarios.json").then((data) => {
    build_line_chart(svg, data.valor_cota || {});
  });
}

export function generate_vol_line_chart(el) {
  const line_chart = d3.select(el);

  const svg = line_chart
    .append("svg")
    .style("-webkit-tap-highlight-color", "transparent")
    .style("overflow", "visible")
    .attr("preserveAspectRatio", "xMinYMin meet");

  d3.json("/data/volatilidade.json").then((data) => {
    build_line_chart(svg, data.vol || {});
  });
}

export function generate_simple_return_line_chart(el) {
  const line_chart = d3.select(el);

  const svg = line_chart
    .append("svg")
    .style("-webkit-tap-highlight-color", "transparent")
    .style("overflow", "visible")
    .attr("preserveAspectRatio", "xMinYMin meet");

  d3.json("/data/retornos.json").then((data) => {
    build_line_chart(svg, data.valor_cota || {});
  });
}


