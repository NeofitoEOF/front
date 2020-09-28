import * as d3 from "d3";


function format_date(date) {
  const formated_date = date.toLocaleString("pt-BR", {
    month: "numeric",
    year: "numeric",
    day: "numeric",
  });
  return formated_date.split(". de ").join("-").toUpperCase();
}


function build_table(table_title, data, table) {
  const thead = table.append("thead");
  const tbody = table.append("tbody");
  const header = thead.append("tr");

  header.append("th")
    .attr('colspan', 2)
    .text(table_title);

  for (const key in data) {
    const row = tbody.append("tr");
    const value = data[key] || '';
    row.append("td").text(key);
    row.append("td").text(String(value).replace('.', ','));
  }
}

export function generate_ip_table(el) {
  const table_el = d3.select(el).append('div').attr('class', 'table-container');
  // const table_el_div_left = table_el.append('div').attr('class', 'table-col');
  // const table_el_div_right = table_el.append('div').attr('class', 'table-col');

  const table_total = table_el.append("table");
  const table_diario = table_el.append("table");

  const table_mesal = table_el.append("table");
  const table_anual = table_el.append("table");

  d3.json("/data/indicadores_performance_geral.json").then((data) => {
    const geral = data || {};

    geral.Inicio = format_date(
      new Date(geral.Inicio)
    );

    geral.Fim = format_date(
      new Date(geral.Fim)
    );

    build_table('Informações da consulta', geral, table_total);
  });

  d3.json("/data/indicadores_performance_diarios.json").then((data) => {
    const diario = data || {};

    build_table('Diário', diario, table_diario);
  });

  d3.json("/data/indicadores_performance_mensal.json").then((data) => {
    const mensal = data || {};

    build_table('Mensal', mensal, table_mesal);
  });

  d3.json("/data/indicadores_performance_anual.json").then((data) => {
    const anual = data || {};

    build_table('Anual', anual, table_anual);
  });
}


