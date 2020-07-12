const passport    = require('passport')
const JWT         = require('jsonwebtoken')
const PassportJwt = require('passport-jwt')
const User        = require('./models/User');

// Configure the token.
const jwtSecret = process.env.JWT_SECRET;
const jwtAlgorithm = process.env.JWT_ALGORITHM;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN;

const options = {
    // Where will the JWT be passed in the HTTP request?
    // e.g. Authorization: Bearer xxxxxxxxxx
    jwtFromRequest: PassportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    // What is the secret
    secretOrKey: jwtSecret,
    // What algorithm(s) were used to sign it?
    algorithms: [jwtAlgorithm]
};

passport.use(
    new PassportJwt.Strategy(
        options,
        // When we have a verified token
        async (jwt_payload, done) => {
            // Find the real user from our database using the `id` in the JWT
            try {
                const user = await User.findById(jwt_payload.sub)
                user ? done(null, user) : done(null, false, {"error": "User not found"});
            } catch(error) {
                done(error, false, {"error": "Unresolved database error"});
            }
        }
    )
);

function signJWTForUser(req, res) {
    // Get the user (either just signed in or signed up)
    const user = req.user;
    
    // Create a signed token
    JWT.sign(
        // payload
        { email: user.email },
        // secret
        jwtSecret,
        // options
        {
            algorithm: jwtAlgorithm,
            expiresIn: jwtExpiresIn,
            subject: user._id.toString()
        },
        // callback
        (err, token) => {
            if (err)
                res.json(err);
            res.json(token);
        }
    );
}

module.exports = {
    signIn: passport.authenticate('local', { session: false }),
    requireJWT: passport.authenticate('jwt', { session: false }),
    signJWTForUser
}
