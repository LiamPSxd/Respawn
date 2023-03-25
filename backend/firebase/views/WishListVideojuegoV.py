from django.apps import apps
from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from firebase.database.Firebase import Firebase
from firebase.database.relaciones.WishListVideojuego import WishListVideojuego
import json

db = Firebase()
documento = "WishListVideojuegos"

class WishListVideojuegoV(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, idW = -1, idV = -1):
        if db.conexionDB and request.method == "GET":
            wvs = list()

            if idW > -1 and idV > -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and value["idWishList"] == str(idW) and value["idVideojuego"] == str(idV):
                        wvs.append({
                            "idWishList": value["idWishList"],
                            "idVideojuego": value["idVideojuego"]
                        })
            elif idW == -1 and idV == -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None:
                        wvs.append({
                            "idWishList": value["idWishList"],
                            "idVideojuego": value["idVideojuego"]
                        })

            if len(wvs) > 0:
                return JsonResponse({"message": "Exitoso", f"{documento}": wvs})
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def post(self, request):
        if db.conexionDB and request.method == "POST":
            jb = json.loads(request.body)
            wv = WishListVideojuego(
                jb["idWishList"],
                jb["idVideojuego"]
            )

            if wv.idWishList > -1 and wv.idVideojuego > -1:
                db.getDB().reference(documento).child(f"{wv.idWishList}{wv.idVideojuego}").set({"idWishList": f"{wv.idWishList}", "idVideojuego": f"{wv.idVideojuego}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def put(self, request, idWishList, idVideojuego):
        if db.conexionDB:
            jb = json.loads(request.body)
            wv = WishListVideojuego(
                jb["idWishList"],
                jb["idVideojuego"]
            )
            updatekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["idWishList"]) == wv.idWishList and wv.idWishList == str(idWishList) and str(value["idVideojuego"]) == wv.idVideojuego and wv.idVideojuego == str(idVideojuego):
                    updatekey = str(key)
                    break

            if updatekey != "":
                db.getDB().reference(documento).child(updatekey).update({"idWishList": F"{wv.idWishList}", "idVideojuego": f"{wv.idVideojuego}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)    
        else:
            return JsonResponse(db.mensajePerdida)

    def delete(self, request, idWishList, idVideojuego):
        if db.conexionDB:
            deletekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and value["idWishList"] == str(idWishList) and value["idVideojuego"] == str(idVideojuego):
                    deletekey = str(key)
                    break

            if deletekey != "":
                db.getDB().reference(documento).child(deletekey).delete()
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)