const User = require('../models/User');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../config/config');

const register = async ({ username, password, email }) => {

    let isFound = await User.find({ username }).lean(); 
    
    if(isFound){
        throw { message: 'Username is taken!'};
    }

    let salt = await bcrypt.genSalt(SALT_ROUNDS);
    let hash = await bcrypt.hash(password, salt);
    
    const newUser = new User({ username, password: hash, email });
    
    return newUser.save();

}

module.exports = {
    register,
}