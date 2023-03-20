		27 de febrero de 2023
Marcos Yahir De la caña Pérez


Para la ejecución correcta del sistema CRUD de Empleados realizado en Django (Backend) con Python y
React (Frontend) con JavaScript, será necesario instalar los siguientes programas y ejecutar los siguientes comandos:

A) Node.js
	Se requiere instalar el programa Node.js para poder ejecutar el lenguaje JavaScript en el ordenador.
	Además del uso del Gestor de Paquetes NPM (Node Package Manager). Todo ello se instala desde el instalador
	que se encuentra en su página oficial.
		--> https://nodejs.org/es/

	Para comprobar que la instalacion ha sido completada ejecute los siguientes comandos:
		node -v
		npm -v
		npx -v
	Ambos comandos deben devolver la version que se haya instalado.



B) Base de Datos en MySQL
	Dentro de este mismo directorio se encuentra el Script de la Base de Datos con el nombre "django_api", exportado directamente de la base de datos creada con el gestor XAMPP y PHPMyAdmin.
    Para crear la conexion es necesario considerar los siguientes parametros:
        - ENGINE: django.db.backends.mysql <- para este caso es necesario sustituir el que se genera por defecto
		- Nombre: django_api
		- Host: localhost
		- Puerto: 3306
		- Usuario: root
		- Password:         <- La contraseña va vacía

	Una vez completada, se ejecuta el contenido del script para la creación de la BD ("django_api") y la tabla "empleado", así
	como unos ejemplos de inserción.



C) Django
	Para el uso de este Framework es necesario instalar los paquetes a través de los siguientes comandos:
		pip install Django--4.1.6
		pip install mysql-connector-python
		pip install mysqlclient
	Esto para el correcto manejo y comunicación entre BD, lenguaje y Framework.

	Una vez hecha la BD en XAMPP, es necesario ejecutar el servidor desde la siguiente ruta:
		--> Proyecto_API/api/
	Dentro, abrimos la terminal o desde la terminal nos dirigimos a la ruta anterior, y ejecutamos el siguiente comando:
		py manage.py runserver
	Esto ejecuta el servidor de Django del proyecto y establece la conexión y comunicación entre la BD y el
	Backend (Django).

	Para comprobar que todo este en orden, puede ingresar a la siguiente dirección desde el navegador:
		--> localhost:8000/admin
	El sistema le pedirá ingrese las credenciales de administrador, las cuales son:
		- Usuario: marcosdcp
		- Contraseña: 130684
	Dentro podrá realizar ediciones y consultas a la Base de Datos directamente desde el Frontend de Django. Pero para
	ello se hará uso de React, especializado en el Frontend.



D) CORS
	Para habilitar el intercambio de Recursos de Origen Cruzado (CORS) entre el API de Django con el Framework React,
	haremos una instalación con pip de python, ejecutando el siguiente comando en la terminal:
		pip install django-cors-headers
	Para comprobar que se haya instalado el paquete, ejecuta el comando:
		pip list
	Donde se listarán todos los paquetes instalados en tu ordenador, ahí debería mostrarse el cors de django.



E) React
	Para la ejecución del Frontend es necesario Bootstrap y el enlazamiento de direcciones, para ello los instalamos con
	los siguientes comandos:
		npm i bootstrap
		npm i react-router-dom

	Ahora para ejecutar Frontend, es necesario dirigirse al directorio "crud" dentro de este mismo directorio.
	Una vez dentro, se debe abrir la terminal ahí mismo o desde la terminal dirigirse directorio por directorio a la misma ruta.
	Y ahora se ejecuta el siguiente comando:
		npm start
	Esto es para ejecutar el servidor integrado de la aplicación en React. Una vez se este cargando el comando, puede abrir
	directamente el navegador con la dirección de la aplicación, si no es así, entonces dirigase a la siguiente dirección dentro
	de algún navegador:
		--> http://localhost:3000