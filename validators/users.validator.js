export async function isUserValidator(req, res, next) {
    console.log(req.user)
    const user = req.user
    if(!user) {
        return res.status(403).json({
            message: 'You are not authorized'
        })
    }
    console.log(user)
    next()
}

import Movie from '../models/movie.model.js'
export async function isSameUserValidator(req, res, next) {
    const user = req.user
    if(!user) {
        res.json("Not Authorized")
    }

    const movie = await Movie.findById(req.params.postId)

    if (!movie.author._id.equals(user._id)) {
        return res.status(403).json({
            message: 'You are not authorized'
        })
    }
    next()
}

