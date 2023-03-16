from . import Oferta

class Videojuego:
    def __init__(self, id = 0, nombre = "", descripcion = "", caratula = "", video = "", precio = 0.0, plataforma = "", datosExtra = "", calificacion = 0.0, oferta = Oferta):
        self.id = id
        self.nombre = nombre
        self.descripcion = descripcion
        self.caratula = caratula
        self.video = video
        self.precio = precio
        self.plataforma = plataforma
        self.datosExtra = datosExtra
        self.calificacion = calificacion
        self.oferta = oferta

    @property
    def id(self):
        return self.id

    @property
    def nombre(self):
        return self.nombre
    
    @nombre.setter
    def nombre(self, nombre):
        self.nombre = nombre

    @property
    def descripcion(self):
        return self.descripcion
    
    @descripcion.setter
    def descripcion(self, descripcion):
        self.descripcion = descripcion

    @property
    def caratula(self):
        return self.caratula
    
    @caratula.setter
    def caratula(self, caratula):
        self.caratula = caratula

    @property
    def video(self):
        return self.video
    
    @video.setter
    def video(self, video):
        self.video = video

    @property
    def precio(self):
        return self.precio
    
    @precio.setter
    def precio(self, precio):
        self.precio = precio

    @property
    def plataforma(self):
        return self.plataforma
    
    @plataforma.setter
    def plataforma(self, plataforma):
        self.plataforma = plataforma

    @property
    def datosExtra(self):
        return self.datosExtra
    
    @datosExtra.setter
    def datosExtra(self, datosExtra):
        self.datosExtra = datosExtra

    @property
    def calificacion(self):
        return self.calificacion
    
    @calificacion.setter
    def calificacion(self, calificacion):
        self.calificacion = calificacion

    @property
    def oferta(self):
        return self.oferta
    
    @oferta.setter
    def oferta(self, oferta):
        self.oferta = oferta

    def toString(self):
        return "Videojuego {}: {}, {}, {}, {}, {}, {}, {}, {}, {}".format(self.id, self.nombre, self.descripcion, self.caratula, self.video, self.precio, self.plataforma, self.datosExtra, self.calificacion, self.oferta.getDescuento())