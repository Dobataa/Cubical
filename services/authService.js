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

const login = async ({ username, password }) => {
    let user = await User.findOne({ username }).lean();

    if(!user){
        throw { message: 'Invalid username or password! '};
    }

    let isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch){
        throw { message: 'Invalid password'};
    }

}

module.exports = {
    register,
    login
}