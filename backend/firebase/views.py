from django.shortcuts import render
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from .models import Mensaje as M
import pyrebase, json

config = {
    "apiKey": "AIzaSyCrMz8AHpJFYkqU16jqhmRPbvF3z56ZyjE",
    "authDomain": "respawn-2f8ea.firebaseapp.com",
    "databaseURL": "https://respawn-2f8ea-default-rtdb.firebaseio.com",
    "projectId": "respawn-2f8ea",
    "storageBucket": "respawn-2f8ea.appspot.com",
    "messagingSenderId": "959427699506",
    "appId": "1:959427699506:web:bd8a270a1754c09f30ed2b",
    "measurementId": "G-047ENKDP0D"
}

firebase = pyrebase.initialize_app(config)
authe = firebase.auth()
database = firebase.database()

def index(request):
    name = database.child('Data').child('Nombre').get().val()
    lang = database.child('Data').child('Lenguaje').get().val()
    framework = database.child('Data').child('Framework').get().val()
    m = M(name, lang, 1)
    n = m.a()
    
    return render(request, 'index.html', {
        # 'name': name,
        # 'stack': lang,
        # 'framework': framework,
        'mensaje': n
    })

# class Mensaje(View):
#     @method_decorator(csrf_exempt)
#     def dispatch(self, request, *args, **kwargs):
#         return super().dispatch(request, *args, **kwargs)

#     def get(self, request):
#         return index()
        # mensajes = list(mensaje.objects.values())

        # if len(mensajes) > 0:
        #     datos = {'message': "Exitoso", 'Mensaje': mensaje}
        # else:
        #     datos = {'message': "Mensajes no encontrados..."}

        # return JsonResponse(datos)