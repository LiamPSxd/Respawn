from django.urls import path

from .views.entidades.CatalogoV import CatalogoV
from .views.entidades.ComentarioV import ComentarioV
from .views.entidades.CompraV import CompraV
from .views.entidades.CuponV import CuponV
from .views.entidades.DivisaV import DivisaV
from .views.entidades.FiltroV import FiltroV
from .views.entidades.MensajeV import MensajeV
from .views.entidades.OfertaV import OfertaV
from .views.entidades.PayPalV import PayPalV
from .views.entidades.ReembolsoV import ReembolsoV
from .views.entidades.ReservaV import ReservaV
from .views.entidades.TarjetaV import TarjetaV
from .views.entidades.UsuarioV import UsuarioV
from .views.entidades.VideojuegoV import VideojuegoV
from .views.entidades.WishListV import WishListV
from .views.relaciones.CatalogoFiltroV import CatalogoFiltroV
from .views.relaciones.CatalogoVideojuegoV import CatalogoVideojuegoV
from .views.relaciones.CompraReembolsoV import CompraReembolsoV
from .views.relaciones.DivisaVideojuegoV import DivisaVideojuegoV
from .views.relaciones.ReservaReembolsoV import ReservaReembolsoV
from .views.relaciones.UsuarioComentarioV import UsuarioComentarioV
from .views.relaciones.UsuarioCompraV import UsuarioCompraV
from .views.relaciones.UsuarioCuponV import UsuarioCuponV
from .views.relaciones.UsuarioPayPalV import UsuarioPayPalV
from .views.relaciones.UsuarioReembolsoV import UsuarioReembolsoV
from .views.relaciones.UsuarioReservaV import UsuarioReservaV
from .views.relaciones.UsuarioTarjetaV import UsuarioTarjetaV
from .views.relaciones.UsuarioWishListV import UsuarioWishListV
from .views.relaciones.VideojuegoComentarioV import VideojuegoComentarioV
from .views.relaciones.VideojuegoCompraV import VideojuegoCompraV
from .views.relaciones.VideojuegoOfertaV import VideojuegoOfertaV
from .views.relaciones.VideojuegoReservaV import VideojuegoReservaV
from .views.relaciones.WishListVideojuegoV import WishListVideojuegoV

