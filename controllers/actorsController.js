const db = require('../database/models'); //requiero la base de datos

module.exports = {
    getAll: function(req, res) {
        db.Actor.findAll()
            .then(actors => {
                return res.status(200).json(actors)
            })
    },
    getById: function(req, res) {
        db.Actor.findByPk(req.params.id)
            .then(function(actor) {
                return res.status(200).json(actor)
            })
    },
    create: function(req, res) {
        db.Actor.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                rating: req.body.rating,
                favorite_movie_id: req.body.favorite_movie_id
            })
            .then(function(result) {
                return res.status(201).json(result)
            })
            .catch(function(err) {
                return res.status(400).send(err)
            })
    },
    update : function(req,res){
        db.Movie.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            rating: req.body.rating,
            favorite_movie_id: req.body.favorite_movie_id
        },
        {
            where: {
                id : req.params.id
            }
        })
        .then(function() {
            return res.status(201).json({
                msg : "Actualización exitosa"
            })
        })
        .catch(err => res.status(400).send(err))
    },
    delete : function(req,res){
      
        db.actor_movie.destroy({
            where : {
                actor_id : req.params.id
            }
        })
        .then( 
            db.Actor.destroy({
                where : {
                    id : req.params.id
                }
            })
            .then(function() {
                return res.status(201).json({
                    msg : "Actor eliminado"
                })
            })
            .catch(err => res.status(400).send(err))
        )
       
    }

}