# TRABAJO PRACTICO DE API

## URLs

### Movies: (películas)
- /api/movies         --> devuelve todas las peliculas
- /api/movies/:id     --> devuelve la película según parámetro
- /api/movies/create  --> permite crear una película (con validaciones de sequelize)

### Actors: (actores)
- /api/actors         --> devuelve todos los actores
- /api/actors/:id     --> devuelve el actor según parámetro
- /api/actors/create  --> permite crear un actor (con validaciones de sequelize)

### Genres: (géneros)
- /api/genres         --> devuelve todos los géneros
- /api/genres/:id     --> devuelve el género según parámetro
- /api/genres/create  --> permite crear un género (con validaciones de sequelize)


## Backend

### Enrutadores 
- app.use('/api/movies', moviesRouter);
- app.use('/api/actors', actorsRouter);
- app.use('/api/genres', genresRouter);

### Rutas para actors
- router.get('/', controller.getAll); //---> devuelve todos los actores
- router.post('/create', controller.create); //---> permite crear un actor
- router.get('/:id', controller.getById); //---> devuelve el actor segun parametro

### Rutas para movies
- router.get('/', controller.getAll); //---> devuelve todas las peliculas
- router.post('/create', controller.create); //---> permite crear una pelicula
- router.get('/:id', controller.getById); //---> devuelve una pelicula segun parametro

### Rutas para genres
- router.get('/', controller.getAll); //---> devuelve todos los generos
- router.post('/create', controller.create); //---> permite crear un genero
- router.get('/:id', controller.getById); //---> devuelve el genero segun parametro
