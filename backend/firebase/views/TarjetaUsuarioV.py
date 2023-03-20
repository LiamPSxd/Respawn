from django.apps import apps
from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from firebase.database.Firebase import Firebase
from firebase.database.relaciones.TarjetaUsuario import TarjetaUsuario
import json

db = Firebase()
documento = "TarjetaUsuarios"

class TarjetaUsuarioV(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, idT = -1, cU = ""):
        if db.conexionDB and request.method == "GET":
            tus = list()

            if idT > -1 and cU != "":
                for key, value in db.getDocumento(documento).items():
                    if value != None and value["idTarjeta"] == idT and value["correoUsuario"] == cU:
                        tus.append({
                            "idTarjeta": value["idTarjeta"],
                            "correoUsuario": value["correoUsuario"]
                        })
            elif idT == -1 and cU == "":
                for key, value in db.getDocumento(documento).items():
                    if value != None:
                        tus.append({
                            "idTarjeta": value["idTarjeta"],
                            "correoUsuario": value["correoUsuario"]
                        })

            if len(tus) > 0:
                return JsonResponse({"message": "Exitoso", f"{documento}": tus})
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def post(self, request):
        if db.conexionDB and request.method == "POST":
            jb = json.loads(request.body)
            tu = TarjetaUsuario(
                jb["idTarjeta"],
                jb["correoUsuario"]
            )

            if tu.idTarjeta > -1:
                db.getDB().reference(documento).child(f"{tu.idTarjeta}{tu.correoUsuario}").push({"idTarjeta": f"{tu.idTarjeta}", "correoUsuario": f"{tu.correoUsuario}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def put(self, request, idTarjeta, correoUsuario):
        if db.conexionDB:
            jb = json.loads(request.body)
            tu = TarjetaUsuario(
                jb["idTarjeta"],
                jb["correoUsuario"]
            )
            updatekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and value["idTarjeta"] == tu.idTarjeta and value["correoUsuario"] == tu.correoUsuario:
                    updatekey = key
                    break

            if updatekey != "":
                db.getDB().reference(documento).child(updatekey).update({"idTarjeta": F"{tu.idTarjeta}", "correoUsuario": f"{tu.correoUsuario}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)    
        else:
            return JsonResponse(db.mensajePerdida)

    def delete(self, request, idTarjeta, correoUsuario):
        if db.conexionDB:
            deletekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and value["idTarjeta"] == idTarjeta and value["correoUsuario"] == correoUsuario:
                    deletekey = key
                    break

            if deletekey != "":
                db.getDB().reference(documento).child(deletekey).delete()
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)