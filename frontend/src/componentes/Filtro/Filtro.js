import React from "react";


const Filtro = ({ idFiltro }) => {



    return (
        <main>
            <aside id="categoria">
                <div id="hola">
                    <h4 className="text-black text-lg">Categorias</h4>
                    <form >
                        <input name="video" type="radio" id="Shooter" value="Shooter" />
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

                            <div>
                                <input
                                    name="video"
                                    type="radio"
                                    id="Action Game"
                                    value="Action Game"
                                />
                                <label htmlFor="Action Game">Accion</label>
                            </div>

                            <br></br>

                            <button type="submit" className="btn btn-block btn-primary">
                                Aplicar Filtro
                            </button>
                        </div>
                    </form>
                </div>
            </aside>
        </main>
    );
};

export default Filtro;