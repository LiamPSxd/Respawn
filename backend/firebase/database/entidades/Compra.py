class Compra:
    def __init__(self, id = 0, fecha = "", hora = "", iva = .16, descuento = 0.0, monto = 0.0, metodo = "", descripcion = "", idUsuario: "", idVideojuego):
        self._id = id
        self._fecha = fecha
        self._hora = hora
        self._iva = iva
        self._descuento = descuento
        self._monto = monto
        self._metodo = metodo
        self._descripcion = descripcion
        self._idUsuario = usuario.id
        self._idVideojuego = videojuego.id

    @property
    def id(self):
        return self._id

    @id.setter
    def id(self, id):
        self._id = id

    @property
    def fecha(self):
        return self._fecha

    @fecha.setter
    def fecha(self, fecha):
        self._fecha = fecha

    @property
    def hora(self):
        return self._hora

    @hora.setter
    def hora(self, hora):
        self._hora = hora

    @property
    def iva(self):
        return self._iva

    @iva.setter
    def iva(self, iva):
        self._iva = iva

    @property
    def descuento(self):
        return self._descuento

    @descuento.setter
    def descuento(self, descuento):
        self._descuento = descuento

    @property
    def monto(self):
        return self._monto

    @monto.setter
    def monto(self, monto):
        self._monto = monto

    @property
    def metodo(self):
        return self._metodo

    @metodo.setter
    def metodo(self, metodo):
        self._metodo = metodo

    @property
    def descripcion(self):
        return self._descripcion

    @descripcion.setter
    def descripcion(self, descripcion):
        self._descripcion = descripcion

    def generarTicket(self):
        return f"Ticket {self.id}: {self.fecha}, {self.hora}, {self.iva}, {self.descuento}, {self.monto}, {self.metodo}, {self.descripcion}"