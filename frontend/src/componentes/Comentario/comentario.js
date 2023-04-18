import React from "react";
import Safe from 'react-safe';


const Comentario = ({ idComentario}) => {
    return (
        <Safe.script>{
            (function () { // DON'T EDIT BELOW THIS LINE
                var d = document, s = d.createElement('script');
                s.src = 'https://respawn-2.disqus.com/embed.js';
                s.setAttribute('data-timestamp', +new Date());
                (d.head || d.body).appendChild(s);
            })()
        }
        </Safe.script>
    );
};

export default Comentario;