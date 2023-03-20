from django.shortcuts import render
from django.apps import apps
from django.views import View

# def index(request):
#     name = database.getDocumento("Data").get().items()
#     lang = database.getDocumento("Data").get()
    # name = database.child('Data').child('Nombre').get().val()
    # lang = database.child('Data').child('Lenguaje').get().val()
    # framework = database.getDB().child('Data').child('Framework').get().val()
    # m = MensajeF(name, lang, 1)
    # n = OfertaM(0, name, 0.1, lang)
    
    # return render(request, 'index.html', {
        # 'name': name,
        # 'stack': lang,
        # 'framework': framework,
        # 'mensajeM': m.titulo
        # 'mensajeN': n.toString()
    # })

class MensajeV(View):
    pass

class DivisaV(View):
    pass

class Ofertav(View):
    pass

class FiltroV(View):
    pass

class CatalogoV(View):
    pass

class VideojuegoV(View):
    pass

class CompraV(View):
    pass

class ReembolsoV(View):
    pass

class ReservaV(View):
    pass

class TarjetaV(View):
    pass

class UsuarioV(View):
    pass

class ComentarioV(View):
    pass

class PayPalV(View):
    pass

class CuponV(View):
    pass

class WishListV(View):
    pass

class CatalogoVideojuegoV(View):
    pass

class CCVUV(View):
    pass

class ComentarioUsuarioV(View):
    pass

class FiltroCatalogoV(View):
    pass

class PayPalUsuarioV(View):
    pass

class RCVUV(View):
    pass

class ReembolsoCompraV(View):
    pass

class TarjetaUsuarioV(View):
    pass

class VideojuegoOfertaV(View):
    pass

class WVUV(View):
    pass