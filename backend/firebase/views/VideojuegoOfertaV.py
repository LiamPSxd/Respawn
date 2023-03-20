from django.apps import apps
from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from firebase.database.Firebase import Firebase
from firebase.database.relaciones.VideojuegoOferta import VideojuegoOferta
import json

db = Firebase()
documento = "VideojuegoOfertas"

class VideojuegoOfertaV(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, idV = -1, idO = -1):
        if db.conexionDB and request.method == "GET":
            vos = list()

            if idV > -1 and idO > -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and value["idVideojuego"] == idV and value["idOferta"] == idO:
                        vos.append({
                            "idVideojuego": value["idVideojuego"],
                            "idOferta": value["idOferta"]
                        })
            elif idV == -1 and idO == -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None:
                        vos.append({
                            "idVideojuego": value["idVideojuego"],
                            "idOferta": value["idOferta"]
                        })

            if len(vos) > 0:
                return JsonResponse({"message": "Exitoso", f"{documento}": vos})
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def post(self, request):
        if db.conexionDB and request.method == "POST":
            jb = json.loads(request.body)
            vo = VideojuegoOferta(
                jb["idVideojuego"],
                jb["idOferta"]
            )

            if vo.idVideojuego > -1:
                db.getDB().reference(documento).child(f"{vo.idVideojuego}{vo.idOferta}").push({"idVideojuego": f"{vo.idVideojuego}", "idOferta": f"{vo.idOferta}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def put(self, request, idVideojuego, idOferta):
        if db.conexionDB:
            jb = json.loads(request.body)
            vo = VideojuegoOferta(
                jb["idVideojuego"],
                jb["idOferta"]
            )
            updatekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and value["idVideojuego"] == vo.idVideojuego and value["idOferta"] == vo.idOferta:
                    updatekey = key
                    break

            if updatekey != "":
                db.getDB().reference(documento).child(updatekey).update({"idVideojuego": f"{vo.idVideojuego}", "idCompra": f"{vo.idCompra}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)    
        else:
            return JsonResponse(db.mensajePerdida)

    def delete(self, request, idVideojuego, idOferta):
        if db.conexionDB:
            deletekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and value["idVideojuego"] == idVideojuego and value["idOferta"] == idOferta:
                    deletekey = key
                    break

            if deletekey != "":
                db.getDB().reference(documento).child(deletekey).delete()
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)