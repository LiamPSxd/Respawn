from django.apps import apps
from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from firebase.database.Firebase import Firebase
from firebase.database.entidades.Videojuego import Videojuego
import json

db = Firebase()
documento = "Videojuegos"

class VideojuegoV(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id = -1):
        if db.conexionDB and request.method == "GET":
            videojuegos = list()

            if id > -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and value["id"] == id:
                        videojuegos.append({
                            "id": value["id"],
                            "nombre": value["nombre"],
                            "descripcion": value["descripcion"],
                            "caratula": value["caratula"],
                            "video": value["video"],
                            "precio": value["precio"],
                            "plataforma": value["plataforma"],
                            "datosExtra": value["datosExtra"],
                            "calificacion": value["calificacion"]
                        })
            elif id == -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None:
                        videojuegos.append({
                            "id": value["id"],
                            "nombre": value["nombre"],
                            "descripcion": value["descripcion"],
                            "caratula": value["caratula"],
                            "video": value["video"],
                            "precio": value["precio"],
                            "plataforma": value["plataforma"],
                            "datosExtra": value["datosExtra"],
                            "calificacion": value["calificacion"]
                        })

            if len(videojuegos) > 0:
                return JsonResponse({"message": "Exitoso", f"{documento}": videojuegos})
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def post(self, request):
        if db.conexionDB and request.method == "POST":
            jb = json.loads(request.body)
            v = Videojuego(
                jb["id"],
                jb["nombre"],
                jb["descripcion"],
                jb["caratula"],
                jb["video"],
                jb["precio"],
                jb["plataforma"],
                jb["datosExtra"],
                jb["calificacion"]
            )

            if v.nombre != "":
                db.getDB().reference(documento).child(v.id).push({"id": f"{v.id}", "nombre": f"{v.nombre}", "descripcion": f"{v.descripcion}", "caratula": f"{v.caratula}", "video": f"{v.video}", "precio": f"{v.precio}", "plataforma": f"{v.plataforma}", "datosExtra": f"{v.datosExtra}", "calificacion": f"{v.calificacion}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def put(self, request, id):
        if db.conexionDB:
            jb = json.loads(request.body)
            v = Videojuego(
                jb["id"],
                jb["nombre"],
                jb["descripcion"],
                jb["caratula"],
                jb["video"],
                jb["precio"],
                jb["plataforma"],
                jb["datosExtra"],
                jb["calificacion"]
            )
            updatekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and value["id"] == v.id:
                    updatekey = key
                    break

            if updatekey != "":
                db.getDB().reference(documento).child(updatekey).update({"id": f"{v.id}", "nombre": f"{v.nombre}", "descripcion": f"{v.descripcion}", "caratula": f"{v.caratula}", "video": f"{v.video}", "precio": f"{v.precio}", "plataforma": f"{v.plataforma}", "datosExtra": f"{v.datosExtra}", "calificacion": f"{v.calificacion}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)    
        else:
            return JsonResponse(db.mensajePerdida)

    def delete(self, request, id):
        if db.conexionDB:
            deletekey = ""
            
            for key, value in db.getDocumento(documento).items():
                if value != None and value["id"] == id:
                    deletekey = key
                    break

            if deletekey != "":
                db.getDB().reference(documento).child(deletekey).delete()
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)