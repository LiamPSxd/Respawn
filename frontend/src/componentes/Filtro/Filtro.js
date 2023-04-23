import React from "react";
import './Filtro.css';


const Filtro = ({ idFiltro }) => {



    return (
        <main>
            <aside id="categoria">
                <div id="hola">
                    <h4 className="text"><u>Categorias</u></h4>
                    <form >
                        {/* <input name="video" type="radio" id="Shooter" value="Shooter" />
                        <label htmlFor="Shooter">Shooter</label>

                        <div>
                            <input
                                name="video"
                                type="radio"
                                id="Misterio"
                                value="Misterio"
                            />
                            <label htmlFor="Misterio">Misterio</label>

                            <div>
                                <input name="video" type="radio" id="MMO" value="MMO" />
                                <label htmlFor="MMO">MMO</label>
                            </div>

                            <div>
                                <input
                                    name="video"
                                    type="radio"
                                    id="Casual Game"
                                    value="Casual Game"
                                />
                                <label htmlFor="Casual Game">Casual</label>
                            </div>

                            <div>
                                <input
                                    name="video"
                                    type="radio"
                                    id="Strategy"
                                    value="Strategy"
                                />
                                <label htmlFor="Strategy">Estrategia</label>
                            </div>

                            <div>
                                <input
                                    name="video"
                                    type="radio"
                                    id="Simulator"
                                    value="Simulator"
                                />
                                <label htmlFor="Simulator">Simulacion</label>
                            </div>

                            <div>
                                <input
                                    name="video"
                                    type="radio"
                                    id="Sports Game"
                                    value="Sports Game"
                                />
                                <label htmlFor="Sports Game">Deportes</label>
                            </div>

                            <div >
                                <input
                                className="rad-input"
                                    name="video"
                                    type="radio"
                                    id="Action Game"
                                    value="Action Game"
                                />
                                <label  htmlFor="Action Game">Accion</label>
                            </div>

                            <br></br> */}

<div>

  <label className="rad-label">
    <input type="radio" className="rad-input" name="rad" id="Action Game" value="Action Game"/>
    <div className="rad-design"></div>
    <div className="rad-text">Accion</div>
  </label>

  <label className="rad-label">
    <input type="radio" className="rad-input" name="rad" id="Sports Game" value="Sports Game"/>
    <div className="rad-design"></div>
    <div className="rad-text">Deportes</div>
  </label>

  <label className="rad-label">
    <input type="radio" className="rad-input" name="rad" id="Simulator" value="Simulator"/>
    <div className="rad-design"></div>
    <div className="rad-text">Simulacion</div>
  </label>

  <label className="rad-label">
    <input type="radio" className="rad-input" name="rad" id="Strategy" value="Strategy"/>
    <div className="rad-design"></div>
    <div className="rad-text">Estrategia</div>
  </label>

  <label className="rad-label">
    <input type="radio" className="rad-input" name="rad" id="Misterio" value="Misterio"/>
    <div className="rad-design"></div>
    <div className="rad-text">Misterio</div>
  </label>

  <label className="rad-label">
    <input type="radio" className="rad-input" name="rad" id="Casual Game" value="Casual Game"/>
    <div className="rad-design"></div>
    <div className="rad-text">Casual</div>
  </label>

  <label className="rad-label">
    <input type="radio" className="rad-input" name="rad" id="Shooter" value="Shooter"/>
    <div className="rad-design"></div>
    <div className="rad-text">Shooter</div>
  </label>

</div>

                            <button type="submit" className="hi">
                                Aplicar Filtro
                            </button>
                        {/* </div> */}
                    </form>
                </div>
            </aside>
        </main>
    );
};

export default Filtro;