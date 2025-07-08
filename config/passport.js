import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import pkg from 'passport-google-oauth2'
import { ExtractJwt, Strategy as JwtStrategy} from 'passport-jwt'
import dotenv from 'dotenv'
dotenv.config()
const { Strategy: GoogleStrategy } = pkg;


const config = {
    usernameField: 'email',
    passwordField: 'password'
}

passport.use(
    new LocalStrategy(config, async function (email, password, done) {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return done(null, false, { message: 'User not found' });
            }

            const compareResult = await bcrypt.compare(password, user.password);
            if (!compareResult) {
                return done(null, false, { message: 'Password incorrect' });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
)

const jwtOption = {
    jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req.cookies.token || null
    ]),
    secretOrKey: process.env.JWT_SECRET_KEY
}

const googleOption = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:8080/auth/login/google/callback'
}



passport.use(
    "jwt", 
    new JwtStrategy(
        jwtOption,
        async (user, done) => {
            const foundUser = await User.findById(user._id)
            if (!foundUser) {
                return done(null, false, {message: 'User not found'})
            }
            return done(null, foundUser)
        }
    )
)

passport.use(
    new GoogleStrategy(
        googleOption,
        async (assessToken, refreshToken, profile, done) => {
            try {
                const foundUser = await User.findOne({
                    socialId: profile._json.sub,
                    registerType: 'google'
                })
                if (foundUser) {
                    return done(null, foundUser)
                }

                const newUser = await User.create({
                    email: profile.email,
                    username: profile.displayName,
                    socialId: profile.id,
                    registerType: 'google'
                })

                return done(null, newUser)
            } catch (error) {
                return done(error, null)
            }
        }
    )
)

export default passport