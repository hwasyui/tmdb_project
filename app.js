import express from 'express';
import movieRouter from './routers/movie.js'
import userRouter from './routers/user.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import dotenv from 'dotenv'

dotenv.config()

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(passport.initialize());

app.use((req, res, next)=> {
    if(!req.cookies['token']) {
        return next();
    }
    passport.authenticate(
        "jwt", 
        {session: false}, (err, user, info) => {
            if (err) return next(err);
        if (!user) {
            console.log("JWT invalid or expired", info);
            return res.status(401).json({ message: "Invalid token" });
        }
        req.user = user;
        next();
        }
    )(req, res, next)
})



import { isUserValidator } from './validators/users.validator.js'
app.use('/movies',isUserValidator, movieRouter)

app.use('/auth', userRouter)

app.use((err, req, res, next)=> {
    res.status(500).json({message: err.message})
})

export default app;