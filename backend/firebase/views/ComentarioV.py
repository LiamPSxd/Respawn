from django.apps import apps
from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from firebase.database.Firebase import Firebase
from firebase.database.entidades.Comentario import Comentario
import json

db = Firebase()
documento = "Comentarios"

class ComentarioV(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id = -1):
        if db.conexionDB and request.method == "GET":
            comentarios = list()

            if id > -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["id"]) == str(id):
                        comentarios.append({
                            "id": value["id"],
                            "titulo": value["titulo"],
                            "contenido": value["contenido"]
                        })
            elif id == -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None:
                        comentarios.append({
                            "id": value["id"],
                            "titulo": value["titulo"],
                            "contenido": value["contenido"]
                        })

            if len(comentarios) > 0:
                return JsonResponse({"message": "Exitoso", f"{documento}": comentarios})
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def post(self, request):
        if db.conexionDB and request.method == "POST":
            jb = json.loads(request.body)
            c = Comentario(
                db.getUltimateKey(documento),
                jb["titulo"],
                jb["contenido"]
            )

            if c.titulo != "":
                db.getDB().reference(documento).child(str(c.id)).set({"id": f"{c.id}", "titulo": f"{c.titulo}", "contenido": f"{c.contenido}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def put(self, request, id):
        if db.conexionDB:
            jb = json.loads(request.body)
            c = Comentario(
                jb["id"],
                jb["titulo"],
                jb["contenido"]
            )
            updatekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["id"]) == c.id and c.id == str(id):
                    updatekey = str(key)
                    break

            if updatekey != "":
                db.getDB().reference(documento).child(updatekey).update({"id": f"{c.id}", "titulo": f"{c.titulo}", "contenido": f"{c.contenido}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)    
        else:
            return JsonResponse(db.mensajePerdida)

    def delete(self, request, id):
        if db.conexionDB:
            deletekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["id"]) == str(id):
                    deletekey = str(key)
                    break

            if deletekey != "":
                db.getDB().reference(documento).child(deletekey).delete()
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)