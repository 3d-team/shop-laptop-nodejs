const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Loader = require("./Loader");
const Mailer = require("./Mailer");
const Utils = require("./Utils");
const UserModel = Loader.model('user');

/**
 * @class Auth
 * @brief Cover passport API for providing Signin, Signup service. Using bcrypt to en/decrypt password UserModel. 
 * @brief Apply Singleton.
 * @return only one instance.
 **/
class Auth {
	constructor() {
		this.passport = passport;
		this.configure();

		/* Singleton */
		if(!this.instance) {
			this.instance = this;
		}
		return this.instance;
	}

	configure() {
		this.serialize();
		this.signin();
		this.signup();
		this.deserialize();
	}

	/* Marshalling user information into request */
	serialize() {
		this.passport.serializeUser(function(user, done) {
		    done(null, user.id);
		});
	};

	/* Demarshalling user from request */
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

	/* Signin strategy */
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
		                    return done(null, false, req.flash('error', "Email không tồn tại."));                 
		                }
		                
		                const isPasswordValid = bcrypt.compareSync(password, user.password);
		                if (!isPasswordValid){
		                    return done(null, false, req.flash('error', 'Sai mật khẩu.'));
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

	/* Signup strategy */
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
		                        return done(null, false, req.flash('error','Email đã tồn tại.'));
		                    }

		                    let data = {
	                            username: req.body.username,
	                            email: req.body.email,
	                            password: bcrypt.hashSync(password, 8),
	                            address: req.body.address,
	                            phone: req.body.phone,
	                            status: 0,
	                            confirm_code: Utils.genConfirmCode()
	                        };
	                        
	                        UserModel.create(data)
		                        .then((result) => {
		                        	Mailer.sendConfirmationEmail(result.username, result.email, result.confirm_code);
		                            return done(null, result);
		                        })
		                        .catch((err) => {
		                        	console.log(err);
		                        	return done(err);
		                        });
		                })
		                .catch((err) => {
		                    return done(err);
		                });
		        });
		    })
		);
	}

	/**
	 * @accessors public
	 * @brief Apply strategy to specific route.
	 * @return Authenticate service of Passport API.
	 * @use Apply this method to any route that need. Ex: /login route in routes/home.js
	 **/
	authenticate(strategy, option) {
		return this.passport.authenticate(strategy, option);
	}
}

module.exports = new Auth();