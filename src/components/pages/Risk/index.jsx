import React, { useEffect } from 'react'
import { generate_vol_line_chart, generate_line_chart } from '../../app/lineChart';
import './index.css';
import '../styles.css';

const Risk = () => {

  useEffect(() => {
    const line = document.querySelector(".line");
    generate_line_chart(line);

    const pie = document.querySelector(".pie");
    generate_vol_line_chart(pie);
  });

  return (
    <>
      <div className="container">
        <div id="draw-area-01" className="draw-container col-12 col-sm-12">
          <header>
            <span>Volatilidade ( DP )</span>
          </header>
          <div className="line"></div>
        </div>
        <div id="draw-area-02" className="draw-container col-12 col-sm-12">
          <header>
            <span>Retorno diário ( % )</span>
          </header>
          <div className="pie"></div>
        </div>

        <div id="draw-area-03" className="draw-container col-8 col-sm-12">
          <header>
            <span>Indicadores de Performance</span>
          </header>
          <div></div>
        </div>

        <div id="draw-area-04" className="draw-container col-4 col-sm-12">
          <header>
            <span>Risco x Retorno</span>
          </header>
          <div>
            <div id="_chart_04"></div>
            <div id="_chart_04_legend"></div>
          </div>
        </div>
      </div>
    </>
  )

}

export default Risk