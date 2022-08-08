const validEmail = /\S+@\S+.\S+/;
const { verifyUserByName } = require('../services/register.service');

const validateUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    if(name.length < 12){
        res.status(400).json({ messagem: 'incomplete name'})
    }
    if(!validEmail.test(email)) {
        res.status(400).json({message: 'invalid email'})
    }
    if(password.length < 6){
        res.status(400).json({message: 'invalid password'})
    }
    const userExits = await verifyUserByName(name);
    if(userExits){
        res.status(409).json({message: 'user already exists'})
    }
    next();
};

module.exports = validateUser;