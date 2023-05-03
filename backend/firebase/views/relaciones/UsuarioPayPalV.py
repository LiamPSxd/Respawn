from django.apps import apps
from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from firebase.database.Firebase import Firebase
from firebase.database.relaciones.UsuarioPayPal import UsuarioPayPal
import json

db = Firebase()
documento = "UsuarioPayPals"

class UsuarioPayPalV(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, idUsuario = -1, idPayPal = -1):
        if db.conexionDB and request.method == "GET":
            ups = list()

            if idUsuario > -1 and idPayPal > -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["idUsuario"]) == str(idUsuario) and str(value["idPayPal"]) == str(idPayPal):
                        ups.append({
                            "idUsuario": value["idUsuario"],
                            "idPayPal": value["idPayPal"]
                        })
            elif idUsuario > -1 and idPayPal == -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["idUsuario"]) == str(idUsuario):
                        ups.append({
                            "idUsuario": value["idUsuario"],
                            "idPayPal": value["idPayPal"]
                        })
            elif idUsuario == -1 and idPayPal > -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["idPayPal"]) == str(idPayPal):
                        ups.append({
                            "idUsuario": value["idUsuario"],
                            "idPayPal": value["idPayPal"]
                        })
            elif idUsuario == -1 and idPayPal == -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None:
                        ups.append({
                            "idUsuario": value["idUsuario"],
                            "idPayPal": value["idPayPal"]
                        })

            if len(ups) > 0:
                return JsonResponse({"message": "Exitoso", f"{documento}": ups})
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def post(self, request):
        if db.conexionDB and request.method == "POST":
            jb = json.loads(request.body)
            up = UsuarioPayPal(
                jb["idUsuario"],
                jb["idPayPal"]
            )

            if up.idUsuario != -1 and up.idPayPal != -1:
                db.getDB().reference(documento).child(f"{up.idUsuario}{up.idPayPal}").set({"idUsuario": f"{up.idUsuario}", "idPayPal": f"{up.idPayPal}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def put(self, request, idUsuario, idPayPal):
        if db.conexionDB:
            jb = json.loads(request.body)
            up = UsuarioPayPal(
                jb["idUsuario"],
                jb["idPayPal"]
            )
            updatekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["idUsuario"]) == up.idUsuario and up.idUsuario == str(idUsuario) and str(value["idPayPal"]) == up.idPayPal and up.idPayPal == str(idPayPal):
                    updatekey = str(key)
                    break

            if updatekey != "":
                db.getDB().reference(documento).child(updatekey).update({"idUsuario": F"{up.idUsuario}", "idPayPal": f"{up.idPayPal}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)    
        else:
            return JsonResponse(db.mensajePerdida)

    def delete(self, request, idUsuario, idPayPal):
        if db.conexionDB:
            deletekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["idUsuario"]) == str(idUsuario) and str(value["idPayPal"]) == str(idPayPal):
                    deletekey = str(key)
                    break

            if deletekey != "":
                db.getDB().reference(documento).child(deletekey).delete()
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)