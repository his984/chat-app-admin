const {database = 'chay_app_admin', username = 'hisham', password = 'password'} = process.env

module.exports = {
    "development": {
        "username": username,
        "password": password,
        "database": database,
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "test": {
        "username": username,
        "password": password,
        "database": database,
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "username": username,
        "password": password,
        "database": database,
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
}
