const fs = require('fs/promises');
const productDb = require('../config/products.json');
const path = require('path');

class Model{
    save(){
        productDb.push(this);

        fs.writeFile(
            path.join(__dirname + '/../config/products.json'),
            JSON.stringify(productDb),
        );
    }

    static getAll(){
        return productDb;
    }

    static getById(id) {
        return productDb.find(x => x.id == id);
    }
}

module.exports = Model;