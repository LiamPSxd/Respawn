from django.apps import apps
from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from firebase.database.Firebase import Firebase
from firebase.database.relaciones.UsuarioCupon import UsuarioCupon
import json

db = Firebase()
documento = "UsuarioCupon"

class UsuarioCuponV(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, idUsuario = -1, idCupon = -1):
        if db.conexionDB and request.method == "GET":
            ucs = list()

            if idUsuario > -1 and idCupon > -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["idUsuario"]) == str(idUsuario) and str(value["idCupon"]) == str(idCupon):
                        ucs.append({
                            "idUsuario": value["idUsuario"],
                            "idCupon": value["idCupon"],
                            "cantidad": value["cantidad"]
                        })
            elif idUsuario > -1 and idCupon == -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["idUsuario"]) == str(idUsuario):
                        ucs.append({
                            "idUsuario": value["idUsuario"],
                            "idCupon": value["idCupon"],
                            "cantidad": value["cantidad"]
                        })
            elif idUsuario == -1 and idCupon > -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["idCupon"]) == str(idCupon):
                        ucs.append({
                            "idUsuario": value["idUsuario"],
                            "idCupon": value["idCupon"],
                            "cantidad": value["cantidad"]
                        })
            elif idUsuario == -1 and idCupon == -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None:
                        ucs.append({
                            "idUsuario": value["idUsuario"],
                            "idCupon": value["idCupon"],
                            "cantidad": value["cantidad"]
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
            uc = UsuarioCupon(
                jb["idUsuario"],
                jb["idCupon"],
                jb["cantidad"]
            )

            if uc.idUsuario > -1 and uc.idCupon > -1:
                db.getDB().reference(documento).child(f"{uc.idUsuario}{uc.idCupon}").set({"idUsuario": f"{uc.idUsuario}", "idCupon": f"{uc.idCupon}", "cantidad": f"{uc.cantidad}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def put(self, request, idUsuario, idCupon):
        if db.conexionDB:
            jb = json.loads(request.body)
            uc = UsuarioCupon(
                jb["idUsuario"],
                jb["idCupon"],
                jb["cantidad"]
            )
            updatekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["idUsuario"]) == uc.idUsuario and uc.idUsuario == str(idUsuario) and str(value["idCupon"]) == uc.idCupon and uc.idCupon == str(idCupon):
                    updatekey = str(key)
                    break

            if updatekey != "":
                db.getDB().reference(documento).child(updatekey).update({"idUsuario": f"{uc.idUsuario}", "idCupon": f"{uc.idCupon}", "cantidad": f"{uc.cantidad}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)    
        else:
            return JsonResponse(db.mensajePerdida)

    def delete(self, request, idUsuario, idCupon):
        if db.conexionDB:
            deletekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["idUsuario"]) == str(idUsuario) and str(value["idCupon"]) == str(idCupon):
                    deletekey = str(key)
                    break

            if deletekey != "":
                db.getDB().reference(documento).child(deletekey).delete()
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)