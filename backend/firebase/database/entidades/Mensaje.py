class Mensaje:
	def __init__(self, titulo = "", descripcion = "", tipo = 3):
		self._tipos = ['Confirmación', 'Advertencia', 'Error', 'Sin definir']
		self._titulo = titulo
		self._descripcion = descripcion
		self._tipo = self._tipos[tipo]

	@property
	def titulo(self):
		return self._titulo
	
	@titulo.setter
	def titulo(self, titulo):
		self._titulo = titulo

	@property
	def descripcion(self):
		return self._descripcion
	
	@descripcion.setter
	def descripcion(self, descripcion):
		self._descripcion = descripcion

	@property
	def tipo(self):
		return self._tipo
	
	@tipo.setter
	def tipo(self, tipo):
		self._tipo = self._tipos[tipo]

	def toString(self):
		return f"Mensaje {self.tipo}: {self.titulo}, {self.descripcion}"