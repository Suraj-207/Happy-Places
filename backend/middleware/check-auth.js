const jwt = require('jsonwebtoken');
const HttpError = require('../models/http-error');


module.exports = (req,res,next) => {
    if(req.method === 'OPTIONS'){
        return next();
    }

    // try- catch used as authorization header may not be set and split than fails
    try{
        const token = req.headers.authorization.split(' ')[1]; // authorization: "Something TOKEN" hence split is applied.
        if(!token) {
            throw new Error('Authentication failed!');
        }
        const decodedToken = jwt.verify(token, "a_great_secret");
        req.userData = { userId: decodedToken.userData};
        next();


    }catch(err){
        const error = new HttpError('Authentication failed', 403);
        return next(error);
    }
    
}