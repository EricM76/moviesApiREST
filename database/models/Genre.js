module.exports = function(sequelize, dataTypes) {

    let alias = "Genre";

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'el nombre del género no puede ser nulo'
                },
                notEmpty: {
                    args: true,
                    msg: "Tenés que esscbir el nombre del género"
                }
            }

        },
        ranking: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            unique: {
                args: true,
                msg: "elige otro número"
            },
            validate: {
                notNull: {
                    args: true,
                    msg: 'el ranking no puede ser nulo'
                }
            }
        },
        active: {
            type: dataTypes.INTEGER(1).UNSIGNED,
            allowNull: false,
        }
    }

    let config = {
        tableName: "Genres",
        timestamps: true,
        underscored: true
    }

    let Genre = sequelize.define(alias, cols, config)
    return Genre
}