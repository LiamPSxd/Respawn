from django.apps import apps
from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from firebase.database.Firebase import Firebase
from firebase.database.relaciones.CCVU import CCVU
import json

db = Firebase()
documento = "CCVUs"

class CCVUV(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, idCo = -1, idCu = -1, idV = -1, cU = ""):
        if db.conexionDB and request.method == "GET":
            ccvus = list()

            if idCo > -1 and idCu > -1 and idV > -1 and cU != "":
                for key, value in db.getDocumento(documento).items():
                    if value != None and value["idCompra"] == idCo and value["idCupon"] == idCu and value["idVideojuego"] == idV and value["correoUsuario"] == cU:
                        ccvus.append({
                            "idCompra": value["idCompra"],
                            "idCupon": value["idCupon"],
                            "idVideojuego": value["idVideojuego"],
                            "correoUsuario": value["correoUsuario"]
                        })
            elif idCo == -1 and idCu == -1 and idV == -1 and cU == "":
                for key, value in db.getDocumento(documento).items():
                    if value != None:
                        ccvus.append({
                            "idCompra": value["idCompra"],
                            "idCupon": value["idCupon"],
                            "idVideojuego": value["idVideojuego"],
                            "correoUsuario": value["correoUsuario"]
                        })

            if len(ccvus) > 0:
                return JsonResponse({"message": "Exitoso", f"{documento}": ccvus})
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def post(self, request):
        if db.conexionDB and request.method == "POST":
            jb = json.loads(request.body)
            ccvu = CCVU(
                jb["idCompra"],
                jb["idCupon"],
                jb["idVideojuego"],
                jb["correoUsuario"]
            )

            if ccvu.idCompra > -1:
                db.getDB().reference(documento).child(f"{ccvu.idCompra}{ccvu.idCupon}{ccvu.idVideojuego}{ccvu.correoUsuario}").set({"idCompra": f"{ccvu.idCompra}", "idCupon": f"{ccvu.idCupon}", "idVideojuego": F"{ccvu.idVideojuego}", "correoUsuario": f"{ccvu.correoUsuario}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def put(self, request, idCompra, idCupon, idVideojuego, correoUsuario):
        if db.conexionDB:
            jb = json.loads(request.body)
            ccvu = CCVU(
                jb["idCompra"],
                jb["idCupon"],
                jb["idVideojuego"],
                jb["correoUsuario"]
            )
            updatekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["idCompra"]) == ccvu.idCompra and str(value["idCupon"]) == ccvu.idCupon and str(value["idVideojuego"]) == ccvu.idVideojuego and str(value["correoUsuario"]) == ccvu.correoUsuario:
                    updatekey = str(key)
                    break

            if updatekey != "":
                db.getDB().reference(documento).child(updatekey).update({"idCompra": f"{ccvu.idCompra}", "idCupon": f"{ccvu.idCupon}", "idVideojuego": F"{ccvu.idVideojuego}", "correoUsuario": f"{ccvu.correoUsuario}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)    
        else:
            return JsonResponse(db.mensajePerdida)

    def delete(self, request, idCompra, idCupon, idVideojuego, correoUsuario):
        if db.conexionDB:
            deletekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["idCompra"]) == idCompra and str(value["idCupon"]) == idCupon and str(value["idVideojuego"]) == idVideojuego and str(value["correoUsuario"]) == correoUsuario:
                    deletekey = str(key)
                    break

            if deletekey != "":
                db.getDB().reference(documento).child(deletekey).delete()
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)