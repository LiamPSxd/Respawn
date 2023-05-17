from django.apps import apps
from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from firebase.database.Firebase import Firebase
from firebase.database.relaciones.VideojuegoCompra import VideojuegoCompra
import json

db = Firebase()
documento = "VideojuegoCompras"

class VideojuegoCompraV(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, idVideojuego = -1, idCompra = -1):
        if db.conexionDB and request.method == "GET":
            vcs = list()

            if idVideojuego > -1 and idCompra > -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["idVideojuego"]) == str(idVideojuego) and str(value["idCompra"]) == str(idCompra):
                        vcs.append({
                            "idVideojuego": value["idVideojuego"],
                            "idCompra": value["idCompra"]
                        })
            elif idVideojuego > -1 and idCompra == -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["idVideojuego"]) == str(idVideojuego):
                        vcs.append({
                            "idVideojuego": value["idVideojuego"],
                            "idCompra": value["idCompra"]
                        })
            elif idVideojuego == -1 and idCompra > -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["idCompra"]) == str(idCompra):
                        vcs.append({
                            "idVideojuego": value["idVideojuego"],
                            "idCompra": value["idCompra"]
                        })
            elif idVideojuego == -1 and idCompra == -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None:
                        vcs.append({
                            "idVideojuego": value["idVideojuego"],
                            "idCompra": value["idCompra"]
                        })

            if len(vcs) > 0:
                return JsonResponse({"message": "Exitoso", f"{documento}": vcs})
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def post(self, request):
        if db.conexionDB and request.method == "POST":
            jb = json.loads(request.body)
            vc = VideojuegoCompra(
                jb["idVideojuego"],
                jb["idCompra"]
            )

            if vc.idVideojuego != -1 and vc.idCompra != -1:
                db.getDB().reference(documento).child(f"{vc.idVideojuego}{vc.idCompra}").set({"idVideojuego": f"{vc.idVideojuego}", "idCompra": f"{vc.idCompra}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def put(self, request, idVideojuego, idCompra):
        if db.conexionDB:
            jb = json.loads(request.body)
            vc = VideojuegoCompra(
                jb["idVideojuego"],
                jb["idCompra"]
            )
            updatekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["idVideojuego"]) == vc.idVideojuego and vc.idVideojuego == str(idVideojuego) and str(value["idCompra"]) == vc.idCompra and vc.idCompra == str(idCompra):
                    updatekey = str(key)
                    break

            if updatekey != "":
                db.getDB().reference(documento).child(updatekey).update({"idVideojuego": F"{vc.idVideojuego}", "idCompra": f"{vc.idCompra}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)    
        else:
            return JsonResponse(db.mensajePerdida)

    def delete(self, request, idVideojuego, idCompra):
        if db.conexionDB:
            deletekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["idVideojuego"]) == str(idVideojuego) and str(value["idCompra"]) == str(idCompra):
                    deletekey = str(key)
                    break

            if deletekey != "":
                db.getDB().reference(documento).child(deletekey).delete()
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)