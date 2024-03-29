from django.apps import apps
from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from firebase.database.Firebase import Firebase
from firebase.database.entidades.Compra import Compra
import json

db = Firebase()
documento = "Compras"

class CompraV(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id = -1, ids = ""):
        if db.conexionDB and request.method == "GET":
            compras = list()

            if id > -1 and ids == "":
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["id"]) == str(id):
                        compras.append({
                            "id": value["id"],
                            "fecha": value["fecha"],
                            "hora": value["hora"],
                            "iva": value["iva"],
                            "descuento": value["descuento"],
                            "monto": value["monto"],
                            "metodo": value["metodo"],
                            "descripcion": value["descripcion"],
                            "idUsuario": value["idUsuario"],
                            "idVideojuego": value["idVideojuego"]
                        })
            elif id == -1 and ids == "":
                for key, value in db.getDocumento(documento).items():
                    if value != None:
                        compras.append({
                            "id": value["id"],
                            "fecha": value["fecha"],
                            "hora": value["hora"],
                            "iva": value["iva"],
                            "descuento": value["descuento"],
                            "monto": value["monto"],
                            "metodo": value["metodo"],
                            "descripcion": value["descripcion"],
                            "idUsuario": value["idUsuario"],
                            "idVideojuego": value["idVideojuego"]
                        })
            elif ids != "":
                for key, value in db.getDocumento(documento).items():
                    for id in ids.split(","):
                        if value != None and str(value["id"]) == str(id):
                            compras.append({
                                "id": value["id"],
                                "fecha": value["fecha"],
                                "hora": value["hora"],
                                "iva": value["iva"],
                                "descuento": value["descuento"],
                                "monto": value["monto"],
                                "metodo": value["metodo"],
                                "descripcion": value["descripcion"],
                                "idUsuario": value["idUsuario"],
                                "idVideojuego": value["idVideojuego"]
                            })

            if len(compras) > 0:
                return JsonResponse({"message": "Exitoso", f"{documento}": compras})
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def post(self, request):
        if db.conexionDB and request.method == "POST":
            jb = json.loads(request.body)
            c = Compra(
                db.getUltimateKey(documento),
                jb["fecha"],
                jb["hora"],
                jb["iva"],
                jb["descuento"],
                jb["monto"],
                jb["metodo"],
                jb["descripcion"],
                jb["idUsuario"],
                jb["idVideojuego"]
            )

            if c.fecha != "":
                db.getDB().reference(documento).child(str(c.id)).set({"id": f"{c.id}", "fecha": f"{c.fecha}", "hora": f"{c.hora}", "iva": f"{c.iva}", "descuento": f"{c.descuento}", "monto": f"{c.monto}", "metodo": f"{c.metodo}", "descripcion": f"{c.descripcion}", "idUsuario": c.idUsuario, "idVideojuego": c.idVideojuego})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def put(self, request, id):
        if db.conexionDB:
            jb = json.loads(request.body)
            c = Compra(
                jb["id"],
                jb["fecha"],
                jb["hora"],
                jb["iva"],
                jb["descuento"],
                jb["monto"],
                jb["metodo"],
                jb["descripcion"],
                jb["idUsuario"],
                jb["idVideojuego"]
            )
            updatekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["id"]) == c.id and c.id == str(id):
                    updatekey = str(key)
                    break

            if updatekey != "":
                db.getDB().reference(documento).child(updatekey).update({"id": f"{c.id}", "fecha": f"{c.fecha}", "hora": f"{c.hora}", "iva": f"{c.iva}", "descuento": f"{c.descuento}", "monto": f"{c.monto}", "metodo": f"{c.metodo}", "descripcion": f"{c.descripcion}", "idUsuario": c.idUsuario, "idVideojuego": c.idVideojuego})
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