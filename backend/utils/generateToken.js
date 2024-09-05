const jwt = require("jsonwebtoken")

const generateTokenAndSetCookie = (userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'15d'
    })

    res.cookie("jwt",token,{
        maxAge: 15*24*60*1000,  //cookie age in milli seconds format
        httpOnly:true, //to prevent XSS attacks- Cross Site Scripting attacks
        sameSite:"strict", //CSRF attacks cross-site request forgery attacks
        secure:process.env.NODE_ENV !== "development", //if project is not in development stage(when NODE_ENV set as -production)it will be https not http
    })
}

module.exports = generateTokenAndSetCookie