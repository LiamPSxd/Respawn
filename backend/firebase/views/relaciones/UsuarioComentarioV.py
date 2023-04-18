from django.apps import apps
from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from firebase.database.Firebase import Firebase
from firebase.database.relaciones.UsuarioComentario import UsuarioComentario
import json

db = Firebase()
documento = "UsuarioComentarios"

class UsuarioComentarioV(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, idUsuario = -1, idComentario = -1):
        if db.conexionDB and request.method == "GET":
            ucs = list()

            if idUsuario > -1 and idComentario > -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["idUsuario"]) == str(idUsuario) and str(value["idComentario"]) == str(idComentario):
                        ucs.append({
                            "idUsuario": value["idUsuario"],
                            "idComentario": value["idComentario"]
                        })
            elif idUsuario > -1 and idComentario == -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["idUsuario"]) == str(idUsuario):
                        ucs.append({
                            "idUsuario": value["idUsuario"],
                            "idComentario": value["idComentario"]
                        })
            elif idUsuario == -1 and idComentario > -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["idComentario"]) == str(idComentario):
                        ucs.append({
                            "idUsuario": value["idUsuario"],
                            "idComentario": value["idComentario"]
                        })
            elif idUsuario == -1 and idComentario == -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None:
                        ucs.append({
                            "idUsuario": value["idUsuario"],
                            "idComentario": value["idComentario"]
                        })

            if len(ucs) > 0:
                return JsonResponse({"message": "Exitoso", f"{documento}": ucs})
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def post(self, request):
        if db.conexionDB and request.method == "POST":
            jb = json.loads(request.body)
            uc = UsuarioComentario(
                jb["idUsuario"],
                jb["idComentario"]
            )

            if uc.idUsuario > -1 and uc.idComentario > -1:
                db.getDB().reference(documento).child(f"{uc.idUsuario}{uc.idComentario}").set({"idUsuario": f"{uc.idUsuario}", "idComentario": f"{uc.idComentario}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def put(self, request, idUsuario, idComentario):
        if db.conexionDB:
            jb = json.loads(request.body)
            uc = UsuarioComentario(
                jb["idUsuario"],
                jb["idComentario"]
            )
            updatekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["idUsuario"]) == uc.idUsuario and uc.idUsuario == str(idUsuario) and str(value["idComentario"]) == uc.idComentario and uc.idComentario == str(idComentario):
                    updatekey = str(key)
                    break

            if updatekey != "":
                db.getDB().reference(documento).child(updatekey).update({"idUsuario": F"{uc.idUsuario}", "idComentario": f"{uc.idComentario}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)    
        else:
            return JsonResponse(db.mensajePerdida)

    def delete(self, request, idUsuario, idComentario):
        if db.conexionDB:
            deletekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["idUsuario"]) == str(idUsuario) and str(value["idComentario"]) == str(idComentario):
                    deletekey = str(key)
                    break

            if deletekey != "":
                db.getDB().reference(documento).child(deletekey).delete()
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)