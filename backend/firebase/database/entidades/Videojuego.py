class Videojuego:
    def __init__(self, id = 0, nombre = "", descripcion = "", caratula = "", video = "", precio = 0.0, plataforma = "", datosExtra = "", calificacion = 0.0):
        self._id = id
        self._nombre = nombre
        self._descripcion = descripcion
        self._caratula = caratula
        self._video = video
        self._precio = precio
        self._plataforma = plataforma
        self._datosExtra = datosExtra
        self._calificacion = calificacion

    @property
    def id(self):
        return self._id

    @id.setter
    def id(self, id):
        self._id = id

    @property
    def nombre(self):
        return self._nombre
    
    @nombre.setter
    def nombre(self, nombre):
        self._nombre = nombre

    @property
    def descripcion(self):
        return self._descripcion
    
    @descripcion.setter
    def descripcion(self, descripcion):
        self._descripcion = descripcion

    @property
    def caratula(self):
        return self._caratula
    
    @caratula.setter
    def caratula(self, caratula):
        self._caratula = caratula

    @property
    def video(self):
        return self._video
    
    @video.setter
    def video(self, video):
        self._video = video

    @property
    def precio(self):
        return self._precio
    
    @precio.setter
    def precio(self, precio):
        self._precio = precio

    @property
    def plataforma(self):
        return self._plataforma
    
    @plataforma.setter
    def plataforma(self, plataforma):
        self._plataforma = plataforma

    @property
    def datosExtra(self):
        return self._datosExtra
    
    @datosExtra.setter
    def datosExtra(self, datosExtra):
        self._datosExtra = datosExtra

    @property
    def calificacion(self):
        return self._calificacion
    
    @calificacion.setter
    def calificacion(self, calificacion):
        self._calificacion = calificacion

    def toString(self):
        return f"Videojuego {self.id}: {self.nombre}, {self.descripcion}, {self.caratula}, {self.video}, {self.precio}, {self.plataforma}, {self.datosExtra}, {self.calificacion}"