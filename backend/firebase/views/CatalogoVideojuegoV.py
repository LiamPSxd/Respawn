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

    def get(self, request, idCatalogo = -1, idVideojuego = -1):
        if db.conexionDB and request.method == "GET":
            cvs = list()

            if idCatalogo > -1 and idVideojuego > -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["idCatalogo"]) == str(idCatalogo) and str(value["idVideojuego"]) == str(idVideojuego):
                        cvs.append({
                            "idCatalogo": value["idCatalogo"],
                            "idVideojuego": value["idVideojuego"]
                        })
            elif idCatalogo > -1 and idVideojuego == -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["idCatalogo"]) == str(idCatalogo):
                        cvs.append({
                            "idCatalogo": value["idCatalogo"],
                            "idVideojuego": value["idVideojuego"]
                        })
            elif idCatalogo == -1 and idVideojuego > -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["idVideojuego"]) == str(idVideojuego):
                        cvs.append({
                            "idCatalogo": value["idCatalogo"],
                            "idVideojuego": value["idVideojuego"]
                        })
            elif idCatalogo == -1 and idVideojuego == -1:
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

            if cv.idCatalogo > -1 and cv.idVideojuego > -1:
                db.getDB().reference(documento).child(f"{cv.idCatalogo}{cv.idVideojuego}").set({"idCatalogo": f"{cv.idCatalogo}", "idVideojuego": f"{cv.idVideojuego}"})
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
                if value != None and str(value["idCatalogo"]) == cv.idCatalogo and cv.idCatalogo == str(idCatalogo) and str(value["idVideojuego"]) == cv.idVideojuego and cv.idVideojuego == str(idVideojuego):
                    updatekey = str(key)
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
                if value != None and str(value["idCatalogo"]) == str(idCatalogo) and str(value["idVideojuego"]) == str(idVideojuego):
                    deletekey = str(key)
                    break

            if deletekey != "":
                db.getDB().reference(documento).child(deletekey).delete()
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)