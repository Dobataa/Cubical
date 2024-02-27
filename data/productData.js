const fs = require('fs/promises');
const productDb = require('../config/products.json');
const path = require('path');

module.exports = {
    getById(id) {
        return productDb.find(x => x.id == id);
    },

    getAll() {
        return productDb;
    },

    create(product) {
        productDb.push(product);

        fs.writeFile(
            path.join(__dirname + '/../config/products.json'),
            JSON.stringify(productDb),
        );
    }
}