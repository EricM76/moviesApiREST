module.exports = function(sequelize, dataTypes) {

    let alias = "Movie";

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING(500),
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "El campo title no puede ser nulo"
                },
                notEmpty: {
                    args: true,
                    msg: "Tenés que escribir el titulo de la película"
                }
            }
        },
        rating: {
            type: dataTypes.DECIMAL(3, 1).UNSIGNED,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "El campo rating no puede ser nulo"
                },
                notEmpty: {
                    args: true,
                    msg: "Tenés que escribir el rating de la película"
                }
            }
        },
        release_date: {
            type: dataTypes.DATE,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "El campo release_date no puede ser nulo"
                },
                notEmpty: {
                    args: true,
                    msg: "Tenés que indicar la fecha de estreno de la película"
                }
            }
        },
        awards: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            defaultValue : '0'
        },
        length: {
            type: dataTypes.INTEGER(10).UNSIGNED
        },
        genre_id : {
            type : dataTypes.INTEGER.UNSIGNED
        }
    }

    let config = {
        tableName: "Movies",
        timestamps: true,
        underscored: true
    }

    let Movie = sequelize.define(alias, cols, config)

    Movie.associate = function(models){

        Movie.belongsTo(models.Genre,{
            as : 'genero',
            foreignKey : 'genre_id'
        })

        Movie.belongsToMany(models.Actor,{
            as : 'actores',
            through : 'actor_movie',
            foreignKey : 'movie_id',
            otherKey : 'actor_id'
        })
    }
    return Movie
}