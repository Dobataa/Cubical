const Cube = require('../models/Cube');
const uniqid = require('uniqid');
const fs = require('fs');
const productsData = require('../config/products.json');

function getAll() {
    return productsData;
}

function create(data) {
    let cube = new Cube(
        uniqid(),
        data.name,
        data.description,
        data.imagrUrl,
        data.difficultyLevel
    );

    fs.writeFile(__dirname + '/../config/products.json', JSON.stringify(productsData), (err) => {
        if (err) {
            console.log(err);
            return;
        }
    });
}

module.exports = {
    create
};