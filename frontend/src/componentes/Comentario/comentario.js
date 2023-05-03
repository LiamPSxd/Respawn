import React from "react";
import {DiscussionEmbed} from "disqus-react";


const Comentario = ({ idcomentario }) => {
    const disqusShortname = "respawn-2"
    const disqusConfig = {
      url: "http://localhost:300/videojuego",
      identifier: "idComentarios", // Single post id
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
  export default Comentario;