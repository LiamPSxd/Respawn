from django.apps import apps
from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from firebase.database.Firebase import Firebase
from firebase.database.relaciones.UsuarioReserva import UsuarioReserva
import json

db = Firebase()
documento = "UsuarioReservas"

class UsuarioReservaV(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, idUsuario = -1, idReserva = -1):
        if db.conexionDB and request.method == "GET":
            urs = list()

            if idUsuario > -1 and idReserva > -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["idUsuario"]) == idUsuario and str(value["idReserva"]) == str(idReserva):
                        urs.append({
                            "idUsuario": value["idUsuario"],
                            "idReserva": value["idReserva"]
                        })
            elif idUsuario > -1 and idReserva == -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["idUsuario"]) == idUsuario:
                        urs.append({
                            "idUsuario": value["idUsuario"],
                            "idReserva": value["idReserva"]
                        })
            elif idUsuario == -1 and idReserva > -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["idReserva"]) == str(idReserva):
                        urs.append({
                            "idUsuario": value["idUsuario"],
                            "idReserva": value["idReserva"]
                        })
            elif idUsuario == -1 and idReserva == -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None:
                        urs.append({
                            "idUsuario": value["idUsuario"],
                            "idReserva": value["idReserva"]
                        })

            if len(urs) > 0:
                return JsonResponse({"message": "Exitoso", f"{documento}": urs})
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def post(self, request):
        if db.conexionDB and request.method == "POST":
            jb = json.loads(request.body)
            ur = UsuarioReserva(
                jb["idUsuario"],
                jb["idReserva"]
            )

            if ur.idUsuario != -1 and ur.idReserva != -1:
                db.getDB().reference(documento).child(f"{ur.idUsuario}{ur.idReserva}").set({"idUsuario": f"{ur.idUsuario}", "idReserva": f"{ur.idReserva}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def put(self, request, idUsuario, idReserva):
        if db.conexionDB:
            jb = json.loads(request.body)
            ur = UsuarioReserva(
                jb["idUsuario"],
                jb["idReserva"]
            )
            updatekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["idUsuario"]) == ur.idUsuario and ur.idUsuario == str(idUsuario) and str(value["idReserva"]) == ur.idReserva and ur.idReserva == str(idReserva):
                    updatekey = str(key)
                    break

            if updatekey != "":
                db.getDB().reference(documento).child(updatekey).update({"idUsuario": F"{ur.idUsuario}", "idReserva": f"{ur.idReserva}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)    
        else:
            return JsonResponse(db.mensajePerdida)

    def delete(self, request, idUsuario, idReserva):
        if db.conexionDB:
            deletekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["idUsuario"]) == str(idUsuario) and str(value["idReserva"]) == str(idReserva):
                    deletekey = str(key)
                    break

            if deletekey != "":
                db.getDB().reference(documento).child(deletekey).delete()
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)