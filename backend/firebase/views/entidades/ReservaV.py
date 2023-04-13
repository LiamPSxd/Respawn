from django.apps import apps
from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from firebase.database.Firebase import Firebase
from firebase.database.entidades.Reserva import Reserva
import json

db = Firebase()
documento = "Reservas"

class ReservaV(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id = -1, ids = ""):
        if db.conexionDB and request.method == "GET":
            reservas = list()

            if id > -1 and ids == "":
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["id"]) == str(id):
                        reservas.append({
                            "id": value["id"],
                            "fecha": value["fecha"],
                            "hora": value["hora"],
                            "iva": value["iva"],
                            "descuento": value["descuento"],
                            "monto": value["monto"],
                            "metodo": value["metodo"],
                            "descripcion": value["descripcion"]
                        })
            elif id == -1 and ids == "":
                for key, value in db.getDocumento(documento).items():
                    if value != None:
                        reservas.append({
                            "id": value["id"],
                            "fecha": value["fecha"],
                            "hora": value["hora"],
                            "iva": value["iva"],
                            "descuento": value["descuento"],
                            "monto": value["monto"],
                            "metodo": value["metodo"],
                            "descripcion": value["descripcion"]
                        })
            elif ids != "":
                for key, value in db.getDocumento(documento).items():
                    for id in ids.split(","):
                        if value != None and str(value["id"]) == str(id):
                            reservas.append({
                                "id": value["id"],
                                "fecha": value["fecha"],
                                "hora": value["hora"],
                                "iva": value["iva"],
                                "descuento": value["descuento"],
                                "monto": value["monto"],
                                "metodo": value["metodo"],
                                "descripcion": value["descripcion"]
                            })

            if len(reservas) > 0:
                return JsonResponse({"message": "Exitoso", f"{documento}": reservas})
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def post(self, request):
        if db.conexionDB and request.method == "POST":
            jb = json.loads(request.body)
            r = Reserva(
                db.getUltimateKey(documento),
                jb["fecha"],
                jb["hora"],
                jb["iva"],
                jb["descuento"],
                jb["monto"],
                jb["metodo"],
                jb["descripcion"]
            )

            if r.fecha != "":
                db.getDB().reference(documento).child(str(r.id)).set({"id": f"{r.id}", "fecha": f"{r.fecha}", "hora": f"{r.hora}", "iva": f"{r.iva}", "descuento": f"{r.descuento}", "monto": f"{r.monto}", "metodo": f"{r.metodo}", "descripcion": f"{r.descripcion}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def put(self, request, id):
        if db.conexionDB:
            jb = json.loads(request.body)
            r = Reserva(
                jb["id"],
                jb["fecha"],
                jb["hora"],
                jb["iva"],
                jb["descuento"],
                jb["monto"],
                jb["metodo"],
                jb["descripcion"]
            )
            updatekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["id"]) == r.id and r.id == str(id):
                    updatekey = str(key)
                    break

            if updatekey != "":
                db.getDB().reference(documento).child(updatekey).update({"id": f"{r.id}", "fecha": f"{r.fecha}", "hora": f"{r.hora}", "iva": f"{r.iva}", "descuento": f"{r.descuento}", "monto": f"{r.monto}", "metodo": f"{r.metodo}", "descripcion": f"{r.descripcion}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)    
        else:
            return JsonResponse(db.mensajePerdida)

    def delete(self, request, id):
        if db.conexionDB:
            deletekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["id"]) == str(id):
                    deletekey = str(key)
                    break

            if deletekey != "":
                db.getDB().reference(documento).child(deletekey).delete()
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)