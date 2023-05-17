from django.apps import apps
from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from firebase.database.Firebase import Firebase
from firebase.database.relaciones.DivisaVideojuego import DivisaVideojuego
import json

db = Firebase()
documento = "DivisaVideojuegos"

class DivisaVideojuegoV(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, idDivisa = -1, idVideojuego = -1):
        if db.conexionDB and request.method == "GET":
            dvs = list()

            if idDivisa > -1 and idVideojuego > -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["idDivisa"]) == str(idDivisa) and str(value["idVideojuego"]) == str(idVideojuego):
                        dvs.append({
                            "idDivisa": value["idDivisa"],
                            "idVideojuego": value["idVideojuego"]
                        })
            elif idDivisa > -1 and idVideojuego == -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["idDivisa"]) == str(idDivisa):
                        dvs.append({
                            "idDivisa": value["idDivisa"],
                            "idVideojuego": value["idVideojuego"]
                        })
            elif idDivisa == -1 and idVideojuego > -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["idVideojuego"]) == str(idVideojuego):
                        dvs.append({
                            "idDivisa": value["idDivisa"],
                            "idVideojuego": value["idVideojuego"]
                        })
            elif idDivisa == -1 and idVideojuego == -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None:
                        dvs.append({
                            "idDivisa": value["idDivisa"],
                            "idVideojuego": value["idVideojuego"]
                        })

            if len(dvs) > 0:
                return JsonResponse({"message": "Exitoso", f"{documento}": dvs})
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def post(self, request):
        if db.conexionDB and request.method == "POST":
            jb = json.loads(request.body)
            dv = DivisaVideojuego(
                jb["idDivisa"],
                jb["idVideojuego"]
            )

            if dv.idDivisa != -1 and dv.idVideojuego != -1:
                db.getDB().reference(documento).child(f"{dv.idDivisa}{dv.idVideojuego}").set({"idDivisa": f"{dv.idDivisa}", "idVideojuego": f"{dv.idVideojuego}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def put(self, request, idDivisa, idVideojuego):
        if db.conexionDB:
            jb = json.loads(request.body)
            dv = DivisaVideojuego(
                jb["idDivisa"],
                jb["idVideojuego"]
            )
            updatekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["idDivisa"]) == dv.idDivisa and dv.idDivisa == str(idDivisa) and str(value["idVideojuego"]) == dv.idVideojuego and dv.idVideojuego == str(idVideojuego):
                    updatekey = str(key)
                    break

            if updatekey != "":
                db.getDB().reference(documento).child(updatekey).update({"idDivisa": f"{dv.idDivisa}", "idVideojuego": f"{dv.idVideojuego}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)    
        else:
            return JsonResponse(db.mensajePerdida)

    def delete(self, request, idDivisa, idVideojuego):
        if db.conexionDB:
            deletekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["idDivisa"]) == str(idDivisa) and str(value["idVideojuego"]) == str(idVideojuego):
                    deletekey = str(key)
                    break

            if deletekey != "":
                db.getDB().reference(documento).child(deletekey).delete()
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)