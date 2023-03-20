from django.apps import apps
from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from firebase.database.Firebase import Firebase
from firebase.database.relaciones.WVU import WVU
import json

db = Firebase()
documento = "WVUs"

class WVUV(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, idW = -1, idV = -1, cU = ""):
        if db.conexionDB and request.method == "GET":
            wvus = list()

            if idW > -1 and idV > -1 and cU != "":
                for key, value in db.getDocumento(documento).items():
                    if value != None and value["idWishList"] == idW and value["idVideojuego"] == idV and value["correoUsuario"] == cU:
                        wvus.append({
                            "idWishList": value["idWishList"],
                            "idVideojuego": value["idVideojuego"],
                            "correoUsuario": value["correoUsuario"]
                        })
            elif idW == -1 and idV == -1 and cU == "":
                for key, value in db.getDocumento(documento).items():
                    if value != None:
                        wvus.append({
                            "idWishList": value["idWishList"],
                            "idVideojuego": value["idVideojuego"],
                            "correoUsuario": value["correoUsuario"]
                        })

            if len(wvus) > 0:
                return JsonResponse({"message": "Exitoso", f"{documento}": wvus})
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def post(self, request):
        if db.conexionDB and request.method == "POST":
            jb = json.loads(request.body)
            wvu = WVU(
                jb["idWishList"],
                jb["idVideojuego"],
                jb["correoUsuario"]
            )

            if wvu.idWishList > -1:
                db.getDB().reference(documento).child(f"{wvu.idWishList}{wvu.idVideojuego}{wvu.correoUsuario}").push({"idWishList": f"{wvu.idWishList}", "idVideojuego": F"{wvu.idVideojuego}", "correoUsuario": f"{wvu.correoUsuario}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def put(self, request, idWishList, idVideojuego, correoUsuario):
        if db.conexionDB:
            jb = json.loads(request.body)
            wvu = WVU(
                jb["idWishList"],
                jb["idVideojuego"],
                jb["correoUsuario"]
            )
            updatekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and value["idWishList"] == wvu.idWishList and value["idVideojuego"] == wvu.idVideojuego and value["correoUsuario"] == wvu.correoUsuario:
                    updatekey = key
                    break

            if updatekey != "":
                db.getDB().reference(documento).child(updatekey).update({"idWishList": f"{wvu.idWishList}", "idVideojuego": F"{wvu.idVideojuego}", "correoUsuario": f"{wvu.correoUsuario}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)    
        else:
            return JsonResponse(db.mensajePerdida)

    def delete(self, request, idWishList, idVideojuego, correoUsuario):
        if db.conexionDB:
            deletekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and value["idWishList"] == idWishList and value["idVideojuego"] == idVideojuego and value["correoUsuario"] == correoUsuario:
                    deletekey = key
                    break

            if deletekey != "":
                db.getDB().reference(documento).child(deletekey).delete()
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)