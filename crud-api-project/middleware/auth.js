const jwt=require('jsonwebtoken')
const User=require('../models/users.model')

const auth=async (req,res,next) => {
    try {
        const bearerHeader=req.headers['authorization']
        if(typeof bearerHeader!='undefined'){
            const token=bearerHeader.split(' ')[1]
            const user=jwt.verify(token,process.env.JWT_SECRET)
            console.log(user)
            req.token=user
            next()
        }else{
            res.status(401).json({message:'No token provided'})
        }
    } catch (err) {
        res.status(401).json({message:'Invalid or expired token'})
    }
}

module.exports=auth
