from django.apps import apps
from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from firebase.database.Firebase import Firebase
from firebase.database.relaciones.ReembolsoCompra import ReembolsoCompra
import json

db = Firebase()
documento = "ReembolsoCompras"

class ReembolsoCompraV(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, idR = -1, idC = -1):
        if db.conexionDB and request.method == "GET":
            rcs = list()

            if idR > -1 and idC > -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and value["idReembolso"] == idR and value["idCompra"] == idC:
                        rcs.append({
                            "idReembolso": value["idReembolso"],
                            "idCompra": value["idCompra"]
                        })
            elif idR == -1 and idC == -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None:
                        rcs.append({
                            "idReembolso": value["idReembolso"],
                            "idCompra": value["idCompra"]
                        })

            if len(rcs) > 0:
                return JsonResponse({"message": "Exitoso", f"{documento}": rcs})
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def post(self, request):
        if db.conexionDB and request.method == "POST":
            jb = json.loads(request.body)
            rc = ReembolsoCompra(
                jb["idReembolso"],
                jb["idCompra"]
            )

            if rc.idReembolso > -1:
                db.getDB().reference(documento).child(f"{rc.idReembolso}{rc.idCompra}").push({"idReembolso": f"{rc.idReembolso}", "idCompra": f"{rc.idCompra}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def put(self, request, idReembolso, idCompra):
        if db.conexionDB:
            jb = json.loads(request.body)
            rc = ReembolsoCompra(
                jb["idReembolso"],
                jb["idCompra"]
            )
            updatekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and value["idReembolso"] == rc.idReembolso and value["idCompra"] == rc.idCompra:
                    updatekey = key
                    break

            if updatekey != "":
                db.getDB().reference(documento).child(updatekey).update({"idReembolso": f"{rc.idReembolso}", "idCompra": f"{rc.idCompra}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)    
        else:
            return JsonResponse(db.mensajePerdida)

    def delete(self, request, idReembolso, idCompra):
        if db.conexionDB:
            deletekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and value["idReembolso"] == idReembolso and value["idCompra"] == idCompra:
                    deletekey = key
                    break

            if deletekey != "":
                db.getDB().reference(documento).child(deletekey).delete()
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)