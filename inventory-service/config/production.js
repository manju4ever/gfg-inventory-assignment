module.exports = {
    "app": {
        "name": "hapi-fullblown",
        "connection":{
            "host": "localhost",
            "port": "8080",
            "routes": {
                "cors": {
                    "origin": ["*"],
                    "headers": ["Authorization", "Content-Type", "If-None-Match", "x-requested-with", "x-forwarded-for"],
                    "credentials": true
                }
            }
        }
    },
    "db": {
        "mongo": {
            "host": "localhost",
            "port": "27017",
            "database": "test"
        },
        "redis": {
            "host": "localhost",
            "port": "6379"
        }
    }
};