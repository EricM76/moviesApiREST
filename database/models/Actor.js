module.exports = function(sequelize, dataTypes) {

    let alias = "Actor";

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: dataTypes.STRING(100),
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "El campo first_name no puede ser nulo"
                },
                notEmpty: {
                    args: true,
                    msg: "Tenés que esscbir el nombre del actor"
                }
            }
        },
        last_name: {
            type: dataTypes.STRING(100),
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "El campo last_name no puede ser nulo"
                },
                notEmpty: {
                    args: true,
                    msg: "Tenés que esscbir el apellido del actor"
                }
            }
        },
        rating: {
            type: dataTypes.DECIMAL(3, 1).UNSIGNED,
        },
        favorite_movie_id: {
            type: dataTypes.INTEGER(10).UNSIGNED
        }
    }

    let config = {
        tableName: "actors",
        timestamps: true,
        underscored: true
    }

    let Actor = sequelize.define(alias, cols, config)
    return Actor
}