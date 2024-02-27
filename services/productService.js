const Cube = require('../models/Cube');
const uniqid = require('uniqid');
const fs = require('fs/promises');
const productsData = require('../config/products.json');
const path = require('path');

function getAll() {
    return productsData;
}

function getById(id){
    return productsData.find(x => x.id == id);
}

function create(data) {
    let cube = new Cube(
        uniqid(),
        data.name,
        data.description,
        data.imageUrl,
        data.difficultyLevel
    );

    productsData.push(cube);

    return fs.writeFile(
        path.join(__dirname + '/../config/products.json'), 
        JSON.stringify(productsData),
        );
}

module.exports = {
    create,
    getAll,
    getById
};