from django.apps import apps
from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from firebase.database.Firebase import Firebase
from firebase.database.relaciones.ReservaReembolso import ReservaReembolso
import json

db = Firebase()
documento = "ReservaReembolsos"

class ReservaReembolsoV(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, idRe = -1, idR = -1):
        if db.conexionDB and request.method == "GET":
            rrs = list()

            if idRe > -1 and idR > -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and value["idReserva"] == idRe and value["idReembolso"] == idR:
                        rrs.append({
                            "idReserva": value["idReserva"],
                            "idReembolso": value["idReembolso"]
                        })
            elif idRe == -1 and idR == -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None:
                        rrs.append({
                            "idReserva": value["idReserva"],
                            "idReembolso": value["idReembolso"]
                        })

            if len(rrs) > 0:
                return JsonResponse({"message": "Exitoso", f"{documento}": rrs})
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def post(self, request):
        if db.conexionDB and request.method == "POST":
            jb = json.loads(request.body)
            rr = ReservaReembolso(
                jb["idReserva"],
                jb["idReembolso"]
            )

            if rr.idReserva > -1 and rr.idReembolso > -1:
                db.getDB().reference(documento).child(f"{rr.idReserva}{rr.idReembolso}").set({"idReserva": f"{rr.idReserva}", "idReembolso": f"{rr.idReembolso}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def put(self, request, idReserva, idReembolso):
        if db.conexionDB:
            jb = json.loads(request.body)
            rr = ReservaReembolso(
                jb["idReserva"],
                jb["idReembolso"]
            )
            updatekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["idReserva"]) == rr.idReserva and rr.idReserva == idReserva and str(value["idReembolso"]) == rr.idReembolso and rr.idReembolso == idReembolso:
                    updatekey = str(key)
                    break

            if updatekey != "":
                db.getDB().reference(documento).child(updatekey).update({"idReserva": f"{rr.idReserva}", "idReembolso": f"{rr.idReembolso}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)    
        else:
            return JsonResponse(db.mensajePerdida)

    def delete(self, request, idReserva, idReembolso):
        if db.conexionDB:
            deletekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and value["idReserva"] == str(idReserva) and value["idReembolso"] == str(idReembolso):
                    deletekey = str(key)
                    break

            if deletekey != "":
                db.getDB().reference(documento).child(deletekey).delete()
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)