from django.apps import apps
from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from firebase.database.Firebase import Firebase
from firebase.database.entidades.Usuario import Usuario
import json

db = Firebase()
documento = "Usuarios"

class UsuarioV(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, nombre = ""):
        if db.conexionDB and request.method == "GET":
            usuarios = list()

            if nombre != "":
                for key, value in db.getDocumento(documento).items():
                    if value != None and value["nombre"] == nombre:
                        usuarios.append({
                            "nombre": value["nombre"],
                            "correo": value["correo"],
                            "contrasenia": value["contrasenia"],
                            "domicilio": value["domicilio"]
                        })
            elif nombre == "":
                for key, value in db.getDocumento(documento).items():
                    if value != None:
                        usuarios.append({
                            "nombre": value["nombre"],
                            "correo": value["correo"],
                            "contrasenia": value["contrasenia"],
                            "domicilio": value["domicilio"]
                        })

            if len(usuarios) > 0:
                return JsonResponse({"message": "Exitoso", f"{documento}": usuarios})
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def post(self, request):
        if db.conexionDB and request.method == "POST":
            jb = json.loads(request.body)
            u = Usuario(
                jb["nombre"],
                jb["correo"],
                jb["contrasenia"],
                jb["domicilio"]
            )

            if u.nombre != "":
                db.getDB().reference(documento).child(str(u.nombre)).set({"nombre": f"{u.nombre}", "correo": f"{u.correo}", "contrasenia": f"{u.contrasenia}", "domicilio": f"{u.domicilio}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def put(self, request, correo):
        if db.conexionDB:
            jb = json.loads(request.body)
            u = Usuario(
                jb["nombre"],
                jb["correo"],
                jb["contrasenia"],
                jb["domicilio"]
            )
            updatekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["correo"]) == u.correo:
                    updatekey = str(key)
                    break

            if updatekey != "":
                db.getDB().reference(documento).child(updatekey).update({"nombre": f"{u.nombre}", "correo": f"{u.correo}", "contrasenia": f"{u.contrasenia}", "domicilio": f"{u.domicilio}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)    
        else:
            return JsonResponse(db.mensajePerdida)

    def delete(self, request, nombre):
        if db.conexionDB:
            deletekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and value["nombre"] == str(nombre):
                    deletekey = str(key)
                    break

            if deletekey != "":
                db.getDB().reference(documento).child(deletekey).delete()
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)