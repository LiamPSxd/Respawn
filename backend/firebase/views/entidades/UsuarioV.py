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

    def get(self, request, id = -1, ids = "", correo = ""):
        if db.conexionDB and request.method == "GET":
            usuarios = list()

            if id > -1 and ids == "" and correo == "":
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["id"]) == str(id) and db.user(Usuario(id = value["id"], correo = value["correo"]), 0):
                        usuarios.append({
                            "id": value["id"],
                            "nombre": value["nombre"],
                            "correo": value["correo"],
                            "contrasenia": value["contrasenia"],
                            "domicilio": value["domicilio"]
                        })
            elif id == -1 and ids == "" and correo == "":
                for key, value in db.getDocumento(documento).items():
                    if value != None and db.user(Usuario(id = value["id"], correo = value["correo"]), 0):
                        usuarios.append({
                            "id": value["id"],
                            "nombre": value["nombre"],
                            "correo": value["correo"],
                            "contrasenia": value["contrasenia"],
                            "domicilio": value["domicilio"]
                        })
            elif id == -1 and ids != "" and correo == "":
                for key, value in db.getDocumento(documento).items():
                    for id in ids.split(","):
                        if value != None and str(value["id"]) == str(id) and db.user(Usuario(id = value["id"], correo = value["correo"]), 0):
                            usuarios.append({
                                "id": value["id"],
                                "nombre": value["nombre"],
                                "correo": value["correo"],
                                "contrasenia": value["contrasenia"],
                                "domicilio": value["domicilio"]
                            })
            elif id == -1 and ids == "" and correo != "":
                for key, value in db.getDocumento(documento).items():
                    if value != None and str(value["correo"]) == str(correo) and db.user(Usuario(id = value["id"], correo = value["correo"]), 0):
                        usuarios.append({
                            "id": value["id"],
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
                db.getUltimateKey(documento),
                jb["nombre"],
                jb["correo"],
                jb["contrasenia"],
                jb["domicilio"]
            )

            if u.id > -1:
                if db.user(u):
                    db.getDB().reference(documento).child(str(u.id)).set({"id": f"{u.id}", "nombre": f"{u.nombre}", "correo": f"{u.correo}", "contrasenia": f"{u.contrasenia}", "domicilio": f"{u.domicilio}"})
                    return JsonResponse(db.mensajeExitoso)
                else:
                    return JsonResponse(db.mensajeFallido)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)

    def put(self, request, id):
        if db.conexionDB:
            jb = json.loads(request.body)
            u = Usuario(
                jb["id"],
                jb["nombre"],
                jb["correo"],
                jb["contrasenia"],
                jb["domicilio"]
            )
            updatekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["id"]) == u.id and u.id == str(id):
                    updatekey = str(key)
                    break

            if updatekey != "":
                db.user(u, 1)
                db.getDB().reference(documento).child(updatekey).update({"id": f"{u.id}", "nombre": f"{u.nombre}", "correo": f"{u.correo}", "contrasenia": f"{u.contrasenia}", "domicilio": f"{u.domicilio}"})
                return JsonResponse(db.mensajeExitoso)
            else:
                return JsonResponse(db.mensajeFallido)    
        else:
            return JsonResponse(db.mensajePerdida)

    def delete(self, request, id):
        if db.conexionDB:
            u = Usuario(id = id)
            deletekey = ""

            for key, value in db.getDocumento(documento).items():
                if value != None and str(value["id"]) == str(id):
                    u.correo = value["correo"]
                    deletekey = str(key)
                    break

            if deletekey != "":
                db.user(u, 2)

                if db.user(u, 0):
                    db.getDB().reference(documento).child(deletekey).delete()
                    return JsonResponse(db.mensajeExitoso)
                else:
                    return JsonResponse(db.mensajeFallido)
            else:
                return JsonResponse(db.mensajeFallido)
        else:
            return JsonResponse(db.mensajePerdida)