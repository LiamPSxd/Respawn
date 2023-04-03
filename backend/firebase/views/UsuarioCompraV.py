from django.apps import apps
from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from firebase.database.Firebase import Firebase
from firebase.database.relaciones.UsuarioCompra import UsuarioCompra
import json

db = Firebase()
documento = "UsuarioCompras"

class UsuarioCompraV(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, correoUsuario = "", idCompra = -1):
        if db.conexionDB and request.method == "GET":
            ucs = list()

            if correoUsuario != "" and idCompra > -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["correoUsuario"]) == str(correoUsuario) and str(value["idCompra"]) == str(idCompra):
                        ucs.append({
                            "correoUsuario": value["correoUsuario"],
                            "idCompra": value["idCompra"]
                        })
            elif correoUsuario != "" and idCompra == -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["correoUsuario"]) == str(correoUsuario):
                        ucs.append({
                            "correoUsuario": value["correoUsuario"],
                            "idCompra": value["idCompra"]
                        })
            elif correoUsuario == "" and idCompra > -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["idCompra"]) == str(idCompra):
                        ucs.append({
                            "correoUsuario": value["correoUsuario"],
                            "idCompra": value["idCompra"]
                        })
            elif correoUsuario == "" and idCompra == -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None:
                        ucs.append({
                            "correoUsuario": value["correoUsuario"],
                            "idCompra": value["idCompra"]
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
            uc = UsuarioCompra(
                jb["correoUsuario"],
                jb["idCompra"]
            )

            if uc.correoUsuario != "" and uc.idCompra > -1:
                db.getDB().reference(documento).child(f"{uc.correoUsuario}{uc.idCompra}").set({"correoUsuario": f"{uc.correoUsuario}", "idCompra": f"{uc.idCompra}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def put(self, request, correoUsuario, idCompra):
        if db.conexionDB:
            jb = json.loads(request.body)
            uc = UsuarioCompra(
                jb["correoUsuario"],
                jb["idCompra"]
            )
            updatekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["correoUsuario"]) == uc.correoUsuario and uc.correoUsuario == str(correoUsuario) and str(value["idCompra"]) == uc.idCompra and uc.idCompra == str(idCompra):
                    updatekey = str(key)
                    break

            if updatekey != "":
                db.getDB().reference(documento).child(updatekey).update({"correoUsuario": F"{uc.correoUsuario}", "idCompra": f"{uc.idCompra}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)    
        else:
            return JsonResponse(db.mensajePerdida)

    def delete(self, request, correoUsuario, idCompra):
        if db.conexionDB:
            deletekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["correoUsuario"]) == str(correoUsuario) and str(value["idCompra"]) == str(idCompra):
                    deletekey = str(key)
                    break

            if deletekey != "":
                db.getDB().reference(documento).child(deletekey).delete()
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)