from django.apps import apps
from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from firebase.database.Firebase import Firebase
from firebase.database.entidades.Divisa import Divisa
import json

db = Firebase()
documento = "Divisas"

class DivisaV(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id = -1, ids = ""):
        if db.conexionDB and request.method == "GET":
            divisas = list()

            if id > -1 and ids == "":
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["id"]) == str(id):
                        divisas.append({
                            "id": value["id"],
                            "nombre": value["nombre"],
                            "pais": value["pais"],
                            "valor": value["valor"],
                            "simbolo": value["simbolo"],
                            "seleccionado": value["seleccionado"],
                            "hora": value["hora"]
                        })
            elif id == -1 and ids == "":
                for key, value in db.getDocumento(documento).items():
                    if value != None:
                        divisas.append({
                            "id": value["id"],
                            "nombre": value["nombre"],
                            "pais": value["pais"],
                            "valor": value["valor"],
                            "simbolo": value["simbolo"],
                            "seleccionado": value["seleccionado"],
                            "hora": value["hora"]
                        })
            elif ids != "":
                for key, value in db.getDocumento(documento).items():
                    for id in ids.split(","):
                        if value != None and str(value["id"]) == str(id):
                            divisas.append({
                                "id": value["id"],
                                "nombre": value["nombre"],
                                "pais": value["pais"],
                                "valor": value["valor"],
                                "simbolo": value["simbolo"],
                                "seleccionado": value["seleccionado"],
                                "hora": value["hora"]
                            })

            if len(divisas) > 0:
                return JsonResponse({"message": "Exitoso", f"{documento}": divisas})
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def post(self, request):
        if db.conexionDB and request.method == "POST":
            jb = json.loads(request.body)
            d = Divisa(
                db.getUltimateKey(documento),
                jb["nombre"],
                jb["pais"],
                jb["valor"],
                jb["simbolo"],
                jb["seleccionado"],
                jb["hora"]
            )

            if d.nombre != "":
                db.getDB().reference(documento).child(str(d.id)).set({"id": f"{d.id}", "nombre": f"{d.nombre}", "pais": f"{d.pais}", "valor": f"{d.valor}", "simbolo": f"{d.simbolo}", "seleccionado": f"{d.seleccionado}", "hora": f"{d.hora}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def put(self, request, id):
        if db.conexionDB:
            jb = json.loads(request.body)
            d = Divisa(
                jb["id"],
                jb["nombre"],
                jb["pais"],
                jb["valor"],
                jb["simbolo"],
                jb["seleccionado"],
                jb["hora"]
            )
            updatekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["id"]) == d.id and d.id == str(id):
                    updatekey = str(key)
                    break

            if updatekey != "":
                db.getDB().reference(documento).child(updatekey).update({"id": f"{d.id}", "nombre": f"{d.nombre}", "pais": f"{d.pais}", "valor": f"{d.valor}", "simbolo": f"{d.simbolo}", "seleccionado": f"{d.seleccionado}", "hora": f"{d.hora}"})
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