class Usuario:
    def __init__(self, nombre = "", correo = "", contrasenia = "", domicilio = ""):
        self.nombre = nombre
        self.correo = correo
        self.contrasenia = contrasenia
        self.domicilio = domicilio

    @property
    def nombre(self):
        return self.nombre

    @property
    def correo(self):
        return self.correo

    @property
    def contrasenia(self):
        return self.contrasenia
    
    @contrasenia.setter
    def contrasenia(self, contrasenia):
        self.contrasenia = contrasenia

    @property
    def domicilio(self):
        return self.domicilio
    
    @domicilio.setter
    def domicilio(self, domicilio):
        self.domicilio = domicilio

    def toString(self):
        return "Usuario {}: {}, {}, {}".format(self.nombre, self.correo, self.contrasenia, self.domicilio)