# Aplicación de gestión de productos

Esta aplicación permite a los usuarios agregar nuevos productos mediante un formulario en la página `create-product-page` y luego visualizar y almacenar la lista de productos en la página `list-product-page`.

## Instrucciones para Ejecutar la Aplicación

### Requisitos Previos

- Node.js
- npm 
- Docker 

### Instalación

1. Clona este repositorio.

2. Entrar en el docker con la terminal (necesitas tener el Docker ya abierto)
    run -it -v C:\Users\User\TuRuta:/usr/src/app -p 8001:8001 cells-formation sh 

3. Navega al directorio del proyecto:
    cd nombre-del-proyecto 

4. Instala las dependencias:
    npm i

5. En el package.json añade el script start
    "scripts": {
    "start": "cells app:serve -c dev.js -b novulcanize -p 8001 --sourcemaps"
    },

6. Ejecuta el proyecto
    npm run start

7. Abre tu navegador y navega a:
    http://localhost:8000

### Descripción de las Páginas

## create-product-page

 Esta página permite a los usuarios agregar nuevos productos mediante un formulario.

* Componentes utilizados

    * `@bbva-web-components/bbva-web-form-text`: Para ingresar el nombre del producto.
    * `@bbva-web-components/bbva-web-form-amount`: Para ingresar el precio del producto.
    * `@bbva-web-components/bbva-web-button-default`: Para el botón de confirmación.

* Funcionalidad

    * Al hacer clic en el botón de confirmación, se dispara un evento publish que envía la información del producto a otras partes de la aplicación.
    * Navega a list-product-page después de agregar un producto.

## list-product-page

Esta página permite a los usuarios visualizar y almacenar la lista de productos.

* Componentes utilizados

    * `@bbva-web-components/bbva-web-card-product`: Para listar todos los productos almacenados en el `localStorage`.
    * `@bbva-web-components/bbva-web-button-default`: Para el botón de añadir un nuevo producto.

* Funcionalidad

    * En el ciclo de vida onPageEnter, se suscribe al evento publicado en create-product-page y almacena la información del producto en el localStorage.
    * Muestra la lista de productos almacenados en el localStorage.

## Autor

- [@hector032](https://www.github.com/hector032)


