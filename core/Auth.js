const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Loader = require("./Loader");
const UserModel = Loader.model('user');

class Auth {
	constructor() {
		this.passport = passport;
		this.configure();
	}

	configure() {
		this.serialize();
		this.signin();
		this.signup();
		this.deserialize();
	}

	serialize() {
		this.passport.serializeUser(function(user, done) {
		    done(null, user.id);
		});
	};

	deserialize() {
		this.passport.deserializeUser(function(id, done) {
		    const condition = {
		        where: {id: id }
		    };

		    UserModel.findOne(condition)
		        .then((user) => {
		            done(null, user);
		        })
		        .catch((err) => {
		            done(err);
		        })
		});
	};

	signin() {
		this.passport.use('signin', new LocalStrategy({ 
		    usernameField: 'email',
		    passwordField: 'password',
		    passReqToCallback : true 
		}, function(req, email, password, done) { 
		        const condition = {
		            where: {email: email }
		        };

		        UserModel.findOne(condition)
		            .then((user) => {

		                if (!user){
		                    return done(null, false, req.flash('message', "Email's not exist."));                 
		                }
		                
		                const isPasswordValid = bcrypt.compareSync(password, user.password);
		                if (!isPasswordValid){
		                    return done(null, false, req.flash('message', 'Invalid Password'));
		                }

		                return done(null, user);
		            })
		            .catch((err) => {
		                console.log(err);
		                return done(err);
		            });
		    })
		);
	}

	signup() {
		this.passport.use('signup', new LocalStrategy({
		    usernameField: 'email',
		    passwordField: 'password',
		    passReqToCallback : true 
		}, function(req, email, password, done) {
		         
		        process.nextTick(function() {
		            const condition = {
		                where: {email: email }
		            };

		            UserModel.findOne(condition)
		                .then(function(user) {
		                    
		                    if (user) {
		                        return done(null, false, req.flash('message','Email already exists.'));
		                    } else {

		                        let data = {
		                            username: req.body.username,
		                            email: req.body.email,
		                            password: bcrypt.hashSync(password, 8),
		                            address: req.body.address,
		                            phone: req.body.phone
		                        };
		                        
		                        UserModel.create(data)
			                        .then((result) => {
			                            return done(null, result);
			                        })
			                        .catch((err) => {
			                        	console.log(err);
			                        	return done(err);
			                        });
		                    }
		                })
		                .catch((err) => {
		                    return done(err);
		                });
		        });
		    })
		);
	}

	authenticate(strategy, option) {
		return this.passport.authenticate(strategy, option);
	}
}


module.exports = new Auth();