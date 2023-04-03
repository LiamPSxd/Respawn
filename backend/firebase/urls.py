from django.urls import path
from .views.CatalogoFiltroV import CatalogoFiltroV
from .views.CatalogoV import CatalogoV
from .views.CatalogoVideojuegoV import CatalogoVideojuegoV
from .views.ComentarioV import ComentarioV
from .views.CompraReembolsoV import CompraReembolsoV
from .views.CompraV import CompraV
from .views.CuponV import CuponV
from .views.DivisaV import DivisaV
from .views.DivisaVideojuegoV import DivisaVideojuegoV
from .views.FiltroV import FiltroV
from .views.MensajeV import MensajeV
from .views.OfertaV import OfertaV
from .views.PayPalV import PayPalV
from .views.ReembolsoV import ReembolsoV
from .views.ReservaReembolsoV import ReservaReembolsoV
from .views.ReservaV import ReservaV
from .views.TarjetaV import TarjetaV
from .views.UsuarioComentarioV import UsuarioComentarioV
from .views.UsuarioCompraV import UsuarioCompraV
from .views.UsuarioCuponV import UsuarioCuponV
from .views.UsuarioPayPalV import UsuarioPayPalV
from .views.UsuarioReembolsoV import UsuarioReembolsoV
from .views.UsuarioReservaV import UsuarioReservaV
from .views.UsuarioTarjetaV import UsuarioTarjetaV
from .views.UsuarioV import UsuarioV
from .views.UsuarioWishListV import UsuarioWishListV
from .views.VideojuegoComentarioV import VideojuegoComentarioV
from .views.VideojuegoCompraV import VideojuegoCompraV
from .views.VideojuegoOfertaV import VideojuegoOfertaV
from .views.VideojuegoReservaV import VideojuegoReservaV
from .views.VideojuegoV import VideojuegoV
from .views.WishListV import WishListV
from .views.WishListVideojuegoV import WishListVideojuegoV

