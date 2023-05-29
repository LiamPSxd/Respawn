import { useParams } from "react-router-dom";
import { DiscussionEmbed } from "disqus-react";
import React from "react";
import { memo } from "react";

const Comentario = () => {
  const params = useParams();
  
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