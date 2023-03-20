from django.apps import apps
from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from firebase.database.Firebase import Firebase
from firebase.database.entidades.Oferta import Oferta
import json

db = Firebase()
documento = "Ofertas"

class OfertaV(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id = -1):
        if db.conexionDB and request.method == "GET":
            ofertas = list()

            if id > -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and value["id"] == id:
                        ofertas.append({
                            "id": value["id"],
                            "nombre": value["nombre"],
                            "descuento": value["descuento"],
                            "tiempo": value["tiempo"]
                        })
            elif id == -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None:
                        ofertas.append({
                            "id": value["id"],
                            "nombre": value["nombre"],
                            "descuento": value["descuento"],
                            "tiempo": value["tiempo"]
                        })

            if len(ofertas) > 0:
                return JsonResponse({"message": "Exitoso", f"{documento}": ofertas})
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def post(self, request):
        if db.conexionDB and request.method == "POST":
            jb = json.loads(request.body)
            o = Oferta(
                jb["id"],
                jb["nombre"],
                jb["descuento"],
                jb["tiempo"]
            )

            if o.nombre != "":
                db.getDB().reference(documento).child(o.id).push({"id": f"{o.id}", "nombre": f"{o.nombre}", "descuento": f"{o.descuento}", "tiempo": f"{o.tiempo}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def put(self, request, id):
        if db.conexionDB:
            jb = json.loads(request.body)
            o = Oferta(
                jb["id"],
                jb["nombre"],
                jb["descuento"],
                jb["tiempo"]
            )
            updatekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and value["id"] == o.id:
                    updatekey = key
                    break

            if updatekey != "":
                db.getDB().reference(documento).child(updatekey).update({"id": f"{o.id}", "nombre": f"{o.nombre}", "descuento": f"{o.descuento}", "tiempo": f"{o.tiempo}"})
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