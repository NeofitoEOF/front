import * as d3 from "d3";

function format_date(date) {
  const formated_date = date.toLocaleString("pt-BR", {
    month: "short",
    year: "numeric",
  });
  return formated_date.split(". de ").join("-").toUpperCase();
}

function build_table(data, table) {
  const thead = table.append("thead");
  const tbody = table.append("tbody");
  const cabecalho = thead.append("tr");

  cabecalho.append("th");
  cabecalho.append("th").text("Rentabilidade");
  cabecalho.append("th").text("Meta Atuarial");

  const decimal_format = d3.format(".2f");
  for (const i in data) {
    const row = tbody.append("tr");
    row.append("td").text(data[i]["date"]);
    row.append("td").text(decimal_format(data[i]["rent_carteira"])?.replace('.', ','));
    row.append("td").text(decimal_format(data[i]["meta_atuarial"])?.replace('.', ','));
  }
}

export function generate_table(el) {
  const table = d3.select(el).append("table");

  d3.json("/data/rentabilidade_meta_atuarial.json").then((data) => {
    const rentabilidade_meta_atuarial = [];
    for (const date_key in data.rentabilidade_mensal) {
      rentabilidade_meta_atuarial.push({
        date: format_date(d3.timeParse("%s")(Number(date_key) / 1000)),
        rent_carteira: data.rentabilidade_mensal[date_key],
        meta_atuarial: data.meta_mensal[date_key],
      });
    }
    build_table(rentabilidade_meta_atuarial.slice(-12), table);
  });
}
