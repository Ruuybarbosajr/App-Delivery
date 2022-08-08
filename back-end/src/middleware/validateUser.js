const validEmail = /\S+@\S+.\S+/;

const validateUser = (req, res, next) => {
    const { name, email, password } = req.body;
    if(name.length < 12){
        res.status(400).json({ messagem: 'Nome incompleto'})
    }
    if(!validEmail.test(email)) {
        res.status(400).json({message: 'email inválido'})
    }
    if(password.length < 6){
        res.status(400).json({message: 'Senha inválida'})
    }
    next();
};

module.exports = validateUser;