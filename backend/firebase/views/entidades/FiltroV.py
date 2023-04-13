from django.apps import apps
from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from firebase.database.Firebase import Firebase
from firebase.database.entidades.Filtro import Filtro
import json

db = Firebase()
documento = "Filtros"

class FiltroV(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id = -1, ids = ""):
        if db.conexionDB and request.method == "GET":
            filtros = list()

            if id > -1 and ids == "":
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["id"]) == str(id):
                        filtros.append({
                            "id": value["id"],
                            "nombre": value["nombre"]
                        })
            elif id == -1 and ids == "":
                for key, value in db.getDocumento(documento).items():
                    if value != None:
                        filtros.append({
                            "id": value["id"],
                            "nombre": value["nombre"]
                        })
            elif ids != "":
                for key, value in db.getDocumento(documento).items():
                    for id in ids.split(","):
                        if value != None and str(value["id"]) == str(id):
                            filtros.append({
                                "id": value["id"],
                                "nombre": value["nombre"]
                            })

            if len(filtros) > 0:
                return JsonResponse({"message": "Exitoso", f"{documento}": filtros})
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def post(self, request):
        if db.conexionDB and request.method == "POST":
            jb = json.loads(request.body)
            f = Filtro(
                db.getUltimateKey(documento),
                jb["nombre"]
            )

            if f.nombre != "":
                db.getDB().reference(documento).child(str(f.id)).set({"id": f"{f.id}", "nombre": f"{f.nombre}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def put(self, request, id):
        if db.conexionDB:
            jb = json.loads(request.body)
            f = Filtro(
                jb["id"],
                jb["nombre"]
            )
            updatekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["id"]) == f.id and f.id == str(id):
                    updatekey = str(key)
                    break

            if updatekey != "":
                db.getDB().reference(documento).child(updatekey).update({"id": f"{f.id}", "nombre": f"{f.nombre}"})
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