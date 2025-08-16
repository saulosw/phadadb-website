const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (email, password) => {
    const user = await User.findByEmail(email);

    if (!user) {
        const error = new Error('Invalid credentials.');
        error.statusCode = 401;
        throw error;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if(!isPasswordMatch) {
        const error = new Error('Invalid credentials.');
        error.statusCode = 401;
        throw error;
    }

    return user;
}

exports.signIn = async (fullName, email, password) => {
    const existingUser = await User.findByEmail(email);

    if (existingUser) {
        const error = new Error('User already exists.');
        error.statusCode = 409;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = User.createNewUser(fullName, email, hashedPassword);
    
    return newUser;
};