urlpatterns = [
    path('catalogoFiltros/', CatalogoFiltroV.as_view(), name = 'allCFs'),
    path('catalogoFiltros/<int:idCatalogo>', CatalogoFiltroV.as_view(), name = 'allCFs'),
    path('catalogoFiltros//<int:idFiltro>', CatalogoFiltroV.as_view(), name = 'allCFs'),
    path('catalogoFiltros/<int:idCatalogo>/<int:idFiltro>', CatalogoFiltroV.as_view(), name = 'oneCF'),

    path('catalogos/', CatalogoV.as_view(), name = 'allCatalogos'),
    path('catalogos/<int:id>', CatalogoV.as_view(), name = 'oneCatalogo'),

    path('catalogoVideojuegos/', CatalogoVideojuegoV.as_view(), name = 'allCVs'),
    path('catalogoVideojuegos/<int:idCatalogo>', CatalogoVideojuegoV.as_view(), name = 'allCVs'),
    path('catalogoVideojuegos//<int:idVideojuego>', CatalogoVideojuegoV.as_view(), name = 'allCVs'),
    path('catalogoVideojuegos/<int:idCatalogo>/<int:idVideojuego>', CatalogoVideojuegoV.as_view(), name = 'oneCV'),

    path('comentarios/', ComentarioV.as_view(), name = 'allComentarios'),
    path('comentarios/<int:id>', ComentarioV.as_view(), name = 'oneComentario'),

    path('compraReembolsos/', CompraReembolsoV.as_view(), name = 'allCRs'),
    path('compraReembolsos/<int:idCompra>', CompraReembolsoV.as_view(), name = 'allCRs'),
    path('compraReembolsos//<int:idReembolso>', CompraReembolsoV.as_view(), name = 'allCRs'),
    path('compraReembolsos/<int:idCompra>/<int:idReembolso>', CompraReembolsoV.as_view(), name = 'oneCR'),

    path('compras/', CompraV.as_view(), name = 'allCompras'),
    path('compras/<int:id>', CompraV.as_view(), name = 'oneCompra'),

    path('cupones/', CuponV.as_view(), name = 'allCupones'),
    path('cupones/<int:id>', CuponV.as_view(), name = 'oneCupone'),

    path('divisas/', DivisaV.as_view(), name = 'allDivisas'),
    path('divisas/<int:id>', DivisaV.as_view(), name = 'oneDivisa'),

    path('divisaVideojuegos/', DivisaVideojuegoV.as_view(), name = 'allDVs'),
    path('divisaVideojuegos/<int:idDivisa>', DivisaVideojuegoV.as_view(), name = 'oneDV'),
    path('divisaVideojuegos//<int:idVideojuego>', DivisaVideojuegoV.as_view(), name = 'oneDV'),
    path('divisaVideojuegos/<int:idDivisa>/<int:idVideojuego>', DivisaVideojuegoV.as_view(), name = 'oneDV'),

    path('filtros/', FiltroV.as_view(), name = 'allFiltros'),
    path('filtros/<int:id>', FiltroV.as_view(), name = 'oneFiltro'),

    path('mensajes/', MensajeV.as_view(), name = 'allMensajes'),
    path('mensajes/<int:tipo>', MensajeV.as_view(), name = 'oneMensaje'),

    path('ofertas/', OfertaV.as_view(), name = 'allOfertas'),
    path('ofertas/<int:id>', OfertaV.as_view(), name = 'oneOferta'),

    path('paypals/', PayPalV.as_view(), name = 'allPayPals'),
    path('paypals/<int:id>', PayPalV.as_view(), name = 'onePayPal'),

    path('reembolsos/', ReembolsoV.as_view(), name = 'allReembolsos'),
    path('reembolsos/<int:id>', ReembolsoV.as_view(), name = 'oneReembolso'),

    path('reservaReembolsos/', ReservaReembolsoV.as_view(), name = 'allRRs'),
    path('reservaReembolsos/<int:idReserva>', ReservaReembolsoV.as_view(), name = 'oneRR'),
    path('reservaReembolsos//<int:idReembolso>', ReservaReembolsoV.as_view(), name = 'oneRR'),
    path('reservaReembolsos/<int:idReserva>/<int:idReembolso>', ReservaReembolsoV.as_view(), name = 'oneRR'),

    path('reservas/', ReservaV.as_view(), name = 'allReservas'),
    path('reservas/<int:id>', ReservaV.as_view(), name = 'oneReserva'),

    path('tarjetas/', TarjetaV.as_view(), name = 'allTarjetas'),
    path('tarjetas/<int:id>', TarjetaV.as_view(), name = 'oneTarjeta'),

    path('usuarioComentarios/', UsuarioComentarioV.as_view(), name = 'allUCs'),
    path('usuarioComentarios/<correoUsuario>', UsuarioComentarioV.as_view(), name = 'oneUC'),
    path('usuarioComentarios//<int:idComentario>', UsuarioComentarioV.as_view(), name = 'oneUC'),
    path('usuarioComentarios/<correoUsuario>/<int:idComentario>', UsuarioComentarioV.as_view(), name = 'oneUC'),

    path('usuarioCompras/', UsuarioCompraV.as_view(), name = 'allUCs'),
    path('usuarioCompras/<correoUsuario>', UsuarioCompraV.as_view(), name = 'oneUC'),
    path('usuarioCompras//<int:idCompra>', UsuarioCompraV.as_view(), name = 'oneUC'),
    path('usuarioCompras/<correoUsuario>/<int:idCompra>', UsuarioCompraV.as_view(), name = 'oneUC'),

    path('usuarioCupones/', UsuarioCuponV.as_view(), name = 'allUCs'),
    path('usuarioCupones/<correoUsuario>', UsuarioCuponV.as_view(), name = 'oneUC'),
    path('usuarioCupones//<int:idCupon>', UsuarioCuponV.as_view(), name = 'oneUC'),
    path('usuarioCupones/<correoUsuario>/<int:idCupon>', UsuarioCuponV.as_view(), name = 'oneUC'),

    path('usuarioPayPals/', UsuarioPayPalV.as_view(), name = 'allUPs'),
    path('usuarioPayPals/<correoUsuario>', UsuarioPayPalV.as_view(), name = 'oneUP'),
    path('usuarioPayPals//<int:idPayPal>', UsuarioPayPalV.as_view(), name = 'oneUP'),
    path('usuarioPayPals/<correoUsuario>/<int:idPayPal>', UsuarioPayPalV.as_view(), name = 'oneUP'),

    path('usuarioReembolsos/', UsuarioReembolsoV.as_view(), name = 'allURs'),
    path('usuarioReembolsos/<correoUsuario>', UsuarioReembolsoV.as_view(), name = 'oneUR'),
    path('usuarioReembolsos//<int:idReembolso>', UsuarioReembolsoV.as_view(), name = 'oneUR'),
    path('usuarioReembolsos/<correoUsuario>/<int:idReembolso>', UsuarioReembolsoV.as_view(), name = 'oneUR'),

    path('usuarioReservas/', UsuarioReservaV.as_view(), name = 'allURs'),
    path('usuarioReservas/<correoUsuario>', UsuarioReservaV.as_view(), name = 'oneUR'),
    path('usuarioReservas//<int:idReserva>', UsuarioReservaV.as_view(), name = 'oneUR'),
    path('usuarioReservas/<correoUsuario>/<int:idReserva>', UsuarioReservaV.as_view(), name = 'oneUR'),

    path('usuarioTarjetas/', UsuarioTarjetaV.as_view(), name = 'allUTs'),
    path('usuarioTarjetas/<correoUsuario>', UsuarioTarjetaV.as_view(), name = 'oneUT'),
    path('usuarioTarjetas//<int:idTarjeta>', UsuarioTarjetaV.as_view(), name = 'oneUT'),
    path('usuarioTarjetas/<correoUsuario>/<int:idTarjeta>', UsuarioTarjetaV.as_view(), name = 'oneUT'),

    path('usuarios/', UsuarioV.as_view(), name = 'allUsuarios'),
    path('usuarios/<nombre>', UsuarioV.as_view(), name = 'oneUsuario'),

    path('usuariosWishLists/', UsuarioWishListV.as_view(), name = 'allUWs'),
    path('usuariosWishLists/<correoUsuario>', UsuarioWishListV.as_view(), name = 'oneUW'),
    path('usuariosWishLists//<int:idWishList>', UsuarioWishListV.as_view(), name = 'oneUW'),
    path('usuariosWishLists/<correoUsuario>/<int:idWishList>', UsuarioWishListV.as_view(), name = 'oneUW'),

    path('videojuegoComentarios/', VideojuegoComentarioV.as_view(), name = 'allVCs'),
    path('videojuegoComentarios/<int:idVideojuego>', VideojuegoComentarioV.as_view(), name = 'oneVC'),
    path('videojuegoComentarios//<int:idComentario>', VideojuegoComentarioV.as_view(), name = 'oneVC'),
    path('videojuegoComentarios/<int:idVideojuego>/<int:idComentario>', VideojuegoComentarioV.as_view(), name = 'oneVC'),

    path('videojuegoCompras/', VideojuegoCompraV.as_view(), name = 'allVCs'),
    path('videojuegoCompras/<int:idVideojuego>', VideojuegoCompraV.as_view(), name = 'oneVC'),
    path('videojuegoCompras//<int:idCompra>', VideojuegoCompraV.as_view(), name = 'oneVC'),
    path('videojuegoCompras/<int:idVideojuego>/<int:idCompra>', VideojuegoCompraV.as_view(), name = 'oneVC'),

    path('videojuegoOfertas/', VideojuegoOfertaV.as_view(), name = 'allVOs'),
    path('videojuegoOfertas/<int:idVideojuego>', VideojuegoOfertaV.as_view(), name = 'oneVO'),
    path('videojuegoOfertas//<int:idOferta>', VideojuegoOfertaV.as_view(), name = 'oneVO'),
    path('videojuegoOfertas/<int:idVideojuego>/<int:idOferta>', VideojuegoOfertaV.as_view(), name = 'oneVO'),

    path('videojuegoReservas/', VideojuegoReservaV.as_view(), name = 'allVRs'),
    path('videojuegoReservas/<int:idVideojuego>', VideojuegoReservaV.as_view(), name = 'oneVR'),
    path('videojuegoReservas//<int:idReserva>', VideojuegoReservaV.as_view(), name = 'oneVR'),
    path('videojuegoReservas/<int:idVideojuego>/<int:idReserva>', VideojuegoReservaV.as_view(), name = 'oneVR'),

    path('videojuegos/', VideojuegoV.as_view(), name = 'allVideojuegos'),
    path('videojuegos/<int:id>', VideojuegoV.as_view(), name = 'oneVideojuego'),

    path('wishlists/', WishListV.as_view(), name = 'allWishLists'),
    path('wishlists/<int:id>', WishListV.as_view(), name = 'oneWishList'),

    path('wishlistVideojuegos/', WishListVideojuegoV.as_view(), name = 'allWVs'),
    path('wishlistVideojuegos/<int:idWishList>', WishListVideojuegoV.as_view(), name = 'oneWV'),
    path('wishlistVideojuegos//<int:idVideojuego>', WishListVideojuegoV.as_view(), name = 'oneWV'),
    path('wishlistVideojuegos/<int:idWishList>/<int:idVideojuego>', WishListVideojuegoV.as_view(), name = 'oneWV'),
]