const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt; // Extracting the JWT from the request 
const config = require('../db');
const User = require('../models/user');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader(); 
opts.secretOrKey = config.secret ;

module.exports=function(passport){
	passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
	    User.finduserbyid({_id: jwt_payload._doc._id}, function(err, user) {
	        if (err) {
	            return done(err, false);
	        }
	        if (user) {
	            return done(null, user);
	        } else {
	            return done(null, false);
	            // or you could create a new account
	        }
	    });
	}));		
}