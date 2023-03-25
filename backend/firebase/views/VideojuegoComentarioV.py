from django.apps import apps
from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from firebase.database.Firebase import Firebase
from firebase.database.relaciones.VideojuegoComentario import VideojuegoComentario
import json

db = Firebase()
documento = "VideojuegoComentarios"

class VideojuegoComentarioV(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, idV = -1, idC = -1):
        if db.conexionDB and request.method == "GET":
            vcs = list()

            if idV > -1 and idC > -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and value["idVideojuego"] == str(idV) and value["idComentario"] == str(idC):
                        vcs.append({
                            "idVideojuego": value["idVideojuego"],
                            "idComentario": value["idComentario"]
                        })
            elif idV == -1 and idC == -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None:
                        vcs.append({
                            "idVideojuego": value["idVideojuego"],
                            "idComentario": value["idComentario"]
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
            vc = VideojuegoComentario(
                jb["idVideojuego"],
                jb["idComentario"]
            )

            if vc.idVideojuego > -1 and vc.idComentario > -1:
                db.getDB().reference(documento).child(f"{vc.idVideojuego}{vc.idComentario}").set({"idVideojuego": f"{vc.idVideojuego}", "idComentario": f"{vc.idComentario}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def put(self, request, idVideojuego, idComentario):
        if db.conexionDB:
            jb = json.loads(request.body)
            vc = VideojuegoComentario(
                jb["idVideojuego"],
                jb["idComentario"]
            )
            updatekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["idVideojuego"]) == vc.idVideojuego and vc.idVideojuego == str(idVideojuego) and str(value["idComentario"]) == vc.idComentario and vc.idComentario == str(idComentario):
                    updatekey = str(key)
                    break

            if updatekey != "":
                db.getDB().reference(documento).child(updatekey).update({"idVideojuego": F"{vc.idVideojuego}", "idComentario": f"{vc.idComentario}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)    
        else:
            return JsonResponse(db.mensajePerdida)

    def delete(self, request, idVideojuego, idComentario):
        if db.conexionDB:
            deletekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and value["idVideojuego"] == str(idVideojuego) and value["idComentario"] == str(idComentario):
                    deletekey = str(key)
                    break

            if deletekey != "":
                db.getDB().reference(documento).child(deletekey).delete()
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)