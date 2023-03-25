from django.apps import apps
from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from firebase.database.Firebase import Firebase
from firebase.database.relaciones.CompraReembolso import CompraReembolso
import json

db = Firebase()
documento = "CompraReembolsos"

class CompraReembolsoV(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, idC = -1, idR = -1):
        if db.conexionDB and request.method == "GET":
            crs = list()

            if idC > -1 and idR > -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and value["idCompra"] == str(idC) and value["idReembolso"] == str(idR):
                        crs.append({
                            "idCompra": value["idCompra"],
                            "idReembolso": value["idReembolso"]
                        })
            elif idC == -1 and idR == -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None:
                        crs.append({
                            "idCompra": value["idCompra"],
                            "idReembolso": value["idReembolso"]
                        })

            if len(crs) > 0:
                return JsonResponse({"message": "Exitoso", f"{documento}": crs})
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def post(self, request):
        if db.conexionDB and request.method == "POST":
            jb = json.loads(request.body)
            cr = CompraReembolso(
                jb["idCompra"],
                jb["idReembolso"]
            )

            if cr.idCompra > -1 and cr.idReembolso > -1:
                db.getDB().reference(documento).child(f"{cr.idCompra}{cr.idReembolso}").set({"idCompra": f"{cr.idCompra}", "idReembolso": f"{cr.idReembolso}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def put(self, request, idCompra, idReembolso):
        if db.conexionDB:
            jb = json.loads(request.body)
            cr = CompraReembolso(
                jb["idCompra"],
                jb["idReembolso"]
            )
            updatekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["idCompra"]) == cr.idCompra and cr.idCompra == str(idCompra) and str(value["idReembolso"]) == cr.idReembolso and cr.idReembolso == str(idReembolso):
                    updatekey = str(key)
                    break

            if updatekey != "":
                db.getDB().reference(documento).child(updatekey).update({"idCompra": f"{cr.idCompra}", "idReembolso": f"{cr.idReembolso}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)    
        else:
            return JsonResponse(db.mensajePerdida)

    def delete(self, request, idCompra, idReembolso):
        if db.conexionDB:
            deletekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and value["idCompra"] == str(idCompra) and value["idReembolso"] == str(idReembolso):
                    deletekey = str(key)
                    break

            if deletekey != "":
                db.getDB().reference(documento).child(deletekey).delete()
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)