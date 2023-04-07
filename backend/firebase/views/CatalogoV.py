from django.apps import apps
from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from firebase.database.Firebase import Firebase
from firebase.database.entidades.Catalogo import Catalogo
import json

db = Firebase()
documento = "Catalogos"

class CatalogoV(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id = -1, ids = ""):
        if db.conexionDB and request.method == "GET":
            catalogos = list()

            if id > -1 and ids == "":
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["id"]) == str(id):
                        catalogos.append({
                            "id": value["id"],
                            "nombre": value["nombre"],
                            "banner": value["banner"]
                        })
            elif id == -1 and ids == "":
                for key, value in db.getDocumento(documento).items():
                    if value != None:
                        catalogos.append({
                            "id": value["id"],
                            "nombre": value["nombre"],
                            "banner": value["banner"]
                        })
            elif ids != "":
                for key, value in db.getDocumento(documento).items():
                    for id in ids.split(","):
                        if value != None and str(value["id"]) == str(id):
                            catalogos.append({
                                "id": value["id"],
                                "nombre": value["nombre"],
                                "banner": value["banner"]
                            })

            if len(catalogos) > 0:
                return JsonResponse({"message": "Exitoso", f"{documento}": catalogos})
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def post(self, request):
        if db.conexionDB and request.method == "POST":
            jb = json.loads(request.body)
            c = Catalogo(
                db.getUltimateKey(documento),
                jb["nombre"],
                jb["banner"]
            )

            if c.nombre != "":
                db.getDB().reference(documento).child(str(c.id)).set({"id": f"{c.id}", "nombre": f"{c.nombre}", "banner": f"{c.banner}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def put(self, request, id):
        if db.conexionDB:
            jb = json.loads(request.body)
            c = Catalogo(
                jb["id"],
                jb["nombre"],
                jb["banner"]
            )
            updatekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["id"]) == c.id and c.id == str(id):
                    updatekey = str(key)
                    break

            if updatekey != "":
                db.getDB().reference(documento).child(updatekey).update({"id": f"{c.id}", "nombre": f"{c.nombre}", "banner": f"{c.banner}"})
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