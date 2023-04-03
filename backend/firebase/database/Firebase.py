import firebase_admin
from firebase_admin import credentials, db

class Firebase:
    def __init__(self):
        self.db = db
        self.conexionDB()
        self._mensajeExitoso = {"message": "Exitoso"}
        self._mensajeFallido = {"message": "Ocurrio un problema. No hay dato(s)"}
        self._mensajePerdida = {"message": "Sin Conexion a la Base de Datos"}

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
            return self.getDB.auth()

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

        return key + 1