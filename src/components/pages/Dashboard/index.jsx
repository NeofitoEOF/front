import React, { useEffect } from "react";
import { generate_line_chart } from "../../app/lineChart";
import { generate_pie_chart } from "../../app/pieChart";
import "./index.css";
import { Container } from "@material-ui/core";

export const Dashboard = () => {
  useEffect(() => {
    const line = document.querySelector(".line");
    generate_line_chart(line);

    const patrimonio = document.querySelector(".patrimonio");
    generate_pie_chart(patrimonio);
  });

  return (
    <Container style={{ paddingTop: "96px" }}>
      <div className="container">
        <div id="draw-area-01" className="draw-container col-8 col-sm-12">
          <header>
            <a href="pages/rentabilidades/index.html">Evolução da cota (R$)</a>
          </header>
          <div className="line"></div>
        </div>

        <div id="draw-area-02" className="draw-container col-4 col-sm-12">
          <header>
            <a href="">Composição da carteira</a>
          </header>
          <div className="patrimonio"></div>
        </div>

        <div id="draw-area-03" className="draw-container col-6 col-sm-12">
          <header>
            <a href="/pages/patrimonio">Evolução do patrimônio</a>
          </header>
          <div></div>
        </div>

        <div id="draw-area-04" className="draw-container col-6 col-sm-12">
          <header>
            <a href="/pages/risco">Risco - Volatilidade(DP)</a>
          </header>
          <div></div>
        </div>

        <div id="draw-area-05" className="draw-container col-6 col-sm-12">
          <header>
            <a href="">Comunicação e notícias</a>
          </header>
          <div></div>
        </div>
        <div id="draw-area-06" className="draw-container col-6 col-sm-12">
          <header>
            <a href="">Pendências</a>
          </header>
          <div></div>
        </div>
        <div id="draw-area-07" className="draw-container col-6 col-sm-12">
          <header>
            <a href="">Ativo x Passivo</a>
          </header>
          <div></div>
        </div>
        <div id="draw-area-08" className="draw-container col-6 col-sm-12">
          <header>
            <a href="">Pontuação Secretaria de Previdência</a>
          </header>
          <div></div>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
