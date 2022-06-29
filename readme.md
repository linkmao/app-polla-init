# APP POLLA


## Apuntes básicos

Meta actual, realzar la encriptacion de la contraseañ



Flujo de desarrollo
- Diseño de los modelos de bases de datos
- Desarrollo de index.js con la configuracion de express
- Desarrollo de la configuracion para la base de datos
- Desarrollo de las rutas, modelos y controladores con su chequeo en postman
- Desarrollo de la autenticacion
- Desarrollo de los roles
- Desarrollo de modelo apuestas, ya que como hay autenticación entonces las apuestas queda vinculado a la persona logueada

## Diseño de las funciones que permiten la lógica del juego
- Funcion que cuando el ADMON cargue resultado de partido, calcule el puntaje ganado por cada jugador



## Elementos a organizar antes de liberar la version 1.0
1.  configurar la duracion de lo token en 1 dia o el tiempo que considere pertinente (actualmente esta en un año)
2.  La ruta para al auth dejarla por fuera de app es decir  raiz/auth

## Para futuras versiones
-En la inserscion de datos desde admin, si estos se van hacer desde postman debo crear una capa de verificacion que permita por ejemplo validar que los id que se incorporan desde la url si existan en su respectiva base de datos