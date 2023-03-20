from django.apps import apps
from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from firebase.database.Firebase import Firebase
from firebase.database.relaciones.PayPalUsuario import PayPalUsuario
import json

db = Firebase()
documento = "PayPalUsuarios"

class PayPalUsuarioV(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, idP = -1, cU = ""):
        if db.conexionDB and request.method == "GET":
            pus = list()

            if idP > -1 and cU != "":
                for key, value in db.getDocumento(documento).items():
                    if value != None and value["idPayPal"] == idP and value["correoUsuario"] == cU:
                        pus.append({
                            "idPayPal": value["idPayPal"],
                            "correoUsuario": value["correoUsuario"]
                        })
            elif idP == -1 and cU == "":
                for key, value in db.getDocumento(documento).items():
                    if value != None:
                        pus.append({
                            "idPayPal": value["idPayPal"],
                            "correoUsuario": value["correoUsuario"]
                        })

            if len(pus) > 0:
                return JsonResponse({"message": "Exitoso", f"{documento}": pus})
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def post(self, request):
        if db.conexionDB and request.method == "POST":
            jb = json.loads(request.body)
            pu = PayPalUsuario(
                jb["idPayPal"],
                jb["correoUsuario"]
            )

            if pu.idPayPal > -1:
                db.getDB().reference(documento).child(f"{pu.idPayPal}{pu.correoUsuario}").push({"idPayPal": f"{pu.idPayPal}", "correoUsuario": f"{pu.correoUsuario}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def put(self, request, idPayPal, correoUsuario):
        if db.conexionDB:
            jb = json.loads(request.body)
            pu = PayPalUsuario(
                jb["idPayPal"],
                jb["correoUsuario"]
            )
            updatekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["idPayPal"]) == pu.idPayPal and str(value["correoUsuario"]) == pu.correoUsuario:
                    updatekey = str(key)
                    break

            if updatekey != "":
                db.getDB().reference(documento).child(updatekey).update({"idPayPal": F"{pu.idPayPal}", "correoUsuario": f"{pu.correoUsuario}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)    
        else:
            return JsonResponse(db.mensajePerdida)

    def delete(self, request, idPayPal, correoUsuario):
        if db.conexionDB:
            deletekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["idPayPal"]) == idPayPal and str(value["correoUsuario"]) == correoUsuario:
                    deletekey = str(key)
                    break

            if deletekey != "":
                db.getDB().reference(documento).child(deletekey).delete()
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)