urlpatterns = [
    path('catalogoFiltros/', CatalogoFiltroV.as_view(), name = 'allCFs'),
    path('catalogoFiltros/<int:idCatalogo>', CatalogoFiltroV.as_view(), name = 'allCFs'),
    path('catalogoFiltros//<int:idFiltro>', CatalogoFiltroV.as_view(), name = 'allCFs'),
    path('catalogoFiltros/<int:idCatalogo>/<int:idFiltro>', CatalogoFiltroV.as_view(), name = 'oneCF'),

    path('catalogos/', CatalogoV.as_view(), name = 'allCatalogos'),
    path('catalogos/<int:id>', CatalogoV.as_view(), name = 'oneCatalogo'),
    path('catalogos/<ids>', CatalogoV.as_view(), name = 'someCatalogos'),

    path('catalogoVideojuegos/', CatalogoVideojuegoV.as_view(), name = 'allCVs'),
    path('catalogoVideojuegos/<int:idCatalogo>', CatalogoVideojuegoV.as_view(), name = 'allCVs'),
    path('catalogoVideojuegos//<int:idVideojuego>', CatalogoVideojuegoV.as_view(), name = 'allCVs'),
    path('catalogoVideojuegos/<int:idCatalogo>/<int:idVideojuego>', CatalogoVideojuegoV.as_view(), name = 'oneCV'),

    path('comentarios/', ComentarioV.as_view(), name = 'allComentarios'),
    path('comentarios/<int:id>', ComentarioV.as_view(), name = 'oneComentario'),
    path('comentarios/<ids>', ComentarioV.as_view(), name = 'someComentarios'),

    path('compraReembolsos/', CompraReembolsoV.as_view(), name = 'allCRs'),
    path('compraReembolsos/<int:idCompra>', CompraReembolsoV.as_view(), name = 'allCRs'),
    path('compraReembolsos//<int:idReembolso>', CompraReembolsoV.as_view(), name = 'allCRs'),
    path('compraReembolsos/<int:idCompra>/<int:idReembolso>', CompraReembolsoV.as_view(), name = 'oneCR'),

    path('compras/', CompraV.as_view(), name = 'allCompras'),
    path('compras/<int:id>', CompraV.as_view(), name = 'oneCompra'),
    path('compras/<ids>', CompraV.as_view(), name = 'someCompras'),

    path('cupones/', CuponV.as_view(), name = 'allCupones'),
    path('cupones/<int:id>', CuponV.as_view(), name = 'oneCupon'),
    path('cupones/<ids>', CuponV.as_view(), name = 'someCupones'),

    path('divisas/', DivisaV.as_view(), name = 'allDivisas'),
    path('divisas/<int:id>', DivisaV.as_view(), name = 'oneDivisa'),
    path('divisas/<ids>', DivisaV.as_view(), name = 'someDivisas'),

    path('divisaVideojuegos/', DivisaVideojuegoV.as_view(), name = 'allDVs'),
    path('divisaVideojuegos/<int:idDivisa>', DivisaVideojuegoV.as_view(), name = 'oneDV'),
    path('divisaVideojuegos//<int:idVideojuego>', DivisaVideojuegoV.as_view(), name = 'oneDV'),
    path('divisaVideojuegos/<int:idDivisa>/<int:idVideojuego>', DivisaVideojuegoV.as_view(), name = 'oneDV'),

    path('filtros/', FiltroV.as_view(), name = 'allFiltros'),
    path('filtros/<int:id>', FiltroV.as_view(), name = 'oneFiltro'),
    path('filtros/<ids>', FiltroV.as_view(), name = 'someFiltros'),
    path('filtros/<int:id>/videojuegos', FiltroV.as_view(), name = 'someVideojuegos'),

    path('mensajes/', MensajeV.as_view(), name = 'allMensajes'),
    path('mensajes/<int:tipo>', MensajeV.as_view(), name = 'oneMensaje'),
    path('mensajes/<tipos>', MensajeV.as_view(), name = 'someMensajes'),

    path('ofertas/', OfertaV.as_view(), name = 'allOfertas'),
    path('ofertas/<int:id>', OfertaV.as_view(), name = 'oneOferta'),
    path('ofertas/<ids>', OfertaV.as_view(), name = 'someOfertas'),

    path('paypals/', PayPalV.as_view(), name = 'allPayPals'),
    path('paypals/<int:id>', PayPalV.as_view(), name = 'onePayPal'),
    path('paypals/<ids>', PayPalV.as_view(), name = 'somePayPals'),

    path('reembolsos/', ReembolsoV.as_view(), name = 'allReembolsos'),
    path('reembolsos/<int:id>', ReembolsoV.as_view(), name = 'oneReembolso'),
    path('reembolsos/<ids>', ReembolsoV.as_view(), name = 'someReembolsos'),

    path('reservaReembolsos/', ReservaReembolsoV.as_view(), name = 'allRRs'),
    path('reservaReembolsos/<int:idReserva>', ReservaReembolsoV.as_view(), name = 'oneRR'),
    path('reservaReembolsos//<int:idReembolso>', ReservaReembolsoV.as_view(), name = 'oneRR'),
    path('reservaReembolsos/<int:idReserva>/<int:idReembolso>', ReservaReembolsoV.as_view(), name = 'oneRR'),

    path('reservas/', ReservaV.as_view(), name = 'allReservas'),
    path('reservas/<int:id>', ReservaV.as_view(), name = 'oneReserva'),
    path('reservas/<ids>', ReservaV.as_view(), name = 'someReservas'),

    path('tarjetas/', TarjetaV.as_view(), name = 'allTarjetas'),
    path('tarjetas/<int:id>', TarjetaV.as_view(), name = 'oneTarjeta'),
    path('tarjetas/<ids>', TarjetaV.as_view(), name = 'someTarjetas'),

    path('usuarioComentarios/', UsuarioComentarioV.as_view(), name = 'allUCs'),
    path('usuarioComentarios/<int:idUsuario>', UsuarioComentarioV.as_view(), name = 'oneUC'),
    path('usuarioComentarios//<int:idComentario>', UsuarioComentarioV.as_view(), name = 'oneUC'),
    path('usuarioComentarios/<int:idUsuario>/<int:idComentario>', UsuarioComentarioV.as_view(), name = 'oneUC'),

    path('usuarioCompras/', UsuarioCompraV.as_view(), name = 'allUCs'),
    path('usuarioCompras/<int:idUsuario>', UsuarioCompraV.as_view(), name = 'oneUC'),
    path('usuarioCompras//<int:idCompra>', UsuarioCompraV.as_view(), name = 'oneUC'),
    path('usuarioCompras/<int:idUsuario>/<int:idCompra>', UsuarioCompraV.as_view(), name = 'oneUC'),

    path('usuarioCupones/', UsuarioCuponV.as_view(), name = 'allUCs'),
    path('usuarioCupones/<int:idUsuario>', UsuarioCuponV.as_view(), name = 'oneUC'),
    path('usuarioCupones//<int:idCupon>', UsuarioCuponV.as_view(), name = 'oneUC'),
    path('usuarioCupones/<int:idUsuario>/<int:idCupon>', UsuarioCuponV.as_view(), name = 'oneUC'),

    path('usuarioPayPals/', UsuarioPayPalV.as_view(), name = 'allUPs'),
    path('usuarioPayPals/<int:idUsuario>', UsuarioPayPalV.as_view(), name = 'oneUP'),
    path('usuarioPayPals//<int:idPayPal>', UsuarioPayPalV.as_view(), name = 'oneUP'),
    path('usuarioPayPals/<int:idUsuario>/<int:idPayPal>', UsuarioPayPalV.as_view(), name = 'oneUP'),

    path('usuarioReembolsos/', UsuarioReembolsoV.as_view(), name = 'allURs'),
    path('usuarioReembolsos/<int:idUsuario>', UsuarioReembolsoV.as_view(), name = 'oneUR'),
    path('usuarioReembolsos//<int:idReembolso>', UsuarioReembolsoV.as_view(), name = 'oneUR'),
    path('usuarioReembolsos/<int:idUsuario>/<int:idReembolso>', UsuarioReembolsoV.as_view(), name = 'oneUR'),

    path('usuarioReservas/', UsuarioReservaV.as_view(), name = 'allURs'),
    path('usuarioReservas/<int:idUsuario>', UsuarioReservaV.as_view(), name = 'oneUR'),
    path('usuarioReservas//<int:idReserva>', UsuarioReservaV.as_view(), name = 'oneUR'),
    path('usuarioReservas/<int:idUsuario>/<int:idReserva>', UsuarioReservaV.as_view(), name = 'oneUR'),

    path('usuarioTarjetas/', UsuarioTarjetaV.as_view(), name = 'allUTs'),
    path('usuarioTarjetas/<int:idUsuario>', UsuarioTarjetaV.as_view(), name = 'oneUT'),
    path('usuarioTarjetas//<int:idTarjeta>', UsuarioTarjetaV.as_view(), name = 'oneUT'),
    path('usuarioTarjetas/<int:idUsuario>/<int:idTarjeta>', UsuarioTarjetaV.as_view(), name = 'oneUT'),

    path('usuarios/', UsuarioV.as_view(), name = 'allUsuarios'),
    path('usuarios/<int:id>', UsuarioV.as_view(), name = 'oneUsuario'),
    path('usuarios/<ids>', UsuarioV.as_view(), name = 'someUsuarios'),
    path('usuarios//<correo>', UsuarioV.as_view(), name = 'oneUsuario'),

    path('usuariosWishLists/', UsuarioWishListV.as_view(), name = 'allUWs'),
    path('usuariosWishLists/<int:idUsuario>', UsuarioWishListV.as_view(), name = 'oneUW'),
    path('usuariosWishLists//<int:idWishList>', UsuarioWishListV.as_view(), name = 'oneUW'),
    path('usuariosWishLists/<int:idUsuario>/<int:idWishList>', UsuarioWishListV.as_view(), name = 'oneUW'),

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
    path('videojuegos/<ids>', VideojuegoV.as_view(), name = 'someVideojuegos'),

    path('wishlists/', WishListV.as_view(), name = 'allWishLists'),
    path('wishlists/<int:id>', WishListV.as_view(), name = 'oneWishList'),
    path('wishlists/<ids>', VideojuegoV.as_view(), name = 'someWishList'),

    path('wishlistVideojuegos/', WishListVideojuegoV.as_view(), name = 'allWVs'),
    path('wishlistVideojuegos/<int:idWishList>', WishListVideojuegoV.as_view(), name = 'oneWV'),
    path('wishlistVideojuegos//<int:idVideojuego>', WishListVideojuegoV.as_view(), name = 'oneWV'),
    path('wishlistVideojuegos/<int:idWishList>/<int:idVideojuego>', WishListVideojuegoV.as_view(), name = 'oneWV'),
]