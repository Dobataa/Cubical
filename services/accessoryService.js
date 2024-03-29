const Accessory = require('../models/Accessory');

function getAll(){
    return Accessory.find().lean();
}

function getAllWithout(ids){
    return Accessory.find({_id: {$nin: ids}}).lean();
}

function create(data){
    //should validata incoming data!!!

    let accessory = new Accessory(data);

    return accessory.save();
}

module.exports = {
    getAll,
    create,
    getAllWithout
}