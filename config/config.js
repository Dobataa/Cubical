const config = {
    development: {
        PORT: 5000,
        SALT_ROUNDS: 1
    },

    production: {
        PORT: 80,
        SALT_ROUNDS: 7
    }
}

module.exports = config[process.env.NODE_ENV.trim()]