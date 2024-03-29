import firebase_admin, calendar, time
from firebase_admin import credentials, db, auth

class Firebase:
    def __init__(self):
        self.db = db
        self.conexionDB()
        self._mensajeExitoso = {"message": "Exitoso"}
        self._mensajeFallido = {"message": "Fallido. Posiblemente no hay dato(s)"}
        self._mensajePerdida = {"message": "Se perdió la conexión con la Base de Datos. Por favor, intente más tarde"}

    @property
    def mensajeExitoso(self):
        return self._mensajeExitoso

    @mensajeExitoso.setter
    def mensajeExitoso(self, mensajeExitoso):
        self._mensajeExitoso = mensajeExitoso

    @property
    def mensajeFallido(self):
        return self._mensajeFallido

    @mensajeFallido.setter
    def mensajeFallido(self, mensajeFallido):
        self._mensajeFallido = mensajeFallido

    @property
    def mensajePerdida(self):
        return self._mensajePerdida

    @mensajePerdida.setter
    def mensajePerdida(self, mensajePerdida):
        self._mensajePerdida = mensajePerdida

    def conexionDB(self):
        if not firebase_admin._apps:
            cred = credentials.Certificate("respawn-admin-key.json")
            config = {
                "apiKey": "AIzaSyCrMz8AHpJFYkqU16jqhmRPbvF3z56ZyjE",
                "authDomain": "respawn-2f8ea.firebaseapp.com",
                "databaseURL": "https://respawn-2f8ea-default-rtdb.firebaseio.com/",
                "projectId": "respawn-2f8ea",
                "storageBucket": "respawn-2f8ea.appspot.com",
                "messagingSenderId": "959427699506",
                "appId": "1:959427699506:web:bd8a270a1754c09f30ed2b",
                "measurementId": "G-047ENKDP0D",
                "storageBucket": "respawn-2f8ea.appspot.com"
            }

            firebase_admin.initialize_app(cred, config)
            return True
        else: return False

    def getDB(self):
        return self.db

    def getAuth(self):
        if self.conexionDB:
            return auth

    def user(self, usuario, estado = -1):
        if self.conexionDB:
            match estado:
                case -1:
                    return self.signUp(usuario)
                case 0:
                    return True if str(self.logIn(usuario.correo).uid) == str(usuario.id) else False
                case 1:
                    auth.update_user(
                        uid = str(usuario.id),
                        display_name = usuario.nombre,
                        email = usuario.correo,
                        email_verified = False,
                        phone_number = None,
                        photo_url = None,
                        password = usuario.contrasenia,
                        disabled = False,
                        custom_claims = None,
                        valid_since = calendar.timegm(time.gmtime())
                    )
                case 2:
                    auth.delete_user(uid = str(usuario.id))
                    return True if self.logIn(usuario.correo) == None else False

    def signUp(self, usuario):
        auth.create_user(
            uid = str(usuario.id),
            display_name = usuario.nombre,
            email = usuario.correo,
            email_verified = False,
            phone_number = None,
            photo_url = None,
            password = usuario.contrasenia,
            disabled = False
        )

        return True if str(self.logIn(usuario.correo).uid) == str(usuario.id) else False

    def logIn(self, correo):
        return auth.get_user_by_email(email = correo)

    def getDocumento(self, entidad):
        if self.conexionDB:
            doc = self.db.reference(entidad).get()

            if isinstance(doc, dict):
                return doc
            else:
                return self.convertirDiccionario(doc)

    def convertirDiccionario(self, lista):
        diccionario = dict()

        if lista is not None:
            for i in range(len(lista)):
                if lista[i] != None:
                    diccionario.update({i: lista[i]})

        return diccionario

    def getDocumentoOrderByChild(self, entidad, atributo):
        if self.conexionDB:
            doc = self.db.reference(entidad).order_by_child(atributo).get()

            if isinstance(doc, dict):
                return doc
            else:
                return self.convertirDiccionario(doc)

    def getDocumentoOrderByChildByValue(self, entidad, atributo, valor):
        if self.conexionDB:
            doc = self.db.reference(entidad).order_by_child(atributo).equal_to(valor).get()

            if isinstance(doc, dict):
                return doc
            else:
                return self.convertirDiccionario(doc)

    def getDocumentoOrderByKey(self, entidad):
        if self.conexionDB:
            doc = self.db.reference(entidad).order_by_key().get()

            if isinstance(doc, dict):
                return doc
            else:
                return self.convertirDiccionario(doc)

    def getUltimateKey(self, documento):
        keys = list()
        keyMax = 0

        for key, value in self.getDocumentoOrderByKey(documento).items():
            if key is not None:
                keys.append(int(key))

        for i in keys:
            if i > keyMax:
                keyMax = i

        return keyMax + 1

    def conversionArrayToDocument(self, array):
        res = dict()

        if len(array) > 0:
            for i in range(len(array)):
                res[i] = array[i]
        elif len(array) == 0: res["-1"] = -1

        return res