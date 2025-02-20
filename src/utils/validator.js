const User = require ("../api/models/user.model");

const validateEmailBD = async (emailUser) => {
    try {
        const validateEmail = await User.findOne ({email : emailUser});
        return validateEmail;
    } catch (error) {
        console.log(error);
    }
};

const validatePassword = (pass) => {
    const regex = /[A-Za-z\d$@$!%*?&]{8,15}/; // 1 mayuscula, 1 minuscula, minomo 8
    return regex.test(pass) //test devuelve true o false
}

module.exports ={ validateEmailBD, validatePassword };