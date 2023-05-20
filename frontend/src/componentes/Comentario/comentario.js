import { useParams } from "react-router-dom";
import { DiscussionEmbed } from "disqus-react";
import * as VideojuegoServer from "../Videojuego/VideojuegoServer";
import React, { useEffect, useState } from "react";
import { memo } from "react";

const Comentario = ({ idcomentario }) => {
  const params = useParams();
  const initialState = { id: 0, nombre: "", descripcion: "", caratula: "", video: "", precio: [], genero: "", plataforma: "", datosExtra: "", calificacion: 0.0, capturas: [] };
  const [videojuego, setVideojuego] = useState(initialState);

  const getVideojuego = async (idVideojuego) => {
    try {
      const data = await (await VideojuegoServer.getVideojuego(idVideojuego)).json();
      const { id, nombre, descripcion, caratula, video, precio, genero, plataforma, datosExtra, calificacion, capturas } = data.Videojuegos[0];
      setVideojuego({ id, nombre, descripcion, caratula, video, precio, genero, plataforma, datosExtra, calificacion, capturas });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.id) getVideojuego(params.id);
    // eslint-disable-next-line
  }, []);
  const identifier = `videojuego-${params.id}`;
  const disqusShortname = "respawn-2"
  const disqusConfig = {
    url: `http://localhost:3000/videojuego/${params.id}`,
    identifier: identifier, // Single post id
    title: "Comentarios" // Single post title
  }
  return (
    <div className="Comentario">
      <DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
      />
    </div>
  )
}
export default memo(Comentario);