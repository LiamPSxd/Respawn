from django.apps import apps
from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from firebase.database.Firebase import Firebase
from firebase.database.relaciones.CatalogoVideojuego import CatalogoVideojuego
import json

db = Firebase()
documento = "CatalogoVideojuegos"

class CatalogoVideojuegoV(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, idC = -1, idV = -1):
        if db.conexionDB and request.method == "GET":
            cvs = list()

            if idC > -1 and idV > -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and value["idCatalogo"] == idC and value["idVideojuego"] == idV:
                        cvs.append({
                            "idCatalogo": value["idCatalogo"],
                            "idVideojuego": value["idVideojuego"]
                        })
            elif idC == -1 and idV == -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None:
                        cvs.append({
                            "idCatalogo": value["idCatalogo"],
                            "idVideojuego": value["idVideojuego"]
                        })

            if len(cvs) > 0:
                return JsonResponse({"message": "Exitoso", f"{documento}": cvs})
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def post(self, request):
        if db.conexionDB and request.method == "POST":
            jb = json.loads(request.body)
            cv = CatalogoVideojuego(
                jb["idCatalogo"],
                jb["idVideojuego"]
            )

            if cv.idCatalogo > -1:
                db.getDB().reference(documento).child(f"{cv.idCatalogo}{cv.idVideojuego}").push({"idCatalogo": f"{cv.idCatalogo}", "idVideojuego": f"{cv.idVideojuego}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def put(self, request, idCatalogo, idVideojuego):
        if db.conexionDB:
            jb = json.loads(request.body)
            cv = CatalogoVideojuego(
                jb["idCatalogo"],
                jb["idVideojuego"]
            )
            updatekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and value["idCatalogo"] == cv.idCatalogo and value["idVideojuego"] == cv.idVideojuego:
                    updatekey = key
                    break

            if updatekey != "":
                db.getDB().reference(documento).child(updatekey).update({"idCatalogo": f"{cv.idCatalogo}", "idVideojuego": f"{cv.idVideojuego}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)    
        else:
            return JsonResponse(db.mensajePerdida)

    def delete(self, request, idCatalogo, idVideojuego):
        if db.conexionDB:
            deletekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and value["idCatalogo"] == idCatalogo and value["idVideojuego"] == idVideojuego:
                    deletekey = key
                    break

            if deletekey != "":
                db.getDB().reference(documento).child(deletekey).delete()
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)