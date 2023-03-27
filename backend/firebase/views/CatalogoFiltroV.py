from django.apps import apps
from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from firebase.database.Firebase import Firebase
from firebase.database.relaciones.CatalogoFiltro import CatalogoFiltro
import json

db = Firebase()
documento = "CatalogoFiltros"

class CatalogoFiltroV(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, idC = -1, idF = -1):
        if db.conexionDB and request.method == "GET":
            cfs = list()

            if idC > -1 and idF > -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["idFiltro"]) == str(idF) and str(value["idCatalogo"]) == str(idC):
                        cfs.append({
                            "idCatalogo": value["idCatalogo"],
                            "idFiltro": value["idFiltro"]
                        })
            elif idC == -1 and idF == -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None:
                        cfs.append({
                            "idCatalogo": value["idCatalogo"],
                            "idFiltro": value["idFiltro"]
                        })

            if len(cfs) > 0:
                return JsonResponse({"message": "Exitoso", f"{documento}": cfs})
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def post(self, request):
        if db.conexionDB and request.method == "POST":
            jb = json.loads(request.body)
            cf = CatalogoFiltro(
                jb["idCatalogo"],
                jb["idFiltro"]
            )

            if cf.idCatalogo > -1 and cf.idFiltro > -1:
                db.getDB().reference(documento).child(f"{cf.idCatalogo}{cf.idFiltro}").set({"idCatalogo": f"{cf.idCatalogo}", "idFiltro": f"{cf.idFiltro}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def put(self, request, idCatalogo, idFiltro):
        if db.conexionDB:
            jb = json.loads(request.body)
            cf = CatalogoFiltro(
                jb["idCatalogo"],
                jb["idFiltro"]
            )
            updatekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["idCatalogo"]) == cf.idCatalogo and cf.idCatalogo == str(idCatalogo) and str(value["idFiltro"]) == cf.idFiltro and cf.idFiltro == str(idFiltro):
                    updatekey = str(key)
                    break

            if updatekey != "":
                db.getDB().reference(documento).child(updatekey).update({"idCatalogo": f"{cf.idCatalogo}", "idFiltro": f"{cf.idFiltro}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)    
        else:
            return JsonResponse(db.mensajePerdida)

    def delete(self, request, idCatalogo, idFiltro):
        if db.conexionDB:
            deletekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["idCatalogo"]) == str(idCatalogo) and str(value["idFiltro"]) == str(idFiltro):
                    deletekey = str(key)
                    break

            if deletekey != "":
                db.getDB().reference(documento).child(deletekey).delete()
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)