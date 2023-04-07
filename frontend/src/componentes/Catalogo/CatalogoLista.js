import React, { useEffect, useState } from "react";
import CatalogoItem from "./CatalogoItem";
import * as CatalogoServer from "./CatalogoServer";

const CatalogoLista = ({idCatalogo}) => {
    const [catalogos, setCatalogos] = useState([]);

    const listaCatalogos = async () => {
        try{
            const data = await (await CatalogoServer.getCatalogo(idCatalogo)).json();
            setCatalogos(data.Catalogos);
        }catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
        listaCatalogos();
        // eslint-disable-next-line
    }, []);

    return(
        <><header>
            <section id="banner">
                <img id="banner-img" src="logo2-png" alt=""></img>
            </section>
        </header>

        <br></br>

        <main>
            <aside id="categoria">
                <div id="hola">
                    <h4 className="text-black text-lg">Categorias</h4>
                    <input name ="video"type="radio" id="indy" value="indy"/>
                    <label htmlFor="indy">Indies</label>

                    <div>
                        <input
                            name="video"
                            type="radio"
                            id="Adventure"
                            value="Adventure"
                        />
                        <label htmlFor="Adventure">Aventura</label>

                        <div>
                            <input name="video"type="radio" id="MMO" value="MMO"/>
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

                        <form className="flex flex-col gap-8">
                            <br></br>

                            <button type="submit" className="btn btn-block btn-primary">
                                Aplicar Filtro
                            </button>
                        </form>
                    </div>
                </div>
            </aside>
        </main>

        <div className="row">
            {catalogos.map(catalogo => (
                <CatalogoItem key={catalogo.id} catalogo={catalogo} />
            ))}
            {/* {catalogos.map(catalogo => {
                document.getElementById("banner-img").style.setProperty("src", catalogo.banner);
            })} */}
        </div></>
    );
};

export default CatalogoLista;