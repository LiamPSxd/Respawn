from django.apps import apps
from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from firebase.database.Firebase import Firebase
from firebase.database.relaciones.VideojuegoReserva import VideojuegoReserva
import json

db = Firebase()
documento = "VideojuegoReservas"

class VideojuegoReservaV(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, idV = -1, idR = -1):
        if db.conexionDB and request.method == "GET":
            vrs = list()

            if idV > -1 and idR > -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and value["idVideojuego"] == idV and value["idReserva"] == idR:
                        vrs.append({
                            "idVideojuego": value["idVideojuego"],
                            "idReserva": value["idReserva"]
                        })
            elif idV == -1 and idR == -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None:
                        vrs.append({
                            "idVideojuego": value["idVideojuego"],
                            "idReserva": value["idReserva"]
                        })

            if len(vrs) > 0:
                return JsonResponse({"message": "Exitoso", f"{documento}": vrs})
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def post(self, request):
        if db.conexionDB and request.method == "POST":
            jb = json.loads(request.body)
            vr = VideojuegoReserva(
                jb["idVideojuego"],
                jb["idReserva"]
            )

            if vr.idVideojuego > -1 and vr.idReserva > -1:
                db.getDB().reference(documento).child(f"{vr.idVideojuego}{vr.idReserva}").set({"idVideojuego": f"{vr.idVideojuego}", "idReserva": f"{vr.idReserva}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def put(self, request, idVideojuego, idReserva):
        if db.conexionDB:
            jb = json.loads(request.body)
            vr = VideojuegoReserva(
                jb["idVideojuego"],
                jb["idReserva"]
            )
            updatekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["idVideojuego"]) == vr.idVideojuego and vr.idVideojuego == idVideojuego and str(value["idReserva"]) == vr.idReserva and vr.idReserva == idReserva:
                    updatekey = str(key)
                    break

            if updatekey != "":
                db.getDB().reference(documento).child(updatekey).update({"idVideojuego": F"{vr.idVideojuego}", "idReserva": f"{vr.idReserva}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)    
        else:
            return JsonResponse(db.mensajePerdida)

    def delete(self, request, idVideojuego, idReserva):
        if db.conexionDB:
            deletekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and value["idVideojuego"] == str(idVideojuego) and value["idReserva"] == str(idReserva):
                    deletekey = str(key)
                    break

            if deletekey != "":
                db.getDB().reference(documento).child(deletekey).delete()
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)