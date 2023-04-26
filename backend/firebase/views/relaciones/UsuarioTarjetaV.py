from django.apps import apps
from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from firebase.database.Firebase import Firebase
from firebase.database.relaciones.UsuarioTarjeta import UsuarioTarjeta
import json

db = Firebase()
documento = "UsuarioTarjetas"

class UsuarioTarjetaV(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, idUsuario = -1, idTarjeta = -1):
        if db.conexionDB and request.method == "GET":
            uts = list()

            if idUsuario > -1 and idTarjeta > -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["idUsuario"]) == str(idUsuario) and str(value["idTarjeta"]) == str(idTarjeta):
                        uts.append({
                            "idUsuario": value["idUsuario"],
                            "idTarjeta": value["idTarjeta"]
                        })
            elif idUsuario > -1 and idTarjeta == -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["idUsuario"]) == str(idUsuario):
                        uts.append({
                            "idUsuario": value["idUsuario"],
                            "idTarjeta": value["idTarjeta"]
                        })
            elif idUsuario == -1 and idTarjeta > -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["idTarjeta"]) == str(idTarjeta):
                        uts.append({
                            "idUsuario": value["idUsuario"],
                            "idTarjeta": value["idTarjeta"]
                        })
            elif idUsuario == -1 and idTarjeta == -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None:
                        uts.append({
                            "idUsuario": value["idUsuario"],
                            "idTarjeta": value["idTarjeta"]
                        })

            if len(uts) > 0:
                return JsonResponse({"message": "Exitoso", f"{documento}": uts})
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def post(self, request):
        if db.conexionDB and request.method == "POST":
            jb = json.loads(request.body)
            ut = UsuarioTarjeta(
                jb["idUsuario"],
                jb["idTarjeta"]
            )

            if ut.idUsuario > -1 and ut.idTarjeta > -1:
                db.getDB().reference(documento).child(f"{ut.idUsuario}{ut.idTarjeta}").set({"idUsuario": f"{ut.idUsuario}", "idTarjeta": f"{ut.idTarjeta}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def put(self, request, idUsuario, idTarjeta):
        if db.conexionDB:
            jb = json.loads(request.body)
            ut = UsuarioTarjeta(
                jb["idUsuario"],
                jb["idTarjeta"]
            )
            updatekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["idUsuario"]) == ut.idUsuario and ut.idUsuario == str(idUsuario) and str(value["idTarjeta"]) == ut.idTarjeta and ut.idTarjeta == str(idTarjeta):
                    updatekey = str(key)
                    break

            if updatekey != "":
                db.getDB().reference(documento).child(updatekey).update({"idUsuario": F"{ut.idUsuario}", "idTarjeta": f"{ut.idTarjeta}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)    
        else:
            return JsonResponse(db.mensajePerdida)

    def delete(self, request, idUsuario, idTarjeta):
        if db.conexionDB:
            deletekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["idUsuario"]) == str(idUsuario) and str(value["idTarjeta"]) == str(idTarjeta):
                    deletekey = str(key)
                    break

            if deletekey != "":
                db.getDB().reference(documento).child(deletekey).delete()
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)