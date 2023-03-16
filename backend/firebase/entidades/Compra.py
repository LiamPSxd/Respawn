from . import Cupon, Videojuego, Usuario

class Compra:
    def __init__(self, id = 0, fecha = "", hora = "", metodo = "", descripcion = "", cupon = Cupon, videojuego = Videojuego, usuario = Usuario):
        self.id = id
        self.fecha = fecha
        self.hora = hora
        self.iva = .16
        self.descuento = videojuego.getOferta().getDescuento()
        self.monto = 0.0
        self.metodo = metodo
        self.descripcion = descripcion
        self.cupon = cupon
        self.videojuego = videojuego
        self.usuario = usuario

    @property
    def id(self):
        return self.id

    @property
    def fecha(self):
        return self.fecha

    @fecha.setter
    def fecha(self, fecha):
        self.fecha = fecha

    @property
    def hora(self):
        return self.hora

    @hora.setter
    def hora(self, hora):
        self.hora = hora

    @property
    def iva(self):
        return self.iva

    @iva.setter
    def iva(self, iva):
        self.iva = iva

    @property
    def descuento(self):
        return self.descuento

    @descuento.setter
    def descuento(self, descuento):
        self.descuento = descuento

    @property
    def monto(self):
        return self.monto

    @monto.setter
    def monto(self, monto):
        self.monto = monto

    @property
    def metodo(self):
        return self.metodo

    @metodo.setter
    def metodo(self, metodo):
        self.metodo = metodo

    @property
    def descripcion(self):
        return self.descripcion

    @descripcion.setter
    def descripcion(self, descripcion):
        self.descripcion = descripcion
    
    @property
    def cupon(self):
        return self.cupon

    @cupon.setter
    def cupon(self, cupon):
        self.cupon = cupon

    @property
    def videojuego(self):
        return self.videojuego
    
    @videojuego.setter
    def videojuego(self, videojuego):
        self.videojuego = videojuego

    @property
    def usuario(self):
        return self.usuario
    
    @usuario.setter
    def usuario(self, usuario):
        self.usuario = usuario

    def generarTicket(self):
        return "Ticket {}: {}, {}, {}, {}, {}, {}, {}, {}, {}, {}".format(self.id, self.sucursal, self.fecha, self.hora, self.precio, self.iva, self.descuento, self.cupon, self.monto, self.metodo, self.descripcion, self.videojuego, self.usuario.getNombre())