const User           = require('../models/User');
const passport       = require('passport');
const authHelper     = require('../authHelper');

exports.RegisterUser = function(req, res) {
    const password      = req.body.password;
    var passwordConfirm = req.body.passwordConfirm;

    if (password !== passwordConfirm) {
        res.send({ "error": "Passwords do not match" });
    }

    // Creates user object with mongoose model.
    // Note that the password is not present.
    var newUser = new User({
        firstName:    req.body.firstName,
        lastName:     req.body.lastName,
        email:        req.body.email,
        username:     req.body.username,
    });
    
    // Uses passport to register the user.
    // Pass in user object without password
    // and password as next parameter.
    User.register(new User(newUser), req.body.password, 
        (err, _account) => {
            // Show registration form with errors if fail.
            if (err) {
                res.send({ errorMessage: err });
            }

            passport.authenticate('local', { session: false }) (req, res, () => {
                authHelper.signJWTForUser(req, res);
            });
    });
};
  

// Log user out and direct them to the login screen.
exports.Logout = (req, res) => {
    req.logout();
    res.send({"success": "ok"});
};
