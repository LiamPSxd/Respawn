from django.apps import apps
from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from firebase.database.Firebase import Firebase
from firebase.database.entidades.Tarjeta import Tarjeta
import json

db = Firebase()
documento = "Tarjetas"

class TarjetaV(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id = -1):
        if db.conexionDB and request.method == "GET":
            tarjetas = list()

            if id > -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and value["id"] == str(id):
                        tarjetas.append({
                            "id": value["id"],
                            "saldo": value["saldo"],
                            "tipo": value["tipo"],
                            "pan": value["pan"],
                            "fechaCaducidad": value["fechaCaducidad"],
                            "cvv": value["cvv"],
                            "titular": value["titular"]
                        })
            elif id == -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None:
                        tarjetas.append({
                            "id": value["id"],
                            "saldo": value["saldo"],
                            "tipo": value["tipo"],
                            "pan": value["pan"],
                            "fechaCaducidad": value["fechaCaducidad"],
                            "cvv": value["cvv"],
                            "titular": value["titular"]
                        })

            if len(tarjetas) > 0:
                return JsonResponse({"message": "Exitoso", f"{documento}": tarjetas})
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def post(self, request):
        if db.conexionDB and request.method == "POST":
            jb = json.loads(request.body)
            t = Tarjeta(
                db.getUltimateKey(documento),
                jb["saldo"],
                jb["tipo"],
                jb["pan"],
                jb["fechaCaducidad"],
                jb["cvv"],
                jb["titular"]
            )

            if t.tipo != "":
                db.getDB().reference(documento).child(str(t.id)).set({"id": f"{t.id}", "saldo": f"{t.saldo}", "tipo": f"{t.tipo}", "pan": f"{t.pan}", "fechaCaducidad": f"{t.fechaCaducidad}", "cvv": f"{t.cvv}", "titular": f"{t.titular}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def put(self, request, id):
        if db.conexionDB:
            jb = json.loads(request.body)
            t = Tarjeta(
                jb["id"],
                jb["saldo"],
                jb["tipo"],
                jb["pan"],
                jb["fechaCaducidad"],
                jb["cvv"],
                jb["titular"]
            )
            updatekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["id"]) == t.id and t.id == str(id):
                    updatekey = str(key)
                    break

            if updatekey != "":
                db.getDB().reference(documento).child(updatekey).update({"id": f"{t.id}", "saldo": f"{t.saldo}", "tipo": f"{t.tipo}", "pan": f"{t.pan}", "fechaCaducidad": f"{t.fechaCaducidad}", "cvv": f"{t.cvv}", "titular": f"{t.titular}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)    
        else:
            return JsonResponse(db.mensajePerdida)

    def delete(self, request, id):
        if db.conexionDB:
            deletekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and value["id"] == str(id):
                    deletekey = str(key)
                    break

            if deletekey != "":
                db.getDB().reference(documento).child(deletekey).delete()
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)