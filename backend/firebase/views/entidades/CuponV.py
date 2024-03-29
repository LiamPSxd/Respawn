from django.apps import apps
from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from firebase.database.Firebase import Firebase
from firebase.database.entidades.Cupon import Cupon
import json

db = Firebase()
documento = "Cupones"

class CuponV(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id = -1, ids = ""):
        if db.conexionDB and request.method == "GET":
            cupones = list()

            if id > -1 and ids == "":
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["id"]) == str(id):
                        cupones.append({
                            "id": value["id"],
                            "nombre": value["nombre"],
                            "descripcion": value["descripcion"],
                            "imagen": value["imagen"]
                        })
            elif id == -1 and ids == "":
                for key, value in db.getDocumento(documento).items():
                    if value != None:
                        cupones.append({
                            "id": value["id"],
                            "nombre": value["nombre"],
                            "descripcion": value["descripcion"],
                            "imagen": value["imagen"]
                        })
            elif ids != "":
                for key, value in db.getDocumento(documento).items():
                    for id in ids.split(","):
                        if value != None and str(value["id"]) == str(id):
                            cupones.append({
                                "id": value["id"],
                                "nombre": value["nombre"],
                                "descripcion": value["descripcion"],
                                "imagen": value["imagen"]
                            })

            if len(cupones) > 0:
                return JsonResponse({"message": "Exitoso", f"{documento}": cupones})
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def post(self, request):
        if db.conexionDB and request.method == "POST":
            jb = json.loads(request.body)
            c = Cupon(
                db.getUltimateKey(documento),
                jb["nombre"],
                jb["descripcion"],
                jb["imagen"]
            )

            if c.nombre != "":
                db.getDB().reference(documento).child(str(c.id)).set({"id": f"{c.id}", "nombre": f"{c.nombre}", "descripcion": f"{c.descripcion}", "imagen": f"{c.imagen}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def put(self, request, id):
        if db.conexionDB:
            jb = json.loads(request.body)
            c = Cupon(
                jb["id"],
                jb["nombre"],
                jb["descripcion"],
                jb["imagen"]
            )
            updatekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["id"]) == c.id and c.id == str(id):
                    updatekey = str(key)
                    break

            if updatekey != "":
                db.getDB().reference(documento).child(updatekey).update({"id": f"{c.id}", "nombre": f"{c.nombre}", "descripcion": f"{c.descripcion}", "imagen": f"{c.imagen}"})
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