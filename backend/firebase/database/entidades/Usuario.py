class Usuario:
    def __init__(self, nombre = "", correo = "", contrasenia = "", domicilio = ""):
        self._nombre = nombre
        self._correo = correo
        self._contrasenia = contrasenia
        self._domicilio = domicilio

    @property
    def nombre(self):
        return self._nombre

    @property
    def correo(self):
        return self._correo

    @property
    def contrasenia(self):
        return self._contrasenia
    
    @contrasenia.setter
    def contrasenia(self, contrasenia):
        self._contrasenia = contrasenia

    @property
    def domicilio(self):
        return self._domicilio
    
    @domicilio.setter
    def domicilio(self, domicilio):
        self._domicilio = domicilio

    def toString(self):
        return f"Usuario {self.nombre}: {self.correo}, {self.contrasenia}, {self.domicilio}"