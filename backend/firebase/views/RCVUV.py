from django.apps import apps
from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from firebase.database.Firebase import Firebase
from firebase.database.relaciones.RCVU import RCVU
import json

db = Firebase()
documento = "RCVUs"

class RCVUV(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, idR = -1, idCu = -1, idV = -1, cU = ""):
        if db.conexionDB and request.method == "GET":
            rcvus = list()

            if idR > -1 and idCu > -1 and idV > -1 and cU != "":
                for key, value in db.getDocumento(documento).items():
                    if value != None and value["idReserva"] == idR and value["idCupon"] == idCu and value["idVideojuego"] == idV and value["correoUsuario"] == cU:
                        rcvus.append({
                            "idReserva": value["idReserva"],
                            "idCupon": value["idCupon"],
                            "idVideojuego": value["idVideojuego"],
                            "correoUsuario": value["correoUsuario"]
                        })
            elif idR == -1 and idCu == -1 and idV == -1 and cU == "":
                for key, value in db.getDocumento(documento).items():
                    if value != None:
                        rcvus.append({
                            "idReserva": value["idReserva"],
                            "idCupon": value["idCupon"],
                            "idVideojuego": value["idVideojuego"],
                            "correoUsuario": value["correoUsuario"]
                        })

            if len(rcvus) > 0:
                return JsonResponse({"message": "Exitoso", f"{documento}": rcvus})
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def post(self, request):
        if db.conexionDB and request.method == "POST":
            jb = json.loads(request.body)
            rcvu = RCVU(
                jb["idReserva"],
                jb["idCupon"],
                jb["idVideojuego"],
                jb["correoUsuario"]
            )

            if rcvu.idReserva > -1:
                db.getDB().reference(documento).child(f"{rcvu.idReserva}{rcvu.idCupon}{rcvu.idVideojuego}{rcvu.correoUsuario}").push({"idReserva": f"{rcvu.idReserva}", "idCupon": f"{rcvu.idCupon}", "idVideojuego": F"{rcvu.idVideojuego}", "correoUsuario": f"{rcvu.correoUsuario}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def put(self, request, idReserva, idCupon, idVideojuego, correoUsuario):
        if db.conexionDB:
            jb = json.loads(request.body)
            rcvu = RCVU(
                jb["idReserva"],
                jb["idCupon"],
                jb["idVideojuego"],
                jb["correoUsuario"]
            )
            updatekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and value["idReserva"] == rcvu.idReserva and value["idCupon"] == rcvu.idCupon and value["idVideojuego"] == rcvu.idVideojuego and value["correoUsuario"] == rcvu.correoUsuario:
                    updatekey = key
                    break

            if updatekey != "":
                db.getDB().reference(documento).child(updatekey).update({"idReserva": f"{rcvu.idReserva}", "idCupon": f"{rcvu.idCupon}", "idVideojuego": F"{rcvu.idVideojuego}", "correoUsuario": f"{rcvu.correoUsuario}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)    
        else:
            return JsonResponse(db.mensajePerdida)

    def delete(self, request, idReserva, idCupon, idVideojuego, correoUsuario):
        if db.conexionDB:
            deletekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and value["idReserva"] == idReserva and value["idCupon"] == idCupon and value["idVideojuego"] == idVideojuego and value["correoUsuario"] == correoUsuario:
                    deletekey = key
                    break

            if deletekey != "":
                db.getDB().reference(documento).child(deletekey).delete()
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)