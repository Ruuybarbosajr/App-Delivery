const userCreate = require('../services/register')
// const User = require('../database/models/User');

const registerUser = async (req, res, _next) => {
    try {
        const { name, email, password, role  } = req.body;
        const service = await userCreate(name, email, password, role);
        res.status(201).json({message: 'registrado'});
    } catch (err) {
        return res.status(500).json({ message: `${err}`});
    }

};
module.exports = registerUser;