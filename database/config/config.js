module.exports = {
    "development": {
        "username": "root",
        "password": "root",
        "database": "movies_db",
        "host": "127.0.0.1",
        "dialect": "mysql",
        "port": 3306
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASS,
        "database": process.env.DB_DATABASE,
        "host": process.env.DB_HOST,
        "dialect": "mysql"
    }
}