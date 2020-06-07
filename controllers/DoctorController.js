var Exception = require("../utils/ExceptionHandler");
var DbContext = require("../services/DbContext");
const jwt = require('jsonwebtoken');
const config = require('../config.json');
module.exports.login = async(req, res) => {

    try {
        var username = req.body.username;
        var password = req.body.password;

        if (!username || !password) {
            return Exception.badRequest(res, "Username or password must not be empty!")
        }

        let doctor =
            await DbContext.getDoctorLogin(username, password)
            .catch(() => {
                return undefined;
            });
        if (!doctor) {
            return Exception.badRequest(res, "Username or password is incorect!")
        } else {
            _token = jwt.sign({ username: doctor.username, _id: doctor._id }, config.secret)
            doctor.set("token", _token, { strict: false })
            return res.status(200).json({...doctor.toJSON(), token: _token })
        }
    } catch (error) {
        return Exception.internalServerError(res, error.message)
    }
}