from django.apps import apps
from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from firebase.database.Firebase import Firebase
from firebase.database.entidades.PayPal import PayPal
import json

db = Firebase()
documento = "PayPals"

class PayPalV(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id = -1):
        if db.conexionDB and request.method == "GET":
            paypals = list()

            if id > -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and value["id"] == id:
                        paypals.append({
                            "id": value["id"],
                            "saldo": value["saldo"],
                            "correo": value["correo"],
                            "contrasenia": value["contrasenia"],
                            "titular": value["titular"]
                        })
            elif id == -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None:
                        paypals.append({
                            "id": value["id"],
                            "saldo": value["saldo"],
                            "correo": value["correo"],
                            "contrasenia": value["contrasenia"],
                            "titular": value["titular"]
                        })

            if len(paypals) > 0:
                return JsonResponse({"message": "Exitoso", f"{documento}": paypals})
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def post(self, request):
        if db.conexionDB and request.method == "POST":
            jb = json.loads(request.body)
            p = PayPal(
                jb["id"],
                jb["saldo"],
                jb["correo"],
                jb["contrasenia"],
                jb["titular"]
            )

            if p.correo != "":
                db.getDB().reference(documento).child(p.id).push({"id": f"{p.id}", "saldo": f"{p.saldo}", "correo": f"{p.correo}", "contrasenia": f"{p.contrasenia}", "titular": f"{p.titular}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def put(self, request, id):
        if db.conexionDB:
            jb = json.loads(request.body)
            p = PayPal(
                jb["id"],
                jb["saldo"],
                jb["correo"],
                jb["contrasenia"],
                jb["titular"]
            )
            updatekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and value["id"] == p.id:
                    updatekey = key
                    break

            if updatekey != "":
                db.getDB().reference(documento).child(updatekey).update({"id": f"{p.id}", "saldo": f"{p.saldo}", "correo": f"{p.correo}", "contrasenia": f"{p.contrasenia}", "titular": f"{p.titular}"})
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