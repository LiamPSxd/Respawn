class Mensaje:
	def __init__(self, titulo = "", descripcion = "", tipo = 3):
		self.tipos = ['Confirmación', 'Advertencia', 'Error', 'Sin definir']
		self.titulo = titulo
		self.descripcion = descripcion
		self.tipo = self.tipos[tipo]

	@property
	def titulo(self):
		return self.titulo
	
	@titulo.setter
	def titulo(self, titulo):
		self.titulo = titulo

	@property
	def descripcion(self):
		return self.descripcion
	
	@descripcion.setter
	def descripcion(self, descripcion):
		self.descripcion = descripcion

	@property
	def tipo(self):
		return self.tipo
	
	@tipo.setter
	def tipo(self, tipo):
		self.tipo = self.tipos[tipo]

	def toString(self):
		return f"Mensaje {self.tipo}: {self.titulo}, {self.descripcion}"