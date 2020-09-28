import React from 'react'
import { generate_line_chart } from '../../app/lineChart.js';
import { generate_bar_m_chart } from '../../app/barChart.js';
import { generate_bar_y_chart } from '../../app/bar_y_chart.js';
import { generate_table } from '../../app/table_rentabilidade_mes.js';
import './index.css';
import '../styles.css';

const Profitability = () => {
  return (
    <>
      <div>

        <div className="container">

          <div id="draw-area-01" className="draw-container col-12 col-sm-12">
            <header>
              <span>Evolução do valor da cota do portfolio ( R$ )</span>
            </header>
            <div></div>
          </div>

          <div id="draw-area-02" className="draw-container col-12 col-sm-12">
            <header>
              <span>Rentabilidade x Meta Atuarial ( % Mensal )</span>
            </header>
            <div></div>
          </div>

          <div id="draw-area-03" className="draw-container col-6 col-sm-12">
            <header>
              <span>Rentabilidade x Meta Atuarial ( % )</span>
            </header>
            <div></div>
          </div>

          <div id="draw-area-04" className="draw-container col-6 col-sm-12">
            <header>
              <span>Rentabilidade x Meta Atuarial ( % Ano )</span>
            </header>
          </div>

        </div>
      </div>
    </>
  )
}

export default index
