import React from 'react';
import './index.css';
import '../styles.css';
import { generate_evolution_bar_chart } from '../../app/barchart_evolucao_patrimonio';


const Patrimony = () => {
  return (
    <>
      <div>
        <div className="container">

          <div id="draw-area-01" className="draw-container col-8 col-sm-12">
            <header>
              <span>Evolução do patrimônio</span>
            </header>
            <div>
            </div>
          </div>

          <div id="draw-area-02" className="draw-container col-4 col-sm-12">
            <header>
              <span>Informações</span>
            </header>
            <div></div>
          </div>

          <div id="draw-area-03" className="draw-container col-12 col-sm-12">
            <header>
              <span>Patrimônio (R$) </span>
            </header>
            <div></div>
          </div>

          <div id="draw-area-04" className="draw-container col-6 col-sm-12">
            <header>
              <span>Fundos investidos </span>
            </header>
            <div></div>
          </div>

          <div id="draw-area-05" className="draw-container col-6 col-sm-12">
            <header>
              <span> Administradores (%) </span>
            </header>
            <div></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default index
