import React, { useEffect } from "react";
import {
  generate_line_chart,
  generate_vol_line_chart,
} from "../../app/lineChart";
import { generate_pie_chart } from "../../app/pieChart";
import { generate_evolution_bar_chart } from "../../app/barchart_evolucao_patrimonio";

import "./index.css";
import { Container } from "@material-ui/core";

export const Dashboard = () => {
  useEffect(() => {
    const line = document.querySelector(".line");
    generate_line_chart(line);

    const patrimonio = document.querySelector(".patrimonio");
    generate_pie_chart(patrimonio);

    const bar = document.querySelector(".bar");
    generate_evolution_bar_chart(bar);

    const retorno = document.querySelector(".retorno");
    generate_vol_line_chart(retorno);
  });

  return (
    <Container style={{ paddingTop: "96px" }}>
      <div className="container">
        <div id="draw-area-01" className="draw-container col-8 col-sm-12">
          <header>
            <p> Evolução da cota (R$)</p>
          </header>
          <div className="line"></div>
        </div>

        <div id="draw-area-02" className="draw-container col-4 col-sm-12">
          <header>
            <p>Composição da carteira</p>
          </header>
          <div className="patrimonio"></div>
        </div>

        <div id="draw-area-03" className="draw-container col-6 col-sm-12">
          <header>
            <p>Evolução do patrimônio</p>
          </header>
          <div className="bar"></div>
        </div>

        <div id="draw-area-04" className="draw-container col-6 col-sm-12">
          <header>
            <p>Risco - Volatilidade(DP)</p>
          </header>
          <div className="retorno"></div>
        </div>

        <div id="draw-area-05" className="draw-container col-6 col-sm-12">
          <header>
            <p>Comunicação e notícias</p>
          </header>
          <div></div>
        </div>
        <div id="draw-area-06" className="draw-container col-6 col-sm-12">
          <header>
            <p>Pendências</p>
          </header>
          <div></div>
        </div>
        <div id="draw-area-07" className="draw-container col-6 col-sm-12">
          <header>
            <p>Ativo x Passivo</p>
          </header>
          <div></div>
        </div>
        <div id="draw-area-08" className="draw-container col-6 col-sm-12">
          <header>
            <p>Pontuação Secretaria de Previdência</p>
          </header>
          <div></div>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
