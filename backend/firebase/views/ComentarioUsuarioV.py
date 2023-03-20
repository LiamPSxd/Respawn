from django.apps import apps
from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from firebase.database.Firebase import Firebase
from firebase.database.relaciones.ComentarioUsuario import ComentarioUsuario
import json

db = Firebase()
documento = "ComentarioUsuarios"

class ComentarioUsuarioV(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, idC = -1, cU = ""):
        if db.conexionDB and request.method == "GET":
            cus = list()

            if idC > -1 and cU != "":
                for key, value in db.getDocumento(documento).items():
                    if value != None and value["idComentario"] == idC and value["correoUsuario"] == cU:
                        cus.append({
                            "idComentario": value["idComentario"],
                            "correoUsuario": value["correoUsuario"]
                        })
            elif idC == -1 and cU == "":
                for key, value in db.getDocumento(documento).items():
                    if value != None:
                        cus.append({
                            "idComentario": value["idComentario"],
                            "correoUsuario": value["correoUsuario"]
                        })

            if len(cus) > 0:
                return JsonResponse({"message": "Exitoso", f"{documento}": cus})
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def post(self, request):
        if db.conexionDB and request.method == "POST":
            jb = json.loads(request.body)
            cu = ComentarioUsuario(
                jb["idComentario"],
                jb["correoUsuario"]
            )

            if cu.idComentario > -1:
                db.getDB().reference(documento).child(f"{cu.idComentario}{cu.correoUsuario}").set({"idComentario": f"{cu.idComentario}", "correoUsuario": f"{cu.correoUsuario}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def put(self, request, idComentario, correoUsuario):
        if db.conexionDB:
            jb = json.loads(request.body)
            cu = ComentarioUsuario(
                jb["idComentario"],
                jb["correoUsuario"]
            )
            updatekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["idComentario"]) == cu.idComentario and str(value["correoUsuario"]) == cu.correoUsuario:
                    updatekey = str(key)
                    break

            if updatekey != "":
                db.getDB().reference(documento).child(updatekey).update({"idComentario": F"{cu.idComentario}", "correoUsuario": f"{cu.correoUsuario}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)    
        else:
            return JsonResponse(db.mensajePerdida)

    def delete(self, request, idComentario, correoUsuario):
        if db.conexionDB:
            deletekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["idComentario"]) == idComentario and str(value["correoUsuario"]) == correoUsuario:
                    deletekey = str(key)
                    break

            if deletekey != "":
                db.getDB().reference(documento).child(deletekey).delete()
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)