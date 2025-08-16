const authService = require('../services/authService');

exports.signIn = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;      
        const newUser = await authService.signIn(fullName, email, password);

        if(newUser) {
            res.status(201).json({ message: "User created successfully!", user: newUser });
        }
    } catch (error) {
        console.error('Error in signIn controller:', error);
        res.status(error.statusCode || 500).json({ message: error.message || 'An internal server error occurred.' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userLogin = await authService.login(email, password);

        if (userLogin) {
            return res.status(200).json({ message: "Login successful!", user: userLogin });
        } else {
            return res.status(401).json({ message: "Invalid credentials or user not found." });
        }
    } catch (error) {   
        if (error.statusCode === 401) {
            console.log(`Failed login attempt for email: ${req.body.email}`);
        } else {
            console.error('Error in login controller:', error);
        }
        return res.status(error.statusCode || 500).json({ message: error.message || 'An internal server error occurred.' });
    }
};