const Conversation = require("../models/conversation.model.js")
const Message = require("../models/message.model.js")
const { getReceiverSocketId } = require("../socket/socket.js")

const sendMessage = async (req,res) =>{
    try {
        const {message}=req.body
        const {id: receiverId} = req.params
        const senderId = req.user._id

        let conversation = await Conversation.findOne({
            participants :{$all:[senderId,receiverId]}
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId,receiverId],
            })
        }

        const newMessage = new Message({
            senderId:senderId,
            receiverId:receiverId,
            message:message,
        })

        if(newMessage){
            conversation.messages.push(newMessage._id)
        }


    //  await conversation.save()  ]
    //  await newMessage.save()    ]  these will run one after another and will consume some time

        await Promise.all([conversation.save(),newMessage.save()])  //this will run those two at a time in parallel

        // SOCKET IO functionality
        const receiverSocketId = getReceiverSocketId(receiverId)
        if(receiverSocketId){
            //io.to(<socket_id>).emit() used to send events to specific client
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }

        res.status(201).json(newMessage)
    } catch (error) {
        console.log("Error in sendMessage controller:",error.message)
        res.status(500).json({error:"Internal server error"})
    }
}

const getMessages = async(req,res)=>{
    try {
        
        const {id:userToChatId} = req.params
        const senderId = req.user._id

        const conversation = await Conversation.findOne({
            participants:{$all:[senderId,userToChatId]},
        }).populate("messages") //populate is used to display all messages of a conversation

        if(!conversation){
            return res.status(200).json([])
        }

        const messages = conversation.messages

        res.status(200).json(messages)

    } catch (error) {
        console.log("Error in getMessages controller:",error.message)
        res.status(500).json({error:"Internal server error"})
    }
}

module.exports = {sendMessage,getMessages}