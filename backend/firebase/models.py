from django.db import models
from .entidades.Mensaje import Mensaje as M
from .entidades.Divisa import Divisa as D
from .entidades.Oferta import Oferta as O
from .entidades.Filtro import Filtro as F
from .entidades.Catalogo import Catalogo as Ca
from .entidades.Videojuego import Videojuego as V
from .entidades.Compra import Compra as Comp
from .entidades.Reembolso import Reembolso as Ree
from .entidades.Reserva import Reserva as Res
from .entidades.Tarjeta import Tarjeta as T
from .entidades.Usuario import Usuario as U
from .entidades.Comentario import Comentario as Come
from .entidades.PayPal import PayPal as P
from .entidades.Cupon import Cupon as Cu
from .entidades.WishList import WishList as W

class Mensaje(models.Model, M):
    titulo = models.BigAutoField(primary_key = True, blank = False)
    descripcion = models.TextField(max_length = 200, blank = False)
    tipo = models.PositiveIntegerField(blank = False)

    def __init__(self, titulo, descripcion, tipo):
        M.titulo = titulo
        M.descripcion = descripcion
        M.tipo = tipo