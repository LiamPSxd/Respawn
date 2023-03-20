from django.apps import apps
from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from firebase.database.Firebase import Firebase
from firebase.database.relaciones.FiltroCatalogo import FiltroCatalogo
import json

db = Firebase()
documento = "FiltroCatalogos"

class FiltroCatalogoV(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, idF = -1, idC = -1):
        if db.conexionDB and request.method == "GET":
            fcs = list()

            if idF > -1 and idC > -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None and value["idFiltro"] == idF and value["idCatalogo"] == idC:
                        fcs.append({
                            "idFiltro": value["idFiltro"],
                            "idCatalogo": value["idCatalogo"]
                        })
            elif idF == -1 and idC == -1:
                for key, value in db.getDocumento(documento).items():
                    if value != None:
                        fcs.append({
                            "idFiltro": value["idFiltro"],
                            "idCatalogo": value["idCatalogo"]
                        })

            if len(fcs) > 0:
                return JsonResponse({"message": "Exitoso", f"{documento}": fcs})
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def post(self, request):
        if db.conexionDB and request.method == "POST":
            jb = json.loads(request.body)
            fc = FiltroCatalogo(
                jb["idFiltro"],
                jb["idCatalogo"]
            )

            if fc.idFiltro > -1:
                db.getDB().reference(documento).child(f"{fc.idFiltro}{fc.idCatalogo}").push({"idFiltro": f"{fc.idFiltro}", "idCatalogo": f"{fc.idCatalogo}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def put(self, request, idFiltro, idCatalogo):
        if db.conexionDB:
            jb = json.loads(request.body)
            fc = FiltroCatalogo(
                jb["idFiltro"],
                jb["idCatalogo"]
            )
            updatekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["idFiltro"]) == fc.idFiltro and str(value["idCatalogo"]) == fc.idCatalogo:
                    updatekey = str(key)
                    break

            if updatekey != "":
                db.getDB().reference(documento).child(updatekey).update({"idFiltro": f"{fc.idFiltro}", "idCatalogo": f"{fc.idCatalogo}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)    
        else:
            return JsonResponse(db.mensajePerdida)

    def delete(self, request, idFiltro, idCatalogo):
        if db.conexionDB:
            deletekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["idFiltro"]) == idFiltro and str(value["idCatalogo"]) == idCatalogo:
                    deletekey = str(key)
                    break

            if deletekey != "":
                db.getDB().reference(documento).child(deletekey).delete()
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)