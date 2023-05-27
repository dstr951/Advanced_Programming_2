const  mongoose  = require('mongoose')
const {User, UserPassName} = require("./Users");

//todo add scheme for Chat, Message

const Schema = mongoose.Schema

const MessageSchema = new Schema({

    id:{
        type:Number,
        unique:true
    },
    created:{
        type:Date,
        default: Date.now()
    },
    sender:{
        type:String,
        default:null,
        required:true

    },
    content:{
        type:String,
        default: null,
        required:true
    }
})
//add auto increment for the id.
MessageSchema.pre('save', async function (next) {
    if (this.isNew) {
        try {
            const lastDocument = await this.constructor.findOne({}, {}, { sort: { id: -1 } });
            if (lastDocument) {
                this.id = lastDocument.id + 1;
            } else {
                this.id = 1;
            }
        } catch (error) {
            return next(error);
        }
    }
    return next();
});
const Message = mongoose.model('Message', MessageSchema)




const ChatSchema = new Schema({
    id:{
        type:Number,
        unique: true
    },
    users: {
        type: [
            {
                type: String,
                unique: true
            }
        ],
        validate: {
            validator: async function (users) {
                if (users.length === 2 && users[0] !== users[1]) {
                    const user1 = await UserPassName.findOne({ username: users[0] }).exec();
                    const user2 = await UserPassName.findOne({ username: users[1] }).exec();
                    return (user1 && user2) ;
                }
                return false;
            },
            message: 'The "users" array must contain exactly 2 valid users.'
        }
    },
    messages: [{
        type:Number,
        unique:true,
        required:true,
    }]

})
ChatSchema.pre('save', async function (next) {
    if (this.isNew) {
        try {
            const lastDocument = await this.constructor.findOne({}, {}, { sort: { id: -1 } });
            if (lastDocument) {
                this.id = lastDocument.id + 1;
            } else {
                this.id = 1;
            }
        } catch (error) {
            return next(error);
        }
    }
    return next();
});
ChatSchema.index({ users: 1 }, { unique: true });
const Chat = mongoose.model('Chat',ChatSchema)




/*
const tempUser = new UserPassName({
    username:"tomeeer",
    password:"Asdf13234",
    displayName:"tomertomer",
    profilePic:"base64"
})

tempUser.save().then(r => console.log(r)).catch(e =>{
    console.log(e);
})
 */



module.exports = {Chat, Message}


