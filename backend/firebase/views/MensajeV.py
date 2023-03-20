from django.apps import apps
from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from firebase.database.Firebase import Firebase
from firebase.database.entidades.Mensaje import Mensaje
import json

db = Firebase()
documento = "Mensajes"

class MensajeV(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, tipo = ""):
        if db.conexionDB and request.method == "GET":
            mensajes = list()

            if tipo != "":
                for key, value in db.getDocumento(documento).items():
                    if value != None and value["tipo"] == tipo:
                        mensajes.append({
                            "titulo": value["titulo"],
                            "descripcion": value["descripcion"],
                            "tipo": value["tipo"]
                        })
            elif tipo == "":
                for key, value in db.getDocumento(documento).items():
                    if value != None:
                        mensajes.append({
                            "titulo": value["titulo"],
                            "descripcion": value["descripcion"],
                            "tipo": value["tipo"]
                        })

            if len(mensajes) > 0:
                return JsonResponse({"message": "Exitoso", f"{documento}": mensajes})
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def post(self, request):
        if db.conexionDB and request.method == "POST":
            jb = json.loads(request.body)
            m = Mensaje(
                jb["titulo"],
                jb["descripcion"],
                jb["tipo"]
            )

            if m.titulo != "":
                db.getDB().reference(documento).push({"titulo": f"{m.titulo}", "descripcion": f"{m.descripcion}", "tipo": f"{m.tipo}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def put(self, request, tipo):
        if db.conexionDB:
            jb = json.loads(request.body)
            m = Mensaje(
                jb["titulo"],
                jb["descripcion"],
                0
            )

            tipos = ['Confirmación', 'Advertencia', 'Error', 'Sin definir']
            i = 0
            for x in tipos:
                if x == jb["tipo"]:
                    m.tipo = i
                i = i + 1
            updatekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and value["tipo"] == m.tipo:
                    updatekey = key
                    break

            if updatekey != "":
                db.getDB().reference(documento).child(updatekey).update({"titulo": f"{m.titulo}", "descripcion": f"{m.descripcion}", "tipo": f"{m.tipo}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)    
        else:
            return JsonResponse(db.mensajePerdida)

    def delete(self, request, titulo):
        if db.conexionDB:
            deletekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and value["titulo"] == titulo:
                    deletekey = key
                    break

            if deletekey != "":
                db.getDB().reference(documento).child(deletekey).delete()
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)