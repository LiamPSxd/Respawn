from django.urls import path
from .views.MensajeV import MensajeV
from .views.DivisaV import DivisaV
from .views.OfertaV import OfertaV
from .views.FiltroV import FiltroV
from .views.CatalogoV import CatalogoV
from .views.VideojuegoV import VideojuegoV
from .views.CompraV import CompraV
from .views.ReembolsoV import ReembolsoV
from .views.ReservaV import ReservaV
from .views.TarjetaV import TarjetaV
from .views.UsuarioV import UsuarioV
from .views.ComentarioV import ComentarioV
from .views.PayPalV import PayPalV
from .views.CuponV import CuponV
from .views.WishListV import WishListV
from .views.CatalogoVideojuegoV import CatalogoVideojuegoV
from .views.CCVUV import CCVUV
from .views.ComentarioUsuarioV import ComentarioUsuarioV
from .views.FiltroCatalogoV import FiltroCatalogoV
from .views.PayPalUsuarioV import PayPalUsuarioV
from .views.RCVUV import RCVUV
from .views.ReembolsoCompraV import ReembolsoCompraV
from .views.TarjetaUsuarioV import TarjetaUsuarioV
from .views.VideojuegoOfertaV import VideojuegoOfertaV
from .views.WVUV import WVUV

urlpatterns = [
    path('mensajes/', MensajeV.as_view(), name = 'allMensajes'),
    path('mensajes/<int:tipo>', MensajeV.as_view(), name = 'oneMensaje'),

    path('divisas/', DivisaV.as_view(), name = 'allDivisas'),
    path('divisas/<int:id>', DivisaV.as_view(), name = 'oneDivisa'),

    path('ofertas/', OfertaV.as_view(), name = 'allOfertas'),
    path('ofertas/<int:id>', OfertaV.as_view(), name = 'oneOferta'),

    path('filtros/', FiltroV.as_view(), name = 'allFiltros'),
    path('filtros/<int:id>', FiltroV.as_view(), name = 'oneFiltro'),

    path('catalogos/', CatalogoV.as_view(), name = 'allCatalogos'),
    path('catalogos/<int:id>', CatalogoV.as_view(), name = 'oneCatalogo'),

    path('videojuegos/', VideojuegoV.as_view(), name = 'allVideojuegos'),
    path('videojuegos/<int:id>', VideojuegoV.as_view(), name = 'oneVideojuego'),

    path('compras/', CompraV.as_view(), name = 'allCompras'),
    path('compras/<int:id>', CompraV.as_view(), name = 'oneCompra'),

    path('reembolsos/', ReembolsoV.as_view(), name = 'allReembolsos'),
    path('reembolsos/<int:id>', ReembolsoV.as_view(), name = 'oneReembolso'),

    path('reservas/', ReservaV.as_view(), name = 'allReservas'),
    path('reservas/<int:id>', ReservaV.as_view(), name = 'oneReserva'),

    path('tarjetas/', TarjetaV.as_view(), name = 'allTarjetas'),
    path('tarjetas/<int:id>', TarjetaV.as_view(), name = 'oneTarjeta'),

    path('usuarios/', UsuarioV.as_view(), name = 'allUsuarios'),
    path('usuarios/<nombre>', UsuarioV.as_view(), name = 'oneUsuario'),

    path('comentarios/', ComentarioV.as_view(), name = 'allComentarios'),
    path('comentarios/<int:id>', ComentarioV.as_view(), name = 'oneComentario'),

    path('paypals/', PayPalV.as_view(), name = 'allPayPals'),
    path('paypals/<int:id>', PayPalV.as_view(), name = 'onePayPal'),

    path('cupones/', CuponV.as_view(), name = 'allCupones'),
    path('cupones/<int:id>', CuponV.as_view(), name = 'oneCupone'),

    path('wishlists/', WishListV.as_view(), name = 'allWishLists'),
    path('wishlists/<int:id>', WishListV.as_view(), name = 'oneWishList'),

    path('catalogoVideojuegos/', CatalogoVideojuegoV.as_view(), name = 'allCatalogoVideojuegos'),
    path('catalogoVideojuegos/<int:idCatalogo><int:idVideojuego>', CatalogoVideojuegoV.as_view(), name = 'oneCatalogoVideojuego'),

    path('ccvus/', CCVUV.as_view(), name = 'allCCVUs'),
    path('ccvus/<int:id>', CCVUV.as_view(), name = 'oneCCVU'),

    path('comentarioUsuarios/', ComentarioUsuarioV.as_view(), name = 'allComentarioUsuarios'),
    path('comentarioUsuarios/<int:id>', ComentarioUsuarioV.as_view(), name = 'oneComentarioUsuario'),

    path('filtroCatalogos/', FiltroCatalogoV.as_view(), name = 'allFiltroCatalogos'),
    path('filtroCatalogos/<int:id>', FiltroCatalogoV.as_view(), name = 'oneFiltroCatalogo'),

    path('paypalUsuarios/', PayPalUsuarioV.as_view(), name = 'allPayPalUsuarios'),
    path('paypalUsuarios/<int:id>', PayPalUsuarioV.as_view(), name = 'onePayPalUsuario'),

    path('rcvus/', RCVUV.as_view(), name = 'allRCVUs'),
    path('rcvus/<int:id>', RCVUV.as_view(), name = 'oneRCVU'),

    path('reembolsoCompras/', ReembolsoCompraV.as_view(), name = 'allReembolsoCompras'),
    path('reembolsoCompras/<int:id>', ReembolsoCompraV.as_view(), name = 'oneReembolsoCompra'),

    path('tarjetaUsuarios/', TarjetaUsuarioV.as_view(), name = 'allTarjetaUsuarios'),
    path('tarjetaUsuarios/<int:id>', TarjetaUsuarioV.as_view(), name = 'oneTarjetaUsuario'),

    path('videojuegoOfertas/', VideojuegoOfertaV.as_view(), name = 'allVideojuegoOfertas'),
    path('videojuegoOfertas/<int:id>', VideojuegoOfertaV.as_view(), name = 'oneVideojuegoOferta'),

    path('wvus/', WVUV.as_view(), name = 'allWVUs'),
    path('wvus/<int:id>', WVUV.as_view(), name = 'oneWVU'),
]