const Accessory = require('../models/Accessory');
const Cube = require('../models/Cube');

async function getAll(query) {
    let products = await Cube.find().lean();

    if (query.search) {
        products = products.filter(x => x.name.toLowerCase().includes(query.search.toLowerCase()));
    }

    if (query.from) {
        products = products.filter(x => Number(x.difficultyLevel) >= Number(query.from));
    }

    if (query.to) {
        products = products.filter(x => Number(x.difficultyLevel) <= Number(query.to));
    }

    return products;
}

function getById(id) {
    return Cube.findById(id).lean();
}

function getByIdWithAccessories(id){
    return Cube.findById(id)
        .populate('accessories')
        .lean();
}

function create(data) {
    let cube = new Cube(data);

    return cube.save();
}

async function attachAccessory(productId, accessoryId) {
    let product = await Cube.findById(productId);
    let accessory = await Accessory.findById(accessoryId);

    product.accessories.push(accessory);
    return product.save();
}

function updateById(productId, productData){
    return Cube.updateOne({_id: productId}, productData);
}

module.exports = {
    create,
    getAll,
    getById,
    attachAccessory,
    getByIdWithAccessories,
    updateById
};