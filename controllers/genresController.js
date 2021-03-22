const db = require('../database/models'); //requiero la base de datos

module.exports = {
    getAll: function(req, res) {
        db.Genre.findAll()
            .then(genres => res.status(200).json(genres))
            .catch(error => res.status(404).send(error))
    },
    getById: function(req, res) {
        db.Genre.findByPk(req.params.id)
            .then(genre => res.status(200).json(genre))
            .catch(err => res.status(404).send(err))
    },
    create: function(req, res) {
        db.Genre.create({
                name: req.body.name,
                ranking: req.body.ranking,
                active: req.body.active
            })
            .then(function(result) {
                return res.status(201).json(result)
            })
            .catch(err => res.status(400).send(err))
    },
    update : function(req, res) {
        db.Genre.update({
            name: req.body.name,
            ranking: req.body.ranking,
            active: req.body.active
        },
        {
            id : req.params.id
        })
        .then(() => res.status(201).json({
            status : 201,
            msg : "Actualización exitosa"
        }))
        .catch(errres.status(500).send(err))
    },
    delete : function(req,res) {
        db.Genre.delete({
            where: {
                id : req.params.id
            }
        })
        .then(() => res.status(201).json({
            status : 201,
            msg : "Registro eliminado"
        }))
        .catch(errres.status(500).send(err))
    }
}