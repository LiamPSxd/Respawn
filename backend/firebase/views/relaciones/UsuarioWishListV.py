from django.apps import apps
from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from firebase.database.Firebase import Firebase
from firebase.database.relaciones.UsuarioWishList import UsuarioWishList
import json

db = Firebase()
documento = "UsuarioWishLists"

class UsuarioWishListV(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, idUsuario = -1, idWishList = -1):
        if db.conexionDB and request.method == "GET":
            uws = list()

            if idUsuario > -1 and idWishList > -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["idUsuario"]) == str(idUsuario) and str(value["idWishList"]) == str(idWishList):
                        uws.append({
                            "idUsuario": value["idUsuario"],
                            "idWishList": value["idWishList"]
                        })
            elif idUsuario > -1 and idWishList == -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["idUsuario"]) == str(idUsuario):
                        uws.append({
                            "idUsuario": value["idUsuario"],
                            "idWishList": value["idWishList"]
                        })
            elif idUsuario == -1 and idWishList > -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["idWishList"]) == str(idWishList):
                        uws.append({
                            "idUsuario": value["idUsuario"],
                            "idWishList": value["idWishList"]
                        })
            elif idUsuario == -1 and idWishList == -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None:
                        uws.append({
                            "idUsuario": value["idUsuario"],
                            "idWishList": value["idWishList"]
                        })

            if len(uws) > 0:
                return JsonResponse({"message": "Exitoso", f"{documento}": uws})
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def post(self, request):
        if db.conexionDB and request.method == "POST":
            jb = json.loads(request.body)
            uw = UsuarioWishList(
                jb["idUsuario"],
                jb["idWishList"]
            )

            if uw.idUsuario != -1 and uw.idWishList != -1:
                db.getDB().reference(documento).child(f"{uw.idUsuario}{uw.idWishList}").set({"idUsuario": f"{uw.idUsuario}", "idWishList": f"{uw.idWishList}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def put(self, request, idUsuario, idWishList):
        if db.conexionDB:
            jb = json.loads(request.body)
            uw = UsuarioWishList(
                jb["idUsuario"],
                jb["idWishList"]
            )
            updatekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["idUsuario"]) == uw.idUsuario and uw.idUsuario == str(idUsuario) and str(value["idWishList"]) == uw.idWishList and uw.idWishList == str(idWishList):
                    updatekey = str(key)
                    break

            if updatekey != "":
                db.getDB().reference(documento).child(updatekey).update({"idUsuario": F"{uw.idUsuario}", "idWishList": f"{uw.idWishList}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)    
        else:
            return JsonResponse(db.mensajePerdida)

    def delete(self, request, idUsuario, idWishList):
        if db.conexionDB:
            deletekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["idUsuario"]) == str(idUsuario) and str(value["idWishList"]) == str(idWishList):
                    deletekey = str(key)
                    break

            if deletekey != "":
                db.getDB().reference(documento).child(deletekey).delete()
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)