const User = require("../models/user.model")

const getUsersForSidebar = async(req,res)=>{
    try {

        const loggedInUserId = req.user._id

        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password")   //  "_id:{$ne:loggedInUserId}"  this part is used to display all the users except the loggedIn user because we dont want to send message is ourself

        res.status(200).json(filteredUsers)
 
    } catch (error) {
        console.error("Error in getUsersForSidebar:",error.message)
        res.status(500).json({error:"Internal server error"})
    }
}

module.exports = getUsersForSidebar